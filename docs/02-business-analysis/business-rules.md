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

User must memiliki active organization membership; branch-scoped action memerlukan branch assignment/permission. Branch nonaktif menolak operasi baru tetapi histori tetap disimpan dan hanya dapat ditinjau sesuai akses. Tenant isolation, actor identity, and audit are mandatory. Paid/posted transactions are corrected by explicit refund/reversal/revision, not direct overwrite. Exact rules marked open must be approved before production.

## Stock Rules

Saldo stok berasal dari ledger/movement dan tidak dapat diubah direct. Receipt, sale, transfer, return, adjustment, expiry, quarantine, and dispensing memiliki source reference, actor, scope, timestamp, and reason where applicable. Negative stock allowance, FEFO/FIFO applicability, opname tolerance, and reserve/commit timing are **open decisions**. Implementasi menolak stock mutation tanpa authorized movement regardless of UI.

## Clinical Rules

Finalized medical record immutable; correction membuat revision dengan snapshot, actor, timestamp, and reason. Prescription/distribution requires authorized veterinarian and valid clinical status; detail controlled-medicine/legal scope memerlukan Clinical/Legal decision. Customer sees only explicitly approved owner-visible data. Emergency treatment/consent process belum final.

## Finance Rules

Journal posting harus balance per currency/period dan linked ke source event; posted entries dikoreksi melalui reversal. Payment/refund/void harus berotorisasi, idempotent, direkonsiliasi ke cash/bank/provider, and auditable. Chart of accounts, fiscal period, tax, rounding, approval threshold, and bank reconciliation rules are open decisions.

## Promotion Rules

Promo, voucher, membership, and loyalty eligibility dihitung server-side menggunakan effective policy/version, branch scope, period, audience, usage limits, and customer status. Stacking order, expiry, rounding, refund reversal, and maximum discount values require business decision; client amount is never authoritative.

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

| Policy Type | Example keys (no agreed value) | Control requirement |
| --- | --- | --- |
| refund_policy | eligibility window, partial-refund rule | Finance approval, transaction snapshot, audit |
| loyalty_policy | earn ratio, expiry, reversal rule | Product/Finance approval, immutable point ledger |
| stock_policy | negative-stock rule, count variance threshold | Inventory approval; cannot bypass ledger/tenant integrity |
| service_policy | capacity, cancellation/deposit rule | Operations approval; concurrency-safe evaluation |
| notification_policy | reminder timing, frequency, retry limit | Consent/preferences, rate limit, delivery audit |
| security_policy | role assignments, MFA/session behavior | Security-owned control; no weakening of tenant isolation or server auth |

Nilai contoh numerik yang pernah muncul di draft sebelumnya tidak merupakan requirement atau default kebijakan. Hapus dari runtime seed sampai Business Owner menyetujui nilai efektif dan tanggal berlaku.

### Validation Requirement

Setiap perubahan konfigurasi harus diuji pada environment staging sebelum berlaku di production. Bila policy mengubah transaksi kritis, maka perlu revisi workflow, acceptance criteria, dan test scenario.

### Non-configurable Security Invariants

Dashboard tidak dapat menonaktifkan RLS, mengubah trusted actor identity, membocorkan service-role secret, melewati tenant isolation, menghapus audit/ledger historis, atau memaksa state transaksi yang tidak sah. Konfigurasi hanya mengubah policy bisnis yang terdaftar dan tervalidasi. Security changes require separately governed deploy/review, not an ordinary setting update.

## Related Documents

- [Dynamic settings architecture](../04-database/database-design.md)
- [Permission matrix](permission-matrix.md)
- [Open decisions](../13-traceability/open-decisions.md)

