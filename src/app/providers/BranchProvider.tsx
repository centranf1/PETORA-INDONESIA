import React, { createContext, useContext, useState } from 'react'

interface BranchContextValue {
  selectedBranchId: string | null
  setSelectedBranchId: (id: string | null) => void
  branchContext: { organizationId: string | null; branchId: string | null }
}

const BranchContext = createContext<BranchContextValue | null>(null)

export function BranchProvider({ children }: { children: React.ReactNode }) {
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null)
  
  const value: BranchContextValue = {
    selectedBranchId,
    setSelectedBranchId,
    branchContext: { organizationId: null, branchId: selectedBranchId },
  }
  
  return (
    <BranchContext.Provider value={value}>
      {children}
    </BranchContext.Provider>
  )
}

export function useBranchContext() {
  const context = useContext(BranchContext)
  if (!context) {
    throw new Error('useBranchContext must be used within BranchProvider')
  }
  return context
}