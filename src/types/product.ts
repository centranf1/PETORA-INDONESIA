export interface Product {
  id: string
  organization_id: string
  sku: string
  name: string
  item_type: 'product' | 'service'
  base_unit: string
  category?: string | null
  brand?: string | null
  description?: string | null
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface ProductPrice {
  id: string
  organization_id: string
  product_id: string
  branch_id?: string | null
  currency: string
  amount: number
  cost_amount?: number | null
  effective_from: string
  effective_until?: string | null
  approved_by?: string | null
  created_at: string
}

export interface InventoryLocation {
  id: string
  organization_id: string
  branch_id: string
  code: string
  name: string
  location_type: 'warehouse' | 'shop_floor' | 'pickup_point'
  status: 'active' | 'inactive'
  created_at: string
}

export interface StockLedger {
  id: string
  organization_id: string
  branch_id: string
  location_id: string
  product_id: string
  batch_id?: string | null
  movement_type: 'in' | 'out' | 'transfer' | 'adjustment' | 'damaged' | 'expired'
  quantity_delta: number
  unit: string
  source_type: string
  source_id?: string | null
  created_by?: string | null
  created_at: string
}

export interface Supplier {
  id: string
  organization_id: string
  code: string
  name: string
  contact_name?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}