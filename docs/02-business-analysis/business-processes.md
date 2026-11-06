---
title: Business Processes
document_id: PET-DOC-0202
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['use-cases.md']
---

# Business Processes

Dokumen ini merangkum proses utama yang berlangsung di PETORA, termasuk trigger, actor, alur utama, flow alternatif, failure flow, dan aturan akses.

## 1. Proses Checkout POS

- Trigger: kasir mulai transaksi penjualan produk atau layanan
- Aktor: kasir, customer, supervisor, inventory, finance
- Initial state: keranjang kosong, user login valid, branch aktif
- Main flow:
  1. Pelanggan dipilih atau ditambahkan.
  2. Produk atau layanan dipilih dan kuantitas diinput.
  3. Diskon, voucher, pajak, dan biaya layanan dihitung.
  4. Metode pembayaran dipilih dan divalidasi.
  5. Sistem memeriksa ketersediaan stok dan hak akses.
  6. Payment gateway atau cash acceptance diproses.
  7. Stock ledger, sales transaction, payment, loyalty, dan jurnal keuangan dibuat dalam transaksi yang atomik.
  8. Struk dan invoice dibuat lalu diserahkan ke pelanggan.
- Alternative flow: pembayaran campuran, pembayaran sebagian, atau voucher/loyalty redemption.
- Failure flow: stok tidak cukup, metode pembayaran gagal, harga diubah oleh pengguna tidak berwenang, data pelanggan tidak valid.
- Data created/updated: sales, sale_items, payment_records, loyalty_records, stock_movements, journal_entries.
- Hak akses: kasir dapat melakukan checkout; refund/void memerlukan otorisasi supervisor atau owner.

```mermaid
flowchart TD
A[Start Transaction] --> B[Customer Selection]
B --> C[Add Item / Service]
C --> D[Apply Discount / Promo]
D --> E[Validate Stock + Price]
E --> F{Payment Accepted?}
F -- Yes --> G[Create Sale + Payment + Stock Ledger]
G --> H[Generate Receipt + Journal]
F -- No --> I[Cancel / Retry]
I --> J[Audit Log]
```

## 2. Proses Refund dan Pembatalan

- Trigger: pelanggan meminta refund, retur, atau pembatalan transaksi
- Aktor: kasir, supervisor, finance, customer service
- Main flow:
  1. Refund atau void diajukan dengan alasan dan dokumen pendukung.
  2. Sistem memeriksa apakah transaksi sudah dibayar dan statusnya valid untuk refund.
  3. Otorisasi sesuai role dan policy.
  4. Saldo stok, poin loyalitas, dan jurnal keuangan dikoreksi secara konsisten.
  5. Pelanggan menerima konfirmasi refund atau penggantian.
- Failure flow: transaksi tidak ditemukan, sudah lewat batas waktu, atau stock tidak dapat dikembalikan.
- Data created/updated: refund_requests, refund_transactions, journal_entries, loyalty_adjustments, stock_return_records.

## 3. Proses Penerimaan Barang dan Pembelian

- Trigger: purchase order diterima dari supplier atau barang datang ke gudang
- Aktor: purchasing, inventory, warehouse, finance
- Main flow:
  1. PO dibuat dan disetujui.
  2. Barang diterima dan diverifikasi dengan dokumen supplier dan kualitas.
  3. Batch, expiry, dan SKU dicocokkan.
  4. Stok bertambah melalui stock ledger dan barang masuk.
  5. Invoice ditandingkan dengan PO dan penerimaan.
  6. Hutang usaha dan jurnal keuangan dibuat.
- Failure flow: quantity mismatch, barang rusak, invoice tidak cocok, invoice duplicate.

## 4. Proses Stock Opname dan Koreksi Stok

- Trigger: opname periodik atau kebutuhan penyesuaian stok
- Aktor: inventory staff, supervisor, manager
- Main flow:
  1. Penghitungan fisik dilakukan untuk SKU tertentu.
  2. Selisih hitung dipantau dan disetujui.
  3. Sistem menambahkan stock adjustment dengan reason code.
  4. Stock ledger, jurnal persediaan, dan perubahan nilai inventaris dibuat.
- Failure flow: selisih terlalu besar, tanpa approval, atau status barang rusak/karantina.

## 5. Proses Grooming dan Booking Layanan

- Trigger: pelanggan mendaftar booking atau walk-in
- Aktor: customer service, groomer, supervisor
- Main flow:
  1. Booking dibuat dengan layanan, hewan, cabang, dan jadwal.
  2. Kapasitas dipastikan.
  3. Petugas ditugaskan dan kebutuhan hewan dicek.
  4. Check-in dilakukan dan kondisi hewan dicatat.
  5. Proses grooming berjalan dengan checklist.
  6. Hasil layanan, foto, dan catatan tambahan dicatat.
  7. Pembayaran final dan riwayat layanan dibangun.
- Failure flow: jadwal bentrok, no-show, atau layanan dibatalkan.

## 6. Proses Pemeriksaan Klinik dan Resep

- Trigger: pasien datang untuk konsultasi atau follow-up
- Aktor: vet, nurse, pharmacist, owner, customer service
- Main flow:
  1. Pasien didaftarkan dan antrean diperiksa.
  2. Triage dan pemeriksaan dilakukan.
  3. Diagnosis, tindakan, dan resep dibuat oleh dokter.
  4. Jika perlu, obat dikeluarkan dari farmasi berdasarkan resep valid.
  5. Rekam medis diperbarui dan disimpan sebagai snapshot + revision history.
  6. Tagihan dibuat dan pembayaran diproses.
- Failure flow: pasien alergi, resep tidak valid, obat dibatasi, atau tindakan medis membutuhkan consent.

## 7. Proses Pet Hotel / Boarding dan Check-in Check-out

- Trigger: pelanggan melakukan reservasi kamar atau penitipan
- Aktor: staff hotel, manager, owner
- Main flow:
  1. Reservasi dibuat dan kapasitas diperiksa.
  2. Check-in dilakukan dengan profil kebutuhan hewan.
  3. Pemberian makan, obat, dan monitoring dilakukan sepanjang masa penitipan.
  4. Check-out menghasilkan laporan perkembangan, pembayaran, dan riwayat penitipan.
- Failure flow: keterlambatan, dokumentasi tidak lengkap, kondisi hewan darurat, atau fasilitas rusak.

## 8. Proses Keuangan dan Jurnal

- Trigger: transaksi, pembayaran, refund, atau pembukuan harian
- Aktor: finance, accounting, manager
- Main flow:
  1. Event keuangan dibuat berdasarkan transaksi.
  2. Jurnal umum dan jurnal pembantu dibuat.
  3. Reconciliation dilakukan berdasarkan kas, bank, atau metode pembayaran.
  4. Penutupan periode diuji keseimbangan jurnal.
  5. Laporan keuangan diproduksi.
- Failure flow: jurnal tidak balance, piutang atau hutang tidak seimbang, atau transaksi belum lengkap.

## 9. Proses Multi-Cabang dan Konsolidasi

- Trigger: aktivitas organisasi terjadi di satu atau beberapa cabang
- Aktor: owner, manager pusat, admin
- Main flow:
  1. Setiap operasi diarahkan ke branch scope yang valid.
  2. Data diproses di cabang masing-masing.
  3. Data konsolidasi di-aggregate di dashboard pusat.
  4. Laporan perusahaan dibuat berdasarkan organisasi dan cabang.
- Failure flow: akses cabang tidak valid, data tidak konsisten, atau laporan tidak sesuai scope.

## Business Rules Summary

- Semua proses kritis harus dipastikan tercatat di audit log.
- Data finansial dan medis tidak boleh dihapus sepihak.
- Scope data berdasarkan organisasi dan cabang harus selalu diverifikasi sebelum operasional.
- Proses yang melibatkan stok, payment, refund, medical treatment, dan jurnal harus bersifat atomik.

## Related Documents

- [feature-catalog.md](../01-product/feature-catalog.md)
- [user-roles.md](user-roles.md)
- [permission-matrix.md](permission-matrix.md)
- [business-rules.md](business-rules.md)

