import { createServerClient } from '@supabase/supabase-js'
import type { Database } from '../../../types/database'
import { 
  generateTraceId, 
  createSuccessResponse, 
  createErrorResponse,
  AppError,
  ErrorCodes,
  requireAuth,
  requirePermission,
  checkOptimisticLock,
} from '../../../lib/validators/errors'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

async function getAuthenticatedContext(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError(ErrorCodes.UNAUTHORIZED, 'Autentikasi diperlukan', false)
  }
  
  const token = authHeader.replace('Bearer ', '')
  const client = createServerClient<Database>(supabaseUrl!, supabaseServiceKey!, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  })
  
  const { data: { user }, error } = await client.auth.getUser(token)
  if (error || !user) throw new AppError(ErrorCodes.UNAUTHORIZED, 'Token tidak valid', false)
  
  const { data: appUser } = await client.from('users').select('*').eq('auth_user_id', user.id).single()
  if (!appUser) throw new AppError(ErrorCodes.UNAUTHORIZED, 'User tidak ditemukan', false)
  
  const { data: roleAssignments } = await client
    .from('user_role_assignments')
    .select(`role_id, branch_id, roles (id, code, name, status, is_system)`)
    .eq('user_id', appUser.id)
    .eq('is_active', true)
  
  const roles = roleAssignments?.map(r => r.roles).filter(Boolean) || []
  const roleCodes = roles.map(r => r.code)
  
  const roleIds = roles.map(r => r.id)
  const { data: permissionData } = await client
    .from('role_permissions')
    .select(`permission_id, permissions (id, code, module, resource, action, scope)`)
    .in('role_id', roleIds)
  
  const permissions = permissionData?.map(p => p.permissions).filter(Boolean) || []
  
  return {
    client,
    user: appUser,
    roles,
    permissions,
    roleCodes,
    branchId: roleAssignments?.[0]?.branch_id || null,
    canApprove: roleCodes.includes('super_admin') || roleCodes.includes('owner'),
  }
}

export default async function handler(req: Request): Promise<Response> {
  const traceId = generateTraceId()
  
  try {
    const authHeader = req.headers.get('Authorization')
    const ctx = await getAuthenticatedContext(authHeader)
    const { client, user, canApprove } = ctx
    
    if (!canApprove) {
      throw new AppError(ErrorCodes.FORBIDDEN, 'Hanya Owner/Super Admin yang dapat menyetujui setting', false)
    }
    
    const url = new URL(req.url)
    const pathParts = url.pathname.split('/')
    const changeRequestId = pathParts[pathParts.length - 2]
    
    if (!changeRequestId) {
      throw new AppError(ErrorCodes.VALIDATION_ERROR, 'Change Request ID diperlukan', false)
    }
    
    const body = await req.json().catch(() => ({}))
    const { reason, action = 'approve' } = body
    
    const { data: changeRequest, error: crError } = await client
      .from('setting_change_requests')
      .select(`
        *,
        system_settings (*)
      `)
      .eq('id', changeRequestId)
      .single()
    
    if (crError || !changeRequest) {
      throw new AppError(ErrorCodes.NOT_FOUND, 'Change request tidak ditemukan', false)
    }
    
    if (changeRequest.status !== 'pending_approval') {
      throw new AppError(ErrorCodes.INVALID_STATE, `Request sudah dalam status ${changeRequest.status}`, false)
    }
    
    const newStatus = action === 'approve' ? 'applied' : 'rejected'
    
    const { data: updated, error } = await client
      .from('setting_change_requests')
      .update({
        status: newStatus,
        decided_by: user.id,
        decided_at: new Date().toISOString(),
        decision_reason: reason || (action === 'approve' ? 'Disetujui' : 'Ditolak'),
      })
      .eq('id', changeRequestId)
      .select()
      .single()
    
    if (error) throw new AppError(ErrorCodes.INTERNAL_ERROR, error.message, false)
    
    if (action === 'approve') {
      const setting = changeRequest.system_settings
      checkOptimisticLock(setting.version_no, changeRequest.expected_version_no)
      
      const newVersion = setting.version_no + 1
      
      await client.from('setting_versions').insert({
        setting_id: setting.id,
        change_request_id: changeRequestId,
        version_no: newVersion,
        value_json: changeRequest.proposed_value_json,
        changed_by: user.id,
        reason: reason || 'Disetujui oleh ' + user.id,
      })
      
      await client.from('system_settings')
        .update({
          value_json: changeRequest.proposed_value_json,
          version_no: newVersion,
          approved_by: user.id,
          approved_at: new Date().toISOString(),
          updated_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', setting.id)
    }
    
    await client.from('setting_audit_log').insert({
      organization_id: changeRequest.organization_id,
      branch_id: changeRequest.branch_id,
      setting_id: changeRequest.setting_id,
      change_request_id: changeRequestId,
      changed_by: user.id,
      change_type: action === 'approve' ? 'approve' : 'reject',
      version_no: action === 'approve' ? changeRequest.system_settings.version_no + 1 : null,
      old_value: changeRequest.system_settings?.value_json,
      new_value: action === 'approve' ? changeRequest.proposed_value_json : null,
      reason: reason || (action === 'approve' ? 'Disetujui' : 'Ditolak'),
      request_id: traceId,
    })
    
    return new Response(
      JSON.stringify(createSuccessResponse({
        change_request_id: changeRequestId,
        status: newStatus,
        decided_by: user.id,
        decided_at: new Date().toISOString(),
      }, traceId)),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    const statusCode = error instanceof AppError 
      ? error.code === ErrorCodes.UNAUTHORIZED ? 401 
      : error.code === ErrorCodes.FORBIDDEN ? 403 
      : error.code === ErrorCodes.NOT_FOUND ? 404 
      : error.code === ErrorCodes.INVALID_STATE ? 409 
      : 500 
      : 500
    
    return new Response(
      JSON.stringify(createErrorResponse(
        error instanceof AppError ? error.code : ErrorCodes.INTERNAL_ERROR,
        error instanceof Error ? error.message : 'Unknown error',
        false,
        traceId
      )),
      { status: statusCode, headers: { 'Content-Type': 'application/json' } }
    )
  }
}