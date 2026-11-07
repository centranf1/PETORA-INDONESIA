import { beforeEach, describe, expect, it, vi } from 'vitest'

const { createBackendClient } = vi.hoisted(() => ({
  createBackendClient: vi.fn(),
}))

vi.mock('../../../supabase/functions/_shared/supabase.ts', () => ({
  createBackendClient,
}))

import authMe from '../../../supabase/functions/auth/me/index'

describe('auth context endpoint', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('denies an inactive application user', async () => {
    const userQuery = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: 'user-1', organization_id: 'org-1', status: 'inactive' },
        error: null,
      }),
    }
    const client = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'auth-1' } }, error: null }),
      },
      from: vi.fn(() => userQuery),
    }
    createBackendClient.mockReturnValue(client)

    const response = await authMe(new Request('https://petora.local/auth/me', {
      method: 'POST',
      headers: { Authorization: 'Bearer valid-token' },
    }))

    expect(response.status).toBe(403)
    expect(await response.json()).toMatchObject({
      error: { code: 'FORBIDDEN' },
    })
    expect(client.from).toHaveBeenCalledTimes(1)
  })
})