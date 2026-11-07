-- PETORA Database Migration 006: System Settings, Audit, Notifications
-- Created: 2026-11-06
-- Description: Create tables for system settings, audit logs, notifications, idempotency

-- System Settings table
CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
  setting_group TEXT NOT NULL,
  key TEXT NOT NULL,
  value_type TEXT NOT NULL CHECK (value_type IN ('string', 'number', 'boolean', 'object', 'enum')),
  value_json JSONB,
  default_value_json JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_system_locked BOOLEAN NOT NULL DEFAULT false,
  requires_approval BOOLEAN NOT NULL DEFAULT true,
  approved_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  version_no INTEGER NOT NULL DEFAULT 1
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_system_settings_org_key_unique
  ON public.system_settings (organization_id, setting_group, key)
  WHERE branch_id IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_system_settings_branch_key_unique
  ON public.system_settings (organization_id, branch_id, setting_group, key)
  WHERE branch_id IS NOT NULL;

-- Setting Change Requests table
CREATE TABLE IF NOT EXISTS public.setting_change_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
  setting_id UUID NOT NULL REFERENCES public.system_settings(id) ON DELETE CASCADE,
  proposed_value_json JSONB NOT NULL,
  expected_version_no INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_approval', 'applied', 'rejected', 'cancelled')),
  requires_approval BOOLEAN NOT NULL,
  requested_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  decided_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  decided_at TIMESTAMPTZ,
  decision_reason TEXT,
  applied_version_no INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Setting Versions table
CREATE TABLE IF NOT EXISTS public.setting_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_id UUID NOT NULL REFERENCES public.system_settings(id) ON DELETE CASCADE,
  change_request_id UUID NOT NULL REFERENCES public.setting_change_requests(id) ON DELETE CASCADE,
  version_no INTEGER NOT NULL,
  value_json JSONB NOT NULL,
  changed_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (setting_id, version_no)
);

-- Setting Audit Log table
CREATE TABLE IF NOT EXISTS public.setting_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
  setting_id UUID NOT NULL REFERENCES public.system_settings(id) ON DELETE CASCADE,
  change_request_id UUID REFERENCES public.setting_change_requests(id) ON DELETE SET NULL,
  changed_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  change_type TEXT NOT NULL CHECK (change_type IN ('propose', 'update_draft', 'approve', 'reject', 'apply', 'rollback', 'access_denied')),
  version_no INTEGER,
  old_value JSONB,
  new_value JSONB,
  reason TEXT NOT NULL,
  request_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit Logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  action TEXT NOT NULL,
  reason TEXT,
  trace_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Idempotency Records table
CREATE TABLE IF NOT EXISTS public.idempotency_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  actor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  operation TEXT NOT NULL,
  key TEXT NOT NULL,
  request_hash TEXT NOT NULL,
  response_reference UUID,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (organization_id, actor_id, operation, key)
);

-- Notification Templates table
CREATE TABLE IF NOT EXISTS public.notification_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'whatsapp')),
  subject TEXT,
  body_template TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notification Logs table
CREATE TABLE IF NOT EXISTS public.notification_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
  template_key TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'whatsapp')),
  recipient TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'read')),
  provider_reference TEXT,
  error TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_system_settings_org ON public.system_settings(organization_id);
CREATE INDEX IF NOT EXISTS idx_setting_change_requests_setting ON public.setting_change_requests(setting_id);
CREATE INDEX IF NOT EXISTS idx_setting_versions_setting ON public.setting_versions(setting_id);
CREATE INDEX IF NOT EXISTS idx_setting_audit_log_setting ON public.setting_audit_log(setting_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_org ON public.audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_idempotency_records_actor ON public.idempotency_records(actor_id);
CREATE INDEX IF NOT EXISTS idx_notification_templates_org ON public.notification_templates(organization_id);
CREATE INDEX IF NOT EXISTS idx_notification_logs_org ON public.notification_logs(organization_id);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.setting_change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.setting_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.setting_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idempotency_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;