import { supabase } from '@/lib/supabase'

const API_BASE = import.meta.env.VITE_API_URL || ''

type ApiRequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean | null | undefined>
}

function buildUrl(endpoint: string, params?: ApiRequestOptions['params']) {
  const base = API_BASE || 'http://localhost'
  const url = new URL(endpoint, base)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.toString()
}

async function request<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { params, ...requestInit } = options
  const url = buildUrl(endpoint, params)
  const { data: { session } } = await supabase.auth.getSession()

  const headers = new Headers(requestInit.headers || {})
  headers.set('Content-Type', 'application/json')

  if (session?.access_token) {
    headers.set('Authorization', `Bearer ${session.access_token}`)
  }

  const response = await fetch(url, {
    ...requestInit,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

export const api = {
  get: <T>(endpoint: string, options?: ApiRequestOptions) => request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: any, options?: ApiRequestOptions) =>
    request<T>(endpoint, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(endpoint: string, body?: any, options?: ApiRequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(endpoint: string, body?: any, options?: ApiRequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(endpoint: string, options?: ApiRequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
}