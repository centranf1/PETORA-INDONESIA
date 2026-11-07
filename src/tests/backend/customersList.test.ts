import { beforeEach, describe, expect, it, vi } from 'vitest'

const { createBackendClient } = vi.hoisted(() => ({
  createBackendClient: vi.fn(),
}))

vi.mock('../../../supabase/functions/_shared/supabase.ts', () => ({
  createBackendClient,
}))

import customersList from '../../../supabase/functions/customers-list/handler'

function makeQuery(result: { data: unknown; error?: unknown }) {
  const builder: any = {
    select: vi.fn(() => builder),
    eq: vi.fn(() => builder),
    in: vi.fn(() => builder),
    is: vi.fn(() => builder),
    order: vi.fn(() => builder),
    limit: vi.fn(() => builder),
    single: vi.fn(async () => result),
    then: (resolve: (value: typeof result) => unknown, reject: (reason: unknown) => unknown) =>
      Promise.resolve(result).then(resolve, reject),
  }

  return builder
}

function makeClient(options: {
  assignments?: unknown[]
  permissions?: unknown[]
  customers?: unknown[]
}) {
  const results: Record<string, { data: unknown; error?: unknown }> = {
    users: { data: { id: 'user-1', organization_id: 'org-1', status: 'active' } },
    organizations: { data: { id: 'org-1', status: 'active' } },
    user_role_assignments: { data: options.assignments ?? [] },
    role_permissions: { data: options.permissions ?? [] },
    customers: { data: options.customers ?? [] },
  }
  const queries = Object.fromEntries(Object.entries(results).map(([table, result]) => [table, makeQuery(result)]))

  return {
    auth: { getUser: vi.fn(async () => ({ data: { user: { id: 'auth-1' } }, error: null })) },
    from: vi.fn((table: string) => queries[table]),
    queries,
  }
}

const branchAssignment = {
  organization_id: 'org-1',
  role_id: 'role-1',
  branch_id: '00000000-0000-4000-8000-00000000000a',
  is_active: true,
  active_from: null,
  active_until: null,
  roles: { id: 'role-1', organization_id: 'org-1', status: 'active' },
}

const branchPermission = {
  role_id: 'role-1',
  permissions: {
    module: 'customers',
    resource: 'records',
    action: 'view',
    scope: 'branch',
  },
}

describe('customers-list edge function', () => {
  beforeEach(() => vi.clearAllMocks())

  it('requires authentication and only accepts GET', async () => {
    const unauthenticated = await customersList(new Request('https://petora.local/customers-list'))
    const methodNotAllowed = await customersList(new Request('https://petora.local/customers-list', {
      method: 'POST',
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(unauthenticated.status).toBe(401)
    expect(methodNotAllowed.status).toBe(405)
  })

  it('denies access when the user has no explicit customer-view grant', async () => {
    const client = makeClient({ assignments: [branchAssignment] })
    createBackendClient.mockReturnValue(client)

    const response = await customersList(new Request('https://petora.local/customers-list', {
      method: 'GET',
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status).toBe(403)
    expect(client.from).not.toHaveBeenCalledWith('customers')
  })

  it('denies a requested branch outside the authenticated assignment', async () => {
    const client = makeClient({
      assignments: [branchAssignment],
      permissions: [branchPermission],
    })
    createBackendClient.mockReturnValue(client)

    const response = await customersList(new Request('https://petora.local/customers-list?branch_id=00000000-0000-4000-8000-00000000000b', {
      method: 'GET',
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status).toBe(403)
    expect(client.from).not.toHaveBeenCalledWith('customers')
  })

  it('queries only the assigned branch and returns a bounded customer projection', async () => {
    const customer = {
      id: '00000000-0000-4000-8000-000000000001',
      organization_id: 'org-1',
      branch_id: '00000000-0000-4000-8000-00000000000a',
      full_name: 'Sari Putri',
      created_at: '2026-11-06T10:00:00.000Z',
    }
    const nextCustomer = {
      ...customer,
      id: '00000000-0000-4000-8000-000000000002',
      full_name: 'Rizky Pratama',
      created_at: '2026-11-05T10:00:00.000Z',
    }
    const client = makeClient({
      assignments: [branchAssignment],
      permissions: [branchPermission],
      customers: [customer, nextCustomer],
    })
    createBackendClient.mockReturnValue(client)

    const response = await customersList(new Request('https://petora.local/customers-list?limit=1&organization_id=org-evil', {
      method: 'GET',
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status, JSON.stringify({
      body: await response.clone().json(),
      queriedTables: client.from.mock.calls,
    })).toBe(200)
    expect(await response.json()).toMatchObject({
      data: [customer],
      meta: { next_cursor: expect.any(String) },
    })
    expect(client.queries.customers.eq).toHaveBeenCalledWith('organization_id', 'org-1')
    expect(client.queries.customers.in).toHaveBeenCalledWith('branch_id', ['00000000-0000-4000-8000-00000000000a'])
    expect(client.queries.customers.limit).toHaveBeenCalledWith(2)
  })
})