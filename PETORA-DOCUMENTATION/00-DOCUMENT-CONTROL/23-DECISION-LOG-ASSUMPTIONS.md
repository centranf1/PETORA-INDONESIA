# Log Keputusan, Asumsi, dan Pertanyaan Terbuka

## Keputusan eksplisit dalam spesifikasi sumber

| ID | Keputusan / ketentuan | Status sumber | Dampak |
|---|---|---|---|
| DEC-001 | PETORA melayani satu organisasi bisnis dengan banyak cabang; bukan multi-tenant SaaS. | CONFIRMED sebagai kebutuhan | Tidak membuat `tenant_id`; isolasi operasional menggunakan cabang dan policy. |
| DEC-002 | Platform adalah responsive web, bukan aplikasi native Android/iOS. | CONFIRMED sebagai kebutuhan | UI, navigasi, dan pengujian disusun untuk browser responsif. |
| DEC-003 | Empat role sistem wajib: Super Admin, Admin, Dokter, Customer; identitas sistem dilindungi dari penghapusan biasa. | CONFIRMED sebagai kebutuhan | Role bawaan dan custom role harus dibedakan. |
| DEC-004 | Dynamic RBAC, branch access, dan data scope diperiksa backend. | CONFIRMED sebagai kebutuhan | Menu tersembunyi tidak dianggap kontrol otorisasi. |
| DEC-005 | Database terpusat; transaksi operasional membawa cabang kecuali pengecualian terdokumentasi. | CONFIRMED sebagai kebutuhan | Laporan pusat dan filter cabang harus konsisten. |
| DEC-006 | Integrasi menggunakan adapter; secrets tetap backend; layanan eksternal tidak menjadi syarat fungsi inti. | CONFIRMED sebagai kebutuhan | Provider baru yang belum didukung memerlukan adapter backend. |
| DEC-007 | Perubahan stok mempunyai movement ledger; perubahan saldo langsung tidak diperbolehkan. | CONFIRMED sebagai kebutuhan | Semua penerimaan, penjualan, retur, transfer, dan adjustment menghasilkan ledger. |

## Asumsi / rancangan yang belum disetujui

| ID | Asumsi atau proposal | Status | Konsekuensi bila berubah |
|---|---|---|---|
| ASM-001 | Mata uang default adalah IDR karena sumber menyebut rupiah. | PROPOSED, perlu konfirmasi | Format nominal, pembulatan, laporan, dan konfigurasi mata uang. |
| ASM-002 | Zona waktu default `Asia/Jakarta`; simpan timestamp UTC dan tampilkan sesuai zona bisnis/cabang. | PROPOSED (zona sumber disebut; penyimpanan UTC rekomendasi) | Penjadwalan lintas zona dan batas tanggal laporan. |
| ASM-003 | REST API dengan versi `/api/v1` digunakan sebagai kontrak awal. | PROPOSED | Implementasi gateway, client, dan backward compatibility. |
| ASM-004 | Identitas tabel menggunakan UUID/ULID dan kolom `created_at`, `updated_at`, `created_by`, `updated_by`. | PROPOSED | Ukuran indeks, urutan ID dan migrasi. |
| ASM-005 | Dokumen ini mengusulkan relational database tetapi tidak memilih vendor/DBMS. | PROPOSED | Tipe khusus, locking, indeks, dan migration syntax. |
| ASM-006 | Status finansial dan booking dalam dokumen API/FRD adalah rancangan awal; transisi perlu validasi domain. | PROPOSED | Rekonsiliasi, pembatalan, refund dan laporan. |
| ASM-007 | RPO/RTO belum ditetapkan; angka tidak dikarang. | TBD | Kapasitas backup, biaya, arsitektur recovery. |

## Pertanyaan yang memerlukan keputusan bisnis

| ID | Pertanyaan | Pemilik keputusan yang disarankan | Prioritas |
|---|---|---|---|
| Q-001 | Aturan pajak, harga sudah/ belum termasuk pajak, tarif per cabang, serta pembulatan? | Finance / pemilik bisnis | Tinggi |
| Q-002 | Kebijakan refund, retur, void, DP, biaya gateway, metode pembayaran, dan persetujuan? | Finance / operasi | Tinggi |
| Q-003 | Metode akuntansi, chart of accounts, periode buku, dan kebutuhan kepatuhan lokal? | Finance / akuntan | Tinggi |
| Q-004 | Batas keterlihatan dan persetujuan untuk rekam medis, consent, dan akses keluarga pemilik? | Dokter / privacy owner | Tinggi |
| Q-005 | Aturan kapasitas dan overbooking hotel/daycare, pembatalan, deposit, dan no-show? | Operasional layanan | Tinggi |
| Q-006 | Aturan komisi, payroll integration, persetujuan, dan perhitungan pajak/potongan? | HR / finance | Tinggi |
| Q-007 | Data apa boleh dihapus, retensi setiap domain, serta legal hold? | Legal / pemilik data | Tinggi |
| Q-008 | Provider payment, email, WhatsApp, peta, penyimpanan berkas; kebutuhan sandbox dan webhook? | Product / engineering | Sedang |
| Q-009 | Jumlah cabang, concurrent users, transaksi harian, target availability dan performa? | Operasi / engineering | Sedang |
| Q-010 | Apakah identifikasi pelanggan wajib unik berdasar nomor telepon atau email; bagaimana duplikasi ditangani? | Customer operations | Sedang |
| Q-011 | Bahasa tambahan, zona waktu cabang, format nomor dokumen, serta kebijakan penomoran? | Pemilik bisnis | Sedang |
| Q-012 | Apakah accounting native wajib pada release awal atau cukup integrasi/ekspor? | Pemilik bisnis / finance | Sedang |

## Konflik

Belum ditemukan konflik eksplisit antar-artifact implementasi karena tidak ada source code atau dokumen lain selain SRS. Kekurangan detail bukan persetujuan kebijakan; keputusan pada Q-001 sampai Q-012 tetap terbuka.

## Approval

| ID keputusan | Disetujui oleh | Tanggal | Catatan |
|---|---|---|---|
| (isi saat review) | TBD | TBD | Tidak ada persetujuan stakeholder di repositori saat audit. |
