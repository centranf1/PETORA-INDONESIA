import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import type { Staff, Attendance, PayrollCycle, PayrollRecord, CommissionRule, CommissionRecord } from '@/types'

export function useStaff() {
  return useQuery({
    queryKey: queryKeys.staff,
    queryFn: () => api.get<Staff[]>('/staff'),
  })
}

export function useCreateStaff() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<Staff>) =>
      api.post<Staff>('/staff', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.staff })
    },
  })
}

export function useAttendance(params?: { staffId?: string; date?: string }) {
  return useQuery({
    queryKey: queryKeys.attendance,
    queryFn: () => api.get<Attendance[]>('/attendance', { params }),
  })
}

export function useClockIn() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: { staffId: string; date: string }) =>
      api.post<Attendance>('/attendance/clock-in', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance })
    },
  })
}

export function useClockOut() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: { staffId: string; date: string }) =>
      api.post<Attendance>('/attendance/clock-out', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance })
    },
  })
}

export function usePayrollCycles() {
  return useQuery({
    queryKey: queryKeys.payroll,
    queryFn: () => api.get<PayrollCycle[]>('/payroll/cycles'),
  })
}

export function usePayrollRecords(cycleId?: string) {
  return useQuery({
    queryKey: [...queryKeys.payroll, 'records'],
    queryFn: () => api.get<PayrollRecord[]>(`/payroll/records${cycleId ? `?cycle_id=${cycleId}` : ''}`),
  })
}

export function useCommissionRules() {
  return useQuery({
    queryKey: queryKeys.commissions,
    queryFn: () => api.get<CommissionRule[]>('/commissions/rules'),
  })
}

export function useCommissionRecords() {
  return useQuery({
    queryKey: [...queryKeys.commissions, 'records'],
    queryFn: () => api.get<CommissionRecord[]>('/commissions/records'),
  })
}