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
| pets | hewan pelanggan | id, organization_id, branch_id, customer_id, name, species, sex | one main owner |
| products | produk dan layanan master | id, organization_id, branch_id, sku, name, category, sell_price, cost_price | common catalog |
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
| journal_entries | jurnal umum | id, organization_id, branch_id, ref_type, ref_id, account_code, debit, credit | must balance |
| audit_logs | log aktivitas | id, organization_id, branch_id, actor_id, entity_type, entity_id, action, created_at | security and traceability |

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

