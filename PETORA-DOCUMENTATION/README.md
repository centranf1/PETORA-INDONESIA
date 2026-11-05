# Dokumentasi PETORA

Paket ini menjadi referensi kebutuhan dan rancangan PETORA: aplikasi web responsif untuk operasional petshop dan pet care dalam satu organisasi dengan banyak cabang. Dokumen membedakan fakta repositori, kebutuhan yang telah dinyatakan, rekomendasi, dan keputusan yang masih menunggu konfirmasi.

## Status sumber

Repositori saat audit hanya menyediakan instruksi proyek di [`AGENT.md`](../AGENT.md), riwayat Git, dan [SRS sumber asli](./00-DOCUMENT-CONTROL/SOURCES/SRS-ORIGINAL.md). SRS asli dipindahkan ke arsip sumber dalam paket ini tanpa mengubah isi. Tidak ditemukan source code aplikasi, migrasi, skema database aktual, API, test, konfigurasi deployment, atau bukti integrasi berjalan. Karena itu paket ini adalah spesifikasi dan rancangan, bukan klaim implementasi.

## Mulai membaca

1. [Audit repositori](./REPOSITORY-AUDIT.md)
2. [Indeks dokumen](./00-DOCUMENT-CONTROL/DOCUMENT-INDEX.md)
3. [Log keputusan dan asumsi](./00-DOCUMENT-CONTROL/23-DECISION-LOG-ASSUMPTIONS.md)
4. Dokumen kebutuhan: `01-REQUIREMENTS/`
5. Dokumen arsitektur: `02-ARCHITECTURE/`

## Konvensi

- Bahasa utama Bahasa Indonesia; istilah teknis baku boleh berbahasa Inggris.
- `CONFIRMED` berarti dinyatakan eksplisit pada spesifikasi sumber, bukan telah dibuktikan dalam implementasi.
- `PROPOSED` adalah rancangan yang direkomendasikan dan belum disetujui pemilik bisnis.
- `TBD` / `REQUIRES BUSINESS CONFIRMATION` menandai keputusan yang belum tersedia.
- ID stabil menggunakan awalan domain, misalnya `SYS-FR-001`, `SEC-001`, `FRD-POS-001`, `API-SALES-001`, dan `TC-SALES-001`.
- Uang disimpan dengan tipe desimal; zona waktu bisnis awal `Asia/Jakarta`; waktu penyimpanan UTC adalah rekomendasi teknis yang harus dikonfirmasi.
- Tidak ada `tenant_id`: arsitektur yang diminta adalah satu organisasi, database terpusat, multi-cabang.

## Pemeliharaan

Perubahan kebutuhan mengikuti [24-CHANGE-MANAGEMENT.md](./00-DOCUMENT-CONTROL/24-CHANGE-MANAGEMENT.md). Setiap perubahan yang memengaruhi kebutuhan harus memperbarui traceability, desain terkait, dan test case. Lihat [laporan validasi](./DOCUMENTATION-VALIDATION-REPORT.md) untuk kelengkapan dan hal yang masih memerlukan keputusan.
