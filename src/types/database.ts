export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          code: string
          name: string
          status: 'active' | 'inactive'
          default_timezone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          status?: 'active' | 'inactive'
          default_timezone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          status?: 'active' | 'inactive'
          default_timezone?: string
          created_at?: string
          updated_at?: string
        }
      }
      branches: {
        Row: {
          id: string
          organization_id: string
          code: string
          name: string
          status: 'active' | 'inactive'
          timezone: string
          address?: string | null
          phone?: string | null
          email?: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          code: string
          name: string
          status?: 'active' | 'inactive'
          timezone?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          code?: string
          name?: string
          status?: 'active' | 'inactive'
          timezone?: string
          address?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          organization_id: string
          auth_user_id: string
          full_name: string
          email: string
          phone?: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          auth_user_id: string
          full_name: string
          email: string
          phone?: string | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          auth_user_id?: string
          full_name?: string
          email?: string
          phone?: string | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export interface ErrorContract {
  code: string
  message: string
  retryable: boolean
  trace_id?: string
  details?: any
}

export interface ListResponse<T> {
  data: T[]
  meta: {
    trace_id: string
    next_cursor?: string | null
    total?: number
  }
}

export interface SingleResponse<T> {
  data: T
  meta: {
    trace_id: string
  }
}