export interface Organization {
  id: string
  code: string
  name: string
  status: 'active' | 'inactive'
  default_timezone: string
  created_at: string
  updated_at: string
}

export interface Branch {
  id: string
  organization_id: string
  code: string
  name: string
  status: 'active' | 'inactive'
  timezone: string
  address?: string
  phone?: string
  email?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  organization_id: string
  auth_user_id: string
  full_name: string
  email: string
  phone?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface Role {
  id: string
  organization_id: string
  code: string
  name: string
  status: 'active' | 'inactive'
  is_system: boolean
  description?: string
  created_at: string
  updated_at: string
}

export interface Permission {
  id: string
  code: string
  module: string
  resource: string
  action: 'view' | 'create' | 'update' | 'approve' | 'export' | 'delete'
  scope: 'own' | 'branch' | 'all' | 'assigned_records'
  description?: string
}

export interface RolePermission {
  organization_id: string
  role_id: string
  permission_id: string
  created_at: string
}

export interface UserRoleAssignment {
  id: string
  organization_id: string
  user_id: string
  role_id: string
  branch_id?: string | null
  assigned_by?: string | null
  active_from?: string | null
  active_until?: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AuthContext {
  user: User | null
  session: any | null
  organization: Organization | null
  branch: Branch | null
  assignedBranchIds: string[]
  roles: Role[]
  permissions: Permission[]
  loading: boolean
  error: string | null
  hasPermission: (module: string, resource: string, action: string, scope?: string) => boolean
  refreshSession: () => Promise<void>
  signOut: () => Promise<void>
}