---
title: User Manual
document_id: PET-DOC-1106
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['administrator-manual.md']
---

# User Manual

Manual ini menjelaskan workflow target dari README, bukan screenshot/fitur UI yang sudah berjalan. Nama menu dapat berubah setelah implementasi; user harus selalu memastikan organization/branch context sebelum transaksi.

## Starting a Session

Sign in dengan akun pribadi, pilih cabang yang memang ditugaskan bila tersedia, dan cek dashboard/notifikasi yang relevan. Jika cabang atau fitur hilang, hentikan workflow dan hubungi administrator; jangan memakai akun rekan atau meminta role yang lebih luas dari kebutuhan.

## Role Workflows

| Role group | Main workflow | Critical completion check |
| --- | --- | --- |
| Cashier | Pilih customer/pet bila relevan, scan/cari item, tinjau total, konfirmasi payment, kirim receipt, close shift | Payment status confirmed; jangan ulangi checkout saat state provider pending |
| Inventory/Purchasing | Create/approve PO, verifikasi supplier/quantity/batch, receive, transfer/opname melalui movement | Stock card menunjukkan ledger event dan approval yang tepat |
| Grooming/Boarding/Transport | Cek booking, pet condition, instructions/consent, assignment; record progress dan handoff | Checklist dan status layanan lengkap sebelum close/check-out |
| Veterinarian | Verifikasi pet, lakukan triage/exam, record diagnosis/tindakan, consent, finalize | Medical record final tersimpan; koreksi memakai revision dengan alasan |
| Pharmacist | Verifikasi resep final, pet, obat, dosis/lot/expiry dan dispense | Dispensing tercatat pada prescription, medication history, dan stock movement |
| HR/Payroll | Review employee/attendance/commission, jalankan payroll cycle, approval dan payment | Periode/approval/payslip konsisten; jaga kerahasiaan kompensasi |
| Finance/Accounting | Catat cash/bank, reconcile, review journal, close period sesuai permission | Journal balance; posted record dikoreksi melalui reversal |
| Manager/Owner | Review KPI, task queue, approval, branch scope dan reports | Export/approval sesuai data scope dan authority |
| Customer | Kelola profil/pet, booking, pembayaran, history, preferences | Hanya akses pet/medical content yang diizinkan untuk akun sendiri |

## Safe Handling

Jangan membagikan password, token, medical record, payroll, atau export pelanggan lewat channel tidak resmi. Saat error payment/stock/medical, simpan trace ID dan laporkan; hindari mencoba ulang tindakan non-idempotent sebelum status diperiksa. Untuk refund, void, cancellation, atau perubahan data, ikuti permission dan alasan yang diminta sistem.

## Support

Jika akses ditolak atau data tidak sesuai, catat waktu, cabang, workflow, dan trace ID; hubungi administrator/support. Jangan mengubah scope browser, URL ID, atau melakukan transaksi ulang sebagai workaround.

## Related Documents

- [Administrator manual](administrator-manual.md)
- [Troubleshooting](troubleshooting.md)
- [Feature catalog](../01-product/feature-catalog.md)

