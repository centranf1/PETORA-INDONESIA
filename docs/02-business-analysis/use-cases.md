---
title: Use Cases
document_id: PET-DOC-0206
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['business-processes.md']
---

# Use Cases

Kasus penggunaan utama PETORA dibuat untuk menghubungkan kebutuhan user dengan fungsi sistem.

Setiap use case adalah workflow target dari README; status implementation belum ada di repository. Role/permission mengacu ke [permission matrix](permission-matrix.md); acceptance/test ID canonical berada di [PRD](../01-product/product-requirements-document.md) dan [test scenarios](../09-testing/test-scenarios.md).

## UC-01 Register Customer

Customer can register and validate phone number uniqueness within organization.

## UC-02 Register Pet

Customer or staff can add pet, assign main owner, manage allergy and medical notes.

## UC-03 Create Sale

Cashier creates transaction with product and service, applies promo, handles payment, and issues receipt.

## UC-04 Process Refund

Authorized employee mengajukan refund dengan reason; approver/provider memproses pengembalian; backend membuat refund/reversal record dan menyesuaikan poin/stok/jurnal sesuai policy yang disetujui. Tidak mengubah sale/payment history secara langsung.

## UC-05 Receive Stock

Inventory staff receives PO, checks batch and expiry, updates stock ledger and AP.

## UC-06 Veterinary Consultation

Veterinarian checks patient, records diagnosis, creates prescription, and updates treatment history.

## UC-07 Staff Payroll

HR calculates payroll from attendance, overtime, commission, benefit, and salary rules.

## UC-08 Customer Portal

Customer views bookings, medical record access, reward points, and personal profile.

## Additional Core Use Cases

| Use Case ID | Requirement | Actor / precondition | Main outcome | Key exception |
| --- | --- | --- | --- | --- |
| UC-09 Manage Branch and Access | PET-REQ-001 | Owner/Admin; organization active | Branch/user/role assignment tersimpan dan diaudit | Cross-tenant assignment atau self-elevation ditolak |
| UC-10 Maintain Product and Price | PET-REQ-003 | Catalog manager; permission valid | Price/unit history tersedia untuk transaction snapshot | Invalid unit/price or unauthorized override ditolak |
| UC-11 Transfer or Count Stock | PET-REQ-004 | Inventory staff; location aktif | Stock ledger mencatat transfer/opname dan approval | Concurrent quantity conflict atau variance approval gagal |
| UC-12 Receive Purchase | PET-REQ-006 | Purchasing/Inventory; approved PO | Partial receipt, batch/expiry, invoice match, payable state terhubung | Mismatch/duplicate invoice ditahan untuk review |
| UC-13 Book Grooming | PET-REQ-007 | Customer/CS; service, pet, branch valid | Capacity-safe booking dan visit record | Slot penuh/assignment bentrok ditolak |
| UC-14 Board Pet | PET-REQ-008 | Hotel staff; reservation/kamar valid | Stay, care tasks, monitoring, checkout invoice | Incomplete care/handoff requires exception path |
| UC-15 Assign Transport or Home Grooming | PET-REQ-009 | Dispatcher/CS; coverage and schedule valid | Trip/service visit dengan handoff evidence | Vehicle/staff conflict or outside service area ditolak |
| UC-16 Finalize Clinical Visit | PET-REQ-010 | Assigned veterinarian; patient checked in | Diagnosis/tindakan/consent dan medical record link | Unauthorized clinician or required consent missing ditolak |
| UC-17 Revise Medical Record | PET-REQ-011 | Authorized veterinarian; finalized version exists | Immutable revision with reason/snapshot | Direct overwrite atau cross-pet lookup ditolak |
| UC-18 Dispense Medicine | PET-REQ-012 | Pharmacist; valid final prescription | Medication usage dan stock movement tercatat | Draft/expired/unauthorized prescription ditolak |
| UC-19 Enroll and Redeem Benefit | PET-REQ-013 | Customer active; plan/policy valid | Membership/loyalty event ledger updated | Expired plan, insufficient balance, replay ditolak |
| UC-20 Apply Promotion | PET-REQ-014 | Cashier/campaign; active rule | Eligible discount snapshot pada sale | Client price manipulation/stacking violation ditolak |
| UC-21 Run Payroll | PET-REQ-015 | HR prepare, Finance approver; period open | Payroll cycle approved and disbursement reconciled | Duplicate cycle or unauthorized approval ditolak |
| UC-22 Post Finance Journal | PET-REQ-016 | Finance/Accounting; source reference valid | Balanced journal and reconciliation link | Unbalanced/closed period ditolak |
| UC-23 Generate Scoped Report | PET-REQ-017 | User with report/export permission | Report generated for authorized branch/period | Cross-scope export, oversized query, or stale data handled safely |
| UC-24 Change System Policy | PET-REQ-018 | Super Admin proposer; definition and scope valid | Version validated, approved, activated, audited | Stale version, missing approval, or locked setting rejected |

## Related Documents

- [Business processes](business-processes.md)
- [Business rules](business-rules.md)
- [Requirements traceability](../13-traceability/requirements-traceability-matrix.md)

