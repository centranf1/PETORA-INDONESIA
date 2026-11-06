import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import type { Customer, Pet, PetOwner } from '@/types'

export function useCustomers() {
  return useQuery({
    queryKey: queryKeys.customers,
    queryFn: () => api.get<Customer[]>('/customers'),
  })
}

export function useCustomer(id: string) {
  return useQuery({
    queryKey: queryKeys.customer(id),
    queryFn: () => api.get<Customer>(`/customers/${id}`),
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
    queryFn: () => api.get<Pet[]>('/pets'),
  })
}

export function usePet(id: string) {
  return useQuery({
    queryKey: queryKeys.pet(id),
    queryFn: () => api.get<Pet>(`/pets/${id}`),
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