import { beforeEach, describe, expect, it, vi } from 'vitest'

const { createBackendClient } = vi.hoisted(() => ({
  createBackendClient: vi.fn(),
}))

vi.mock('../../../supabase/functions/_shared/supabase.ts', () => ({
  createBackendClient,
}))

import salesList from '../../../supabase/functions/sales-list/handler'

function makeQuery(result: { data: unknown; error?: unknown }) {
  const builder: any = {
    select: vi.fn(() => builder),
    eq: vi.fn(() => builder),
    in: vi.fn(() => builder),
    or: vi.fn(() => builder),
    order: vi.fn(() => builder),
    limit: vi.fn(() => builder),
    single: vi.fn(async () => result),
    then: (resolve: (value: typeof result) => unknown, reject: (reason: unknown) => unknown) =>
      Promise.resolve(result).then(resolve, reject),
  }
  return builder
}

const branchId = '00000000-0000-4000-8000-00000000000a'
const assignments = [{
  organization_id: 'org-1',
  role_id: 'role-1',
  branch_id: branchId,
  is_active: true,
  active_from: null,
  active_until: null,
  roles: { id: 'role-1', organization_id: 'org-1', status: 'active' },
}]

function makeClient(granted: boolean, sales: unknown[] = []) {
  const results: Record<string, { data: unknown; error?: unknown }> = {
    users: { data: { id: 'user-1', organization_id: 'org-1', status: 'active' } },
    organizations: { data: { id: 'org-1', status: 'active' } },
    user_role_assignments: { data: assignments },
    role_permissions: {
      data: granted ? [{
        organization_id: 'org-1',
        role_id: 'role-1',
        permissions: { module: 'sales', resource: 'transactions', action: 'view', scope: 'branch' },
      }] : [],
    },
    sales_transactions: { data: sales },
  }
  const queries = Object.fromEntries(Object.entries(results).map(([table, result]) => [table, makeQuery(result)]))

  return {
    auth: { getUser: vi.fn(async () => ({ data: { user: { id: 'auth-1' } }, error: null })) },
    from: vi.fn((table: string) => queries[table]),
    queries,
  }
}

describe('sales-list edge function', () => {
  beforeEach(() => vi.clearAllMocks())

  it('denies access without an explicit transaction-view grant', async () => {
    const client = makeClient(false)
    createBackendClient.mockReturnValue(client)

    const response = await salesList(new Request('https://petora.local/sales-list', {
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status).toBe(403)
    expect(client.from).not.toHaveBeenCalledWith('sales_transactions')
  })

  it('denies a branch outside the authenticated assignment', async () => {
    const client = makeClient(true)
    createBackendClient.mockReturnValue(client)

    const response = await salesList(new Request('https://petora.local/sales-list?branch_id=00000000-0000-4000-8000-00000000000b', {
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status).toBe(403)
    expect(client.from).not.toHaveBeenCalledWith('sales_transactions')
  })

  it('returns only the caller tenant and assigned branch sales', async () => {
    const sale = {
      id: '00000000-0000-4000-8000-000000000001',
      organization_id: 'org-1',
      branch_id: branchId,
      transaction_number: 'TRX-001',
      cashier_user_id: 'user-1',
      currency: 'IDR',
      subtotal: 100000,
      discount_amount: 0,
      tax_amount: 0,
      total_amount: 100000,
      status: 'completed',
      created_at: '2026-11-06T10:00:00.000Z',
      updated_at: '2026-11-06T10:00:00.000Z',
    }
    const client = makeClient(true, [sale])
    createBackendClient.mockReturnValue(client)

    const response = await salesList(new Request('https://petora.local/sales-list?organization_id=org-evil&limit=1', {
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ data: [sale] })
    expect(client.queries.sales_transactions.eq).toHaveBeenCalledWith('organization_id', 'org-1')
    expect(client.queries.sales_transactions.in).toHaveBeenCalledWith('branch_id', [branchId])
    expect(client.queries.sales_transactions.limit).toHaveBeenCalledWith(2)
  })
})