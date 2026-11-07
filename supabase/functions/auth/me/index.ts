import { createBackendClient } from '../../_shared/supabase.ts'
import { generateTraceId, createSuccessResponse, createErrorResponse } from '../../../../src/lib/validators/errors.ts'

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
    
    const client = createBackendClient()
    
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

    if (!appUser || appUser.status !== 'active') {
      return new Response(
        JSON.stringify(createErrorResponse('FORBIDDEN', 'Akun aplikasi tidak aktif', false, traceId)),
        { status: 403, headers: { 'Content-Type': 'application/json' } },
      )
    }
    
    const { data: organization, error: organizationError } = await client
      .from('organizations')
      .select('*')
      .eq('id', appUser.organization_id)
      .single()

    if (organizationError || !organization || organization.status !== 'active') {
      return new Response(
        JSON.stringify(createErrorResponse('FORBIDDEN', 'Organisasi tidak tersedia', false, traceId)),
        { status: 403, headers: { 'Content-Type': 'application/json' } },
      )
    }
    
    const { data: roleAssignments, error: assignmentError } = await client
      .from('user_role_assignments')
      .select(`
        organization_id,
        role_id,
        branch_id,
        is_active,
        active_from,
        active_until,
        roles (
          id,
          organization_id,
          code,
          name,
          status
        )
      `)
      .eq('user_id', appUser.id)
      .eq('organization_id', appUser.organization_id)

    if (assignmentError) throw assignmentError

    const now = Date.now()
    const assignmentRoles = (assignment: (typeof roleAssignments)[number]) =>
      Array.isArray(assignment.roles) ? assignment.roles : assignment.roles ? [assignment.roles] : []
    const activeAssignments = (roleAssignments ?? []).filter(assignment =>
      assignment.is_active &&
      (!assignment.active_from || Date.parse(assignment.active_from) <= now) &&
      (!assignment.active_until || Date.parse(assignment.active_until) > now) &&
      assignmentRoles(assignment).some(role =>
        role.status === 'active' && role.organization_id === appUser.organization_id
      )
    )
    const roles = activeAssignments.flatMap(assignmentRoles)
      .filter(role => role.status === 'active' && role.organization_id === appUser.organization_id)

    if (roles.length === 0) {
      return new Response(
        JSON.stringify(createErrorResponse('FORBIDDEN', 'Akun tidak memiliki penugasan aktif', false, traceId)),
        { status: 403, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const roleCodes = roles.map(r => r.code)
    
    const roleIds = roles.map(r => r.id)
    const { data: permissionData, error: permissionError } = roleIds.length > 0 ? await client
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

    if (permissionError) throw permissionError
    
    const permissions = permissionData?.flatMap(p => p.permissions) || []
    const branchIds = [...new Set(activeAssignments.map(assignment => assignment.branch_id).filter(Boolean))]
    const { data: branches, error: branchError } = branchIds.length > 0 ? await client
      .from('branches')
      .select('*')
      .eq('organization_id', appUser.organization_id)
      .in('id', branchIds)
      .eq('status', 'active') : { data: [], error: null }

    if (branchError) throw branchError
    const branch = branches?.length === 1 ? branches[0] : null
    
    return new Response(
      JSON.stringify(createSuccessResponse({
        user: appUser,
        organization,
        branch,
        roles,
        permissions,
        role_codes: roleCodes,
        branch_id: branch?.id ?? null,
        assigned_branch_ids: branches?.map(item => item.id) ?? [],
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