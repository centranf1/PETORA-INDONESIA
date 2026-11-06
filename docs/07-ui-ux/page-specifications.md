---
title: Page Specifications
document_id: PET-DOC-0705
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['navigation-structure.md', '../06-frontend/project-structure.md', '../08-security/security-architecture.md']
---

# Page Specifications

Spesifikasi halaman utama PETORA.

## Dashboard

Summary cards, charts, alerts, today operations, and quick actions. Must support organization and branch filters.

## POS

Cart, customer and pet selection, item search, calculator, discount, payment, receipt, and close shift.

## Inventory

Stock card, movement history, batch/expiry summary, reorder alert, and stock adjustment form.

## Clinic

Queue, patient profile, note-taking, diagnosis, prescription, treatment summary, and record history.

## Portal

Booking history, medical access, loyalty balance, membership status, and notifications.

## System Settings Dashboard

### Purpose and Access

Halaman ini digunakan Super Admin untuk mengelola policy dinamis dan oleh Owner untuk meninjau serta menyetujui perubahan yang memerlukan approval. Role lain hanya memperoleh read-only view untuk konfigurasi operasional yang relevan dengan tugasnya. Hak akses final harus mengikuti permission matrix dan RLS, bukan hanya conditional rendering pada frontend.

### Page Areas

| Area | Content / Action |
| --- | --- |
| Scope selector | Organization dan branch yang diizinkan untuk pengguna; nilai scope divalidasi server-side |
| Policy groups | Finance, inventory, service/booking, loyalty, notification, dan system |
| Settings table | Nama setting, nilai aktif, scope, status, last changed, dan actor |
| Detail panel | Deskripsi, tipe nilai, batas valid, dampak, status approval, dan versi aktif |
| Change form | Input sesuai schema, alasan perubahan wajib, tombol validate dan save draft |
| Approval queue | Perubahan pending, nilai sebelum/sesudah, pengaju, alasan, dan aksi approve/reject |
| History | Versi terdahulu, audit event, approval, waktu, actor, serta alasan |

### Main Workflow

1. Pengguna membuka settings melalui menu yang dibatasi role.
2. Halaman memuat policy yang diizinkan untuk organization/branch aktif; error dan empty state dibedakan.
3. Super Admin memilih policy, mengubah nilai, memasukkan alasan, lalu menjalankan validasi.
4. Server mengembalikan kesalahan validasi per field atau ringkasan dampak yang dapat ditampilkan.
5. Untuk perubahan yang memerlukan approval, aksi menyimpan draft dan menampilkan status menunggu persetujuan; nilai aktif tidak berubah.
6. Approver meninjau diff, scope, alasan, dan dampak lalu menyetujui atau menolak dengan alasan.
7. Setelah approval berhasil, aplikasi menampilkan versi aktif baru dan link ke riwayat audit.

### UI States and Interaction

- Loading: skeleton pada group dan tabel, tanpa mengosongkan scope aktif.
- Empty: tampilkan pesan bahwa tidak ada setting pada scope tersebut; jangan menyarankan membuat key baru bila role tidak berwenang.
- Validation error: tampilkan error dekat field terkait dan ringkasan validasi dari server.
- Pending approval: tampilkan nilai aktif dan draft secara berdampingan dengan badge status yang jelas.
- Save conflict: jika versi aktif berubah sejak form dibuka, minta refresh dan tampilkan konflik; jangan menimpa perubahan terbaru.
- Permission denied: sembunyikan aksi mutasi dan tangani penolakan API secara eksplisit.
- Success: konfirmasi apakah perubahan tersimpan sebagai draft atau telah aktif; kedua state tidak boleh disamakan.

### Accessibility and Responsive Behavior

- Semua kontrol dapat dioperasikan dengan keyboard dan memiliki label yang dapat dibaca screen reader.
- Diff nilai sebelum/sesudah tidak boleh hanya dibedakan dengan warna.
- Tabel berubah menjadi daftar detail per-setting pada layar sempit; aksi utama tetap dapat dijangkau tanpa horizontal scroll yang tidak perlu.
- Dialog approval harus menampilkan scope, nilai perubahan, dampak, dan alasan sebelum tombol konfirmasi.

### Open Decisions

- Apakah pembuat perubahan boleh menyetujui usulannya sendiri? Rekomendasi: larang untuk policy berisiko tinggi.
- Apakah setting global benar-benar diperlukan di luar scope organisasi PETORA? Perlu keputusan model tenancy.
- Siapa yang dapat membuat key baru; rekomendasi awal adalah hanya engineering/super admin melalui katalog terkontrol, sementara dashboard mengubah nilai key yang telah terdaftar.

## Related Documents

- [Dynamic configuration security](../08-security/security-architecture.md)
- [Administrator manual](../11-operations/administrator-manual.md)
- [Audit logging](../08-security/audit-logging.md)

