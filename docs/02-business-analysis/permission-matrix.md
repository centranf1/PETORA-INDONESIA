---
title: Permission Matrix
document_id: PET-DOC-0205
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['user-roles.md']
---

# Permission Matrix

Matriks ini adalah baseline kewenangan yang diusulkan untuk disahkan owner; bukan role policy final. Hak efektif terdiri dari action + scope + relationship + state transition; RLS/API tetap enforce setiap request.

## Scope Legend

- `OWN`: record yang terkait user sendiri/customer own relationship.
- `ASSIGNED`: record yang ditugaskan kepada actor.
- `BRANCH`: branch yang explicitly assigned di organization aktif.
- `ORG`: organization-wide read/action yang diberikan eksplisit.
- `PLATFORM`: cross-tenant platform privilege, **belum diasumsikan tersedia**.

## Responsibility Matrix (Proposed)

| Role | Read / write domain | Approval / restricted actions | Maximum default scope |
| --- | --- | --- | --- |
| Super Admin | System settings, integrations, user/role setup | Config approval only by explicit policy; no RLS/service-role bypass | ORG assigned; PLATFORM open decision |
| Owner | Consolidated dashboard/report, branch oversight | Policy/finance/stock approval per delegated policy | ORG |
| Branch Manager | Branch operations, staff scheduling, inventory review | Approve branch-level actions only when separately granted | BRANCH |
| Administrator | Allowed master data, customers, bookings | No financial/clinical approval by default | BRANCH/ORG by assignment |
| Cashier | POS, payment initiation, shift close | Refund/void/price override require action permission | BRANCH + own shift |
| Inventory Staff | Stock movement proposals, receive/count | Adjustment/transfer approval is separate | BRANCH/assigned warehouse |
| Purchasing Staff | Supplier, PR/PO, receive coordination | PO approval and supplier payment separated | BRANCH/ORG by assignment |
| Groomer | Assigned service visit and necessary pet care notes | No clinical finalization | ASSIGNED |
| Veterinarian | Assigned visits, diagnosis, medical record, prescription | Medical finalization/revision authority by policy | ASSIGNED/BRANCH clinical |
| Pharmacist | Prescription queue and medication stock/dispense | Dispense only authorized final prescription | BRANCH/assigned pharmacy |
| Customer Service | Customer profile, communication, booking, complaint | Compensation/refund request only; no approve by default | BRANCH/assigned customer |
| HR/Payroll | Employee, attendance, payroll preparation | Payroll approval separated from preparation/payment | ORG/BRANCH assignment |
| Finance/Accounting | Cash/bank, payable/receivable, journals/reports | Post/close/reconcile separate actions | ORG/BRANCH assignment |
| Customer | Own profile, pets, bookings, payment status, visible medical info | No organization operations | OWN |

This matrix is decision support only. Exact read/write fields, dual-control thresholds, emergency access, employee self-service, and Super Admin platform scope must be decided by Business/Security Owners.

## Access Model

Permission diwujudkan dengan action-based permission: view, create, update, delete, approve, authorize, export, reconcile. Scope model: own, branch, all, assigned_records.

## Approval Controls

Refund, void, price override, stock adjustment/transfer, supplier payment, payroll release, journal close, medical revision, settings approval, and sensitive export are separate actions. Split proposer/approver for high-risk action is recommended; thresholds and exceptions are open decisions. `all` never means cross-tenant without explicit PLATFORM decision.

## Security Note

Scope harus divalidasi di server dan database. Tidak menerima organization_id atau branch_id dari browser tanpa verifikasi.

## Related Documents

- [User roles](user-roles.md)
- [RLS security policies](../04-database/rls-security-policies.md)
- [Security testing](../09-testing/security-testing.md)

