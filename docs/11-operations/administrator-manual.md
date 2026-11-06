---
title: Administrator Manual
document_id: PET-DOC-1105
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['user-manual.md', '../07-ui-ux/page-specifications.md', '../08-security/security-policies.md', '../08-security/audit-logging.md']
---

# Administrator Manual

Manual administrator mendeskripsikan tugas pengelolaan lingkungan PETORA.

## Tasks

User management, branch settings, role permission, app configuration, reports, backup validation, and access review.

## Approvals

Role changes and finance adjustments require approval and audit trail. Customer or patient data requires policy review before export.

## Dynamic Settings Administration

### Prerequisites

- Gunakan akun pribadi dengan role yang sesuai; akun bersama tidak diperbolehkan.
- Pastikan organization dan branch scope yang dipilih benar.
- Untuk perubahan kritis, pastikan tersedia approver yang berwenang dan jalur eskalasi.
- Jangan memasukkan password, token, secret provider, atau data pasien ke alasan perubahan.

### Create or Change a Setting

1. Buka **System Settings** dan pilih policy group serta scope yang tepat.
2. Periksa nilai aktif, status, versi, dan perubahan terakhir sebelum mengedit.
3. Masukkan nilai baru hanya pada key yang tersedia; jangan membuat key baru sebagai workaround.
4. Isi alasan perubahan dengan konteks kebutuhan bisnis dan tanggal efektif yang diminta bila didukung.
5. Jalankan validasi dan periksa semua pesan validasi serta peringatan dampak.
6. Simpan perubahan. Jika perlu approval, pastikan statusnya **Pending Approval** dan jangan menganggap nilai runtime telah berubah.
7. Buka riwayat untuk memastikan event perubahan tercatat.

### Review and Approve

1. Buka antrean approval dan pilih usulan yang relevan dengan tanggung jawab.
2. Verifikasi pemohon, scope organization/branch, nilai sebelum/sesudah, alasan, dan dampak operasional.
3. Tolak perubahan yang scope-nya tidak sesuai, tidak memiliki alasan memadai, atau melanggar batas policy; masukkan alasan penolakan.
4. Setujui hanya setelah pemeriksaan lengkap. Setelah berhasil, verifikasi status **Active** dan nomor versi baru.
5. Untuk policy high-risk, gunakan reviewer berbeda dari pemohon sebagai rekomendasi pemisahan tugas; kebijakan final memerlukan persetujuan pemilik bisnis.

### Rollback and Incident Handling

- Jika perubahan menghasilkan dampak tidak diinginkan, hentikan perubahan lanjutan dan hubungi owner/Super Admin.
- Gunakan mekanisme rollback versi yang disediakan sistem; jangan mengedit tabel database secara manual.
- Catat incident/reference ID dan alasan rollback, lalu verifikasi hasil pada workflow terdampak.
- Jika ada indikasi akses tidak sah, segera nonaktifkan session/akun yang terlibat sesuai prosedur incident response dan pertahankan bukti audit.

### Prohibited Actions

- Mengubah configuration melalui direct SQL di production sebagai prosedur rutin.
- Berbagi akun approver atau meminjam session orang lain.
- Menyetujui perubahan tanpa memeriksa organization/branch scope dan nilai diff.
- Menyalin secret ke setting yang dapat dibaca client.
- Menganggap save draft sama dengan apply/activation.

## Open Decisions

- Pemilik bisnis perlu menetapkan matriks approver per kategori setting dan ambang perubahan yang memerlukan approval.
- Retention dan masa berlaku approval pending belum ditetapkan; usulan awalnya mengikuti kebijakan retensi audit dan memiliki SLA review yang disepakati.
- Prosedur emergency rollback dan kewenangan override perlu disahkan sebelum production.

## Related Documents

- [Page specifications](../07-ui-ux/page-specifications.md)
- [Security policies](../08-security/security-policies.md)
- [Audit logging](../08-security/audit-logging.md)
- [Incident response](incident-response.md)

