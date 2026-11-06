---
title: Data Dictionary
document_id: PET-DOC-0403
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-design.md']
---

# Data Dictionary

Data dictionary mencatat definisi kolom utama, variabel, dan relasi yang diperlukan untuk menjaga konsistensi data PETORA.

## 1. Standard Column Pattern

Semua tabel utama diharapkan memiliki pola kolom berikut:

| Column | Type | Purpose | Rule |
| --- | --- | --- | --- |
| id | uuid | primary key | PK, generated default |
| organization_id | uuid | tenant scope | not null for tenant-aware tables |
| branch_id | uuid | branch scope | nullable for org-level tables |
| created_at | timestamptz | creation timestamp | not null |
| updated_at | timestamptz | last updated timestamp | not null |
| deleted_at | timestamptz | logical delete | nullable |
| created_by | uuid | creator user | not null for user-managed tables |
| updated_by | uuid | last updater | nullable |
| status | text | lifecycle state | use enum/check constraint |
| version_no | integer | optimistic lock / audit revision | default 1 |

## 2. Core Logical Table Dictionary

Semua relasi pada bagian ini adalah **rancangan logical schema**, bukan tabel yang sudah ditemukan pada implementasi. Foreign key, constraint, partitioning, precision angka, dan detail nullable wajib ditinjau sebelum migration. PK umumnya `id uuid`; `created_at/updated_at timestamptz`; monetary amounts menggunakan `numeric` (bukan float) dengan currency/scale yang disetujui.

### Organization and Access

| Table | Tujuan / kolom kunci dan tipe | Relasi, constraint, index, RLS/audit |
| --- | --- | --- |
| `organizations` | Tenant root: `id uuid`, `name text`, `code text`, `status text` | UNIQUE(code); status check; no cross-tenant read; lifecycle audit |
| `branches` | Cabang: `id uuid`, `organization_id uuid`, `name text`, `code text`, `status text`, `timezone text` | FK tenant; UNIQUE(organization_id, code); UNIQUE(organization_id,id) untuk composite FK; org RLS |
| `users` | Profile: `id uuid` (= Auth user id), `organization_id uuid`, `email text`, `status text` | FK auth identity/org; unique email policy perlu diputuskan; tenant RLS; deactivation audit |
| `roles` | Role katalog: `id uuid`, `organization_id uuid`, `code text`, `name text` | UNIQUE(organization_id,code); `is_system` protected; tenant RLS |
| `permissions` | Action catalogue: `id uuid`, `module_code text`, `action_code text`, `scope_code text` | UNIQUE(module_code,action_code,scope_code); deployment-controlled catalogue |
| `role_permissions` | Role-action mapping: `role_id uuid`, `permission_id uuid` | Composite UNIQUE(role_id,permission_id); tenant consistency; mutation audit |
| `user_role_assignments` | Effective assignment: `id uuid`, `user_id uuid`, `role_id uuid`, `branch_id uuid NULL`, `valid_from/to timestamptz` | FK role/user/branch; active-assignment indexes; branch NULL semantics must be approved; server-managed |

### Customer, Pet, Catalog, and Supplier

| Table | Tujuan / kolom kunci dan tipe | Relasi, constraint, index, RLS/audit |
| --- | --- | --- |
| `customers` | Customer: `id`, `organization_id`, `full_name text`, `phone text`, `email text NULL`, `status text` | UNIQUE(organization_id, normalized_phone); search index; tenant/branch RLS; retain linked history |
| `pets` | Hewan: `id`, `organization_id`, `name text`, `species text`, `birth_date date NULL`, `status text` | Org FK; search by name/microchip; restricted health fields; no hard delete if history exists |
| `pet_owners` | Ownership relation: `pet_id`, `customer_id`, `is_primary bool`, `valid_from/to timestamptz` | Unique current primary pet owner (partial unique index); FK same org; ownership revisions audited |
| `products` | Product/service master: `id`, `organization_id`, `sku text`, `name text`, `kind text`, `status text` | UNIQUE(organization_id,sku); check kind; tenant RLS |
| `product_variants` | Variant identity: `id`, `product_id`, `variant_code text`, `attributes` | UNIQUE(product_id,variant_code); attributes limited to non-relational variant details |
| `product_units` | UOM/conversion: `id`, `product_id`, `unit_code text`, `base_factor numeric` | Factor > 0; unique per product; immutable once referenced by posted transaction |
| `product_prices` | Effective-dated prices: `id`, `product_id`, `branch_id NULL`, `currency char(3)`, `amount numeric`, `valid_from/to` | Amount >= 0; non-overlapping effective window is business rule; price change approval/audit |
| `suppliers` | Supplier: `id`, `organization_id`, `name text`, `status text`, `payment_terms` | Org RLS; duplicate/contact policy; deactivate without erasing PO history |
| `supplier_products` | Supplier catalog: `supplier_id`, `product_id`, `supplier_sku text`, `purchase_unit_id`, `last_cost numeric` | UNIQUE(supplier_id,product_id,supplier_sku); tenant-consistent FK; price history preferred |

### Inventory and Commerce

| Table | Tujuan / kolom kunci dan tipe | Relasi, constraint, index, RLS/audit |
| --- | --- | --- |
| `inventory_locations` | Warehouse/bin: `id`, `organization_id`, `branch_id`, `code text`, `type text`, `status text` | UNIQUE(branch_id,code); composite branch/org FK; inventory scope RLS |
| `stock_batches` | Lot/expiry: `id`, `product_id`, `location_id`, `batch_no text`, `expires_on date NULL`, `qty_on_hand numeric` (projection only) | UNIQUE(location_id,product_id,batch_no); expiry index; ledger reconciliation |
| `stock_ledgers` | Source movement: `id`, `organization_id`, `branch_id`, `product_id`, `location_id`, `qty_delta numeric`, `movement_type`, `reference_id` | Append-only; reference/idempotency unique where applicable; indexes by org/branch/product/time; audit actor |
| `stock_reservations` | Allocated/held stock: `id`, `product_id`, `location_id`, `quantity numeric`, `expires_at`, `reference_id` | quantity > 0; unique active source reference; transactional capacity checks |
| `stock_counts` | Opname header/line: `id`, `location_id`, `status`, `started_at`, `approved_by` | Segregate count and approval; variance reason required; tenant RLS |
| `stock_transfers` | Transfer request: `id`, `from_location_id`, `to_location_id`, `status`, `approved_by` | Source != destination; paired outbound/inbound ledger; state transitions audited |
| `sales_transactions` | Sale header: `id`, `organization_id`, `branch_id`, `customer_id NULL`, `idempotency_key`, `status`, `currency`, `total_amount numeric` | UNIQUE(org,branch,idempotency_key); server-calculated total; transactional state |
| `sale_items` | Sale snapshot: `id`, `sales_transaction_id`, `product_id`, `quantity numeric`, `unit_price numeric`, `discount numeric`, `tax numeric` | FK sale/product; quantity > 0; snapshot names/UOM/tax/discount |
| `payments` | Payment intent/record: `id`, `sales_transaction_id`, `provider`, `amount numeric`, `status`, `provider_reference` | Idempotency/reference uniqueness; status check; no PAN/secret storage |
| `payment_events` | Provider event inbox: `id`, `provider_event_id`, `payment_id`, `event_type`, `received_at` | UNIQUE(provider,provider_event_id); signature verification metadata; append-only |
| `refund_requests` | Refund/reversal: `id`, `payment_id`, `amount numeric`, `reason`, `status`, `approved_by` | Amount <= refundable balance by transaction; approval, idempotency, append-only outcomes |
| `cash_shifts` | Register shift: `id`, `branch_id`, `cash_register_id`, `opened_by`, `closed_by`, totals | One active shift per register; cash-count reconciliation and audit |
| `purchase_orders` | PO header: `id`, `supplier_id`, `branch_id`, `po_number`, `status`, `currency` | UNIQUE(org,branch,po_number); approval transition; immutable after receiving as policy requires |
| `purchase_order_items` | PO lines: `id`, `purchase_order_id`, `product_id`, `quantity numeric`, `unit_cost numeric` | FK PO/product; quantity > 0; cost snapshot |
| `receiving_notes` | Receipt header: `id`, `purchase_order_id`, `received_at`, `received_by`, `status` | Partial receipts supported; idempotency/source reference |
| `supplier_invoices` | Vendor invoice: `id`, `supplier_id`, `invoice_no`, `invoice_date`, `amount numeric`, `status` | UNIQUE(org,supplier,invoice_no); amount/currency validation; mismatch review |
| `supplier_payments` | Supplier disbursement: `id`, `invoice_id`, `amount numeric`, `payment_reference`, `status` | Cumulative paid <= payable; finance permission and journal link |

### Booking, Services, and Clinical

| Table | Tujuan / kolom kunci dan tipe | Relasi, constraint, index, RLS/audit |
| --- | --- | --- |
| `services` | Service catalogue: `id`, `organization_id`, `code`, `duration_minutes int`, `status` | Unique org/code; duration > 0; branch availability explicit |
| `bookings` | Reservation: `id`, `branch_id`, `pet_id`, `scheduled_start/end timestamptz`, `status` | End > start; capacity conflict protected transactionally; customer and pet tenant match |
| `booking_items` | Multi-service booking: `id`, `booking_id`, `service_id`, `staff_id NULL`, `price_snapshot numeric` | FK booking/service; assignment conflict/capacity constraint strategy |
| `service_visits` | Fulfillment record: `id`, `booking_id NULL`, `service_type`, `status`, `checkin_at`, `completed_at` | Idempotent completion; condition/consent references; branch RLS |
| `grooming_sessions` | Grooming specifics: `id`, `service_visit_id`, `groomer_id`, `condition_before/after`, `notes` | Authorized staff; media references use Storage policies; audit changes |
| `rooms` | Hotel room: `id`, `branch_id`, `code`, `capacity numeric`, `status` | UNIQUE(branch_id,code); capacity > 0; inactive room unavailable |
| `room_assignments` | Occupancy: `id`, `room_id`, `booking_id`, `checkin_at`, `checkout_at` | Non-overlap per capacity/room guarded transactionally |
| `daily_monitoring` | Stay observation: `id`, `booking_id`, `recorded_by`, `recorded_at`, `observation_type`, `notes` | Append-only event, branch RLS, sensitive clinical fields restricted |
| `transport_trips` | Animal trip: `id`, `branch_id`, `booking_id`, `driver_id`, `vehicle_id`, `status` | State transitions and handoff actor/time; not parcel shipment |
| `visits` | Clinical encounter: `id`, `pet_id`, `branch_id`, `doctor_user_id`, `status`, `occurred_at` | Clinical role assignment; immutable finalized status transition |
| `medical_records` | Finalized record: `id`, `visit_id`, `pet_id`, `version_no`, `visibility`, `finalized_at` | Unique version per visit; customer view by explicit visibility; no destructive update |
| `medical_record_revisions` | Correction history: `id`, `medical_record_id`, `revision_no`, `reason`, `changed_by`, `snapshot jsonb` | Append-only; snapshot solely for prior record state; sensitive access/audit |
| `medical_consents` | Consent: `id`, `visit_id`, `customer_id`, `consent_type`, `status`, `decided_at` | Evidence/reference, version of terms, valid actor; legal handling decision |
| `prescriptions` | Prescription header: `id`, `medical_record_id`, `doctor_user_id`, `status`, `issued_at` | Valid veterinarian assignment; finalization audit |
| `prescription_items` | Medication directions: `id`, `prescription_id`, `product_id`, `dose`, `route`, `frequency`, `duration` | Typed/unit validation; dosage clinical rule requires clinical owner |
| `medication_usage` | Dispensing/admin event: `id`, `prescription_item_id`, `batch_id`, `quantity`, `actor_id`, `occurred_at` | Append-only; stock ledger reference; allergy/expiry checks where data exists |

### Workforce, Finance, Governance, and Messaging

| Table | Tujuan / kolom kunci dan tipe | Relasi, constraint, index, RLS/audit |
| --- | --- | --- |
| `employees` | HR profile: `id`, `organization_id`, `employee_no`, `status`, restricted personal fields | UNIQUE(org,employee_no); HR-only RLS; offboarding does not delete history |
| `attendance_events` | Clock/attendance event: `id`, `employee_id`, `event_type`, `occurred_at`, `source` | Duplicate/sequence controls; corrections linked, not overwritten |
| `commission_accruals` | Applied commission: `id`, `source_type/id`, `rule_version`, `amount numeric`, `status` | Unique source/idempotency; snapshot rule; adjustment history |
| `payroll_cycles` | Payroll period: `id`, `organization_id`, `period_start/end`, `status` | UNIQUE(org,period); end >= start; approval/close states |
| `payroll_records` | Employee payroll snapshot: `id`, `cycle_id`, `employee_id`, `gross/deduction/net numeric` | Unique(cycle,employee); restricted HR/Finance; immutable once paid |
| `cash_flows` | Cash/bank movement: `id`, `organization_id`, `branch_id`, `account_id`, `direction`, `amount numeric`, `reference_id` | Amount > 0; idempotent source reference; reconciliation status |
| `accounts` | Chart of accounts: `id`, `organization_id`, `code`, `name`, `account_type`, `parent_id` | UNIQUE(org,code); prevent invalid/cyclic hierarchy |
| `accounting_periods` | Period control: `id`, `organization_id`, `starts_on`, `ends_on`, `status` | No overlapping period; closed period blocks posts |
| `journal_entries` | Journal header: `id`, `organization_id`, `branch_id NULL`, `reference_type/id`, `status`, `posted_at` | Unique source reference; period FK; posted entries immutable |
| `journal_lines` | Debit/credit lines: `id`, `journal_entry_id`, `account_id`, `debit/credit numeric`, `currency` | Exactly one positive side; sum debit=credit enforced by posting function |
| `consignment_partners` | Consignor: `id`, `organization_id`, `name`, `status` | Tenant RLS; partner contract access restricted |
| `consignment_settlements` | Settlement period: `id`, `partner_id`, `period_start/end`, `amount numeric`, `status` | Unique partner/period policy; sale/return reconciliation and approval |
| `report_requests` | Async report/export request: `id`, `requested_by`, `scope`, `filters`, `status`, `file_ref` | Scope checked on generation and download; expiry and audit |
| `notification_events` | Event intent: `id`, `organization_id`, `recipient_id`, `template_id`, `idempotency_key`, `status` | Unique event intent; preference and consent checked before dispatch |
| `system_settings` | Scoped setting pointer: `id`, `organization_id`, `branch_id NULL`, `definition_id`, `active_version_no` | Partial unique indexes per org/branch; RLS and server-only mutation |
| `setting_definitions` | Key registry: `id`, `key`, `group_code`, `value_type`, `validation_schema jsonb`, approval/sensitive flags | Unique key; deployment-controlled; no arbitrary client-created definitions |
| `setting_versions` | Value snapshot: `setting_id`, `version_no`, `value_json jsonb`, `status`, `reason`, actor/approval metadata | Composite PK; active pointer FK; append-only transitions and optimistic version |
| `setting_audit_log` | Settings event log: `id`, `setting_id`, `version_no`, `actor_id`, `action`, `request_id`, `safe_diff jsonb` | Tenant RLS, append-only; redact sensitive values |
| `audit_logs` | Cross-domain audit: `id`, `organization_id`, `branch_id NULL`, `actor_id`, `entity`, `action`, `trace_id` | Append-only, tenant-scoped, data-class retention; no secret payload |
| `integrations` | Provider config metadata: `id`, `organization_id`, `provider`, `status`, `secret_ref` | Unique provider/scope; only secret reference, restricted access |

## 3. Data Rules and Constraints

- Semua tabel transaksi kritis harus memuat `organization_id` dan `branch_id` yang valid.
- `deleted_at` hanya digunakan untuk logical delete, tidak untuk menghapus data historis secara permanen.
- `created_at` dan `updated_at` selalu memakai type `timestamptz`.
- Foreign keys harus menjaga referential integrity, kecuali data archiving yang diijinkan.
- Gunakan check constraints untuk status, currency, quantity, dan range nilai yang sensitif.

## 4. Example Data Definition

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

## 5. Data Dictionary Governance

- Setiap perubahan struktur data harus meningkatkan dokumentasi ERD dan data dictionary.
- Nama tabel dan kolom yang digunakan di backend dan frontend harus konsisten.
- Jika ada fitur yang mengharuskan history table, dokumentasikan tabel historis dan hubungannya dengan master table.

## Related Documents

- [database-design.md](database-design.md)
- [entity-relationship-diagram.md](entity-relationship-diagram.md)
- [rls-security-policies.md](rls-security-policies.md)

