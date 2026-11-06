---
title: Test Scenarios
document_id: PET-DOC-0908
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-plan.md']
---

# Test Scenarios

Dokumen ini mencatat scenario testing penting dengan ID dan prioritas.

## PET-TST-001

Checkout with valid stock and payment. Preconditions: user has cashier role and inventory available. Expected: sale created, payment accepted, stock reduced, receipt generated.

## PET-TST-002

Refund flow by authorized manager. Expected: refund recorded, stock reversal if applicable, and loyalty points adjusted.

## PET-TST-003

Branch isolation. Expected: same user cannot access another branch data without grant.

## PET-TST-004

Prescription validation. Expected: no controlled medicine release without doctor authorization.

## PET-TST-005

Accounting balance. Expected: journal total debits equal credits and close period fails if not balanced.

## Canonical Core Scenarios

Semua skenario berikut berstatus **designed / not executed**. Sebelum implementasi, siapkan fixture minimal dua organization, dua branch per organization, pengguna dengan assignment berbeda, dan data referensi yang konsisten.

| Test ID | Requirement | Preconditions / data | Steps and expected result | Negative case / priority |
| --- | --- | --- | --- | --- |
| PET-TST-010 | PET-REQ-001 | User aktif Org A, assignment Branch A; record Branch B dan Org B | Query/read Branch A succeeds; Branch B/Org B rows tidak terlihat | Manipulated branch/org ID ditolak; P0 |
| PET-TST-011 | PET-REQ-001 | Cashier, manager, admin, dan revoked assignment | Coba action sesuai dan di luar permission; role update menghasilkan audit | Self-elevation dan revoked role ditolak; P0 |
| PET-TST-012 | PET-REQ-002 | Customer phone duplikat dan pet multi-owner | Buat customer/pet, ubah primary owner; histori ownership tetap ada | Duplicate phone/invalid owner ditolak; P1 |
| PET-TST-013 | PET-REQ-003 | Produk dengan unit conversion, branch price, dan min price | Checkout request berisi unit/price valid; server memakai catalog price snapshot | Manipulasi harga/konversi oleh client ditolak; P0 |
| PET-TST-014 | PET-REQ-004 | Satu unit stok tersisa; dua transaksi concurrent | Jalankan dua reservation/checkout bersamaan; paling banyak satu berhasil bila negative stock disabled | Duplicate movement dan unauthorized adjustment ditolak; P0 |
| PET-TST-015 | PET-REQ-005 | Sale valid, payment provider sandbox, duplicate request | Submit checkout dua kali dengan idempotency key; satu sale/payment effect; reconcile provider event | Invalid amount, duplicate webhook, timeout provider tidak menghasilkan charge kedua; P0 |
| PET-TST-016 | PET-REQ-006 | PO 10 unit, receipt parsial, invoice duplikat/mismatch | Terima 6 unit lalu cocokkan invoice; stok/payable hanya untuk penerimaan valid | Duplicate invoice atau mismatch masuk review tanpa posting; P0 |
| PET-TST-017 | PET-REQ-007 | Satu slot kapasitas, dua booking concurrent | Submit kedua booking; hanya booking sesuai capacity yang confirmed; groomer/service record dapat diselesaikan | Overlap, canceled slot, atau unauthorized override ditolak; P0 |
| PET-TST-018 | PET-REQ-008 | Stay aktif dengan checklist makan/obat wajib | Check-in, catat monitoring, lalu check-out dan tagih; timeline lengkap | Check-out dengan tugas wajib belum ditangani memerlukan exception approval; P1 |
| PET-TST-019 | PET-REQ-010 | Dokter assigned, pasien booking, consent action required | Lakukan triage, visit, diagnosis/tindakan, finalisasi | User non-clinical tidak dapat finalisasi; consent wajib yang hilang menahan tindakan; P0 |
| PET-TST-020 | PET-REQ-012 | Resep draft/final, obat batch dengan expiry, actor pharmacist | Dispense resep final dan catat lot/penggunaan; ledger berkurang tepat sekali | Draft/expired/unauthorized prescription tidak dapat didispense; P0 |
| PET-TST-021 | PET-REQ-013 | Customer aktif, policy loyalty versi tertentu, sale/refund | Earn, redeem, refund sebagian; event reversal dan saldo dapat direkonsiliasi | Replay event atau redeem saldo kurang ditolak; P1 |
| PET-TST-022 | PET-REQ-014 | Promo quota terbatas, campaign branch-scoped, stacking rules | Evaluate promo pada checkout; hasil sesuai policy dan tercatat pada sale | Concurrent redemption tidak melebihi quota; manipulated eligibility ditolak; P1 |
| PET-TST-023 | PET-REQ-015 | Attendance, commission snapshot, payroll cycle | Koreksi attendance dengan approval; preview dan approve payroll; reconcile payment | Double payroll/unauthorized approver ditolak; role non-HR tidak membaca detail; P0 |
| PET-TST-024 | PET-REQ-016 | Cash receipt, payable, accounts dan closed/open period | Post payment dan journal; debit/credit balance dan rekonsiliasi cocok | Unbalanced journal/closed period ditolak; posted journal tidak dapat dihapus; P0 |
| PET-TST-025 | PET-REQ-017 | Report dataset dua branch dan role report | Jalankan filter, export, verifikasi totals terhadap source | Cross-branch export dan filter injection ditolak; P1 |
| PET-TST-026 | PET-REQ-017 | Customer A/B, notification preference, portal access | Kirim event, retry provider, buka portal sebagai A | A tidak bisa mengakses B; retry idempotent dan preference dihormati; P0 |
| PET-TST-027 | PET-REQ-018 | Settings draft critical, integration secret reference, role matrix | Propose, approve, activate; inspect response/log/audit | Unauthorized mutation, cross-tenant access, secret exposure ditolak; P0 |
| PET-TST-028 | PET-REQ-009 | Driver/vehicle/service area dan jadwal valid | Assign trip, record pickup/handoff; jalankan home grooming dan completion | Assignment bentrok, di luar coverage, atau handoff tanpa actor ditolak; P1 |
| PET-TST-029 | PET-REQ-011 | Final medical record dengan owner-visible fields | Finalize lalu revise dengan reason; compare snapshots dan portal view | Direct overwrite, cross-pet access, hidden field leakage ditolak; P0 |
| PET-TST-030 | PET-REQ-016 | Consignment partner, receipt, sold/returned quantities, agreement | Reconcile stock and partner share lalu settle period | Settlement duplikat atau sold quantity melebihi valid stock ditolak; P1 |

## Dynamic Settings Scenarios

Gunakan skenario PET-TST-SET-001 sampai PET-TST-SET-006 pada [test plan](test-plan.md); semuanya tetap berstatus planned sampai database, RLS, API, dan dashboard tersedia untuk diuji.

## Recommended Extension Scenarios (Planned)

| Test ID | Feature | Minimum scenario |
| --- | --- | --- |
| PET-TST-REC-001 | PET-FTR-034 CRM | Segmentation excludes opted-out customer and yields auditable audience |
| PET-TST-REC-002 | PET-FTR-035 Complaint | Ticket assignment, SLA transition, private attachment access |
| PET-TST-REC-003 | PET-FTR-036 Care monitoring | Missed task alerts and care timeline actor/timestamp |
| PET-TST-REC-004 | PET-FTR-037 Laboratory | Result correction creates revision and preserves source result |
| PET-TST-REC-005 | PET-FTR-038 Surgery/hospitalization | Consent/admission/checklist and discharge billing handoff |
| PET-TST-REC-006 | PET-FTR-039 Asset | Retired asset cannot be assigned; maintenance history retained |
| PET-TST-REC-007 | PET-FTR-040 Checklist/SOP | Run binds approved SOP version and records attestation |
| PET-TST-REC-008 | PET-FTR-041 Documents | Cross-scope download denied and access audited |
| PET-TST-REC-009 | PET-FTR-042 Shipping | Duplicate carrier webhook does not duplicate shipment transition |
| PET-TST-REC-010 | PET-FTR-043 Budget | Approval threshold and over-budget policy enforced |
| PET-TST-REC-011 | PET-FTR-044 Tax | Effective-date and rounding decisions reconcile to approved tax rule |
| PET-TST-REC-012 | PET-FTR-045 Backup/DR | Restore drill records recovery evidence and measured RPO/RTO |
| PET-TST-REC-013 | PET-FTR-046 E-commerce | Online order reserves stock and duplicate payment is idempotent |

## Related Documents

- [Test strategy](test-strategy.md)
- [Test-to-requirement mapping](../13-traceability/test-to-requirement-mapping.md)
- [Requirements traceability matrix](../13-traceability/requirements-traceability-matrix.md)

