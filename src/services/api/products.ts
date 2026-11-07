import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import { mockInventoryLocations, mockProducts, mockStockLedger } from '@/lib/mockData'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { useAuth } from '@/app/providers/AuthProvider'
import type { Product, ProductPrice, InventoryLocation, StockLedger, Supplier } from '@/types'

export function useProductCatalog() {
  const { user, organization, assignedBranchIds, permissions } = useAuth()
  const permissionScope = permissions
    .map(permission => `${permission.module}.${permission.resource}.${permission.action}.${permission.scope}`)
    .sort()
    .join('|')

  return useQuery({
    queryKey: [...queryKeys.products, 'catalog', user?.id ?? null, organization?.id ?? null, [...assignedBranchIds].sort().join('|'), permissionScope],
    queryFn: async () => {
      if (!isSupabaseConfigured) return mockProducts

      const { data, error } = await supabase.functions.invoke<{
        data: Product[]
        meta: { trace_id: string; next_cursor: string | null }
      }>('products-list', { method: 'GET' })

      if (error) throw error
      if (!data || !Array.isArray(data.data)) throw new Error('Respons katalog produk tidak valid')
      return data.data
    },
  })
}

export function useDemoProducts() {
  return useQuery({
    queryKey: [...queryKeys.products, 'demo-pos'],
    queryFn: () => mockProducts,
    enabled: !isSupabaseConfigured,
  })
}

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: async () => {
      try {
        return await api.get<Product[]>('/products')
      } catch {
        return mockProducts
      }
    },
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: async () => {
      try {
        return await api.get<Product>(`/products/${id}`)
      } catch {
        return mockProducts.find(product => product.id === id) ?? mockProducts[0]
      }
    },
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
  const { user, organization, assignedBranchIds, permissions } = useAuth()
  const permissionScope = permissions
    .map(permission => `${permission.module}.${permission.resource}.${permission.action}.${permission.scope}`)
    .sort()
    .join('|')

  return useQuery({
    queryKey: [...queryKeys.inventory, 'locations', user?.id ?? null, organization?.id ?? null, [...assignedBranchIds].sort().join('|'), permissionScope],
    queryFn: async () => {
      if (!isSupabaseConfigured) return mockInventoryLocations

      const { data, error } = await supabase.functions.invoke<{
        data: InventoryLocation[]
        meta: { trace_id: string; next_cursor: string | null }
      }>('inventory-locations', { method: 'GET' })

      if (error) throw error
      if (!data || !Array.isArray(data.data)) throw new Error('Respons lokasi inventori tidak valid')
      return data.data
    },
  })
}

export function useStockLedger(params?: { locationId?: string; productId?: string }) {
  const { user, organization, assignedBranchIds } = useAuth()

  return useQuery({
    queryKey: [...queryKeys.stockLedger, user?.id ?? null, organization?.id ?? null, [...assignedBranchIds].sort().join('|'), params],
    queryFn: async () => {
      if (isSupabaseConfigured) {
        throw new Error('Endpoint stock ledger live belum tersedia')
      }

      try {
        return mockStockLedger
      } catch {
        return mockStockLedger
      }
    },
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