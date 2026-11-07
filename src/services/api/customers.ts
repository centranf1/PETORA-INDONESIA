import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import { mockCustomers, mockPets } from '@/lib/mockData'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { useAuth } from '@/app/providers/AuthProvider'
import type { Customer, Pet, PetOwner } from '@/types'

export function useCustomers() {
  const { user, organization, assignedBranchIds, permissions } = useAuth()
  const permissionScope = permissions
    .map(permission => `${permission.module}.${permission.resource}.${permission.action}.${permission.scope}`)
    .sort()
    .join('|')

  return useQuery({
    queryKey: [...queryKeys.customers, user?.id ?? null, organization?.id ?? null, [...assignedBranchIds].sort().join('|'), permissionScope],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        return mockCustomers
      }

      const { data, error } = await supabase.functions.invoke<{
        data: Customer[]
        meta: { trace_id: string; next_cursor: string | null }
      }>('customers-list', { method: 'GET' })

      if (error) throw error
      if (!data || !Array.isArray(data.data)) throw new Error('Respons daftar customer tidak valid')
      return data.data
    },
  })
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: queryKeys.customer(id),
    queryFn: async () => {
      try {
        return await api.get<Customer>(`/customers/${id}`)
      } catch {
        return mockCustomers.find(customer => customer.id === id) ?? mockCustomers[0]
      }
    },
    enabled: !!id,
  })
}

export function useCreateCustomer() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<Customer>) =>
      api.post<Customer>('/customers', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customers })
    },
  })
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Customer> }) =>
      api.patch<Customer>(`/customers/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.customer(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.customers })
    },
  })
}

export function usePets() {
  return useQuery({
    queryKey: queryKeys.pets,
    queryFn: async () => {
      try {
        return await api.get<Pet[]>('/pets')
      } catch {
        return mockPets
      }
    },
  })
}

export function usePet(id: string) {
  return useQuery({
    queryKey: queryKeys.pet(id),
    queryFn: async () => {
      try {
        return await api.get<Pet>(`/pets/${id}`)
      } catch {
        return mockPets.find(pet => pet.id === id) ?? mockPets[0]
      }
    },
    enabled: !!id,
  })
}

export function useCreatePet() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<Pet>) =>
      api.post<Pet>('/pets', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pets })
    },
  })
}

export function usePetOwners(petId: string) {
  return useQuery({
    queryKey: [...queryKeys.pet(petId), 'owners'],
    queryFn: () => api.get<PetOwner[]>(`/pets/${petId}/owners`),
    enabled: !!petId,
  })
}