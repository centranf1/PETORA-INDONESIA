import { createClient } from '@supabase/supabase-js'

const SUPABASE_ENVIRONMENT_ERROR = 'Backend Supabase belum dikonfigurasi'

export function createBackendClient(accessToken?: string) {
  const runtime = globalThis as typeof globalThis & {
    Deno?: { env: { get: (name: string) => string | undefined } }
  }
  const supabaseUrl = runtime.Deno?.env.get('SUPABASE_URL')
  const supabaseKey = runtime.Deno?.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(SUPABASE_ENVIRONMENT_ERROR)
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
  })
}