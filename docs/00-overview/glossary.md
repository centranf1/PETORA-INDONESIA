---
title: Glossary
document_id: PET-DOC-0004
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['project-overview.md']
---

# Glossary

Istilah kunci PETORA disusun untuk menjaga konsistensi terminologi di seluruh dokumentasi.

## Core Terms

| Term | Definition |
| --- | --- |
| Organization / tenant | Batas data perusahaan/customer yang dikelola terpisah; bukan sekadar branch. |
| Branch | Lokasi operasional organisasi dengan konfigurasi, user assignment, dan transaksi tersendiri. |
| Branch scope | Akses data yang dibatasi ke cabang tertentu berdasarkan assignment dan permission. |
| Customer | Pemilik/pihak yang bertransaksi atau memberi consent untuk satu atau lebih pet. |
| Pet | Hewan yang menerima layanan; dapat memiliki beberapa owner relation dan satu current primary owner. |
| POS | Point of sale workflow untuk menghitung order, pembayaran, receipt, dan efek transaksi terkait. |
| SKU | Stock keeping unit/kode barang yang dipakai dalam katalog dan inventory. |
| RLS | PostgreSQL Row Level Security yang membatasi baris data di database berdasarkan actor/policy. |
| RBAC | Role-based access control; role mengelompokkan action permission tetapi scope tetap harus diperiksa. |
| FEFO / FIFO | First-expired-first-out / first-in-first-out; aturan rotasi stok sesuai jenis barang/policy yang disetujui. |
| Stock ledger | Catatan append-only pergerakan stok; saldo adalah hasil movement atau projection yang direkonsiliasi. |
| Idempotency key | Identifier request yang mencegah retry/replay menimbulkan efek transaksi duplikat. |
| Effective setting | Versi konfigurasi yang sudah aktif untuk organization/branch pada waktu evaluasi. |
| Version conflict | Perubahan ditolak karena `base_version_no` tidak sama dengan versi aktif terbaru. |
| Reversal / compensating entry | Catatan baru untuk mengoreksi transaksi yang sudah diposting tanpa menghapus sejarah. |

## Operational Terms

No-show adalah booking yang tidak dihadiri tanpa penyelesaian normal; refund mengembalikan pembayaran melalui workflow berotorisasi; settlement menyelesaikan saldo ke supplier/consignment partner; stock opname membandingkan hitung fisik dengan ledger; purchase order (PO) adalah dokumen pemesanan supplier; SLA adalah target waktu operasional yang harus disetujui; journal line debit/credit membentuk jurnal yang harus seimbang; membership benefit dan loyalty point memiliki ledger/history yang terpisah.

## Security Terms

Service role adalah credential server privileged yang dapat bypass RLS dan tidak boleh ada di client. JWT adalah token signed untuk identity/session, bukan otomatis sumber trusted role bila claim berasal dari user-editable metadata. Audit log adalah event perubahan/akses yang append-only sesuai policy. 2FA adalah second authentication factor; enforcement dan recovery rule masih open decision.

## Notes

Nama kolom/table pada [data dictionary](../04-database/data-dictionary.md) adalah logical proposal sampai migration disetujui. Istilah role/permission memakai makna pada [permission matrix](../02-business-analysis/permission-matrix.md).

