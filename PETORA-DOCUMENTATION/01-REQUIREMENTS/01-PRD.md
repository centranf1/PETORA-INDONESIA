# 01 — Product Requirements Document (PRD)

**Status:** Draft untuk persetujuan bisnis  
**Sumber kebutuhan:** [SRS sumber asli](../00-DOCUMENT-CONTROL/SOURCES/SRS-ORIGINAL.md) dan dokumen requirement paket ini; lihat [audit](../REPOSITORY-AUDIT.md). `AGENT.md` mengatur perilaku kerja agen, bukan menjadi sumber kebijakan produk.

## 1. Ringkasan produk

PETORA adalah sistem web responsif terintegrasi untuk satu organisasi petshop dan pet care yang menjalankan banyak cabang. Sistem menyatukan penjualan retail, inventaris, pembelian, layanan grooming/hotel/daycare, klinik hewan, data pelanggan dan hewan, operasional staf, finance, notifikasi, laporan, serta portal pelanggan. Database dan kontrol sistem terpusat; operasi dibatasi oleh izin serta cabang pengguna.

Belum ada source code aplikasi di repositori. Semua kemampuan pada dokumen ini adalah kebutuhan atau rencana, bukan klaim fungsi yang sudah berjalan.

## 2. Visi, misi, dan masalah

**Visi:** menyediakan satu sumber data operasional dan riwayat layanan hewan yang konsisten bagi seluruh cabang PETORA.

**Misi produk:** menghubungkan transaksi retail, stok, layanan, klinik, pelanggan, dan pelaporan melalui proses yang dapat diaudit; memberi akses sesuai pekerjaan dan cabang; memungkinkan pelanggan menggunakan layanan melalui browser.

**Masalah yang dituju (perlu validasi baseline):**

- Data transaksi dan pelanggan berpotensi terpisah antar-cabang atau sistem.
- Pengendalian persediaan, batch, kedaluwarsa, dan transfer membutuhkan jejak yang konsisten.
- Jadwal grooming, hotel, daycare, konsultasi, dan transportasi memerlukan pemeriksaan kapasitas.
- Riwayat hewan, layanan, pembayaran, dan medis perlu tersedia sesuai otorisasi.
- Pemilik bisnis memerlukan ringkasan operasional lintas cabang tanpa membuka data ke pengguna yang tidak berwenang.

## 3. Sasaran dan indikator keberhasilan

Target angka belum disediakan; pemilik produk harus menetapkan baseline, target, populasi, dan periode sebelum peluncuran.

| Sasaran | Metrik usulan | Target |
|---|---|---|
| Keutuhan transaksi | Persentase order yang cocok dengan payment allocation dan kas | TBD |
| Akurasi persediaan | Selisih stok fisik dibanding ledger per SKU/cabang | TBD |
| Efisiensi layanan | Waktu dari booking sampai layanan selesai | TBD |
| Adopsi cabang | Cabang aktif menggunakan alur inti per minggu | TBD |
| Akses pelanggan | Booking dan histori yang berhasil diselesaikan melalui portal | TBD |
| Keamanan | Insiden akses lintas cabang/antar-customer yang terkonfirmasi | Target nol; definisi pengukuran TBD |
| Kinerja | P95 endpoint/page inti pada beban yang disepakati | TBD; spesifikasi sumber hanya menyebut target halaman 2–3 detik pada kondisi normal |
| Keandalan | Availability bulanan dan hasil uji pemulihan | TBD |

## 4. Pengguna dan persona

| Persona | Tujuan | Kebutuhan utama / batas akses |
|---|---|---|
| Super Admin | Mengonfigurasi sistem dan semua cabang | User/role/permission, konfigurasi, integrasi, audit; akses global terlindungi. |
| Admin kantor pusat | Mengawasi proses yang didelegasikan | Laporan dan operasi sesuai permission; tidak dapat menjadi Super Admin. |
| Admin/Manajer cabang | Menjalankan operasi cabang | Data cabang yang ditugaskan; approval hanya bila diizinkan. |
| Kasir | Membuat order, menerima pembayaran, menutup shift | POS dan sesi kas; refund/void memerlukan izin khusus. |
| Staf persediaan/purchasing | Mengelola barang, PO, penerimaan dan transfer | Pergerakan stok melalui dokumen dan approval, bukan edit saldo langsung. |
| Groomer / pet-care staff | Menyelesaikan work order dan perawatan | Hanya booking/record yang ditugaskan; kondisi hewan dan instruksi yang relevan. |
| Dokter | Melayani pasien dan menjaga rekam klinis | Appointment dan catatan medis sesuai penugasan; akses keuangan tidak otomatis. |
| Customer | Mengelola profil dan layanan milik sendiri | Pets, booking, order, membership, notifikasi, dan rekam medis yang diizinkan. |
| Finance / accountant | Rekonsiliasi dan laporan keuangan | Data finansial sesuai scope; jurnal posted tidak dihapus biasa. |

## 5. Nilai produk

- Konsolidasi pelaporan dan master data yang sesuai antar-cabang.
- Pengurangan kesalahan stok melalui movement ledger dan transfer terkontrol.
- Kesinambungan konteks layanan melalui profil hewan dan riwayat.
- Alur booking serta POS yang terhubung ke pembayaran dan operasional.
- Penerapan least privilege lewat permission berbasis aksi, data scope, dan branch scope.
- Integrasi dapat diaktif/nonaktifkan tanpa menjadikan provider eksternal syarat operasi inti.

## 6. Cakupan produk

### Dalam cakupan

Autentikasi; user, role, permission, cabang dan pengaturan; customer dan pet; produk, POS, retur dan diskon; gudang, batch, movement dan transfer; supplier, purchasing dan receiving; grooming, home grooming, hotel, daycare, transport dan booking; veterinary, medical records, prescription, vaccination dan pharmacy; membership, loyalty dan promosi; employee, attendance, jadwal dan komisi; kas, payment, expenses, AP/AR dan accounting; dashboard, laporan, audit, notifikasi; portal pelanggan; konfigurasi integrasi.

### Di luar cakupan eksplisit / belum diputuskan

- Aplikasi native Android/iOS.
- Multi-tenant SaaS untuk organisasi berbeda.
- Provider tertentu yang belum dipilih atau adapter yang belum tersedia.
- Payroll penuh, kepatuhan pajak/akuntansi spesifik, e-invoicing, dan legal compliance yang belum disetujui.
- Perangkat keras tertentu selain kebutuhan interoperabilitas POS/scanner/printer yang perlu validasi.
- Klaim diagnosis atau keputusan klinis otomatis.

## 7. Kapabilitas dan dependensi

| Kapabilitas | Dependensi utama |
|---|---|
| POS & sales | Product/pricing, customer opsional, cabang, inventory, cash session, payment |
| Stock | Product/unit, warehouse, receiving, sales, returns, transfer dan adjustment |
| Service booking | Customer/pet, service catalog, branch schedule, capacity/resource, payment |
| Veterinary | Customer/pet, appointment, doctor schedule, medical history, pharmacy |
| Membership/loyalty | Customer, order/payment yang memenuhi aturan poin, promotion |
| Finance/accounting | Orders, payments, refunds, expenses, purchasing, branch dan approval |
| Reporting | Sumber data domain, status final, hak akses dan definisi metrik |
| Integrations | Provider registry, adapter backend, secret storage, webhook dan logs |

## 8. Ekspektasi nonfungsional

Responsive pada desktop/tablet/ponsel; otorisasi backend; transaksi dan relasi konsisten; dukungan browser modern; bahasa Indonesia dan format lokal; desain modular; monitoring, backup, dan aksesibilitas. Target kinerja halaman 2–3 detik dari SRS merupakan target awal yang perlu skenario beban dan ambang pengujian disepakati.

## 9. Kendala, asumsi, dan risiko

- Kendala: satu organisasi, database pusat, empat role bawaan, sistem web, tanpa tenant isolation.
- Asumsi: IDR dan `Asia/Jakarta` sebagai default, perlu konfirmasi untuk mata uang, format dan zona cabang.
- Risiko: detail finansial/medis yang belum disetujui dapat memicu desain ulang; cakupan 35+ domain berisiko memperpanjang delivery; ketergantungan provider dapat mengganggu proses bila tidak memiliki fallback.
- Mitigasi: fase release, keputusan domain terukur, audit trail, idempotensi, dan pengujian cabang serta recovery.

## 10. Roadmap ringkas

1. Foundation: auth, RBAC, branch, audit, konfigurasi.
2. Retail: customer/pet, catalog, stock, purchasing, POS dan payment.
3. Pet care: booking, grooming, hotel/daycare, transport.
4. Veterinary: appointment, medical record, prescription, pharmacy.
5. Management: HR, finance/accounting sesuai prioritas, loyalty dan laporan.
6. Integrations & scale: adapter terpilih, monitoring, hardening, performa, recovery.

Urutan dapat berubah setelah dependency, risiko, dan prioritas bisnis disetujui. Detail pada [roadmap](../04-DEVELOPMENT/15-DEVELOPMENT-ROADMAP.md).

## 11. Referensi

- [SRS](./02-SRS.md)
- [FRD](./03-FRD.md)
- [Keputusan dan asumsi](../00-DOCUMENT-CONTROL/23-DECISION-LOG-ASSUMPTIONS.md)
- [Traceability](./21-REQUIREMENT-TRACEABILITY-MATRIX.md)
