import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

function createSupabaseServerClient(token?: string) {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Supabase URL and key are required')
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  })
}

export function createSupabaseAdmin() {
  return createSupabaseServerClient()
}

export function createSupabaseClient(token?: string) {
  return createSupabaseServerClient(token)
}

export async function authenticateUser(token: string) {
  const client = createSupabaseClient(token)
  const { data: { user }, error } = await client.auth.getUser(token)

  if (error || !user) {
    throw new Error('Invalid token')
  }

  return user
}

export async function getUserContext(authUserId: string) {
  const client: any = createSupabaseAdmin()

  const { data: appUser, error: userError } = await client
    .from('users')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single()

  if (userError || !appUser) {
    throw new Error('User not found in application context')
  }

  const { data: organization } = await client
    .from('organizations')
    .select('*')
    .eq('id', appUser.organization_id)
    .single()

  const { data: roleAssignments } = await client
    .from('user_role_assignments')
    .select(`
      role_id,
      branch_id,
      roles (
        id,
        code,
        name,
        status,
        is_system
      )
    `)
    .eq('user_id', appUser.id)
    .eq('is_active', true)

  const roles = (roleAssignments ?? []).map((r: any) => r.roles).filter(Boolean)
  const roleCodes = roles.map((r: any) => r.code)

  const roleIds = roles.map((r: any) => r.id)
  const { data: permissionData } = await client
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
    .in('role_id', roleIds)

  const permissions = (permissionData ?? []).map((p: any) => p.permissions).filter(Boolean)

  return {
    user: appUser,
    organization: organization || null,
    roles,
    permissions,
    roleCodes,
    branchId: roleAssignments?.[0]?.branch_id || null,
  }
}

export function hasPermission(
  permissions: any[],
  module: string,
  resource: string,
  action: string,
  scope?: string
): boolean {
  return permissions.some(p => 
    p.module === module && 
    p.resource === resource && 
    p.action === action &&
    (!scope || p.scope === scope || p.scope === 'all')
  )
}

export function canAccessBranch(
  userBranchId: string | null,
  requestedBranchId: string,
  roleCodes: string[]
): boolean {
  if (roleCodes.includes('super_admin') || roleCodes.includes('owner')) {
    return true
  }
  return userBranchId === requestedBranchId
}