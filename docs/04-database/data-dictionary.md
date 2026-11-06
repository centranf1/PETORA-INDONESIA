---
title: Data Dictionary
document_id: PET-DOC-0403
status: Draft
version: 1.1
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-design.md']
---

# Data Dictionary

Data dictionary mencatat definisi kolom utama, variabel, dan relasi yang diperlukan untuk menjaga konsistensi data PETORA.

## 1. Common Column Guidance

Kolom berikut digunakan sesuai karakter data; jangan menambahkan kolom tenant, branch, atau soft-delete secara mekanis ke semua tabel. Setiap tabel harus mendokumentasikan ownership, retention, sensitivity, lifecycle, dan audit needs secara eksplisit.

| Column | Type | Purpose | Rule |
| --- | --- | --- | --- |
| id | uuid | primary key | PK, generated default |
| organization_id | uuid | tenant scope | not null for tenant-owned data; omit only with documented reason |
| branch_id | uuid | branch scope | present only for branch-scoped data; null may represent org-level data |
| created_at | timestamptz | creation timestamp | not null |
| updated_at | timestamptz | last updated timestamp | not null |
| deleted_at | timestamptz | logical delete | only for records whose lifecycle permits soft deletion; never use to erase immutable ledger history |
| created_by | uuid | creator user | not null for user-managed tables |
| updated_by | uuid | last updater | nullable |
| status | text | lifecycle state | use enum/check constraint |
| version_no | integer | optimistic lock / audit revision | default 1 |

## 2. Core Tables

| Table | Purpose | Example columns | Key notes |
| --- | --- | --- | --- |
| organizations | organisasi induk | id, name, code, status | root tenant |
| branches | cabang perusahaan | id, organization_id, name, status, address_id | branch-specific operations |
| users | pengguna aplikasi | id, organization_id, email, phone, status | linked to auth users |
| roles | master role | id, organization_id, name, code | role catalog |
| permissions | permission master | id, module, action, scope | `view`, `create`, `update`, `approve` |
| user_role_assignments | role to user mapping | id, user_id, role_id, branch_id | supports assigned_records |
| customers | pelanggan | id, organization_id, branch_id, full_name, phone, status | unique phone per org |
| pets | hewan pelanggan | id, organization_id, name, species, sex, status | owner history is modeled through the `pet_owners` relationship candidate |
| products | produk dan layanan master | id, organization_id, sku, name, item_type, base_unit, status | branch/effective price is modeled separately when approved |
| inventory_locations | gudang dan lokasi stok | id, organization_id, branch_id, name, type | warehouse or pickup point |
| stock_ledgers | kartu stok dan mutasi | id, organization_id, branch_id, product_id, location_id, qty_delta, movement_type, reference_id | source of inventory truth |
| sales_transactions | transaksi penjualan | id, organization_id, branch_id, customer_id, cashier_user_id, total_amount, status | must be atomic |
| sale_items | item dalam transaksi | id, sales_transaction_id, product_id, quantity, unit_price, discount_amount | price snapshot |
| payments | pembayaran | id, organization_id, branch_id, sales_transaction_id, payment_method, amount, status | status can be pending/paid/failed |
| purchase_orders | purchase request | id, organization_id, branch_id, supplier_id, po_number, status | buyer workflow |
| purchase_order_items | item PO | id, purchase_order_id, product_id, qty, unit_price | linked to receiving |
| receiving_notes | penerimaan barang | id, organization_id, branch_id, purchase_order_id, received_at | partial receiving allowed |
| medical_records | rekam kesehatan hewan | id, organization_id, branch_id, pet_id, visit_id, diagnosis, summary | historical and revision-friendly |
| prescriptions | resep dokter | id, organization_id, branch_id, medical_record_id, doctor_user_id, status | controlled substance support |
| bookings | jadwal layanan | id, organization_id, branch_id, pet_id, service_type, scheduled_at, status | includes no-show/cancel |
| service_visits | kunjungan layanan | id, organization_id, branch_id, booking_id, user_id, outcome, notes | service completion record |
| payroll_cycles | periode penggajian | id, organization_id, branch_id, period_start, period_end, status | payroll group |
| payroll_records | detail gaji | id, organization_id, branch_id, payroll_cycle_id, employee_id, gross_pay, deductions | reconciles with finance |
| journal_entries | header jurnal | id, organization_id, branch_id, source_type, source_id, period_id, status | posted entry is corrected through reversal/adjustment |
| journal_lines (candidate) | baris debit/kredit | id, organization_id, journal_entry_id, account_id, debit, credit, currency | entry must balance before posting |
| audit_logs | log aktivitas | id, organization_id, branch_id, actor_id, entity_type, entity_id, action, created_at | security and traceability |
| system_settings | nilai setting aktif | id, organization_id, branch_id, setting_group, key, value_type, value_json, version_no | one active value per organization/optional branch/group/key; secret material is prohibited |
| setting_change_requests | proposal perubahan setting | id, organization_id, branch_id, setting_id, proposed_value_json, expected_version_no, status, requested_by, reason | pending/rejected proposal never changes active value |
| setting_versions | riwayat nilai aktif | id, setting_id, change_request_id, version_no, value_json, changed_by, reason | immutable snapshots; unique setting/version |
| setting_audit_log | event konfigurasi | id, organization_id, branch_id, setting_id, change_request_id, changed_by, change_type, reason | append-only; redact sensitive values and enforce scope |

## 3. P0 Logical Schema Contracts (Proposal)

Bagian ini menetapkan field minimum, relasi, dan invariant yang harus dibawa ke physical schema untuk alur P0. Ini **kontrak logical Draft**, bukan SQL migration atau klaim bahwa tabel-tabel ini sudah ada. Nama yang belum ada di schema baseline harus disahkan sebelum migration dibuat.

### Identity, Organization, and Customer

| Entity | Scope and minimum columns | Keys / invariants |
| --- | --- | --- |
| `organizations` | `id uuid`, `code text`, `name text`, `status text`, `default_timezone text`, timestamps | PK `id`; unique `code`; status active/inactive; organization is the tenant root |
| `branches` | `id uuid`, `organization_id uuid`, `code text`, `name text`, `status text`, `timezone text`, timestamps | unique `(organization_id, code)`; composite tenant reference; inactive branch rejects new operational writes |
| `users` | `id uuid`, `organization_id uuid`, `auth_user_id uuid`, `status text`, timestamps | unique `(organization_id, auth_user_id)`; Auth identity is not itself an organization grant |
| `roles` | `id uuid`, `organization_id uuid`, `code text`, `name text`, `status text`, `is_system boolean` | unique `(organization_id, code)`; system roles cannot be silently deleted while assigned |
| `permissions` | `id uuid`, `code text`, `module text`, `resource text`, `action text`, `scope text` | unique permission code; scope allowlist (`own`, `branch`, `all`, `assigned_records`) |
| `role_permissions` | `organization_id uuid`, `role_id uuid`, `permission_id uuid`, timestamps | unique `(role_id, permission_id)`; assignment changes are audited |
| `user_role_assignments` | `organization_id uuid`, `user_id uuid`, `role_id uuid`, `branch_id uuid nullable`, `assigned_by uuid`, `active_from`, `active_until` | user/role/branch must belong to same organization; active interval valid; revocation is historical |
| `customers` | `id uuid`, `organization_id uuid`, `full_name text`, `phone text`, `normalized_phone text`, `email text nullable`, `status text`, timestamps | unique `(organization_id, normalized_phone)` only if approved phone uniqueness rule applies; do not merge on name alone |
| `pets` | `id uuid`, `organization_id uuid`, `name text`, `species text`, `breed text nullable`, `sex text nullable`, `status text`, timestamps | organization-scoped; clinical identity changes are audited; owner relationship is modeled separately |
| `pet_owners` (candidate) | `id uuid`, `organization_id uuid`, `pet_id uuid`, `customer_id uuid`, `relationship text`, `is_primary boolean`, `valid_from timestamptz`, `valid_until timestamptz nullable` | same-organization composite FKs; preserve prior ownership; at most one active primary owner per pet |

### Catalog and Inventory

| Entity | Scope and minimum columns | Keys / invariants |
| --- | --- | --- |
| `products` | `id uuid`, `organization_id uuid`, `sku text`, `name text`, `item_type text`, `base_unit text`, `status text`, timestamps | unique `(organization_id, sku)`; product/service type is explicit; do not store branch price as an unversioned global field |
| `product_prices` (candidate) | `id uuid`, `organization_id uuid`, `product_id uuid`, `branch_id uuid nullable`, `currency char(3)`, `amount numeric`, `effective_from timestamptz`, `effective_until timestamptz nullable`, `approved_by uuid nullable` | amount uses fixed decimal/minor-unit contract, never floating point; effective periods cannot overlap for same product/scope/currency |
| `inventory_locations` | `id uuid`, `organization_id uuid`, `branch_id uuid`, `code text`, `name text`, `location_type text`, `status text` | unique `(organization_id, branch_id, code)`; branch belongs to organization |
| `stock_batches` (candidate) | `id uuid`, `organization_id uuid`, `product_id uuid`, `location_id uuid`, `batch_code text nullable`, `expiry_date date nullable`, `received_at timestamptz` | batch identifies traceability attributes, not mutable balance; uniqueness depends on supplier/product/location policy |
| `stock_ledgers` | `id uuid`, `organization_id uuid`, `branch_id uuid`, `location_id uuid`, `product_id uuid`, `batch_id uuid nullable`, `movement_type text`, `quantity_delta numeric`, `unit text`, `source_type text`, `source_id uuid`, `created_by uuid`, `created_at timestamptz` | nonzero delta; append-only; composite tenant/branch FKs; source reference and reason required for manual correction; balance is derived/projection |
| `stock_reservations` (candidate) | `id uuid`, `organization_id uuid`, `branch_id uuid`, `location_id uuid`, `product_id uuid`, `source_id uuid`, `quantity numeric`, `status text`, `expires_at timestamptz` | reserved quantity cannot exceed policy-available balance; release/expiry is explicit and idempotent |

### Sales, Payment, and Correction

| Entity | Scope and minimum columns | Keys / invariants |
| --- | --- | --- |
| `sales_transactions` | `id uuid`, `organization_id uuid`, `branch_id uuid`, `transaction_number text`, `customer_id uuid nullable`, `cashier_user_id uuid`, `currency char(3)`, `subtotal/discount/tax/total numeric`, `status text`, timestamps | unique `(organization_id, branch_id, transaction_number)`; total recalculated server-side; completed sale is immutable |
| `sale_items` | `id uuid`, `organization_id uuid`, `sales_transaction_id uuid`, `product_id uuid nullable`, `description_snapshot text`, `quantity numeric`, `unit text`, `unit_price numeric`, `discount_amount numeric`, `tax_amount numeric`, `line_total numeric` | same-tenant FK to sale; preserve price/tax/promo snapshot; quantities and amounts obey approved scale/rounding |
| `payment_attempts` (candidate) | `id uuid`, `organization_id uuid`, `branch_id uuid`, `sales_transaction_id uuid`, `provider text`, `provider_reference text nullable`, `idempotency_key text`, `request_hash text`, `amount numeric`, `currency char(3)`, `status text`, timestamps | unique idempotency scope and provider event/reference where applicable; timeout stays pending/unknown, never presumed paid |
| `payments` | `id uuid`, `organization_id uuid`, `branch_id uuid`, `sales_transaction_id uuid`, `payment_attempt_id uuid nullable`, `method text`, `amount numeric`, `currency char(3)`, `status text`, `settled_at timestamptz nullable` | immutable confirmed payment event; amount/currency/provider reference match the sale; no duplicate confirmation |
| `refund_requests` (candidate) | `id uuid`, `organization_id uuid`, `branch_id uuid`, `sales_transaction_id uuid`, `amount numeric`, `reason text`, `requested_by uuid`, `approved_by uuid nullable`, `status text`, `idempotency_key text`, timestamps | refund cannot exceed remaining refundable amount; original sale retained; provider outcome reconciled before final status |

### Booking, Clinical, and Pharmacy

| Entity | Scope and minimum columns | Keys / invariants |
| --- | --- | --- |
| `bookings` | `id uuid`, `organization_id uuid`, `branch_id uuid`, `customer_id uuid`, `pet_id uuid`, `service_type text`, `starts_at/ends_at timestamptz`, `status text`, `assigned_user_id uuid nullable` | pet/customer/branch must match organization; capacity is guarded under concurrency; cancellation/no-show is a state transition |
| `visits` (candidate) | `id uuid`, `organization_id uuid`, `branch_id uuid`, `pet_id uuid`, `booking_id uuid nullable`, `veterinarian_user_id uuid`, `occurred_at timestamptz`, `status text` | assigned clinician and patient verified; one visit may produce one or more documented records under approved model |
| `medical_records` | `id uuid`, `organization_id uuid`, `branch_id uuid`, `pet_id uuid`, `visit_id uuid`, `author_user_id uuid`, `status text`, `finalized_at timestamptz nullable`, `summary text` | finalized content is not overwritten; customer visibility is explicit and separate from internal notes |
| `medical_record_revisions` (candidate) | `id uuid`, `organization_id uuid`, `medical_record_id uuid`, `revision_no integer`, `previous_snapshot jsonb`, `replacement_snapshot jsonb`, `reason text`, `changed_by uuid`, `created_at timestamptz` | unique `(medical_record_id, revision_no)`; correction references prior version and actor |
| `prescriptions` | `id uuid`, `organization_id uuid`, `branch_id uuid`, `medical_record_id uuid`, `doctor_user_id uuid`, `status text`, `issued_at timestamptz`, `instructions text` | prescriber has valid authority; finalized/cancelled prescription cannot be silently edited |
| `medication_usage` | `id uuid`, `organization_id uuid`, `branch_id uuid`, `prescription_id uuid`, `product_id uuid`, `batch_id uuid nullable`, `quantity numeric`, `dispensed_by uuid`, `dispensed_at timestamptz` | dispense and stock ledger commit together; batch expiry and quantity are checked |

### Accounting, Idempotency, and Audit

| Entity | Scope and minimum columns | Keys / invariants |
| --- | --- | --- |
| `journal_entries` | `id uuid`, `organization_id uuid`, `branch_id uuid`, `source_type text`, `source_id uuid`, `period_id uuid`, `status text`, `posted_at timestamptz nullable`, `created_by uuid` | unique source posting per approved event; posted entry corrected through reversal/adjustment |
| `journal_lines` (candidate) | `id uuid`, `organization_id uuid`, `journal_entry_id uuid`, `account_id uuid`, `debit numeric`, `credit numeric`, `currency char(3)` | one side is zero per line; sum debit equals sum credit before posting; enforce transaction-level validation |
| `idempotency_records` (candidate) | `id uuid`, `organization_id uuid`, `actor_id uuid`, `operation text`, `key text`, `request_hash text`, `response_reference uuid nullable`, `status text`, timestamps | unique `(organization_id, actor_id, operation, key)`; same key/different hash rejected; retention duration TBD |
| `audit_logs` | `id uuid`, `organization_id uuid nullable`, `branch_id uuid nullable`, `actor_id uuid`, `entity_type text`, `entity_id uuid`, `action text`, `reason text nullable`, `trace_id text`, `created_at timestamptz` | append-only; role-controlled read/export; sensitive payload is minimized/redacted |

## 4. State and Numeric Contracts

- Use explicit status allowlists and documented transition rules; do not reuse one generic status enum across unrelated domains.
- Store time instants as `timestamptz` UTC; store business date separately only where local calendar semantics require it.
- Use a decided currency/precision policy before physical migration; never use floating point for amounts. Rounding and tax allocation remain business decisions.
- Quantities use `numeric` precision and a unit/conversion definition; every ledger movement stores the unit used.
- Tenant-owned foreign keys should include `organization_id` where practical so a valid ID from another tenant cannot be linked accidentally.

## 5. Physical Schema Approval Gates

Before converting logical contracts into migrations, decide auth/user membership model, source of effective time, currency precision, product/service catalog model, batch uniqueness, capacity locking, payment/refund provider states, clinical revision/privacy scope, journal period/account model, deletion/retention, and exact FK/index/RLS grants. Keep migration SQL in version control and validate it against integration/RLS tests; this dictionary is not executable SQL.

## 6. Data Rules and Constraints

- Semua tabel transaksi kritis harus memuat `organization_id` dan `branch_id` yang valid.
- `deleted_at` hanya digunakan untuk logical delete, tidak untuk menghapus data historis secara permanen.
- `created_at` dan `updated_at` selalu memakai type `timestamptz`.
- Foreign keys harus menjaga referential integrity, kecuali data archiving yang diijinkan.
- Gunakan check constraints untuk status, currency, quantity, dan range nilai yang sensitif.
- For `system_settings`, enforce separate uniqueness for organization-level rows (`branch_id IS NULL`) and branch-level rows (`branch_id IS NOT NULL`) using partial unique indexes; a normal unique constraint does not prevent duplicate NULL-scope rows.
- For setting proposals, verify organization/branch matches the parent setting and compare `expected_version_no` atomically before approval/application.
- Do not store provider tokens, passwords, or credentials in `value_json`; use the server-side secret manager.

## 7. Example Data Definition

```sql
CREATE TABLE public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  branch_id uuid NULL,
  full_name text NOT NULL,
  phone varchar(30) NOT NULL,
  email varchar(255) NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NULL,
  updated_by uuid NULL,
  deleted_at timestamptz NULL,
  UNIQUE (organization_id, phone)
);
```

## 8. Data Dictionary Governance

- Setiap perubahan struktur data harus meningkatkan dokumentasi ERD dan data dictionary.
- Nama tabel dan kolom yang digunakan di backend dan frontend harus konsisten.
- Jika ada fitur yang mengharuskan history table, dokumentasikan tabel historis dan hubungannya dengan master table.
- Each new table must document whether it is organization-scoped, branch-scoped, global/reference data, or immutable history, with corresponding RLS and retention behavior.

## Related Documents

- [database-design.md](database-design.md)
- [entity-relationship-diagram.md](entity-relationship-diagram.md)
- [rls-security-policies.md](rls-security-policies.md)

