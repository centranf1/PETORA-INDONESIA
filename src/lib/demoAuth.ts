import type { Branch, Organization, Permission, Role, User } from '@/types'

export interface DemoAuthSession {
  user: User
  organization: Organization
  branch: Branch
  roles: Role[]
  permissions: Permission[]
}

export const DEMO_CREDENTIALS = {
  email: 'admin@petora.local',
  password: 'password123',
}

const demoOrganization: Organization = {
  id: 'org-demo',
  code: 'PETORA',
  name: 'PETORA HQ',
  status: 'active',
  default_timezone: 'Asia/Jakarta',
  created_at: '2026-01-01T00:00:00.000Z',
  updated_at: '2026-01-01T00:00:00.000Z',
}

const demoBranch: Branch = {
  id: 'branch-demo',
  organization_id: 'org-demo',
  code: 'HQ',
  name: 'Cabang Pusat',
  status: 'active',
  timezone: 'Asia/Jakarta',
  address: 'Jl. Merdeka No. 1, Jakarta',
  phone: '021-5551234',
  email: 'ops@petora.local',
  created_at: '2026-01-01T00:00:00.000Z',
  updated_at: '2026-01-01T00:00:00.000Z',
}

const demoUser: User = {
  id: 'user-demo-admin',
  organization_id: 'org-demo',
  auth_user_id: 'auth-demo-admin',
  full_name: 'Administrator PETORA',
  email: 'admin@petora.local',
  phone: '081234567890',
  status: 'active',
  created_at: '2026-01-01T00:00:00.000Z',
  updated_at: '2026-01-01T00:00:00.000Z',
}

const demoRoles: Role[] = [
  {
    id: 'role-admin',
    organization_id: 'org-demo',
    code: 'admin',
    name: 'Administrator',
    status: 'active',
    is_system: true,
    description: 'Akses penuh ke operasional PETORA',
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
]

const demoPermissions: Permission[] = [
  { id: 'perm-sales-view', code: 'sales_view', module: 'sales', resource: 'transactions', action: 'view', scope: 'all', description: 'View sales transactions' },
  { id: 'perm-sales-create', code: 'sales_create', module: 'sales', resource: 'transactions', action: 'create', scope: 'all', description: 'Create sales transactions' },
  { id: 'perm-inventory-view', code: 'inventory_view', module: 'inventory', resource: 'stock', action: 'view', scope: 'branch', description: 'View inventory' },
  { id: 'perm-inventory-update', code: 'inventory_update', module: 'inventory', resource: 'stock', action: 'update', scope: 'branch', description: 'Update inventory' },
  { id: 'perm-customers-view', code: 'customers_view', module: 'customers', resource: 'records', action: 'view', scope: 'all', description: 'View customer records' },
  { id: 'perm-products-view', code: 'products_view', module: 'products', resource: 'catalog', action: 'view', scope: 'all', description: 'View product catalog' },
  { id: 'perm-finance-view', code: 'finance_view', module: 'finance', resource: 'ledger', action: 'view', scope: 'all', description: 'View finance ledger' },
  { id: 'perm-settings-view', code: 'settings_view', module: 'settings', resource: 'system', action: 'view', scope: 'all', description: 'View system settings' },
]

export function createDemoSession(): DemoAuthSession {
  return {
    user: demoUser,
    organization: demoOrganization,
    branch: demoBranch,
    roles: demoRoles,
    permissions: demoPermissions,
  }
}

export function authenticateDemo(email: string, password: string): DemoAuthSession {
  const normalizedEmail = email.trim().toLowerCase()

  if (normalizedEmail !== DEMO_CREDENTIALS.email || password !== DEMO_CREDENTIALS.password) {
    throw new Error('Email atau kata sandi demo tidak valid')
  }

  return createDemoSession()
}

export function getStoredDemoSession(): DemoAuthSession | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem('petora-demo-session')
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as DemoAuthSession
  } catch {
    window.localStorage.removeItem('petora-demo-session')
    return null
  }
}

export function saveDemoSession(session: DemoAuthSession) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('petora-demo-session', JSON.stringify(session))
  }
}

export function clearDemoSession() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('petora-demo-session')
  }
}

export function hasDemoPermission(
  session: DemoAuthSession | null,
  module: string,
  resource: string,
  action: string,
  scope?: string,
) {
  return (session?.permissions ?? []).some(permission =>
    permission.module === module &&
    permission.resource === resource &&
    permission.action === action &&
    (!scope || permission.scope === scope || permission.scope === 'all')
  )
}
