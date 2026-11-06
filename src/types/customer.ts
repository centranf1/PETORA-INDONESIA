export interface Customer {
  id: string
  organization_id: string
  branch_id?: string | null
  full_name: string
  phone: string
  normalized_phone: string
  email?: string | null
  status: 'active' | 'inactive' | 'blacklisted'
  membership_number?: string | null
  loyalty_points: number
  created_at: string
  updated_at: string
  created_by?: string | null
  updated_by?: string | null
}

export interface Pet {
  id: string
  organization_id: string
  name: string
  species: string
  breed?: string | null
  sex?: 'male' | 'female' | null
  date_of_birth?: string | null
  weight?: number | null
  color?: string | null
  microchip_id?: string | null
  status: 'active' | 'deceased'
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface PetOwner {
  id: string
  organization_id: string
  pet_id: string
  customer_id: string
  relationship?: string | null
  is_primary: boolean
  valid_from: string
  valid_until?: string | null
  created_at: string
}

export interface CustomerNote {
  id: string
  organization_id: string
  customer_id: string
  note: string
  created_by: string
  created_at: string
}