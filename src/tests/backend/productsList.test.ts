import { beforeEach, describe, expect, it, vi } from 'vitest'

const { createBackendClient } = vi.hoisted(() => ({
  createBackendClient: vi.fn(),
}))

vi.mock('../../../supabase/functions/_shared/supabase.ts', () => ({
  createBackendClient,
}))

import productsList from '../../../supabase/functions/products-list/handler'
import { AuthorizationError, resolveReadAuthorization } from '../../../supabase/functions/_shared/authorization'

function makeQuery(result: { data: unknown; error?: unknown }) {
  const builder: any = {
    select: vi.fn(() => builder),
    eq: vi.fn(() => builder),
    in: vi.fn(() => builder),
    order: vi.fn(() => builder),
    limit: vi.fn(() => builder),
    single: vi.fn(async () => result),
    then: (resolve: (value: typeof result) => unknown, reject: (reason: unknown) => unknown) =>
      Promise.resolve(result).then(resolve, reject),
  }

  return builder
}

function makeClient(permissions: unknown[], products: unknown[] = []) {
  const results: Record<string, { data: unknown; error?: unknown }> = {
    users: { data: { id: 'user-1', organization_id: 'org-1', status: 'active' } },
    organizations: { data: { id: 'org-1', status: 'active' } },
    user_role_assignments: {
      data: [{
        organization_id: 'org-1',
        role_id: 'role-1',
        branch_id: '00000000-0000-4000-8000-00000000000a',
        is_active: true,
        active_from: null,
        active_until: null,
        roles: { id: 'role-1', organization_id: 'org-1', status: 'active' },
      }],
    },
    role_permissions: { data: permissions },
    products: { data: products },
  }
  const queries = Object.fromEntries(Object.entries(results).map(([table, result]) => [table, makeQuery(result)]))

  return {
    auth: { getUser: vi.fn(async () => ({ data: { user: { id: 'auth-1' } }, error: null })) },
    from: vi.fn((table: string) => queries[table]),
    queries,
  }
}

const catalogGrant = [{
  organization_id: 'org-1',
  role_id: 'role-1',
  permissions: { module: 'products', resource: 'catalog', action: 'view', scope: 'branch' },
}]

describe('products-list edge function', () => {
  beforeEach(() => vi.clearAllMocks())

  it('resolves explicit read scope and returns authorization denials as typed errors', async () => {
    const client = makeClient([])
    createBackendClient.mockReturnValue(client)
    const request = new Request('https://petora.local/products-list', {
      headers: { Authorization: 'Bearer valid-token' },
    })

    await expect(resolveReadAuthorization(request, 'products', 'catalog'))
      .rejects.toBeInstanceOf(AuthorizationError)
  })

  it('denies access without an explicit catalog permission', async () => {
    const client = makeClient([])
    createBackendClient.mockReturnValue(client)

    const response = await productsList(new Request('https://petora.local/products-list', {
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status, JSON.stringify({ body: await response.json(), queries: client.from.mock.calls })).toBe(403)
    expect(client.from).not.toHaveBeenCalledWith('products')
  })

  it('returns organization catalog fields without inventing price or stock', async () => {
    const product = {
      id: '00000000-0000-4000-8000-000000000001',
      organization_id: 'org-1',
      sku: 'SKU-001',
      name: 'Food',
      item_type: 'product',
      base_unit: 'pcs',
      status: 'active',
      created_at: '2026-11-06T10:00:00.000Z',
    }
    const client = makeClient(catalogGrant, [product])
    createBackendClient.mockReturnValue(client)

    const response = await productsList(new Request('https://petora.local/products-list?organization_id=org-evil', {
      headers: { Authorization: 'Bearer valid-token' },
    }))
    const result = await response.json()

    expect(response.status, JSON.stringify({ body: result, queries: client.from.mock.calls })).toBe(200)
    expect(result.data).toEqual([product])
    expect(result.data[0]).not.toHaveProperty('price')
    expect(result.data[0]).not.toHaveProperty('stock')
    expect(client.queries.products.eq).toHaveBeenCalledWith('organization_id', 'org-1')
  })
})