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

## Core Module Page Inventory

Page names are logical surfaces; routing and exact page composition remain subject to UX validation. Every page displays authorized scope and handles loading, empty, error, and forbidden states.

| Feature | Primary page surfaces | Primary action / key content |
| --- | --- | --- |
| PET-FTR-001 | Dashboard by role/scope | Scoped KPIs, operational queues, expiring stock, tasks and report drill-down |
| PET-FTR-002, PET-FTR-003, PET-FTR-004 | User/Role Admin, Branch Setup, Warehouse/Cash Setup | Invite/deactivate, assign permission/scope, manage branch lifecycle |
| PET-FTR-005, PET-FTR-006 | Customer List/Detail, Pet Profile/Ownership | Search, interaction/transaction history, owner management, health flags |
| PET-FTR-007 | Product/Service Catalog, Price History | Catalog, units, branch price, supplier links, effective dates |
| PET-FTR-008 | Inventory Overview, Stock Card, Receiving, Transfer, Opname | Movement timeline, batch/expiry, adjustment/approval, discrepancy |
| PET-FTR-009 | POS, Payment Status, Refund, Shift Close | Search/cart, customer/pet, server-priced total, payment and reconciliation |
| PET-FTR-010 | Supplier Detail, Purchase Request/Order, Receiving, Invoice Match | PO approval, partial receipt, mismatch review, payable status |
| PET-FTR-011, PET-FTR-012 | Service Calendar, Booking Detail, Grooming Queue/Session | Capacity, staff assignment, check-in, condition, execution and completion |
| PET-FTR-013 | Boarding Dashboard, Room Plan, Stay Detail, Care Timeline | Availability, check-in/out, monitoring tasks, incident, invoice |
| PET-FTR-014, PET-FTR-015 | Transport Dispatch/Trip, Home Grooming Schedule/Visit | Driver/vehicle, travel status, handoff evidence, coverage and kit checklist |
| PET-FTR-016, PET-FTR-017 | Clinic Queue, Visit, Medical Record/Revision | Triage, exam, diagnosis/action, consent, version history and visibility |
| PET-FTR-018 | Pharmacy Queue, Prescription Detail, Dispensing | Prescriber/status, batch/expiry, quantity and usage history |
| PET-FTR-019, PET-FTR-020 | Membership Plan/Customer Benefits, Loyalty Ledger | Enrollment, expiry, benefit usage, earn/redeem/reversal history |
| PET-FTR-021 | Promotion List/Editor, Eligibility Preview | Rule composition, audience, scope, quota, schedule, impact preview |
| PET-FTR-022, PET-FTR-023, PET-FTR-024 | Employee Detail, Roster, Attendance, Commission Review | Assignment, correction approval, rule snapshot and calculation |
| PET-FTR-025 | Payroll Cycle, Review, Approval, Payslip | Restricted compensation view, variance, approval, disbursement status |
| PET-FTR-026, PET-FTR-027, PET-FTR-028 | Cash/Bank, Payables/Receivables, Journal/Period, Consignment | Reconciliation, balanced posting, settlement, close and audit trail |
| PET-FTR-029 | Report Catalog, Query/Export, Scheduled Report | Scope/date filters, freshness, permission, export status and audit |
| PET-FTR-030, PET-FTR-031 | Notification Center/Preferences, Customer Portal | Delivery history, opt-in/out, profile/pet, allowed bookings/records |
| PET-FTR-032, PET-FTR-033 | Settings Dashboard, Approval Queue, Audit History, Integrations | Draft/active diff, version, approval, secret-masked connection health |

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

