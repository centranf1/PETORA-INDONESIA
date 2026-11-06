---
title: Database Design
document_id: PET-DOC-0401
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['rls-security-policies.md', 'data-dictionary.md']
---

# Database Design

Dokumen ini menggambarkan desain basis data relasional PETORA dengan pendekatan multi-tenant dan multi-branch.

## Primary Principles

Each table stores organization_id and branch_id where relevant. Critical transactions are atomic. Historical data is never deleted casually. Soft-deletion used only when policy requires it.

## Core Domains

Organization, branch, users, roles, permissions, customers, pets, products, inventory, transactions, services, medical records, finance, payroll, reports.

## Key Constraints

Foreign keys, unique constraints, check constraints, and indexes must align with business rules. Postgres is the source of truth; no JSONB-based relational substitution without justification.

## System Configuration Domain

Untuk kebijakan yang masih bersifat dinamis, PETORA membutuhkan tabel konfigurasi yang menjadi sumber kebenaran runtime untuk policy bisnis. Tabel ini berfungsi sebagai konfigurasi organik yang dapat diubah dari dashboard Super Admin tanpa harus mengubah kode.

### Tabel utama yang disarankan

| Tabel | Tujuan | Catatan penting |
| --- | --- | --- |
| system_settings | nilai aktif per organization/branch | organization_id, branch_id nullable, setting_group, key, value_json, version_no |
| setting_groups (optional catalog) | metadata kelompok setting bila diperlukan | dapat diganti registry/schema terkontrol; bukan prasyarat tabel runtime |
| setting_audit_log | riwayat perubahan | old_value, new_value, approved_by, reason |
| setting_versions | versi konfigurasi | snapshot untuk rollback |

### Kolom standar settings

- id: uuid pk
- organization_id: uuid not null
- branch_id: uuid nullable
- setting_group: text not null
- key: text not null
- value_type: text not null (string, number, boolean, object, enum)
- value_json: jsonb nullable
- default_value_json: jsonb nullable
- is_active: boolean default true
- is_system_locked: boolean default false
- requires_approval: boolean default true untuk policy kritis
- approved_by: uuid nullable
- approved_at: timestamptz nullable
- created_by, updated_by: uuid
- created_at, updated_at: timestamptz
- version_no: integer default 1

### Aturan bisnis untuk setting

- Setting di level organisasi hanya berlaku untuk tenant terkait.
- Setting di level branch hanya berlaku di cabang tersebut.
- Policy fundamental seperti allow_negative_stock, refund_rules, dan medical_access_policy harus punya prioritas validasi yang lebih tinggi dari parameter umum.
- Perubahan setting kritis harus ditandai dengan `requires_approval` dan diminta persetujuan Super Admin/Owner.
- Riwayat perubahan harus tersimpan sebelum update final.

### Contoh skema

```sql
CREATE TABLE public.system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  branch_id uuid NULL,
  setting_group text NOT NULL,
  key text NOT NULL,
  value_type text NOT NULL CHECK (value_type IN ('string','number','boolean','object','enum')),
  value_json jsonb,
  default_value_json jsonb,
  is_active boolean NOT NULL DEFAULT true,
  is_system_locked boolean NOT NULL DEFAULT false,
  requires_approval boolean NOT NULL DEFAULT true,
  approved_by uuid NULL,
  approved_at timestamptz NULL,
  created_by uuid NULL,
  updated_by uuid NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  version_no integer NOT NULL DEFAULT 1
);

CREATE UNIQUE INDEX system_settings_org_key_unique
  ON public.system_settings (organization_id, setting_group, key)
  WHERE branch_id IS NULL;

CREATE UNIQUE INDEX system_settings_branch_key_unique
  ON public.system_settings (organization_id, branch_id, setting_group, key)
  WHERE branch_id IS NOT NULL;
```

`system_settings` menyimpan nilai aktif saja. `branch_id IS NULL` berarti scope organization; branch override memakai `branch_id` tertentu. Scope global lintas organisasi tidak termasuk baseline sampai tenancy model disetujui.

### Proposal, audit, dan versi setting

```sql
CREATE TABLE public.setting_change_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  branch_id uuid NULL,
  setting_id uuid NOT NULL REFERENCES public.system_settings(id),
  proposed_value_json jsonb NOT NULL,
  expected_version_no integer NOT NULL,
  status text NOT NULL CHECK (status IN ('draft','pending_approval','applied','rejected','cancelled')),
  requires_approval boolean NOT NULL,
  requested_by uuid NOT NULL,
  reason text NOT NULL,
  decided_by uuid NULL,
  decided_at timestamptz NULL,
  decision_reason text NULL,
  applied_version_no integer NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.setting_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_id uuid NOT NULL REFERENCES public.system_settings(id),
  change_request_id uuid NOT NULL REFERENCES public.setting_change_requests(id),
  version_no integer NOT NULL,
  value_json jsonb NOT NULL,
  changed_by uuid NOT NULL,
  reason text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (setting_id, version_no)
);

CREATE TABLE public.setting_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  branch_id uuid NULL,
  setting_id uuid NOT NULL REFERENCES public.system_settings(id),
  change_request_id uuid NULL REFERENCES public.setting_change_requests(id),
  changed_by uuid NOT NULL,
  change_type text NOT NULL CHECK (change_type IN ('propose','update_draft','approve','reject','apply','rollback','access_denied')),
  version_no integer NULL,
  old_value jsonb,
  new_value jsonb,
  reason text NOT NULL,
  request_id text NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

Proposal creation, approval/rejection, activation of `system_settings`, version creation, and audit append must be transactional. A rejected or pending proposal never changes the active value. Approval must compare `expected_version_no` to the current active version and reject stale proposals.

### Policy runtime untuk setting

- System settings harus dibaca melalui layanan server-side agar status approval dan branch scope selalu valid; direct client mutation is not allowed.
- `value_json` disimpan sebagai payload yang dibaca oleh runtime service di business logic.
- `default_value_json` digunakan jika setting belum dibuat atau jika branch override tidak tersedia.
- `is_system_locked=true` hanya boleh diubah oleh Super Admin dengan approval tambahan.
- `requires_approval=true` memaksa proposal menunggu approval; hanya proposal yang diterapkan yang mengubah nilai aktif dan menaikkan `version_no`.
- Approval actor harus berbeda dari pemohon untuk policy high-risk jika separation of duties disetujui; keputusan final dicatat dalam open decisions.

### Uniqueness and Policy Caveats

- PostgreSQL unique constraints treat NULL values as distinct; partial unique indexes above prevent duplicate organization-level keys and duplicate branch-level keys.
- `requires_approval` harus ditentukan dari policy catalog/server, bukan dipercaya dari client.
- `setting_change_requests`, `setting_versions`, and `setting_audit_log` require RLS and read/write policies at least as strict as `system_settings`.
- Example SQL is a draft design, not a migration. Validate actor references, role/claim model, retention, grants, concurrent updates, and migration rollback before implementation.

## Mermaid

```mermaid
erDiagram
  ORGANIZATION ||--o{ BRANCH : owns
  ORGANIZATION ||--o{ USER : includes
  BRANCH ||--o{ CUSTOMER : serves
  CUSTOMER ||--o{ PET : owns
  BRANCH ||--o{ PRODUCT : offers
  PRODUCT ||--o{ STOCK_LEDGER : moves
  BRANCH ||--o{ SALES_TRANSACTION : records
  SALES_TRANSACTION ||--o{ SALES_ITEM : contains
  ORGANIZATION ||--o{ SYSTEM_SETTINGS : configures
  SYSTEM_SETTINGS ||--o{ SETTING_CHANGE_REQUESTS : receives
  SETTING_CHANGE_REQUESTS ||--o{ SETTING_VERSIONS : applies
  SYSTEM_SETTINGS ||--o{ SETTING_AUDIT_LOG : records
```

