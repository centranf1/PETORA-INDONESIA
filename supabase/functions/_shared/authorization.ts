import { createBackendClient } from './supabase.ts'

export class AuthorizationError extends Error {
  constructor(
    public readonly status: 401 | 403,
    public readonly code: 'UNAUTHORIZED' | 'FORBIDDEN',
    message: string,
  ) {
    super(message)
    this.name = 'AuthorizationError'
  }
}

export interface ReadAuthorizationScope {
  client: any
  userId: string
  organizationId: string
  branchIds: Set<string>
  organizationWide: boolean
}

export async function resolveReadAuthorization(
  request: Request,
  module: string,
  resource: string,
): Promise<ReadAuthorizationScope> {
  const authorization = request.headers.get('Authorization')
  if (!authorization?.startsWith('Bearer ')) {
    throw new AuthorizationError(401, 'UNAUTHORIZED', 'Autentikasi diperlukan')
  }

  const token = authorization.slice('Bearer '.length)
  const client: any = createBackendClient(token)
  const { data: { user: authUser }, error: authError } = await client.auth.getUser(token)
  if (authError || !authUser) {
    throw new AuthorizationError(401, 'UNAUTHORIZED', 'Token tidak valid')
  }

  const { data: appUser, error: appUserError } = await client
    .from('users')
    .select('id,organization_id,status')
    .eq('auth_user_id', authUser.id)
    .single()
  if (appUserError || !appUser || appUser.status !== 'active') {
    throw new AuthorizationError(403, 'FORBIDDEN', 'Akun tidak memiliki akses')
  }

  const { data: organization, error: organizationError } = await client
    .from('organizations')
    .select('id,status')
    .eq('id', appUser.organization_id)
    .single()
  if (organizationError || !organization || organization.status !== 'active') {
    throw new AuthorizationError(403, 'FORBIDDEN', 'Akun tidak memiliki akses')
  }

  const { data: assignments, error: assignmentError } = await client
    .from('user_role_assignments')
    .select('organization_id,role_id,branch_id,is_active,active_from,active_until,roles(id,organization_id,status)')
    .eq('organization_id', appUser.organization_id)
    .eq('user_id', appUser.id)
    .eq('is_active', true)
  if (assignmentError) throw assignmentError

  const now = Date.now()
  const assignmentRoles = (assignment: any) =>
    Array.isArray(assignment.roles) ? assignment.roles : assignment.roles ? [assignment.roles] : []
  const activeAssignments = (assignments ?? []).filter((assignment: any) =>
    (!assignment.active_from || Date.parse(assignment.active_from) <= now) &&
    (!assignment.active_until || Date.parse(assignment.active_until) > now) &&
    assignmentRoles(assignment).some((role: any) =>
      role.status === 'active' && role.organization_id === appUser.organization_id
    )
  )
  const roleIds = [...new Set(activeAssignments.map((assignment: any) => assignment.role_id))]
  if (roleIds.length === 0) {
    throw new AuthorizationError(403, 'FORBIDDEN', 'Akun tidak memiliki assignment role aktif')
  }

  const { data: rolePermissions, error: permissionError } = await client
    .from('role_permissions')
    .select('organization_id,role_id,permissions(module,resource,action,scope)')
    .eq('organization_id', appUser.organization_id)
    .in('role_id', roleIds)
  if (permissionError) throw permissionError

  const grants = (rolePermissions ?? []).flatMap((row: any) => {
    const permissions = Array.isArray(row.permissions) ? row.permissions : row.permissions ? [row.permissions] : []
    return permissions
      .filter((permission: any) =>
        permission.module === module &&
        permission.resource === resource &&
        permission.action === 'view' &&
        ['branch', 'all'].includes(permission.scope)
      )
      .map((permission: any) => ({ roleId: row.role_id, scope: permission.scope }))
  })

  const branchIds = new Set<string>()
  let organizationWide = false
  for (const assignment of activeAssignments as any[]) {
    for (const grant of grants.filter((item: { roleId: string; scope: string }) => item.roleId === assignment.role_id)) {
      if (assignment.branch_id) branchIds.add(assignment.branch_id)
      else if (grant.scope === 'all') organizationWide = true
    }
  }

  if (!organizationWide && branchIds.size === 0) {
    throw new AuthorizationError(403, 'FORBIDDEN', 'Permission tidak diberikan pada scope yang dapat digunakan')
  }

  return {
    client,
    userId: appUser.id,
    organizationId: appUser.organization_id,
    branchIds,
    organizationWide,
  }
}