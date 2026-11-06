---
title: User Roles
document_id: PET-DOC-0204
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['permission-matrix.md']
---

# User Roles

Dokumen ini menguraikan peran yang digunakan pada sistem dan tanggung jawabnya.

## Default Roles

Super Admin, Owner, Branch Manager, Administrator, Cashier, Inventory Staff, Purchasing Staff, Groomer, Veterinarian, Pharmacist, Customer Service, HR/Payroll Staff, Finance/Accounting Staff, Customer.

## Responsibility and Default Scope (Proposed)

| Role | Main responsibilities | Default scope proposal | Separation / restriction |
| --- | --- | --- | --- |
| Super Admin | Tenant configuration, integrations, access administration | Organization(s) explicitly assigned; no implicit cross-tenant scope | Cannot bypass RLS/hard invariants; privileged access audited |
| Owner | Business oversight, reports, policy approvals | All branches within own organization | Sensitive mutations may require a separate approver |
| Branch Manager | Branch operations, staff and inventory oversight | Assigned branch(es) | No cross-organization or unrestricted medical/payroll access |
| Administrator | Maintain permitted operational master data | Assigned branch/organization by task | No implicit finance/clinical approval |
| Cashier | Sale/payment, shift close, refund request | Assigned branch and own shift | Price/refund authority follows explicit action permission |
| Inventory Staff | Receiving, transfer, count, adjustment proposal | Assigned warehouse/branch | High-variance adjustment approval separated |
| Purchasing Staff | Supplier, PO, receipt coordination | Assigned branch/organization | PO approval/payment requires higher permission |
| Groomer | Assigned grooming work and care notes | Assigned visits | Clinical record visibility limited to necessary care information |
| Veterinarian | Visit, diagnosis, treatment, prescription, medical record | Assigned clinical visits | No unrelated payroll/finance access |
| Pharmacist | Prescription verification and dispensing | Assigned branch/pharmacy | Dispense only valid prescription under approved policy |
| Customer Service | Customer communication, booking, complaint/follow-up | Assigned branch/customer relationships | Restricted medical/financial fields |
| HR/Payroll Staff | Employee, attendance, payroll preparation | Organization/branch per assignment | Compensation access restricted; approval separation |
| Finance/Accounting Staff | Cash, payment, reconciliation, journals | Assigned organization/branches/accounts | No unauthorized payroll/clinical details; posting controls |
| Customer | Own profile, pets, bookings, approved records | Own customer/pet relationship | Cannot infer or access other customers' data |

## Role Design

Role/permission dapat dikonfigurasi dengan action granularity. Scope `all` berarti all records only within authorized tenant unless separately approved platform boundary; `assigned_records` requires explicit relation. Deny by default, grant least privilege, time-limit elevated access where possible, and audit role changes. Exact role matrix remains an open decision.

## Separation of duties

Kasir tidak seharusnya mengubah kebijakan harga atau menyetujui refund tanpa kewenangan. Dokter tidak diberikan akses ke payroll kecuali ada kebutuhan khusus.

## Customer Access

Pelanggan hanya dapat melihat data pribadi, hewan miliknya, layanan yang telah dibayar, dan rekam medis yang diizinkan oleh dokter.

## Related Documents

- [Permission matrix](permission-matrix.md)
- [RLS policies](../04-database/rls-security-policies.md)
- [Open decisions](../13-traceability/open-decisions.md)

