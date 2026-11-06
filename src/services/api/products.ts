import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import type { Product, ProductPrice, InventoryLocation, StockLedger, Supplier } from '@/types'

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: () => api.get<Product[]>('/products'),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => api.get<Product>(`/products/${id}`),
    enabled: !!id,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<Product>) =>
      api.post<Product>('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products })
    },
  })
}

export function useProductPrices(productId?: string) {
  return useQuery({
    queryKey: [...queryKeys.products, 'prices', productId],
    queryFn: () => api.get<ProductPrice[]>(`/products/${productId}/prices`),
    enabled: !!productId,
  })
}

export function useInventoryLocations() {
  return useQuery({
    queryKey: queryKeys.inventory,
    queryFn: () => api.get<InventoryLocation[]>('/inventory/locations'),
  })
}

export function useStockLedger(params?: { locationId?: string; productId?: string }) {
  return useQuery({
    queryKey: queryKeys.stockLedger,
    queryFn: () => api.get<StockLedger[]>('/inventory/ledger', { params }),
  })
}

export function useSuppliers() {
  return useQuery({
    queryKey: queryKeys.suppliers,
    queryFn: () => api.get<Supplier[]>('/suppliers'),
  })
}

export function useCreateSupplier() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<Supplier>) =>
      api.post<Supplier>('/suppliers', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.suppliers })
    },
  })
}