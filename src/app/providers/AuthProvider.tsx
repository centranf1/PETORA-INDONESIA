import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import {
  authenticateDemo,
  clearDemoSession,
  createDemoSession,
  getStoredDemoSession,
  hasDemoPermission,
  saveDemoSession,
} from '@/lib/demoAuth'
import type { AuthContext, User, Organization, Branch, Role, Permission } from '@/types'
import { useSupabase } from './SupabaseProvider'

const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { supabase: sb } = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any | null>(null)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [branch, setBranch] = useState<Branch | null>(null)
  const [assignedBranchIds, setAssignedBranchIds] = useState<string[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refreshSession = useCallback(async () => {
    try {
      if (!isSupabaseConfigured) {
        const demoSession = getStoredDemoSession() ?? createDemoSession()
        saveDemoSession(demoSession)

        setSession({ user: demoSession.user, provider: 'demo' })
        setUser(demoSession.user)
        setOrganization(demoSession.organization)
        setBranch(demoSession.branch)
        setAssignedBranchIds([demoSession.branch.id])
        setRoles(demoSession.roles)
        setPermissions(demoSession.permissions)
        setError(null)
        return
      }

      const client: any = sb
      const { data: { session: currentSession } } = await client.auth.getSession()
      setSession(currentSession)
      
      if (currentSession?.user) {
        const { data: contextResponse, error: contextError } = await client.functions.invoke('auth-me')

        if (contextError) throw contextError

        const context = contextResponse?.data
        if (!context?.user || !context.organization) {
          throw new Error('Konteks akun PETORA tidak tersedia')
        }

        setUser(context.user)
        setOrganization(context.organization)
        setBranch(context.branch ?? null)
        setAssignedBranchIds(context.assigned_branch_ids ?? [])
        setRoles(context.roles ?? [])
        setPermissions(context.permissions ?? [])
      } else {
        setUser(null)
        setOrganization(null)
        setBranch(null)
        setAssignedBranchIds([])
        setRoles([])
        setPermissions([])
      }
    } catch (err) {
      setUser(null)
      setOrganization(null)
      setBranch(null)
      setAssignedBranchIds([])
      setRoles([])
      setPermissions([])
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
    if (!isSupabaseConfigured) {
      return hasDemoPermission({
        user: user ?? createDemoSession().user,
        organization: organization ?? createDemoSession().organization,
        branch: branch ?? createDemoSession().branch,
        roles: roles.length ? roles : createDemoSession().roles,
        permissions: permissions.length ? permissions : createDemoSession().permissions,
      }, module, resource, action, scope)
    }

    return permissions.some(p => 
      p.module === module &&
      p.resource === resource &&
      p.action === action &&
      (!scope || p.scope === scope || p.scope === 'all')
    )
  }

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) {
      clearDemoSession()
      setUser(null)
      setSession(null)
      setOrganization(null)
      setBranch(null)
      setAssignedBranchIds([])
      setRoles([])
      setPermissions([])
      return
    }

    await sb.auth.signOut()
    setUser(null)
    setSession(null)
    setOrganization(null)
    setBranch(null)
    setRoles([])
    setPermissions([])
  }, [sb])

  const value: AuthContext = {
    user,
    session,
    organization,
    branch,
    assignedBranchIds,
    roles,
    permissions,
    loading,
    error,
    hasPermission,
    refreshSession,
    signOut,
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