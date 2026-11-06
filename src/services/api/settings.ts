import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { queryKeys } from './queryKeys'
import type { SystemSetting, SettingChangeRequest, SettingVersion, SettingAuditLog } from '@/types'

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => api.get<any>('/settings'),
  })
}

export function useSetting(id: string) {
  return useQuery({
    queryKey: queryKeys.setting(id),
    queryFn: () => api.get<any>(`/settings/${id}`),
    enabled: !!id,
  })
}

export function useSettingHistory(id: string) {
  return useQuery({
    queryKey: [...queryKeys.setting(id), 'history'],
    queryFn: () => api.get<SettingAuditLog[]>(`/settings/${id}/history`),
    enabled: !!id,
  })
}

export function useCreateSetting() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Partial<SystemSetting>) =>
      api.post<SettingChangeRequest>('/settings', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings })
    },
  })
}

export function useApproveSetting() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      api.post<SettingChangeRequest>(`/settings/${id}/approve`, { reason }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.setting(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.settings })
    },
  })
}

export function useRejectSetting() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      api.post<SettingChangeRequest>(`/settings/${id}/reject`, { reason }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.setting(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.settings })
    },
  })
}