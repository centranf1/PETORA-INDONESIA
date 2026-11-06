import { useQuery } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'

export function useReports() {
  return useQuery({
    queryKey: queryKeys.reports,
    queryFn: () => api.get<any[]>('/reports'),
  })
}

export function useReportData(reportCode: string, params?: Record<string, any>) {
  return useQuery({
    queryKey: [...queryKeys.reports, reportCode, params],
    queryFn: () => api.get<any>(`/reports/${reportCode}`, { params }),
    enabled: !!reportCode,
  })
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: [...queryKeys.reports, 'dashboard'],
    queryFn: () => api.get<any>('/reports/dashboard'),
  })
}

export function useSalesReport(params?: { startDate?: string; endDate?: string; branchId?: string }) {
  return useQuery({
    queryKey: [...queryKeys.reports, 'sales', params],
    queryFn: () => api.get<any>('/reports/sales', { params }),
  })
}

export function useInventoryReport(params?: { branchId?: string }) {
  return useQuery({
    queryKey: [...queryKeys.reports, 'inventory', params],
    queryFn: () => api.get<any>('/reports/inventory', { params }),
  })
}