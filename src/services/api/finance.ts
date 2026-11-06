import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import type { JournalEntry, JournalLine, Account, FinanceTransaction, AuditLog } from '@/types'

export function useAccounts() {
  return useQuery({
    queryKey: [...queryKeys.payroll, 'accounts'],
    queryFn: () => api.get<Account[]>('/finance/accounts'),
  })
}

export function useJournalEntries(params?: { status?: string }) {
  return useQuery({
    queryKey: [...queryKeys.payroll, 'journal'],
    queryFn: () => api.get<JournalEntry[]>('/finance/journal-entries', { params }),
  })
}

export function useJournalLines(entryId: string) {
  return useQuery({
    queryKey: [...queryKeys.payroll, 'journal', entryId, 'lines'],
    queryFn: () => api.get<JournalLine[]>(`/finance/journal-entries/${entryId}/lines`),
    enabled: !!entryId,
  })
}

export function useFinanceTransactions() {
  return useQuery({
    queryKey: [...queryKeys.payroll, 'transactions'],
    queryFn: () => api.get<FinanceTransaction[]>('/finance/transactions'),
  })
}

export function useAuditLogs(params?: { entityType?: string; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.auditLogs,
    queryFn: () => api.get<AuditLog[]>('/audit-logs', { params }),
  })
}

export function useCreateJournalEntry() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: any) =>
      api.post<JournalEntry>('/finance/journal-entries', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.payroll, 'journal'] })
    },
  })
}

export function usePostJournalEntry() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.post<JournalEntry>(`/finance/journal-entries/${id}/post`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.payroll, 'journal'] })
    },
  })
}