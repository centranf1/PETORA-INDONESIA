import { useBranchContext } from '@/app/providers/BranchProvider'
import { useAuth } from '@/app/providers/AuthProvider'

export function useBranchScope() {
  const auth = useAuth()
  const branchContext = useBranchContext()
  
  const branches = auth.roles.length > 0 ? [] : []
  
  return {
    selectedBranchId: branchContext.selectedBranchId,
    setSelectedBranchId: branchContext.setSelectedBranchId,
    organizationId: auth.organization?.id || null,
    availableBranches: branches,
  }
}