import { useAuth } from '@/app/providers/AuthProvider'
import { useBranchContext } from '@/app/providers/BranchProvider'

export function useAuthContext() {
  return useAuth()
}

export function useTenantScope() {
  const auth = useAuth()
  const branchContext = useBranchContext()
  
  return {
    organizationId: auth.organization?.id || null,
    branchId: branchContext.selectedBranchId || auth.branch?.id || null,
    organization: auth.organization,
    branch: auth.branch,
    roles: auth.roles,
    permissions: auth.permissions,
    hasPermission: auth.hasPermission,
  }
}

export function usePermission(module: string, resource: string, action: string) {
  const { hasPermission } = useAuth()
  return hasPermission(module, resource, action)
}