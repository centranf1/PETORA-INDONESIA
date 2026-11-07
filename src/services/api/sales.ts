import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import { mockSales } from '@/lib/mockData'
import { createDemoSale, getDemoSales, type DemoCheckoutInput } from '@/lib/demoSales'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { useAuth } from '@/app/providers/AuthProvider'
import type { SalesTransaction, SaleItem, Payment, RefundRequest } from '@/types'

export function useSales() {
  const { user, organization, assignedBranchIds, permissions } = useAuth()
  const permissionScope = permissions
    .map(permission => `${permission.module}.${permission.resource}.${permission.action}.${permission.scope}`)
    .sort()
    .join('|')

  return useQuery({
    queryKey: [...queryKeys.sales, user?.id ?? null, organization?.id ?? null, [...assignedBranchIds].sort().join('|'), permissionScope],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        return getDemoSales()
      }

      const { data, error } = await supabase.functions.invoke<{
        data: SalesTransaction[]
        meta: { trace_id: string; next_cursor: string | null }
      }>('sales-list', { method: 'GET' })

      if (error) throw error
      if (!data || !Array.isArray(data.data)) throw new Error('Respons daftar transaksi tidak valid')
      return data.data
    },
  })
}

export function useSale(id: string) {
  return useQuery({
    queryKey: queryKeys.sale(id),
    queryFn: () => api.get<SalesTransaction>(`/sales/${id}`),
    enabled: !!id,
  })
}

export function useSaleItems(saleId: string) {
  return useQuery({
    queryKey: [...queryKeys.sale(saleId), 'items'],
    queryFn: () => api.get<SaleItem[]>(`/sales/${saleId}/items`),
    enabled: !!saleId,
  })
}

export function usePayments(saleId?: string) {
  return useQuery({
    queryKey: queryKeys.payments,
    queryFn: () => api.get<Payment[]>(`/payments${saleId ? `?sale_id=${saleId}` : ''}`),
  })
}

export function useCreateSale() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: DemoCheckoutInput) => {
      if (isSupabaseConfigured) {
        throw new Error('Checkout backend belum tersedia; transaksi tidak disimpan')
      }

      return createDemoSale(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sales })
    },
  })
}

export function useCreatePayment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: any) =>
      api.post<Payment>('/payments', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payments })
      queryClient.invalidateQueries({ queryKey: queryKeys.sales })
    },
  })
}

export function useCreateRefund() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: any) =>
      api.post<RefundRequest>('/refunds', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sales })
    },
  })
}