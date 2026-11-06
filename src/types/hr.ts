export interface Staff {
  id: string
  organization_id: string
  branch_id?: string | null
  user_id?: string | null
  full_name: string
  position: string
  department?: string | null
  phone?: string | null
  email?: string | null
  status: 'active' | 'inactive'
  base_salary?: number | null
  created_at: string
  updated_at: string
}

export interface Attendance {
  id: string
  organization_id: string
  branch_id: string
  staff_id: string
  date: string
  check_in?: string | null
  check_out?: string | null
  status: 'present' | 'absent' | 'late' | 'permission' | 'leave'
  notes?: string | null
  created_at: string
}

export interface PayrollCycle {
  id: string
  organization_id: string
  branch_id?: string | null
  period_start: string
  period_end: string
  status: 'draft' | 'approved' | 'paid'
  created_at: string
}

export interface PayrollRecord {
  id: string
  organization_id: string
  branch_id?: string | null
  payroll_cycle_id: string
  staff_id: string
  gross_pay: number
  deductions: number
  net_pay: number
  status: 'draft' | 'approved' | 'paid'
  created_at: string
}

export interface CommissionRule {
  id: string
  organization_id: string
  branch_id?: string | null
  role_code?: string | null
  service_type?: string | null
  product_id?: string | null
  percentage: number
  is_active: boolean
  created_at: string
}

export interface CommissionRecord {
  id: string
  organization_id: string
  branch_id: string
  staff_id: string
  source_type: 'sale' | 'service'
  source_id: string
  amount: number
  status: 'pending' | 'approved' | 'paid'
  created_at: string
}