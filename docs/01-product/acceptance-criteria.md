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

Dokumen ini menetapkan acceptance criteria level baseline untuk requirement PETORA. Detail field, state transition, dan batas policy tetap mengikuti workflow/domain spec yang terkait.

## Requirement Acceptance Matrix

| Requirement ID | Acceptance Criteria |
| --- | --- |
| PET-REQ-001 | Given user terikat pada organization dan branch aktif, when membuka atau membuat operasi cabang, then sistem hanya menampilkan cabang yang diizinkan, menolak cabang nonaktif untuk transaksi baru, dan mempertahankan histori cabang. |
| PET-REQ-002 | Given akun dan role berubah, when akses diberikan atau dicabut, then request berikutnya menegakkan permission terbaru di server/RLS; akun nonaktif tidak dapat login namun histori aktivitas tetap terhubung. |
| PET-REQ-003 | Given customer/pet memiliki relasi kepemilikan, when data dibaca atau owner diubah, then akses mengikuti relasi dan otorisasi; perubahan owner mencatat actor, waktu, alasan, dan histori. |
| PET-REQ-004 | Given produk memiliki unit dan harga, when harga diubah atau dipakai di transaksi, then validasi batas/branch berlaku dan transaksi menyimpan snapshot harga serta aturan yang digunakan. |
| PET-REQ-005 | Given stock movement diterima, dipindah, disesuaikan, dijual, atau diretur, when transaksi commit, then ledger dan saldo konsisten, scope gudang/branch benar, dan batch/expiry tercatat bila berlaku. |
| PET-REQ-006 | Given kasir memiliki permission dan cart valid, when checkout dikirim satu kali atau di-retry dengan idempotency key sama, then tepat satu transaksi/payment tercatat; refund, retur, dan void mengikuti otorisasi dan audit. |
| PET-REQ-007 | Given purchase order dan receiving dibuat, when barang diterima sebagian/penuh, then kuantitas penerimaan serta invoice dapat direkonsiliasi dan stock/AP hanya berubah sesuai transaksi yang sah. |
| PET-REQ-008 | Given booking/reservasi dan kapasitas layanan, when dua permintaan bersaing untuk slot yang sama, then kapasitas tidak terlampaui; check-in, pelaksanaan, pembatalan, dan serah-terima memiliki status serta histori. |
| PET-REQ-009 | Given kunjungan medis dan resep, when dokter berwenang memfinalisasi rekam medis atau farmasi mendispense obat, then identitas pasien/otoritas valid, rekam final tidak ditimpa, dan dispensing tercatat ke stok. |
| PET-REQ-010 | Given membership dan loyalty event, when transaksi memenuhi aturan atau dibatalkan/refund, then benefit dan poin dihitung sekali, dapat dikoreksi melalui event, dan memiliki histori yang dapat direkonsiliasi. |
| PET-REQ-011 | Given promotion memiliki scope, periode, dan eligibility, when diterapkan pada cart, then rule stacking/batas dihitung server-side dan alasan promo yang diterapkan tersimpan pada transaksi. |
| PET-REQ-012 | Given periode payroll, attendance, komisi, dan persetujuan tersedia, when payroll dihitung dan disahkan, then komponen dapat ditelusuri ke sumbernya, akses dibatasi, dan pembayaran direkonsiliasi. |
| PET-REQ-013 | Given cash/bank movement, consignment settlement, or journal is posted, when commit/close occurs, then amounts reconcile to approved source documents, debit equals credit, and final records are corrected through linked reversal/adjustment rather than silent overwrite. |
| PET-REQ-014 | Given report/export diminta, when role dan scope diterapkan, then hasil tidak melampaui permission/branch, agregasi dilakukan pada server, dan export sensitif tercatat. |
| PET-REQ-015 | Given notification atau portal request, when penerima mengakses informasi, then preferensi, status pengiriman, dan hubungan customer/pet membatasi data; retry tidak menggandakan efek bisnis. |
| PET-REQ-016 | Given setting baru atau perubahan setting diajukan, when schema/scope/approval divalidasi, then versi aktif hanya berubah sesuai alur yang disetujui dan semua perubahan tercatat pada audit/version history. |
| PET-REQ-017 | Given integrasi dikonfigurasi, when koneksi atau webhook diproses, then secret tidak terekspos ke browser/log, signature diverifikasi, dan retry/timeout tidak menggandakan transaksi. |
| PET-REQ-018 | Given user mencoba akses lintas tenant/branch atau data sensitif, when authorization dievaluasi di API/RLS, then akses yang tidak sah ditolak tanpa kebocoran payload dan menghasilkan audit/security event sesuai kebijakan. |

## Cross-Cutting Acceptance

- Semua mutasi memvalidasi payload di server dan memberi respons sukses/gagal yang dapat ditindaklanjuti.
- Request idempotent yang diulang tidak membuat efek pembayaran, stok, poin, atau jurnal ganda.
- Scope organization/branch berasal dari trusted authentication context dan diverifikasi terhadap assignment.
- Record sensitif memiliki role/scope checks, audit sesuai kebijakan, serta redaction pada log dan export.
- Setiap requirement mempunyai test ID pada [test-to-requirement mapping](../13-traceability/test-to-requirement-mapping.md).

## Domain-Specific High-Risk Checks

Checkout, stock deduction, refund, payment reconciliation, medical record finalization, prescription dispensing, payroll approval, journal posting, settings approval, and report export require negative-path and authorization tests before release.

## Related Documents

- [PRD](product-requirements-document.md)
- [Test Scenarios](../09-testing/test-scenarios.md)
- [Requirements Traceability Matrix](../13-traceability/requirements-traceability-matrix.md)

