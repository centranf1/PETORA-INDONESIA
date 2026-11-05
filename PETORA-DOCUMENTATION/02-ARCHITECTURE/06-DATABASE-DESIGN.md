# 06 — Database Design

**Status:** Konseptual schema relasional usulan; belum ada DBMS atau migration aktual.  
**Aturan:** nama tabel/kolom bukan fakta dari implementasi. Tidak menggunakan `tenant_id`.

## 1. Konvensi dan tipe

- Nama tabel/kolom `snake_case`, plural untuk tabel; FK bernama `<entity>_id`.
- Primary key UUID/ULID `id` adalah PROPOSED; tipe final mengikuti DBMS.
- Uang `DECIMAL(p,s)` fixed-point; precision/scale dan mata uang dikonfirmasi.
- Kuantitas `DECIMAL` untuk mendukung pecahan jika unit mengizinkan.
- Timestamp disimpan konsisten (UTC direkomendasikan), ditampilkan sesuai zona bisnis/cabang.
- Tabel mutable memiliki `created_at`, `updated_at`, actor fields. Soft delete hanya untuk master yang boleh diarsipkan.
- Tabel transaksi memakai `branch_id` non-null, FK ke `branches`; pengecualian global dirinci berikut.
- Unique transaction/reference number harus memiliki scope/sequence yang ditentukan bisnis.
- Status dibatasi CHECK/lookup; transition dikendalikan domain service.

## 2. Tabel dan definisi inti

Notasi: `PK` primary key, `FK` foreign key, `UQ` unique, `NN` not null. Kolom audit standar tidak diulang pada setiap baris.

### 2.1 Organisasi dan akses

| Tabel | Kolom inti dan batasan | Tujuan / branch strategy |
|---|---|---|
| `business_settings` | `id PK`, `business_name NN`, `currency_code`, `timezone`, `settings_json` | Konfigurasi organisasi tunggal; global, tidak punya `branch_id`. Hindari menyimpan secret di JSON. |
| `branches` | `id PK`, `code UQ`, `name NN`, `status`, `address`, `phone`, `email`, `timezone` | Master cabang global; tidak punya `branch_id` miliknya sendiri. |
| `branch_settings` | `id PK`, `branch_id FK NN`, `setting_key NN`, `value_json`, `UQ(branch_id,setting_key)` | Override/config per cabang; tidak ada self-branch field selain FK owner. |
| `users` | `id PK`, `email`, `phone`, `password_hash/identity_ref`, `status` | Akun global; credential provider detail TBD. Tidak branch-scoped secara intrinsik. |
| `roles` | `id PK`, `code UQ`, `name`, `is_system`, `is_protected`, `status` | Role sistem/custom; identitas protected tidak dapat dihapus. Global. |
| `permissions` | `id PK`, `code UQ`, `module_code`, `action`, `sensitivity` | Katalog permission global. |
| `role_permissions` | `role_id FK`, `permission_id FK`, `scope_policy`, `PK(role_id,permission_id)` | Relasi role-permission dan policy scope yang diizinkan. |
| `user_roles` | `user_id FK`, `role_id FK`, `branch_id FK NULL`, `PK` | Role assignment; branch nullable hanya bila role global, aturan assignment perlu validasi. |
| `user_branch_access` | `user_id FK`, `branch_id FK`, `status`, `PK(user_id,branch_id)` | Explicit branch access; global Super Admin dibentuk policy, bukan baris wildcard. |
| `departments` | `id PK`, `name UQ`, `status` | Master organisasi; konfigurasi global, assignment cabang terpisah bila perlu. |
| `employees` | `id PK`, `user_id FK NULL`, `employee_no UQ`, `department_id FK`, `branch_id FK`, `employment_status` | Profil kerja ditautkan ke cabang; boleh simpan data employment terpisah dari akun. |

### 2.2 Customer, pet, katalog, dan inventory

| Tabel | Kolom inti dan batasan | Tujuan / branch strategy |
|---|---|---|
| `customers` | `id PK`, `customer_no UQ`, `user_id FK NULL`, `name NN`, `phone`, `email`, `status` | Master customer global; PII dibatasi policy. |
| `customer_addresses` | `id PK`, `customer_id FK`, `label`, `address`, `is_default` | Alamat customer global; akses owner. |
| `pets` | `id PK`, `pet_no UQ`, `name`, `species`, `breed`, `birth_date`, `weight`, `weight_unit`, `status` | Profil hewan global; data medis tetap policy-protected. |
| `pet_owners` | `pet_id FK`, `customer_id FK`, `relationship`, `is_primary`, `consent_status`, `PK(pet_id,customer_id)` | Multi-owner dan consent; unique primary owner policy perlu constraint/transaction. |
| `pet_medical_records` | `id PK`, `pet_id FK`, `branch_id FK`, `doctor_user_id FK`, `record_type`, `occurred_at`, `signed_at` | Catatan medis branch-scoped dengan actor/histori. |
| `product_categories` | `id PK`, `parent_id FK NULL`, `name`, `status` | Master global; branch availability melalui junction bila diperlukan. |
| `products` | `id PK`, `category_id FK`, `brand_id FK NULL`, `sku UQ`, `barcode`, `name`, `unit_id FK`, `status`, `is_consignment` | Katalog global; harga/stok per cabang di tabel terkait. |
| `product_variants` | `id PK`, `product_id FK`, `sku UQ`, `attributes_json`, `barcode` | Varian SKU; attributes terkontrol oleh katalog. |
| `product_prices` | `id PK`, `product_variant_id FK`, `branch_id FK NULL`, `price_type`, `amount DECIMAL`, `valid_from`, `valid_to` | Price global bila branch null atau override cabang; precedence dan exclusion overlap perlu ditetapkan. |
| `suppliers` | `id PK`, `supplier_no UQ`, `name`, `contact`, `status` | Master supplier global, tanpa `branch_id`; terms dapat override per cabang. |
| `warehouses` | `id PK`, `branch_id FK NN`, `code`, `name`, `status`, `UQ(branch_id,code)` | Gudang selalu milik satu cabang. |
| `stock_batches` | `id PK`, `product_variant_id FK`, `warehouse_id FK`, `batch_no`, `expiry_date`, `received_at` | Batch per lokasi/item; unique scope batch perlu ditentukan. |
| `stock_movements` | `id PK`, `branch_id FK`, `warehouse_id FK`, `product_variant_id FK`, `batch_id FK NULL`, `source_type`, `source_id`, `qty_delta`, `unit_cost`, `occurred_at`, `idempotency_key UQ` | Ledger append-only; perubahan saldo hanya melalui movement. |
| `warehouse_stocks` | `warehouse_id FK`, `product_variant_id FK`, `batch_id FK NULL`, `qty_on_hand`, `qty_reserved`, `PK` | Cache/projection saldo; direkonsiliasi dari ledger dan diperbarui transaksi atomik. |
| `stock_transfers` | `id PK`, `transfer_no UQ`, `origin_branch_id FK`, `destination_branch_id FK`, `status`, `requested_by`, `approved_by` | Header transfer dua cabang; kedua FK eksplisit, tidak memakai branch ambigu. |
| `stock_transfer_items` | `id PK`, `transfer_id FK`, `product_variant_id FK`, `qty_requested`, `qty_shipped`, `qty_received`, `batch_id FK NULL` | Detail kuantitas dan batch; penerimaan/selisih diaudit. |

### 2.3 Sales, procurement, services, veterinary

| Tabel | Kolom inti dan batasan | Tujuan / branch strategy |
|---|---|---|
| `orders` | `id PK`, `order_no UQ`, `branch_id FK`, `customer_id FK NULL`, `status`, `subtotal`, `discount_total`, `tax_total`, `grand_total`, `currency_code` | Order transaksi satu cabang; money fields hasil snapshot. |
| `order_items` | `id PK`, `order_id FK`, `item_type`, `item_id`, `description_snapshot`, `qty`, `unit_price`, `discount`, `tax`, `line_total` | Snapshot item; FK polymorphic harus dikontrol domain atau dipisah product/service FK. |
| `payments` | `id PK`, `payment_no UQ`, `branch_id FK`, `method`, `provider_ref`, `amount`, `status`, `idempotency_key UQ` | Payment record; status provider tervalidasi. |
| `payment_allocations` | `payment_id FK`, `order_id FK`, `amount`, `PK(payment_id,order_id)` | Alokasi pembayaran ke order; total tidak melewati aturan outstanding. |
| `refunds` | `id PK`, `refund_no UQ`, `branch_id FK`, `payment_id FK`, `order_id FK`, `amount`, `reason`, `status`, `approved_by` | Refund terkait payment asli; append/correction. |
| `cash_sessions` | `id PK`, `branch_id FK`, `user_id FK`, `opened_at`, `closed_at`, `opening_amount`, `counted_amount`, `status` | Shift kasir cabang. |
| `cash_movements` | `id PK`, `cash_session_id FK`, `movement_type`, `amount`, `reference_type`, `reference_id` | Cash in/out dan settlement terkait sesi. |
| `purchase_orders` | `id PK`, `po_no UQ`, `branch_id FK`, `supplier_id FK`, `status`, `ordered_at`, `expected_at` | Dokumen pembelian per cabang. |
| `purchase_order_items` | `id PK`, `purchase_order_id FK`, `product_variant_id FK`, `qty_ordered`, `unit_cost` | Detail pembelian; penerimaan parsial dilacak terpisah. |
| `goods_receipts` | `id PK`, `receipt_no UQ`, `branch_id FK`, `purchase_order_id FK`, `received_at`, `status` | Penerimaan ke gudang; membuat stock movements. |
| `goods_receipt_items` | `id PK`, `receipt_id FK`, `purchase_order_item_id FK`, `batch_id FK NULL`, `qty_received` | Penerimaan per item/batch; duplikasi dicegah. |
| `supplier_invoices` | `id PK`, `branch_id FK`, `supplier_id FK`, `purchase_order_id FK`, `invoice_no`, `amount`, `status` | Invoice supplier dan sumber AP. |
| `bookings` | `id PK`, `booking_no UQ`, `branch_id FK`, `customer_id FK`, `pet_id FK`, `service_type`, `starts_at`, `ends_at`, `status` | Header booking layanan per cabang. |
| `service_catalog` | `id PK`, `service_code UQ`, `name`, `duration`, `status` | Master layanan global; price/availability dapat di-override branch. |
| `grooming_sessions` | `id PK`, `booking_id FK`, `branch_id FK`, `groomer_employee_id FK`, `checklist_json`, `qc_by`, `completed_at` | Work record grooming; foto di attachment terkontrol. |
| `hotel_rooms` | `id PK`, `branch_id FK`, `room_type_id FK`, `code`, `capacity`, `status` | Kamar cabang. |
| `hotel_stays` | `id PK`, `booking_id FK`, `room_id FK`, `check_in_at`, `check_out_at`, `status` | Interval aktual; capacity overlap dicek di transaksi. |
| `care_logs` | `id PK`, `stay_id FK`, `employee_id FK`, `event_type`, `scheduled_at`, `completed_at`, `notes` | Makan, minum, obat, aktivitas, observasi; history append-only. |
| `transport_trips` | `id PK`, `booking_id FK`, `branch_id FK`, `driver_employee_id FK`, `vehicle_id FK NULL`, `pickup_address`, `dropoff_address`, `status` | Perjalanan cabang; file bukti privat. |
| `veterinary_appointments` | `id PK`, `branch_id FK`, `pet_id FK`, `customer_id FK`, `doctor_user_id FK`, `starts_at`, `status` | Appointment/queue. |
| `medical_visits` | `id PK`, `branch_id FK`, `appointment_id FK NULL`, `pet_id FK`, `doctor_user_id FK`, `soap_json`, `signed_at`, `version` | Encounter klinis dengan histori revision/addendum. |
| `prescriptions` | `id PK`, `medical_visit_id FK`, `doctor_user_id FK`, `status`, `signed_at` | Resep hasil kunjungan. |
| `prescription_items` | `id PK`, `prescription_id FK`, `product_variant_id FK`, `dose`, `dose_unit`, `route`, `frequency`, `duration` | Dosis dan instruksi; unit/vocabulary tervalidasi. |
| `medicine_dispensings` | `id PK`, `branch_id FK`, `prescription_item_id FK`, `batch_id FK`, `qty`, `dispensed_by`, `dispensed_at` | Dispensing menghasilkan stock movement terkait. |

### 2.4 Finance, system, integrations

| Tabel | Kolom inti dan batasan | Tujuan / branch strategy |
|---|---|---|
| `expenses` | `id PK`, `branch_id FK`, `expense_no UQ`, `amount`, `category`, `status`, `paid_at` | Pengeluaran dan approval. |
| `accounts_receivable` | `id PK`, `branch_id FK`, `order_id FK`, `amount_due`, `amount_paid`, `status` | Saldo tagihan; konsistensi terhadap allocations. |
| `accounts_payable` | `id PK`, `branch_id FK`, `supplier_invoice_id FK`, `amount_due`, `amount_paid`, `status` | Utang supplier. |
| `chart_of_accounts` | `id PK`, `account_code UQ`, `name`, `account_type`, `parent_id FK NULL` | COA organisasi global; mapping per cabang bila disepakati. |
| `journal_entries` | `id PK`, `branch_id FK`, `journal_no UQ`, `period_id FK`, `status`, `source_type`, `source_id`, `posted_at` | Header jurnal; posted tidak dihapus. |
| `journal_entry_lines` | `id PK`, `journal_entry_id FK`, `account_id FK`, `debit`, `credit`, `description` | Constraint debit/credit valid dan balance sebelum post. |
| `notifications` | `id PK`, `user_id FK`, `branch_id FK NULL`, `type`, `payload_json`, `read_at` | In-app notifications; payload tidak mengandung secrets. |
| `audit_logs` | `id PK`, `actor_user_id FK NULL`, `branch_id FK NULL`, `resource_type`, `resource_id`, `action`, `occurred_at`, `correlation_id` | Append-only audit; branch nullable untuk aksi global; redaksi data sensitif. |
| `integration_providers` | `id PK`, `code UQ`, `capability`, `adapter_key`, `version`, `status` | Registry connector yang benar-benar didukung backend. |
| `integration_configurations` | `id PK`, `provider_id FK`, `branch_id FK NULL`, `config_ciphertext`, `enabled`, `last_tested_at` | Secret/config terenkripsi server-side; tidak pernah plaintext di UI/log. |
| `integration_logs` | `id PK`, `provider_id FK`, `branch_id FK NULL`, `operation`, `outcome`, `correlation_id`, `redacted_error`, `occurred_at` | Log minimisasi, tanpa token, credential atau payload PII tak perlu. |
| `file_attachments` | `id PK`, `owner_type`, `owner_id`, `storage_key`, `content_type`, `size_bytes`, `uploaded_by`, `branch_id FK NULL` | Metadata private file; download lewat authorization. |

## 3. Branch strategy dan pengecualian

Wajib `branch_id`: orders, payments, refunds, cash sessions/movements, purchase documents/receipts, stock movement, warehouse, booking, service execution, appointment/medical encounter, expenses, AP/AR, journal entries, employee placement, dan operasional lain yang terjadi di lokasi. Transfer memakai `origin_branch_id` dan `destination_branch_id`.

Tidak memiliki `branch_id` intrinsik: business settings, branch master, user/role/permission master, global catalog/customer/pet, supplier master, service master, COA global. Jika data master memerlukan variasi antar-cabang, gunakan tabel assignment/price/settings yang jelas, bukan mengubah master global secara diam-diam. Audit/integration/file/notification `branch_id` nullable hanya untuk event global atau objek tanpa cabang; policy harus tetap eksplisit.

## 4. Integrity, index, transactions

- Foreign keys untuk semua relasi kuat; CHECK untuk kuantitas/nominal/status yang dapat dinyatakan.
- Unique index: codes, nomor dokumen sesuai scope, SKU, idempotency key, user-role, owner relation.
- Query index utama: `(branch_id, occurred_at)`, `(branch_id, status)`, foreign keys, `(product_variant_id, warehouse_id, batch_id)`, `(pet_id, occurred_at)`, `(customer_id, created_at)`.
- Query dengan PII/medical scope tidak boleh hanya mengandalkan index atau UI; authorization tetap berlaku.
- Transaksi atomik: order + movement, receipt + movement, transfer issue/receipt, payment allocation, dispense + movement, journal posting.
- Row locking/optimistic versioning untuk kapasitas/stock; strategi spesifik DBMS TBD.
- `warehouse_stocks` adalah projection/cache, bukan histori otoritatif; job reconciliation membandingkannya dengan ledger.

## 5. Soft delete, audit, retention dan migration

Master yang direferensikan historis diarsipkan (`status`/`deleted_at`) bukan dihapus. Payment, stock movement, posted journal, medical record dan audit log tidak dihapus melalui CRUD biasa. Retensi per domain, legal hold, privacy deletion/anonymization dan backup retention belum ditentukan. Migration harus versioned, reviewed, diuji pada staging dengan backup/rollback plan; tidak menjalankan migration produksi tanpa approval. Seed protected roles/permissions harus idempotent dan memiliki safeguard.

## 6. Integrasi dan data migration

Migrasi legacy belum bisa dirancang karena tidak ada data sumber. Sebelum migrasi tentukan mapping ID, duplicate customer/pet resolution, unit/harga, saldo awal stok per batch, saldo piutang/utang, rekam medis/consent, rekonsiliasi total dan prosedur cutover. Tidak mengimpor secrets dari source file atau spreadsheet tidak aman.

## 7. Hubungan

Diagram domain dan foreign keys utama ada di [ERD](./07-ERD.md). Semua entitas pada desain masih perlu review engineering dan finance sebelum migration dibuat.
