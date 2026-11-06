export interface SalesTransaction {
  id: string
  organization_id: string
  branch_id: string
  transaction_number: string
  customer_id?: string | null
  cashier_user_id: string
  currency: string
  subtotal: number
  discount_amount: number
  tax_amount: number
  total_amount: number
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded'
  created_at: string
  updated_at: string
}

export interface SaleItem {
  id: string
  organization_id: string
  sales_transaction_id: string
  product_id?: string | null
  description_snapshot: string
  quantity: number
  unit: string
  unit_price: number
  discount_amount: number
  tax_amount: number
  line_total: number
  created_at: string
}

export interface Payment {
  id: string
  organization_id: string
  branch_id: string
  sales_transaction_id: string
  payment_attempt_id?: string | null
  method: 'cash' | 'transfer' | 'card' | 'ewallet' | 'credit'
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'failed'
  provider_reference?: string | null
  settled_at?: string | null
  created_at: string
}

export interface PaymentAttempt {
  id: string
  organization_id: string
  branch_id: string
  sales_transaction_id: string
  provider: string
  provider_reference?: string | null
  idempotency_key: string
  request_hash: string
  amount: number
  currency: string
  status: 'pending' | 'paid' | 'failed'
  created_at: string
}

export interface RefundRequest {
  id: string
  organization_id: string
  branch_id: string
  sales_transaction_id: string
  amount: number
  reason: string
  requested_by: string
  approved_by?: string | null
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  idempotency_key: string
  created_at: string
  updated_at: string
}