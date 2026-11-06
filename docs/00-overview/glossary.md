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

| Term | Definition / PETORA usage |
| --- | --- |
| Organization / tenant | Entitas perusahaan pemilik data; primary isolation boundary |
| Branch | Lokasi operasional milik satu organization; akses mengikuti assignment |
| Owner | Pemilik/bisnis principal organisasi, berbeda dari pet owner |
| Customer / pet owner | Orang atau account yang membeli/memesan layanan dan memiliki hubungan dengan pet |
| Pet | Hewan yang menerima produk/layanan; owner relationship dapat historis dan memiliki satu primary owner sesuai aturan bisnis |
| SKU | Stock Keeping Unit; identitas product/variant untuk katalog dan inventory |
| POS | Point of Sale; workflow cart sampai sale/payment completion |
| Stock ledger | Append-oriented record atas setiap penambahan/pengurangan stok; saldo adalah hasil/projection ledger |
| Batch / expiry | Kelompok barang dengan karakteristik penerimaan/kedaluwarsa yang dapat ditelusuri; skema detail masih TBD |
| FIFO | First In, First Out; rotasi berdasarkan urutan masuk jika policy/item menggunakannya |
| FEFO | First Expired, First Out; rotasi berdasarkan tanggal kedaluwarsa untuk barang yang relevan |
| Stock opname | Pembandingan hitung fisik dengan saldo tercatat; selisih tidak boleh mengubah saldo tanpa adjustment yang disetujui |
| Purchase order (PO) | Dokumen otorisasi pemesanan supplier; bukan bukti barang sudah diterima |
| Receiving | Pencatatan barang fisik yang diterima; dapat parsial terhadap PO dan harus direkonsiliasi |
| Booking / reservation | Reservasi slot/kapasitas layanan atau kamar; memiliki state dan aturan pembatalan/no-show |
| No-show | Pelanggan tidak datang pada booking yang belum dibatalkan sesuai aturan |
| Refund | Pengembalian nilai transaksi melalui linked correction; tidak menghapus sale asli |
| Void | Pembatalan transaksi sesuai state dan otorisasi; dibedakan dari refund setelah pembayaran |
| Payment attempt | Usaha memproses pembayaran ke provider/cash tender dengan status pending/success/failed dan idempotency identity |
| Settlement | Rekonsiliasi/penyelesaian pembayaran provider atau mitra; detail mengikuti provider contract |
| Idempotency key | Kunci untuk mengenali retry request yang sama dan mencegah efek bisnis ganda |
| Journal entry | Pencatatan accounting; debit dan credit harus seimbang dan record posted dikoreksi melalui reversal |
| Membership | Paket hak/benefit pelanggan dengan periode, status dan pemakaian |
| Loyalty event | Event penambahan/penggunaan/koreksi poin; saldo tidak diubah tanpa event sumber |
| RLS | Row-Level Security PostgreSQL yang membatasi baris sesuai context dan policy |
| RBAC | Role-Based Access Control; role mengelompokkan permission, namun scope/record checks tetap diperlukan |
| JWT | Token bertanda tangan untuk identity/session claims; claim akses hanya dari metadata yang server kelola |
| Service role | Credential privileged backend yang dapat melewati RLS; tidak pernah dikirim ke browser |
| Audit event | Catatan actor, action, scope, waktu, reason, target dan correlation ID untuk perubahan/akses kritis |
| Outbox | Record transaksi yang memastikan event eksternal dapat dikirim ulang setelah commit tanpa kehilangan event |
| SLO / SLA | SLO adalah target internal kualitas layanan; SLA adalah komitmen kontraktual dan tidak boleh disamakan |

Nama tabel dan enum hanya menjadi kontrak setelah tercantum di database design/data dictionary dan disetujui. Istilah yang belum memiliki keputusan dicatat di open decisions.

## Related Documents

- [Data Dictionary](../04-database/data-dictionary.md)
- [Business Rules](../02-business-analysis/business-rules.md)
- [Open Decisions](../13-traceability/open-decisions.md)

