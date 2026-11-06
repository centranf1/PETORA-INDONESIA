---
title: RLS Security Policies
document_id: PET-DOC-0406
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-design.md']
---

# RLS Security Policies

Dokumen ini menguraikan rancangan kebijakan RLS.

## Baseline Requirements

RLS aktif untuk semua tabel yang diakses melalui API. Validation of organization_id and branch_id occurs via auth claims or server-verified context.

## Sample Policy

```sql
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY customers_org_scope ON public.customers
FOR SELECT USING (organization_id = current_setting(app.organization_id)::uuid);
```

## Branch Isolation

Branch scope is validated using branch_id and role assignment. Data from other branches is rejected by policy.

## Sensitive Policy

Medical records and payroll require stronger policies, sometimes restricting to specific roles only.

## Open Decision

Final policy matrix must be aligned with the operational and legal policy of the client organization.

