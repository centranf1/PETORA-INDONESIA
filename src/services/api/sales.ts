import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import type { SalesTransaction, SaleItem, Payment, RefundRequest } from '@/types'

export function useSales() {
  return useQuery({
    queryKey: queryKeys.sales,
    queryFn: () => api.get<SalesTransaction[]>('/sales'),
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
    mutationFn: (data: any) =>
      api.post<SalesTransaction>('/sales', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sales })
      queryClient.invalidateQueries({ queryKey: queryKeys.stockLedger })
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