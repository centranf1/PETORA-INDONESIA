export interface NotificationTemplate {
  id: string
  organization_id: string
  branch_id?: string | null
  key: string
  channel: 'email' | 'sms' | 'whatsapp'
  subject?: string | null
  body_template: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface NotificationLog {
  id: string
  organization_id: string
  branch_id?: string | null
  template_key: string
  channel: 'email' | 'sms' | 'whatsapp'
  recipient: string
  subject?: string | null
  body: string
  status: 'pending' | 'sent' | 'failed' | 'read'
  provider_reference?: string | null
  error?: string | null
  sent_at?: string | null
  created_at: string
}

export interface IntegrationConfig {
  id: string
  organization_id: string
  provider: string
  config_key: string
  is_enabled: boolean
  masked_value?: string | null
  created_at: string
  updated_at: string
}

export interface ReportDefinition {
  id: string
  organization_id: string
  code: string
  name: string
  category: string
  query_template: string
  is_active: boolean
  created_at: string
}