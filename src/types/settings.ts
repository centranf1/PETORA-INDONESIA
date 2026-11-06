export interface SystemSetting {
  id: string
  organization_id: string
  branch_id?: string | null
  setting_group: string
  key: string
  value_type: 'string' | 'number' | 'boolean' | 'object' | 'enum'
  value_json: any
  default_value_json?: any
  is_active: boolean
  is_system_locked: boolean
  requires_approval: boolean
  approved_by?: string | null
  approved_at?: string | null
  version_no: number
  created_at: string
  updated_at: string
}

export interface SettingChangeRequest {
  id: string
  organization_id: string
  branch_id?: string | null
  setting_id: string
  proposed_value_json: any
  expected_version_no: number
  status: 'draft' | 'pending_approval' | 'applied' | 'rejected' | 'cancelled'
  requires_approval: boolean
  requested_by: string
  reason: string
  decided_by?: string | null
  decided_at?: string | null
  decision_reason?: string | null
  applied_version_no?: number | null
  created_at: string
  updated_at: string
}

export interface SettingVersion {
  id: string
  setting_id: string
  change_request_id: string
  version_no: number
  value_json: any
  changed_by: string
  reason: string
  created_at: string
}

export interface SettingAuditLog {
  id: string
  organization_id: string
  branch_id?: string | null
  setting_id: string
  change_request_id?: string | null
  changed_by: string
  change_type: 'propose' | 'update_draft' | 'approve' | 'reject' | 'apply' | 'rollback' | 'access_denied'
  version_no?: number | null
  old_value?: any
  new_value?: any
  reason: string
  request_id?: string | null
  created_at: string
}