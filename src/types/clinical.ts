export interface Booking {
  id: string
  organization_id: string
  branch_id: string
  customer_id: string
  pet_id: string
  service_type: string
  scheduled_at: string
  ends_at?: string | null
  status: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled' | 'no_show'
  assigned_user_id?: string | null
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface MedicalRecord {
  id: string
  organization_id: string
  branch_id: string
  pet_id: string
  visit_id?: string | null
  author_user_id: string
  status: 'draft' | 'finalized'
  chief_complaint?: string | null
  physical_examination?: string | null
  diagnosis?: string | null
  treatment_plan?: string | null
  summary?: string | null
  finalized_at?: string | null
  created_at: string
  updated_at: string
}

export interface Prescription {
  id: string
  organization_id: string
  branch_id: string
  medical_record_id: string
  doctor_user_id: string
  status: 'draft' | 'issued' | 'dispensed' | 'cancelled'
  instructions?: string | null
  issued_at?: string | null
  created_at: string
}

export interface PharmacyStock {
  id: string
  organization_id: string
  branch_id: string
  product_id: string
  batch_code?: string | null
  expiry_date?: string | null
  quantity: number
  unit: string
  created_at: string
  updated_at: string
}

export interface MedicationUsage {
  id: string
  organization_id: string
  branch_id: string
  prescription_id: string
  product_id: string
  batch_id?: string | null
  quantity: number
  unit: string
  dispensed_by: string
  dispensed_at: string
}