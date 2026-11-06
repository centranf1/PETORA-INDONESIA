---
title: Operational Guidelines
document_id: PET-DOC-1101
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['incident-response.md', 'troubleshooting.md', '../11-operations/administrator-manual.md', '../08-security/audit-logging.md']
---

# Operational Guidelines

Pedoman operasional PETORA untuk tim dan pengguna.

## Daily Operations

Check dashboard alerts, review outstanding payment, close cash, process backlog, and verify stock minimum warnings.

## Shift Handoff

Cashier and operator handover must record cash count, outstanding tasks, and exceptions. Reports should be reviewed before closing shift.

## Maintenance

Regular backup validation, performance checks, schema migration validation, and platform health review.

## Dynamic Settings Operations

### Routine Review

- Tinjau antrean approval dan setting berisiko tinggi sesuai jadwal operasional yang ditetapkan Owner.
- Pastikan setiap perubahan aktif memiliki versi, alasan, approver bila diwajibkan, dan audit event.
- Periksa perubahan terbaru pada refund, pricing, stock, service, clinical, dan access policy sebelum periode operasional penting.
- Jangan menyalin nilai setting atau audit export ke kanal yang tidak memiliki kontrol akses.

### Change Verification

Setelah perubahan policy aktif:

1. pastikan status/version yang ditampilkan sesuai keputusan approval;
2. lakukan satu pemeriksaan operasional yang aman pada workflow terkait tanpa membuat transaksi nyata bila tersedia test mode;
3. periksa alert/error dan audit event dengan request ID;
4. catat hasil verifikasi dan eskalasi perbedaan nilai runtime;
5. bila dampak tidak aman, gunakan proses rollback yang disetujui dan tangani sebagai incident bila data/transaksi sudah terpengaruh.

### Reconciliation and Escalation

Perubahan yang berdampak pada transaksi yang sudah berjalan tidak boleh diasumsikan berlaku retroaktif. Tim harus memastikan batas waktu efektif dan perilaku transaksi in-flight telah ditentukan. Jika tidak ada aturan yang disepakati, tahan penerapan dan minta keputusan Owner/Product.

## Operational Open Decisions

- Jadwal review approval, SLA respons, dan eskalasi ketika tidak ada approver belum ditetapkan.
- Perilaku efektif untuk transaksi yang dimulai sebelum policy berubah perlu ditentukan per policy.
- Frekuensi pemeriksaan audit dan dashboard anomaly perlu disesuaikan dengan kapasitas operasi dan risiko.

## Related Documents

- [Administrator manual](administrator-manual.md)
- [Audit logging](../08-security/audit-logging.md)
- [Incident response](incident-response.md)

