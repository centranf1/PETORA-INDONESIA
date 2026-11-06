import { createServerClient } from '@supabase/supabase-js'
import type { Database } from '../../../types/database'
import { generateTraceId, createSuccessResponse, createErrorResponse } from '../../../lib/validators/errors'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export default async function handler(req: Request): Promise<Response> {
  const traceId = generateTraceId()
  
  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify(createErrorResponse('METHOD_NOT_ALLOWED', 'Method tidak diizinkan', false, traceId)),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    const body = await req.json()
    const { email, password } = body
    
    if (!email || !password) {
      return new Response(
        JSON.stringify(createErrorResponse('VALIDATION_ERROR', 'Email dan password wajib diisi', false, traceId)),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    const client = createServerClient<Database>(supabaseUrl!, supabaseServiceKey!, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    
    const { data, error } = await client.auth.signUp({
      email,
      password,
    })
    
    if (error) {
      return new Response(
        JSON.stringify(createErrorResponse('AUTH_ERROR', error.message, false, traceId)),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    return new Response(
      JSON.stringify(createSuccessResponse({
        user: data.user,
        session: data.session,
      }, traceId)),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify(createErrorResponse('INTERNAL_ERROR', error instanceof Error ? error.message : 'Unknown error', true, traceId)),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}