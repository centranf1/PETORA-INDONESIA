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
  requireBranchScope,
  requireSystemLock,
  checkOptimisticLock,
  validateStateTransition,
} from '../../../lib/validators/errors'
import { settingProposalSchema } from '../../../lib/validators/schemas'

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
  if (error || !user) {
    throw new AppError(ErrorCodes.UNAUTHORIZED, 'Token tidak valid', false)
  }
  
  const { data: appUser } = await client
    .from('users')
    .select('*')
    .eq('auth_user_id', user.id)
    .single()
  
  if (!appUser) {
    throw new AppError(ErrorCodes.UNAUTHORIZED, 'User tidak ditemukan', false)
  }
  
  const { data: roleAssignments } = await client
    .from('user_role_assignments')
    .select(`
      role_id,
      branch_id,
      roles (id, code, name, status, is_system)
    `)
    .eq('user_id', appUser.id)
    .eq('is_active', true)
  
  const roles = roleAssignments?.map(r => r.roles).filter(Boolean) || []
  const roleCodes = roles.map(r => r.code)
  
  const roleIds = roles.map(r => r.id)
  const { data: permissionData } = await client
    .from('role_permissions')
    .select(`
      permission_id,
      permissions (id, code, module, resource, action, scope)
    `)
    .in('role_id', roleIds)
  
  const permissions = permissionData?.map(p => p.permissions).filter(Boolean) || []
  
  return {
    client,
    user: appUser,
    roles,
    permissions,
    roleCodes,
    branchId: roleAssignments?.[0]?.branch_id || null,
    isSuperAdmin: roleCodes.includes('super_admin') || roleCodes.includes('owner'),
    canApprove: roleCodes.includes('super_admin') || roleCodes.includes('owner'),
  }
}

export default async function handler(req: Request): Promise<Response> {
  const traceId = generateTraceId()
  
  try {
    const authHeader = req.headers.get('Authorization')
    const ctx = await getAuthenticatedContext(authHeader)
    const { client, user, roleCodes, isSuperAdmin } = ctx
    
    if (!isSuperAdmin) {
      throw new AppError(ErrorCodes.FORBIDDEN, 'Hanya Super Admin yang dapat mengelola setting', false)
    }
    
    if (req.method !== 'POST') {
      throw new AppError(ErrorCodes.METHOD_NOT_ALLOWED, 'Method tidak diizinkan', false)
    }
    
    const body = await req.json()
    const validated = settingProposalSchema.parse(body)
    
    const { branch_id, setting_group, key, value, value_type, reason, expected_version_no } = validated
    
    if (branch_id) {
      requireBranchScope(ctx.branchId, branch_id, isSuperAdmin)
    }
    
    const { data: existingSetting } = await client
      .from('system_settings')
      .select('*')
      .eq('setting_group', setting_group)
      .eq('key', key)
      .eq(branch_id ? 'branch_id' : 'organization_id', branch_id || user.organization_id)
      .eq(branch_id ? 'branch_id' : 'organization_id', branch_id || user.organization_id)
      .maybeSingle()
    
    let settingId: string
    
    if (existingSetting) {
      requireSystemLock(existingSetting.is_system_locked, isSuperAdmin)
      checkOptimisticLock(existingSetting.version_no, expected_version_no || existingSetting.version_no)
      
      const { data: updated, error } = await client
        .from('system_settings')
        .update({
          value_json: { value },
          value_type,
          updated_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingSetting.id)
        .select()
        .single()
      
      if (error) throw new AppError(ErrorCodes.INTERNAL_ERROR, error.message, false)
      settingId = updated.id
    } else {
      const { data: newSetting, error } = await client
        .from('system_settings')
        .insert({
          organization_id: user.organization_id,
          branch_id: branch_id || null,
          setting_group,
          key,
          value_type,
          value_json: { value },
          default_value_json: { value },
          is_active: true,
          is_system_locked: false,
          requires_approval: false,
          created_by: user.id,
          updated_by: user.id,
        })
        .select()
        .single()
      
      if (error) throw new AppError(ErrorCodes.INTERNAL_ERROR, error.message, false)
      settingId = newSetting.id
    }
    
    const { data: changeRequest, error: crError } = await client
      .from('setting_change_requests')
      .insert({
        organization_id: user.organization_id,
        branch_id: branch_id || null,
        setting_id: settingId,
        proposed_value_json: { value },
        expected_version_no: expected_version_no || 1,
        status: 'applied',
        requires_approval: false,
        requested_by: user.id,
        reason,
        applied_version_no: 1,
      })
      .select()
      .single()
    
    if (crError) throw new AppError(ErrorCodes.INTERNAL_ERROR, crError.message, false)
    
    await client.from('setting_audit_log').insert({
      organization_id: user.organization_id,
      branch_id: branch_id || null,
      setting_id: settingId,
      change_request_id: changeRequest.id,
      changed_by: user.id,
      change_type: 'propose',
      version_no: 1,
      old_value: existingSetting?.value_json || null,
      new_value: { value },
      reason,
      request_id: traceId,
    })
    
    return new Response(
      JSON.stringify(createSuccessResponse({
        setting_id: settingId,
        change_request_id: changeRequest.id,
        status: 'applied',
        version_no: 1,
      }, traceId)),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    const statusCode = error instanceof AppError 
      ? error.code === ErrorCodes.UNAUTHORIZED ? 401 
      : error.code === ErrorCodes.FORBIDDEN ? 403 
      : error.code === ErrorCodes.VALIDATION_ERROR ? 400 
      : error.code === ErrorCodes.SYSTEM_LOCKED ? 423 
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