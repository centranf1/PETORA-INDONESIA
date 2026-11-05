# Glosarium dan Data Dictionary

## Istilah bisnis dan teknis

| Istilah | Definisi |
|---|---|
| Organisasi bisnis | Satu entitas PETORA yang mengoperasikan banyak cabang; bukan tenant SaaS. |
| Cabang (`branch`) | Unit operasional yang memiliki pengguna, transaksi, gudang, jadwal, dan laporan lokal. |
| Data scope | Batas record yang boleh dilihat pengguna, misalnya milik sendiri atau ditugaskan. |
| RBAC | Role-Based Access Control; izin tindakan diberikan lewat role dan diperiksa backend. |
| Permission | Hak atas tindakan pada resource/modul, misalnya `sales.refund`. |
| POS | Point of Sale untuk membuat order dan menerima/alokasikan pembayaran. |
| Order | Dokumen komersial berisi satu atau lebih item produk/layanan; dapat dibayar bertahap. |
| Payment allocation | Hubungan nilai pembayaran dengan order/piutang; memungkinkan pembayaran parsial. |
| Stock movement | Catatan perubahan stok yang tidak ditimpa; sumber audit saldo persediaan. |
| Batch | Lot persediaan dengan nomor lot dan, bila relevan, tanggal kedaluwarsa. |
| FIFO / FEFO | FIFO menggunakan urutan masuk; FEFO memprioritaskan kedaluwarsa terdekat. |
| Booking | Permintaan reservasi layanan dengan waktu, hewan, pelanggan, dan cabang. |
| Medical record | Catatan klinis terstruktur yang memiliki pembuat, waktu, histori dan kontrol akses. |
| Adapter / connector | Komponen backend yang menerjemahkan kontrak PETORA ke API/protokol provider. |
| Soft delete | Penandaan record terhapus tanpa menghilangkan jejak referensi/transaksi. |
| RPO / RTO | Batas kehilangan data yang dapat diterima / waktu pemulihan target; keduanya TBD. |

## Kamus field lintas-domain (rancangan)

| Field | Tipe konseptual | Aturan |
|---|---|---|
| `id` | UUID/ULID, PROPOSED | Primary key stabil; implementasi spesifik DBMS belum dipilih. |
| `branch_id` | FK nullable hanya untuk domain global | Wajib pada transaksi operasional; tidak dibuat nullable tanpa alasan domain. |
| `status` | enum/check atau lookup | Nilai harus domain-spesifik; perubahan mengikuti state machine. |
| `currency_code` | string 3 karakter, PROPOSED | ISO 4217; default IDR perlu approval. |
| `amount` | decimal fixed-point | Hindari floating point untuk uang; precision/scale ditetapkan saat pemilihan DB. |
| `quantity` | decimal | Mendukung satuan pecahan bila produk mengizinkan; aturan unit dikonfirmasi. |
| `occurred_at` | timestamp UTC (PROPOSED) | Tampilkan dalam zona bisnis/cabang. |
| `created_at`, `updated_at` | timestamp | Audit teknis dasar; zona penyimpanan diseragamkan. |
| `created_by`, `updated_by` | FK user | Wajib untuk perubahan penting jika user tersedia; sistem mencatat actor service secara eksplisit. |
| `deleted_at` | timestamp nullable | Hanya untuk master yang boleh diarsipkan; transaksi finansial tidak dihapus biasa. |
| `reference_no` | string | Nomor manusiawi unik per jenis dokumen dan lingkup yang diputuskan; format TBD. |
| `is_active` | boolean | Status master; bukan pengganti status transaksi. |

## Status konseptual

Status di bawah adalah kosakata usulan; status final dan transisi memerlukan persetujuan domain:

| Domain | Status awal yang disarankan |
|---|---|
| Order | `draft`, `pending_payment`, `partially_paid`, `paid`, `cancelled`, `refunded` |
| Payment | `pending`, `authorized`, `succeeded`, `failed`, `cancelled`, `refunded` |
| Purchase order | `draft`, `submitted`, `approved`, `partially_received`, `received`, `cancelled` |
| Stock transfer | `draft`, `submitted`, `approved`, `in_transit`, `received`, `rejected`, `cancelled` |
| Grooming | `pending`, `confirmed`, `checked_in`, `in_progress`, `quality_check`, `completed`, `paid`, `cancelled` |
| Hotel stay | `reserved`, `checked_in`, `checked_out`, `cancelled`, `no_show` |
| Appointment | `requested`, `confirmed`, `checked_in`, `in_consultation`, `completed`, `cancelled`, `no_show` |
| Integration | `disabled`, `enabled`, `connection_failed`, `degraded` |

## Format, unit, dan lokalisasi

- Bahasa antarmuka utama: Bahasa Indonesia (dinyatakan dalam spesifikasi).
- Zona waktu default: `Asia/Jakarta` (dinyatakan dalam spesifikasi); dukungan zona per cabang TBD.
- Mata uang: Rupiah disebut sebagai kebutuhan lokalisasi; mata uang tunggal IDR perlu konfirmasi.
- Format tanggal yang tampil: sesuai locale Indonesia, pilihan tanggal/waktu harus konsisten dan ambigu-tanggal dihindari.
- Satuan berat, ukuran, dosis, dan durasi wajib disimpan beserta unit; daftar unit standar TBD dan tidak boleh dikonversi tanpa aturan.
- Batas pembulatan harga, volume, dosis, dan kuantitas perlu persetujuan domain.

## Entitas utama

Nama entitas yang dipakai konsisten di paket: `branches`, `users`, `roles`, `permissions`, `customers`, `pets`, `products`, `warehouses`, `stock_movements`, `orders`, `order_items`, `payments`, `bookings`, `medical_visits`, `suppliers`, `purchase_orders`, `employees`, `audit_logs`, dan `integration_configurations`. Detail relasi ada di [desain database](../02-ARCHITECTURE/06-DATABASE-DESIGN.md).
