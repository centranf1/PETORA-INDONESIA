import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import type { Booking, MedicalRecord, Prescription, PharmacyStock, MedicationUsage } from '@/types'

export function useBookings() {
  return useQuery({
    queryKey: queryKeys.bookings,
    queryFn: () => api.get<Booking[]>('/bookings'),
  })
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: [...queryKeys.bookings, id],
    queryFn: () => api.get<Booking>(`/bookings/${id}`),
    enabled: !!id,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<Booking>) =>
      api.post<Booking>('/bookings', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings })
    },
  })
}

export function useMedicalRecords(petId?: string) {
  return useQuery({
    queryKey: queryKeys.medicalRecords,
    queryFn: () => api.get<MedicalRecord[]>(`/medical-records${petId ? `?pet_id=${petId}` : ''}`),
  })
}

export function useCreateMedicalRecord() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<MedicalRecord>) =>
      api.post<MedicalRecord>('/medical-records', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.medicalRecords })
    },
  })
}

export function usePrescriptions(medicalRecordId?: string) {
  return useQuery({
    queryKey: queryKeys.prescriptions,
    queryFn: () => api.get<Prescription[]>(`/prescriptions${medicalRecordId ? `?medical_record_id=${medicalRecordId}` : ''}`),
  })
}

export function useCreatePrescription() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<Prescription>) =>
      api.post<Prescription>('/prescriptions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.prescriptions })
    },
  })
}

export function usePharmacyStock() {
  return useQuery({
    queryKey: [...queryKeys.medicalRecords, 'pharmacy'],
    queryFn: () => api.get<PharmacyStock[]>('/pharmacy/stock'),
  })
}

export function useDispenseMedication() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<MedicationUsage>) =>
      api.post<MedicationUsage>('/pharmacy/dispense', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...queryKeys.medicalRecords, 'pharmacy'] })
    },
  })
}