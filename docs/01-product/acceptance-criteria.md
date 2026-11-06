---
title: Acceptance Criteria
document_id: PET-DOC-0106
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['feature-catalog.md']
---

# Acceptance Criteria

Kriteria berikut merupakan baseline untuk requirement canonical pada [PRD](product-requirements-document.md). Status tetap Draft sampai disetujui pemilik produk/bisnis. Setiap kriteria perlu diwujudkan dalam automated test atau UAT case yang tertaut.

## Cross-cutting Criteria

- Semua mutasi menolak user tanpa permission dan menghormati organization/branch scope di server/database.
- Validation failure tidak menghasilkan partial transaction; respons memberikan error code yang stabil tanpa membocorkan data sensitif.
- Perubahan/transaksi yang wajib audit mencatat actor, timestamp, target, reason bila diperlukan, dan correlation ID.
- Loading, empty, success, failure, permission-denied, dan conflict states dapat dipahami pengguna.

## Requirement Acceptance Matrix

| Requirement ID | Acceptance criteria |
| --- | --- |
| PET-REQ-001 | User hanya melihat cabang yang ditugaskan; cabang nonaktif menolak operasi baru tetapi histori dapat ditinjau sesuai permission; perubahan role/assignment diaudit. |
| PET-REQ-002 | Customer dapat dicari dan terhubung ke pet; nomor telepon unik sesuai aturan organisasi; multi-owner menjaga satu primary owner; histori tetap terhubung. |
| PET-REQ-003 | Produk/layanan menyimpan identitas, unit, harga dan price history; konversi unit dan harga cabang divalidasi; transaksi menyimpan price snapshot. |
| PET-REQ-004 | Setiap penerimaan, pengeluaran, transfer, adjustment, retur, atau expiry menghasilkan movement ledger; saldo tidak diubah langsung; policy FIFO/FEFO diterapkan. |
| PET-REQ-005 | Server menghitung ulang harga/discount/tax; idempotency mencegah duplicate checkout; payment state dan receipt konsisten; refund/void memerlukan authority dan reversal. |
| PET-REQ-006 | PO, receiving parsial, invoice, dan payable dapat dibandingkan; mismatch/duplicate invoice ditahan untuk review; hanya kuantitas diterima menambah stok. |
| PET-REQ-007 | Booking tidak melampaui kapasitas pada concurrent request; grooming menyimpan check-in, kondisi, status, hasil, petugas, dan histori. |
| PET-REQ-008 | Kamar/kapasitas tervalidasi saat reservasi/check-in; monitoring, makan/obat, insiden, dan check-out terhubung ke pet serta booking. |
| PET-REQ-009 | Perjalanan memiliki jadwal, assignment, status, biaya, dan handoff; home grooming memvalidasi service area, jadwal, petugas, dan perlengkapan. |
| PET-REQ-010 | Kunjungan klinik memiliki pasien, dokter, triage, pemeriksaan, diagnosis/tindakan, dan consent relevan sebelum finalisasi. |
| PET-REQ-011 | Rekam medis final tidak ditimpa; revisi menyimpan snapshot, actor, timestamp, dan alasan; customer hanya membaca informasi yang diberi izin. |
| PET-REQ-012 | Dispensing memerlukan resep final dari dokter berwenang, memeriksa alergi/expiry/lot bila datanya tersedia, dan menghasilkan stock movement. |
| PET-REQ-013 | Membership/loyalty memakai policy aktif dan menyimpan ledger benefit/poin; refund membuat adjustment terkait dan tidak menghapus histori. |
| PET-REQ-014 | Promo tervalidasi terhadap waktu, cabang, audience, kuota, stacking, dan batas diskon; harga final dihitung server-side. |
| PET-REQ-015 | Attendance, commission, dan payroll memakai periode/snapshot rule; approval sesuai kewenangan; pembayaran terhubung ke finance dengan HR data terbatas. |
| PET-REQ-016 | Kas, hutang/piutang, consignment settlement, dan jurnal dapat direkonsiliasi; posted journal seimbang dan dikoreksi melalui reversal. |
| PET-REQ-017 | Report/export mengikuti scope; notification delivery tercatat; portal membatasi profil, pet, transaksi, dan medical content sesuai izin. |
| PET-REQ-018 | Settings/integrations divalidasi server-side; critical settings mengikuti approval/version/audit; secret tidak muncul di client; retry aman dan terpantau. |

## Release Gate

Tidak ada fitur yang diterima hanya berdasarkan demo UI. Test harus mencakup successful path, negative authorization/validation, data integrity, audit, serta failure/retry path yang relevan. Requirement lintas role, tenant, branch, atau transaksi wajib memiliki integration/database test sebelum UAT.

