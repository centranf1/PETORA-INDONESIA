import { describe, expect, it } from 'vitest'
import settingsApprove from '../../../supabase/functions/settings/approve/index'
import settingsPropose from '../../../supabase/functions/settings/propose/index'
import settingsReject from '../../../supabase/functions/settings/reject/index'
import signup from '../../../supabase/functions/auth/signup/index'

describe('backend endpoints without approved write policies', () => {
  it.each([
    ['settings proposal', settingsPropose],
    ['settings approval', settingsApprove],
    ['settings rejection', settingsReject],
    ['organization signup', signup],
  ])('%s returns a safe unavailable response without writing', async (_name, handler) => {
    for (const method of ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']) {
      const response = await handler(new Request('https://petora.local/function', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: method === 'GET' ? undefined : JSON.stringify({}),
      }))

      expect(response.status).toBe(503)
      expect(await response.json()).toMatchObject({
        error: {
          code: 'POLICY_NOT_APPROVED',
          retryable: false,
        },
      })
    }
  })
})