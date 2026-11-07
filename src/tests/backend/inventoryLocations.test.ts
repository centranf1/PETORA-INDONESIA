import { beforeEach, describe, expect, it, vi } from 'vitest'

const { createBackendClient } = vi.hoisted(() => ({
  createBackendClient: vi.fn(),
}))

vi.mock('../../../supabase/functions/_shared/supabase.ts', () => ({
  createBackendClient,
}))

import inventoryLocations from '../../../supabase/functions/inventory-locations/handler'

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

const branchId = '00000000-0000-4000-8000-00000000000a'
const branchAssignment = {
  organization_id: 'org-1',
  role_id: 'role-1',
  branch_id: branchId,
  is_active: true,
  active_from: null,
  active_until: null,
  roles: { id: 'role-1', organization_id: 'org-1', status: 'active' },
}

function makeClient(granted: boolean) {
  const location = {
    id: 'location-1',
    organization_id: 'org-1',
    branch_id: branchId,
    code: 'WH-01',
    name: 'Gudang Utama',
    location_type: 'warehouse',
    status: 'active',
    created_at: '2026-11-06T10:00:00.000Z',
  }
  const results: Record<string, { data: unknown; error?: unknown }> = {
    users: { data: { id: 'user-1', organization_id: 'org-1', status: 'active' } },
    organizations: { data: { id: 'org-1', status: 'active' } },
    user_role_assignments: { data: [branchAssignment] },
    role_permissions: {
      data: granted ? [{
        organization_id: 'org-1',
        role_id: 'role-1',
        permissions: { module: 'inventory', resource: 'locations', action: 'view', scope: 'branch' },
      }] : [],
    },
    inventory_locations: { data: [location] },
  }
  const queries = Object.fromEntries(Object.entries(results).map(([table, result]) => [table, makeQuery(result)]))

  return {
    auth: { getUser: vi.fn(async () => ({ data: { user: { id: 'auth-1' } }, error: null })) },
    from: vi.fn((table: string) => queries[table]),
    queries,
  }
}

describe('inventory-locations edge function', () => {
  beforeEach(() => vi.clearAllMocks())

  it('denies access without an explicit location-view grant', async () => {
    const client = makeClient(false)
    createBackendClient.mockReturnValue(client)

    const response = await inventoryLocations(new Request('https://petora.local/inventory-locations', {
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status).toBe(403)
    expect(client.from).not.toHaveBeenCalledWith('inventory_locations')
  })

  it('returns location metadata only within the assigned branch', async () => {
    const client = makeClient(true)
    createBackendClient.mockReturnValue(client)

    const response = await inventoryLocations(new Request('https://petora.local/inventory-locations?organization_id=org-evil', {
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ data: [{ id: 'location-1', branch_id: branchId }] })
    expect(client.queries.inventory_locations.in).toHaveBeenCalledWith('branch_id', [branchId])
  })

  it('denies a requested branch that is not assigned', async () => {
    const client = makeClient(true)
    createBackendClient.mockReturnValue(client)

    const response = await inventoryLocations(new Request('https://petora.local/inventory-locations?branch_id=00000000-0000-4000-8000-00000000000b', {
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status).toBe(403)
    expect(client.from).not.toHaveBeenCalledWith('inventory_locations')
  })
})