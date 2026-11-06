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
| system_settings | master konfigurasi global/branch | key, value_type, value_json, scope, status |
| setting_groups | pengelompokan konfigurasi | refund, stock, loyalty, notification, inventory |
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
  version_no integer NOT NULL DEFAULT 1,
  UNIQUE (organization_id, branch_id, setting_group, key)
);
```

### Tabel audit dan versi setting

```sql
CREATE TABLE public.setting_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  branch_id uuid NULL,
  setting_id uuid NOT NULL REFERENCES public.system_settings(id),
  changed_by uuid NOT NULL,
  change_type text NOT NULL CHECK (change_type IN ('create','update','approve','reject','rollback')),
  old_value jsonb,
  new_value jsonb,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.setting_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_id uuid NOT NULL REFERENCES public.system_settings(id),
  version_no integer NOT NULL,
  value_json jsonb NOT NULL,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (setting_id, version_no)
);
```

### Policy runtime untuk setting

- System settings harus dibaca melalui layanan server-side agar status approval dan branch scope selalu valid.
- `value_json` disimpan sebagai payload yang dibaca oleh runtime service di business logic.
- `default_value_json` digunakan jika setting belum dibuat atau jika branch override tidak tersedia.
- `is_system_locked=true` hanya boleh diubah oleh Super Admin dengan approval tambahan.
- `requires_approval=true` memaksa perubahan dibuat dalam status draft dan baru aktif setelah approval.

## Mermaid

```mermaid
ER
ORGANIZATION ||--o{ BRANCH
ORGANIZATION ||--o{ USER
BRANCH ||--o{ CUSTOMER
CUSTOMER ||--o{ PET
BRANCH ||--o{ PRODUCT
PRODUCT ||--o{ STOCK_LEDGER
BRANCH ||--o{ SALES_TRANSACTION
SALES_TRANSACTION ||--o{ SALES_ITEM
ORGANIZATION ||--o{ SYSTEM_SETTINGS
SYSTEM_SETTINGS ||--o{ SETTING_AUDIT_LOG
SYSTEM_SETTINGS ||--o{ SETTING_VERSIONS
```

