---
title: Feature Catalog
document_id: PET-DOC-0103
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['product-requirements-document.md']
---

# Feature Catalog

Katalog fitur PETORA mencatat fitur utama sesuai README.md dengan ID, tujuan, pengguna utama, serta aturan bisnis yang mengikat.

## Feature List

| Feature ID | Nama Fitur | Tujuan | Pengguna Utama | Kondisi Prasyarat | Aturan Bisnis Utama |
| --- | --- | --- | --- | --- | --- |
| PET-FTR-001 | Dashboard Management | Menyediakan ringkasan operasional perusahaan dan cabang | Owner, Manager, Supervisor | User login dan data branch valid | Dashboard harus mengikuti scope organisasi/branch dan membatasi data sensitif |
| PET-FTR-002 | User Management | Mengelola akun pengguna dan profil | Admin, Super Admin | User memiliki organisasi | Akun nonaktif tetap punya riwayat; pengguna baru harus terikat ke branch dan role |
| PET-FTR-003 | Role & Permission | Mengatur hak akses per modul dan aksi | Super Admin, Owner | Role kebijakan ditetapkan | Scope harus bersifat own, branch, all, atau assigned_records |
| PET-FTR-004 | Branch Management | Mengelola cabang, gudang, kas, dan operasional cabang | Super Admin, Owner | Perusahaan memiliki cabang | Cabang nonaktif tidak menerima transaksi baru, tetapi riwayat tetap tersimpan |
| PET-FTR-005 | Customer Management | Mengelola pelanggan dan hubungan dengan perusahaan | Admin, CS, Kasir | Identitas pelanggan valid | Nomor telepon unik dalam organisasi; data pelanggan tidak dihapus jika ada riwayat transaksi |
| PET-FTR-006 | Pet Management | Mengelola data hewan dan kesehatannya | Admin, Vet, CS | Pelanggan atau staf terdaftar | Satu hewan hanya punya satu pemilik utama; perubahan pemilik dibatasi otorisasi |
| PET-FTR-007 | Product Management | Mengelola produk, varian, harga, dan katalog | Admin, Inventory, Purchasing | Produk memiliki kategori dan unit | Harga jual, harga minimum, dan harga cabang harus diverifikasi |
| PET-FTR-008 | Inventory & Warehouse | Mengelola stok, penerimaan, transfer, opname, dan kardeks stok | Inventory Staff, Manager | Gudang dan branch tersedia | Semua pergerakan stok harus terdokumentasi dan tidak bisa diubah tanpa transaksi yang valid |
| PET-FTR-009 | POS & Sales Management | Mengolah penjualan produk dan layanan | Kasir, Supervisor | Produk, pelanggan, dan metode pembayaran valid | Checkout harus idempotent; refund/void memerlukan otorisasi dan alasan |
| PET-FTR-010 | Purchasing & Supplier | Mengelola PO, penerimaan, hutang, dan pembelian | Purchasing Staff, Manager | Supplier dan akun vendor dibuat | PO harus sesuai receivable dan barang yang diterima cocok dengan dokumen pembelian |
| PET-FTR-011 | Grooming Management | Menjalankan layanan grooming dan dokumentasi hasil | Groomer, Supervisor | Booking dan customer profile ada | Setiap layanan harus ada status, catatan kondisi, dan riwayat tindakan |
| PET-FTR-012 | Booking & Reservation | Mengelola jadwal layanan, reservasi, dan kapasitas | Staff, Customer Portal | Layanan dan cabang dipilih | Kapasitas harus dicek untuk mencegah overbooking |
| PET-FTR-013 | Pet Hotel & Daycare | Mengelola kamar, check-in, monitoring, dan check-out | Staff hotel, Manager | Kamar dan kapasitas tersedia | Monitoring harian dan catatan kesehatan wajib tersedia selama penitipan |
| PET-FTR-014 | Transport Management | Mengelola penjemputan dan pengiriman hewan | Driver, Staff Operasional | Lokasi dan jadwal valid | Checklist kondisi hewan wajib dipenuhi sebelum dan sesudah perjalanan |
| PET-FTR-015 | Home Grooming Management | Menangani layanan grooming di rumah pelanggan | Groomer, CS | Area service dan jadwal valid | Perjalanan petugas, perlengkapan, dan konfirmasi pelanggan harus terdokumentasi |
| PET-FTR-016 | Veterinary Management | Mengelola pemeriksaan klinik dan penugasan dokter | Veterinarian, Staff Klinik | Booking dan data hewan ada | Triage, diagnosis, dan tindakan medis harus terdokumentasi |
| PET-FTR-017 | Medical Records Management | Menyimpan histori medis hewan dan revisi rekam | Veterinarian, Admin | Pasien dan dokter valid | Rekam final tidak boleh diubah langsung; revisi harus menyimpan snapshot sebelumnya |
| PET-FTR-018 | Pharmacy & Medicine | Mengelola obat, resep, pengeluaran, dan persediaan farmasi | Pharmacist, Vet | Obat dan resep valid | Obat resep hanya bisa dikeluarkan dengan resep yang sah |
| PET-FTR-019 | Membership Management | Menjalankan program keanggotaan pelanggan | Admin, CS | Paket membership dibuat | Benefit harus diatur per level dan cabang |
| PET-FTR-020 | Loyalty Management | Mengelola poin pelanggan dan reward | Kasir, Admin, CS | Program loyalty aktif | Poin dapat dibatalkan pada refund dan harus tercatat dalam riwayat |
| PET-FTR-021 | Promotion Management | Menyusun promo dan bundling | Marketing, Admin | Produk/layanan target dibuat | Promo harus validated berdasarkan cabang, periode, dan segment pelanggan |
| PET-FTR-022 | Staff Management | Mengelola data karyawan dan penugasan | HR, Manager | Struktur organisasi ada | Data karyawan harus terhubung ke user dan cabang |
| PET-FTR-023 | Attendance Management | Mengelola clock-in dan presensi | HR, Staff | Jadwal dan shift dibuat | Kehadiran harus dapat disesuaikan melalui proses persetujuan dan koreksi |
| PET-FTR-024 | Commission Management | Menghitung komisi pegawai atas penjualan dan layanan | HR, Manager | Aturan komisi ditentukan | Snapshot aturan komisi harus ikut disimpan saat transaksi terjadi |
| PET-FTR-025 | Payroll Management | Mengelola gaji, lembur, dan pembayaran SDM | HR, Finance | Absensi dan komisi tersedia | Gaji harus diperiksa sebelum pembayaran dan dicatat di keuangan |
| PET-FTR-026 | Finance Management | Mengelola kas, pengeluaran, dan piutang | Finance, Manager | Rekening dan akun tersedia | Setiap cash movement harus ada bukti, kode, dan jurnal pendukung |
| PET-FTR-027 | Accounting Management | Menyusun jurnal, buku besar, neraca, dan laporan finansial | Accounting, Finance | Chart of account aktif | Jurnal yang diposting tidak boleh dihapus tanpa koreksi yang terdokumentasi |
| PET-FTR-028 | Consignment Management | Mengelola stok titipan supplier/mitra | Inventory, Finance | Mitra konsinyasi dibuat | Pembagian keuntungan dan settlement perlu riwayat terstruktur |
| PET-FTR-029 | Reports & Business Analytics | Menyajikan laporan operasional dan bisnis | Owner, Manager, Staff | Data transaksi tersedia | Export dan laporan harus mengikuti scope organisasi dan cabang |
| PET-FTR-030 | Notification Management | Mengirimkan reminder dan notifikasi operasional | Admin, CS, System | Template notifikasi dibuat | Konten notifikasi harus sesuai preferensi dan frekuensi yang diizinkan |
| PET-FTR-031 | Customer Portal | Menyediakan akses pelanggan ke layanan sendiri | Customer | akun pelanggan aktif | Pelanggan hanya mengakses data yang diizinkan, bukan seluruh data organisasi |
| PET-FTR-032 | System Settings | Mengatur konfigurasi operasional dan organisasi | Super Admin | Setup perusahaan ada | Pengaturan harus disimpan dengan versi dan audit |
| PET-FTR-033 | Integration Settings | Mengelola koneksi eksternal dan API | Super Admin, Developer | Provider eksternal siap | Secret dan token tidak boleh disimpan di frontend atau repo |

## Feature Priority

P0 features include inventory, POS, payment, clinical records, finance, and security. P1 includes CRM and advanced reporting. P2 includes e-commerce and advanced analytics.

## Critical Acceptance Themes

- Semua fitur utama harus memiliki workflow spesifik dan permission check.
- Semua transaksi kritis harus terdokumentasi dengan audit trail.
- Setiap fitur harus terhubung dengan data master dan modul terkait.
- Fitur customer-facing harus membatasi akses data sesuai hubungan pemilik dan cabang.

## Traceability Notes

Setiap fitur utama memiliki workflow, database mapping, acceptance criteria, dan test scenario yang harus diperbarui jika terjadi perubahan.

## Open Decisions

Feature roadmap sequencing and phase release still require stakeholder approval.

