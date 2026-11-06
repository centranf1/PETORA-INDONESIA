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

User must be assigned to an organization and branch. A branch may be active or inactive, but historical records must remain visible for audit. Transactions cannot be edited after payment without defined compensation workflow.

## Stock Rules

Stock movement must be tracked and cannot be changed outside valid transactions. Stock negative is prohibited unless explicit setting is enabled by business policy.

## Clinical Rules

Medical records finalization requires revision rather than direct overwrite. Prescription of controlled medicine requires doctor authorization.

## Finance Rules

Journal must balance. Payment reconciliation and refund must produce linked financial entries. Void or refund requires authorization and reason code.

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

- Semua konfigurasi dinamis harus diakses melalui table setting, configuration, atau metadata policy yang di-join ke runtime logic.
- Nilai default hanya berlaku sebagai baseline, bukan final policy.
- Perubahan konfigurasi tidak boleh dilakukan secara langsung dari browser tanpa validasi server yang memastikan role dan scope.
- Konfigurasi yang memengaruhi keuangan atau data medis harus memiliki proses approval dan audit trail.

### Example Policy Types

| Policy Type | Example Value | Controlled by |
| --- | --- | --- |
| refund_policy | max_refund_hours = 24, allow_partial_refund = true | Super Admin |
| loyalty_policy | point_ratio = 1:1000, expiry_days = 365 | Super Admin |
| stock_policy | allow_negative_stock = false, opname_tolerance = 2 | Super Admin |
| service_policy | max_booking_per_slot = 5, cancellation_fee = 10% | Super Admin |
| notification_policy | reminder_before_minutes = 60, retry_policy = 3 | Super Admin |

### Validation Requirement

Setiap perubahan konfigurasi harus diuji pada environment staging sebelum berlaku di production. Bila policy mengubah transaksi kritis, maka perlu revisi workflow, acceptance criteria, dan test scenario.

