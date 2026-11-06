---
title: Business Rules
document_id: PET-DOC-0203
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['permission-matrix.md']
---

# Business Rules

Aturan bisnis ini menjadi baseline proses transaksi dan kontrol internal.

## General Rules

- User must have an active organization membership and valid branch assignment for the requested operation; a browser-supplied scope is not authorization.
- Inactive branches reject new operational transactions while permitted history remains available to authorized users.
- Paid, posted, finalized, or dispensed records cannot be silently edited or deleted; corrections use a linked reversal/revision workflow.
- Use `pending`, `completed`, `failed`, `cancelled`, and `reversed` states only where each state transition is defined; do not treat timeout as success.

## Stock Rules

Stock movement must be tracked in an append-oriented ledger and cannot be changed outside valid transactions. Stock negative is prohibited unless an approved policy explicitly enables it; stock reservation, concurrent checkout, damaged/quarantine stock, and adjustment thresholds need complete domain rules before implementation.

## Clinical Rules

Medical records finalization requires revision rather than direct overwrite. Prescription of controlled medicine requires doctor authorization.

## Finance Rules

Journal must balance. Payment reconciliation and refund must produce linked financial entries. Void or refund requires authorization, reason, idempotency, provider reconciliation where applicable, and a linked correction record.

## Promotion Rules

Discounts, vouchers, and loyalty redemption must be validated against policy and customer status.

## Dynamic Policy Configuration Rules

Beberapa aturan bisnis tidak dapat dianggap final karena dapat berubah seiring kebutuhan organisasi. Oleh karena itu, PETORA harus menyediakan mekanisme konfigurasi dinamis yang dapat diatur oleh Super Admin dari dashboard frontend.

### Konfigurasi yang dibuat dinamis

- Kebijakan harga per cabang dan per kategori layanan
- Aturan komisi dan bonus karyawan per satuan layanan atau produk
- Kebijakan refund dan void sesuai tipe transaksi atau jam operasional
- Kebijakan pembatalan booking, deposit, dan biaya pembatalan
- Aturan stock negative, toleransi selisih opname, dan status barang rusak/karantina
- Kebijakan reward, expiry poin, dan stacking promo
- Template notifikasi dan frekuensi pengiriman pesan
- Pengaturan jam operasional, kapasitas layanan, dan prioritas antrean
- Kebijakan akses medis, role approval, dan persetujuan tindakan tertentu

### Rule Implementation

- Semua konfigurasi dinamis harus dibaca melalui server-side policy service dari setting key yang allowlisted dan schema-validated; client tidak membaca atau mengubah tabel langsung.
- Nilai default hanya berlaku sebagai baseline, bukan final policy.
- Perubahan konfigurasi tidak boleh dilakukan secara langsung dari browser tanpa validasi server yang memastikan role dan scope.
- Konfigurasi yang memengaruhi keuangan atau data medis harus memiliki proses approval dan audit trail.
- Proposal pending/rejected tidak mengubah nilai aktif; penerapan membandingkan expected version dan menulis active value, version, serta audit secara transaksional.

### Example Policy Types

| Policy Type | Example Value | Controlled by |
| --- | --- | --- |
| refund_policy | max_refund_hours = 24, allow_partial_refund = true | Super Admin |
| loyalty_policy | point_ratio = 1:1000, expiry_days = 365 | Super Admin |
| stock_policy | allow_negative_stock = false, opname_tolerance = 2 | Super Admin |
| service_policy | max_booking_per_slot = 5, cancellation_fee = 10% | Super Admin |
| notification_policy | reminder_before_minutes = 60, retry_policy = 3 | Super Admin |

Nilai pada tabel di atas adalah ilustrasi tipe policy, bukan angka yang disetujui atau production default. Final schema, range valid, approval owner, dan scope per key harus dikelola di policy catalog dan open-decision register.

### Validation Requirement

Setiap perubahan konfigurasi harus diuji pada environment staging sebelum berlaku di production. Bila policy mengubah transaksi kritis, maka perlu revisi workflow, acceptance criteria, dan test scenario.

