import { useQuery } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import { getSalesSummary, mockCustomers, mockProducts, mockSales } from '@/lib/mockData'

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
    queryFn: async () => {
      try {
        return await api.get<any>('/reports/dashboard')
      } catch {
        const summary = getSalesSummary(mockSales)

        return {
          totalRevenue: summary.totalRevenue,
          totalCustomers: mockCustomers.length,
          totalProducts: mockProducts.length,
          todayRevenue: summary.totalRevenue,
          alerts: mockProducts.filter(product => Number(product.stock ?? 0) <= 5).length,
        }
      }
    },
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