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

## Additional Core Pages

Daftar berikut melengkapi page pattern untuk seluruh area utama. Hak akses ditentukan dari permission/scope server; tabel ini menjelaskan presentasi dan aksi UI, bukan otorisasi.

| Page / feature IDs | Main content and actions | Validation / states | Primary access rule |
| --- | --- | --- | --- |
| Customer & Pet Profile (PET-FTR-005/006) | Customer search, contact/consent summary, pet list, owner relationship, service/transaction timeline, add pet/request ownership change | Duplicate candidate, owner verification, inactive customer, no pets, restricted clinical summary | Staff by customer scope; customer sees own relationship only |
| Product Catalog & Price (PET-FTR-007) | SKU/barcode search, variant/unit, status, stock availability, effective-price history, price-change proposal | Invalid unit/price, conflict, inactive item, branch override and pending approval | Catalog read by assigned org/branch; price mutation permission separate |
| Purchasing & Receiving (PET-FTR-010) | Supplier, PO lines, approval status, received/remaining quantity, batch/expiry entry, invoice match | Partial receipt, quantity mismatch, duplicate invoice, damaged/quarantine status | Purchasing prepares; Inventory receives; approver/Finance has separate actions |
| Booking & Schedule (PET-FTR-012) | Calendar/list, service/resource/staff filters, waitlist if enabled, booking detail and check-in | Slot conflict, capacity reached, pending confirmation, cancellation/no-show, timezone display | Customer own booking; staff assigned service/branch |
| Grooming / Service Visit (PET-FTR-011/015) | Work queue, customer/pet brief, pre-service condition, checklist, additional consent, completion/handover | Missing consent, allergy flag, delayed service, incomplete checklist, incident report | Assigned service staff; clinical details remain restricted |
| Boarding / Daycare (PET-FTR-013) | Occupancy board, room assignment, check-in/out, feeding/medication/care checklist, owner update | Capacity/room unavailable, missed care task, emergency, late pickup, sanitation block | Assigned boarding team; health details limited to care need |
| Transport Dispatch (PET-FTR-014) | Requested pickup/drop, route/driver assignment, pet condition, handover signatures, trip status | Address/area invalid, driver unavailable, delay, safety incident | Assigned operations/driver; customer sees own trip status |
| Clinical Visit & Record (PET-FTR-016/017) | Queue/triage, visit context, vitals/exam, diagnosis, consent, draft/final record, revision timeline | Wrong patient, clinician mismatch, missing consent, allergy alert, save conflict | Assigned veterinarian; finalized content revised, never silently overwritten |
| Pharmacy Dispense (PET-FTR-018) | Prescription work queue, patient and dose check, eligible batch/expiry, dispensed quantity | Invalid/expired prescription, allergy warning, batch expired, insufficient stock | Pharmacist sees minimum clinical info needed and assigned branch stock |
| Membership / Loyalty / Promotion (PET-FTR-019..021) | Membership status/benefit, loyalty event ledger, campaign eligibility and usage | Expired plan, insufficient points, non-stackable promo, branch/period mismatch | Customer own balance; staff campaign edits require specific permission |
| Workforce / Attendance / Payroll (PET-FTR-022..025) | Staff roster, attendance correction requests, commission snapshots, payroll period and itemized review | Missing timesheet, pending correction, closed period, calculation error | HR/Finance only; employee self-view limited to own data |
| Finance / Accounting (PET-FTR-026/027/028) | Cash close/reconciliation, supplier payable, journal preview, period lock, consignment settlement | Difference remains exception, unbalanced journal, duplicate source, approval pending | Finance/Accounting scope; post/close/approve actions separated |
| Reports & Exports (PET-FTR-029) | Report selection, scoped filters, generated file/job status, export history | Empty result, long-running job, denied scope, export expiry | Report permission checked before aggregation and again before download |
| User / Role Administration (PET-FTR-002/003) | Account status, organization/branch assignments, role permission review, access history | Deactivated user, assignment conflict, privilege escalation warning, pending approval | Admin manages allowed organization; role changes audit and may require approval |
| Integration Health (PET-FTR-033) | Provider status, last success/failure, test connection, masked credential status, event backlog | Secret missing/expired, provider timeout/rate limit, webhook verification failure | Super Admin/service owner only; never display or log secret value |

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

