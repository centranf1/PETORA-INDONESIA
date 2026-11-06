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
    
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify(createErrorResponse('UNAUTHORIZED', 'Token tidak ditemukan', false, traceId)),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    const token = authHeader.replace('Bearer ', '')
    
    const client = createServerClient<Database>(supabaseUrl!, supabaseServiceKey!, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    
    const { data: { user }, error } = await client.auth.getUser(token)
    
    if (error || !user) {
      return new Response(
        JSON.stringify(createErrorResponse('UNAUTHORIZED', 'Token tidak valid', false, traceId)),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    const { data: appUser } = await client
      .from('users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single()
    
    const { data: organization } = appUser ? await client
      .from('organizations')
      .select('*')
      .eq('id', appUser.organization_id)
      .single() : { data: null }
    
    const { data: roleAssignments } = appUser ? await client
      .from('user_role_assignments')
      .select(`
        role_id,
        branch_id,
        roles (
          id,
          code,
          name,
          status
        )
      `)
      .eq('user_id', appUser.id)
      .eq('is_active', true) : { data: [] }
    
    const roles = roleAssignments?.map(r => r.roles).filter(Boolean) || []
    const roleCodes = roles.map(r => r.code)
    
    const roleIds = roles.map(r => r.id)
    const { data: permissionData } = roleIds.length > 0 ? await client
      .from('role_permissions')
      .select(`
        permission_id,
        permissions (
          id,
          code,
          module,
          resource,
          action,
          scope
        )
      `)
      .in('role_id', roleIds) : { data: [] }
    
    const permissions = permissionData?.map(p => p.permissions).filter(Boolean) || []
    
    return new Response(
      JSON.stringify(createSuccessResponse({
        user: appUser,
        auth_user: user,
        organization: organization || null,
        roles,
        permissions,
        role_codes: roleCodes,
        branch_id: roleAssignments?.[0]?.branch_id || null,
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