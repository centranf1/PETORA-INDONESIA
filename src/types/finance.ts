export interface JournalEntry {
  id: string
  organization_id: string
  branch_id?: string | null
  source_type: string
  source_id?: string | null
  period_id?: string | null
  status: 'draft' | 'posted'
  posted_at?: string | null
  created_by?: string | null
  created_at: string
}

export interface JournalLine {
  id: string
  organization_id: string
  journal_entry_id: string
  account_id: string
  debit: number
  credit: number
  currency: string
  created_at: string
}

export interface Account {
  id: string
  organization_id: string
  code: string
  name: string
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'
  parent_id?: string | null
  is_active: boolean
  created_at: string
}

export interface FinanceTransaction {
  id: string
  organization_id: string
  branch_id?: string | null
  type: 'income' | 'expense' | 'transfer'
  category: string
  amount: number
  currency: string
  description?: string | null
  reference_id?: string | null
  reference_type?: string | null
  transaction_date: string
  created_by?: string | null
  created_at: string
}

export interface AuditLog {
  id: string
  organization_id?: string | null
  branch_id?: string | null
  actor_id?: string | null
  entity_type: string
  entity_id?: string | null
  action: string
  reason?: string | null
  trace_id?: string | null
  metadata?: any
  created_at: string
}