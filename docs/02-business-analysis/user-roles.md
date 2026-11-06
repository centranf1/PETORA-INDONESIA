---
title: User Roles
document_id: PET-DOC-0204
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['permission-matrix.md']
---

# User Roles

Dokumen ini menguraikan peran yang digunakan pada sistem dan tanggung jawabnya.

## Default Roles

PETORA mendefinisikan persona awal berikut; organisasi dapat menyesuaikan assignment tanpa mengubah prinsip least privilege:

| Role | Responsibility boundary |
| --- | --- |
| Super Admin | Konfigurasi organisasi dan governance sistem dalam scope yang ditugaskan; bukan jalur untuk melewati security controls |
| Owner | Monitoring business, keputusan dan approval pemilik organisasi |
| Branch Manager | Operasi dan kontrol cabang yang ditugaskan |
| Administrator | Administrasi data dan workflow operasional yang diizinkan |
| Cashier | Penjualan, pembayaran, dan shift kasir |
| Inventory Staff | Penerimaan, pergerakan, opname, dan evidensi stok |
| Purchasing Staff | Supplier, permintaan pembelian, PO, dan rekonsiliasi receiving |
| Groomer / Service Staff | Pelaksanaan dan dokumentasi layanan yang ditugaskan |
| Veterinarian | Pemeriksaan, diagnosis, tindakan, dan tanggung jawab klinis |
| Pharmacist | Validasi resep dan penyerahan obat yang sah |
| Customer Service | Komunikasi, booking, dan keluhan pelanggan yang ditugaskan |
| HR / Payroll Staff | Data karyawan, kehadiran, dan persiapan penggajian |
| Finance / Accounting Staff | Pembayaran, rekonsiliasi, kas, jurnal, dan laporan finansial sesuai grant |
| Customer | Self-service untuk akun, hewan milik sendiri, booking, dan informasi yang secara eksplisit diizinkan |

## Role Design

Role dibuat dinamis dan harus dijamin permission tidak lebih luas dari kebutuhan kerja. Role dapat diberi otorisasi own, branch, all, assigned_records.

Role adalah kumpulan permission, bukan satu-satunya sumber keputusan. Evaluasi access juga mempertimbangkan organization membership, active branch assignment, ownership/assignment record, data sensitivity, dan workflow state. Default role tidak otomatis memberi akses ke semua modul yang namanya mirip.

## Separation of duties

Kasir tidak seharusnya mengubah kebijakan harga atau menyetujui refund tanpa kewenangan. Dokter tidak diberikan akses ke payroll kecuali ada kebutuhan khusus.

## Customer Access

Pelanggan hanya dapat melihat data pribadi, hewan miliknya, layanan yang telah dibayar, dan rekam medis yang diizinkan oleh dokter.

## Lifecycle and Governance

- Akun dibuat, dihubungkan ke user/auth identity dan organization, lalu diberi role serta scope yang disetujui.
- Perubahan role, branch assignment, atau status akun dicatat dengan actor, waktu, alasan, dan approval bila disyaratkan.
- Offboarding menonaktifkan akses tanpa memutus foreign keys atau menghapus histori transaksi.
- Role baru memerlukan owner, daftar permission, scope, risiko, dan test negatif sebelum digunakan.

## Open Decisions

Final role catalog, role stacking, global Super Admin authority, customer consent/medical visibility, and approval limits require stakeholder approval in the [open decision register](../13-traceability/open-decisions.md).

## Related Documents

- [Permission Matrix](permission-matrix.md)
- [Authentication and Authorization](../05-backend/authentication-authorization.md)
- [Security Architecture](../08-security/security-architecture.md)

