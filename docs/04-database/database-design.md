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

Semua tabel tenant-aware menyimpan `organization_id`; `branch_id` hanya dipakai jika data benar-benar branch-scoped. PostgreSQL adalah source of truth untuk constraint, transaction, dan RLS. Data finansial/medis yang sudah difinalisasi dikoreksi melalui revision/reversal, bukan overwrite atau hard delete tanpa policy. Semua rancangan pada dokumen ini belum diterapkan dan harus diturunkan menjadi migration yang dapat diuji.

## Core Domains

Organization, branch, users, roles, permissions, customers, pets, products, inventory, transactions, services, medical records, finance, payroll, reports.

## Key Constraints

Foreign keys, unique constraints, check constraints, and indexes must align with business rules. Postgres is the source of truth; no JSONB-based relational substitution without justification.

## Dynamic System Configuration Domain

Setting runtime dipisahkan antara registry key, nilai per scope, versioned proposal, dan append-only audit. Super Admin mengelola nilai dari dashboard; aplikasi dan edge function membaca hanya versi efektif yang sudah tervalidasi. Perubahan kritis yang belum disetujui tidak boleh memengaruhi runtime.

| Table | Tujuan | Core fields (proposed) |
| --- | --- | --- |
| `setting_definitions` | Registry key dan aturan typed value | `id`, `key`, `group_code`, `value_type`, `validation_schema`, `default_value`, `requires_approval`, `is_sensitive`, `is_locked` |
| `system_settings` | Binding definition ke organization/optional branch dan versi aktif | `id`, `organization_id`, `branch_id`, `definition_id`, `active_version_no`, `created_by`, timestamps |
| `setting_versions` | Snapshot immutable untuk setiap proposed/active value | `setting_id`, `version_no`, `value_json`, `status`, `base_version_no`, `reason`, `created_by`, approval/activation metadata |
| `setting_audit_log` | Event perubahan, validasi, approval, activation, rejection, rollback | `organization_id`, `branch_id`, `setting_id`, `version_no`, `actor_id`, `action`, `reason`, `request_id`, `created_at` |

`jsonb` digunakan hanya untuk value konfigurasi yang memang bertipe string/number/boolean/enum/object dan untuk schema validasi registry. Ownership, approval state, actor, versions, dan event tetap berupa kolom relasional. Secret tidak disimpan sebagai value; simpan referensi secret manager yang tidak dapat dipakai client.

### Rancangan schema ilustratif

SQL ini adalah desain awal untuk ditinjau sebelum migration; perlu disesuaikan dengan role code, helper RLS, dan schema organisasi final.

```sql
CREATE TABLE public.setting_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  group_code text NOT NULL,
  value_type text NOT NULL CHECK (value_type IN ('string','number','boolean','enum','object')),
  validation_schema jsonb NOT NULL DEFAULT '{}'::jsonb,
  default_value jsonb,
  requires_approval boolean NOT NULL DEFAULT false,
  is_sensitive boolean NOT NULL DEFAULT false,
  is_locked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id),
  branch_id uuid REFERENCES public.branches(id),
  definition_id uuid NOT NULL REFERENCES public.setting_definitions(id),
  active_version_no integer,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (branch_id IS NULL OR organization_id IS NOT NULL)
);

CREATE UNIQUE INDEX system_settings_org_key_unique
  ON public.system_settings (organization_id, definition_id)
  WHERE branch_id IS NULL;
CREATE UNIQUE INDEX system_settings_branch_key_unique
  ON public.system_settings (organization_id, branch_id, definition_id)
  WHERE branch_id IS NOT NULL;

CREATE TABLE public.setting_versions (
  setting_id uuid NOT NULL REFERENCES public.system_settings(id),
  version_no integer NOT NULL CHECK (version_no > 0),
  value_json jsonb NOT NULL,
  status text NOT NULL CHECK (status IN ('draft','pending_approval','active','rejected','superseded','rolled_back')),
  base_version_no integer,
  reason text NOT NULL,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  decided_by uuid,
  decided_at timestamptz,
  decision_reason text,
  activated_at timestamptz,
  PRIMARY KEY (setting_id, version_no),
  CHECK ((status <> 'active') OR activated_at IS NOT NULL)
);

ALTER TABLE public.system_settings
  ADD CONSTRAINT system_settings_active_version_fk
  FOREIGN KEY (id, active_version_no)
  REFERENCES public.setting_versions (setting_id, version_no)
  DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE public.setting_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id),
  branch_id uuid REFERENCES public.branches(id),
  setting_id uuid NOT NULL REFERENCES public.system_settings(id),
  version_no integer,
  actor_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('create_draft','submit','validate','approve','reject','activate','rollback','access_denied')),
  reason text,
  request_id text,
  safe_diff jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (setting_id, version_no)
    REFERENCES public.setting_versions (setting_id, version_no)
);
```

### Runtime and transaction rules

- Definition registry dapat dipelihara lewat deployment-controlled seed atau workflow khusus; dashboard tidak boleh menambahkan key arbitrary.
- Penulisan memakai server-side command: validasi actor/scope/schema, lock row settings, cek `base_version_no`, simpan version + audit, lalu aktivasi hanya jika approval tidak diwajibkan.
- `requires_approval` berasal dari definition terkontrol, bukan nilai request. Pemisahan pembuat dan approver untuk kategori high-risk adalah rekomendasi yang menunggu konfirmasi.
- Gunakan partial unique index di atas karena uniqueness biasa mengizinkan beberapa baris dengan `branch_id IS NULL` pada PostgreSQL.
- RLS berlaku pada keempat tabel. `setting_versions` dan audit mewarisi tenant scope dari settings; update/delete audit ditolak.
- `active_version_no` menunjuk versi aktif; cache invalidation dilakukan setelah commit. Jika cache gagal invalidasi, runtime harus tetap dapat membaca versi aktif terbaru.
- Global platform settings di luar organization scope memerlukan platform-admin boundary terpisah dan merupakan open decision; jangan membuka akses lintas tenant dengan role `super_admin` tenant.

## Mermaid

```mermaid
erDiagram
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

