import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { AuthContext, User, Organization, Branch, Role, Permission } from '@/types'
import { useSupabase } from './SupabaseProvider'

const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { supabase: sb } = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any | null>(null)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [branch, setBranch] = useState<Branch | null>(null)
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshSession = useCallback(async () => {
    try {
      const { data: { session: currentSession } } = await sb.auth.getSession()
      setSession(currentSession)
      
      if (currentSession?.user) {
        const { data: userData } = await sb
          .from('users')
          .select('*')
          .eq('auth_user_id', currentSession.user.id)
          .single()
        
        if (userData) {
          setUser(userData)
          
          const { data: orgData } = await sb
            .from('organizations')
            .select('*')
            .eq('id', userData.organization_id)
            .single()
          
          if (orgData) setOrganization(orgData)
          
          const { data: roleData } = await sb
            .from('user_role_assignments')
            .select('role_id, roles(*)')
            .eq('user_id', userData.id)
            .eq('is_active', true)
          
          if (roleData) {
            const rolesList = roleData.map((r: any) => r.roles).filter(Boolean)
            setRoles(rolesList)
            
            const roleIds = rolesList.map((r: Role) => r.id)
            const { data: permData } = await sb
              .from('role_permissions')
              .select('permission_id, permissions(*)')
              .in('role_id', roleIds)
            
            if (permData) {
              const permList = permData.map((p: any) => p.permissions).filter(Boolean)
              setPermissions(permList)
            }
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh session')
    } finally {
      setLoading(false)
    }
  }, [sb])

  useEffect(() => {
    refreshSession()

    const { data: { subscription } } = sb.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        refreshSession()
      }
    })

    return () => subscription.unsubscribe()
  }, [refreshSession, sb])

  const hasPermission = (
    module: string,
    resource: string,
    action: string,
    scope?: string
  ): boolean => {
    return permissions.some(p => 
      p.module === module &&
      p.resource === resource &&
      p.action === action &&
      (!scope || p.scope === scope || p.scope === 'all')
    )
  }

  const value: AuthContext = {
    user,
    session,
    organization,
    branch,
    roles,
    permissions,
    hasPermission,
    refreshSession,
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}