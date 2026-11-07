import { describe, expect, it } from 'vitest'
import { authenticateDemo, hasDemoPermission } from '@/lib/demoAuth'

describe('demo auth', () => {
  it('accepts the seeded admin demo login', () => {
    const session = authenticateDemo('admin@petora.local', 'password123')

    expect(session.user.email).toBe('admin@petora.local')
    expect(session.organization.name).toBe('PETORA HQ')
    expect(session.roles.some(role => role.code === 'admin')).toBe(true)
  })

  it('grants permissions for the admin role', () => {
    const session = authenticateDemo('admin@petora.local', 'password123')

    expect(hasDemoPermission(session, 'sales', 'transactions', 'view', 'all')).toBe(true)
    expect(hasDemoPermission(session, 'inventory', 'stock', 'update', 'branch')).toBe(true)
  })
})
