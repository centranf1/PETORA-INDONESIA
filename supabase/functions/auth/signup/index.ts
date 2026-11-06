import { createServerClient } from '@supabase/supabase-js'
import type { Database } from '../../types/database'
import { generateTraceId, createSuccessResponse, createErrorResponse } from '../../lib/validators/errors'

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
    const { email, password, full_name, phone, organization_code } = body
    
    if (!email || !password) {
      return new Response(
        JSON.stringify(createErrorResponse('VALIDATION_ERROR', 'Email dan password wajib diisi', false, traceId)),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    const client = createServerClient<Database>(supabaseUrl!, supabaseServiceKey!, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    
    const { data: authData, error: authError } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: full_name || email.split('@')[0],
        },
      },
    })
    
    if (authError || !authData.user) {
      return new Response(
        JSON.stringify(createErrorResponse('AUTH_ERROR', authError?.message || 'Registrasi gagal', false, traceId)),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    let organizationId: string | null = null
    
    if (organization_code) {
      const { data: org } = await client
        .from('organizations')
        .select('id')
        .eq('code', organization_code)
        .single()
      
      organizationId = org?.id || null
    }
    
    if (!organizationId) {
      const { data: newOrg, error: orgError } = await client
        .from('organizations')
        .insert({
          code: `org_${authData.user.id.slice(0, 8)}`,
          name: full_name ? `${full_name}'s Organization` : 'New Organization',
          status: 'active',
        })
        .select()
        .single()
      
      if (orgError) {
        return new Response(
          JSON.stringify(createErrorResponse('ORG_ERROR', 'Gagal membuat organisasi', false, traceId)),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
      }
      
      organizationId = newOrg.id
    }
    
    const { data: appUser, error: userError } = await client
      .from('users')
      .insert({
        organization_id: organizationId,
        auth_user_id: authData.user.id,
        full_name: full_name || email.split('@')[0],
        email,
        phone: phone || null,
        status: 'active',
      })
      .select()
      .single()
    
    if (userError) {
      return new Response(
        JSON.stringify(createErrorResponse('USER_ERROR', 'Gagal membuat user', false, traceId)),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    const { data: customerRole } = await client
      .from('roles')
      .select('id')
      .eq('organization_id', organizationId)
      .eq('code', 'customer')
      .single()
    
    if (customerRole) {
      await client.from('user_role_assignments').insert({
        organization_id: organizationId,
        user_id: appUser.id,
        role_id: customerRole.id,
        is_active: true,
      })
    }
    
    return new Response(
      JSON.stringify(createSuccessResponse({
        user: authData.user,
        app_user: appUser,
        organization_id: organizationId,
        session: authData.session,
      }, traceId)),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify(createErrorResponse('INTERNAL_ERROR', error instanceof Error ? error.message : 'Unknown error', true, traceId)),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}