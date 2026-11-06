---
title: Feature to Module Mapping
document_id: PET-DOC-1302
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['requirements-traceability-matrix.md']
---

# Feature to Module Mapping

Pemetaan ini merupakan baseline domain ownership untuk arsitektur modular monolith. Feature inti berasal dari README bagian 4; extension berasal dari bagian 5 dan tetap berstatus rekomendasi.

## Core Features

| Feature ID | Modul/domain | Batas tanggung jawab utama | Dependensi / integrasi |
| --- | --- | --- | --- |
| PET-FTR-001 | Dashboard & Reporting | Read model agregat dan alert sesuai scope | Semua domain sumber; tidak memiliki authority untuk mutasi transaksi |
| PET-FTR-002 | Identity & Access | User lifecycle dan hubungan ke Auth | Supabase Auth, organization, branch |
| PET-FTR-003 | Identity & Access | Role, action permission, assignment, approval scope | RLS, backend authorization |
| PET-FTR-004 | Organization | Cabang, warehouse, cash register, branch config | Identity, inventory, finance |
| PET-FTR-005 | Customer | Customer profile, contact, interaction | Portal, POS, booking, CRM |
| PET-FTR-006 | Pet Registry | Pet identity, ownership, profile, health flags | Customer, clinical, service |
| PET-FTR-007 | Catalog & Pricing | Product/service catalog, unit, price history | Supplier, inventory, POS, promotion |
| PET-FTR-008 | Inventory | Location, stock ledger, batch, transfer, opname | Purchasing, POS, pharmacy, finance |
| PET-FTR-009 | Sales & Payment | Cart, checkout, payment state, refund/void, shift | Catalog, inventory, customer, loyalty, accounting |
| PET-FTR-010 | Procurement | Supplier, PO, receiving, invoice match, return | Catalog, inventory, payable, accounting |
| PET-FTR-011 | Grooming | Grooming workflow, care notes, completion | Booking, pet, staff, inventory, POS |
| PET-FTR-012 | Booking | Capacity, schedule, reservation, cancellation | Branch, service, staff, customer portal |
| PET-FTR-013 | Boarding & Daycare | Rooms, stay, monitoring, handoff, occupancy | Booking, pet, clinical, payment |
| PET-FTR-014 | Animal Transport | Animal trip, driver/vehicle assignment, handoff | Booking, customer, staff, finance |
| PET-FTR-015 | Home Grooming | Field grooming schedule, travel readiness, service result | Booking, grooming, staff, inventory |
| PET-FTR-016 | Veterinary Clinic | Appointment, triage, visit, diagnosis/action/consent | Pet, medical record, pharmacy, payment |
| PET-FTR-017 | Medical Records | Final record, revision, owner-visible data | Clinic, customer portal, storage |
| PET-FTR-018 | Pharmacy | Prescription validation, dispense, medication use | Clinical, inventory/batches, POS |
| PET-FTR-019 | Membership | Plan, enrollment, benefit entitlement | Customer, payment, catalog |
| PET-FTR-020 | Loyalty | Earn/redeem/reverse ledger | Sales, customer, promotions |
| PET-FTR-021 | Promotion | Campaign rules and eligibility decision | Catalog, sales, customer, membership |
| PET-FTR-022 | HR | Employee lifecycle, assignment, job data | Identity, payroll, branches |
| PET-FTR-023 | Attendance | Shift, clock, leave, correction approval | HR, payroll |
| PET-FTR-024 | Commission | Rule version, accrual, approval, adjustment | Sales, service, HR, payroll |
| PET-FTR-025 | Payroll | Payroll cycle, calculation, approval, disbursement | HR, attendance, commission, finance |
| PET-FTR-026 | Finance | Cash/bank movement, payable/receivable, reconciliation | Sales, procurement, payroll, accounting |
| PET-FTR-027 | Accounting | Chart of accounts, journal, periods, financial reports | All posting domains; read-only consumers |
| PET-FTR-028 | Consignment | Partner-owned stock, sales share, settlement | Inventory, sales, finance |
| PET-FTR-029 | Reporting & Analytics | Scoped operational/financial reports and exports | Read models from domain sources |
| PET-FTR-030 | Notifications | Templates, preferences, queue, delivery status | Event producers, external providers |
| PET-FTR-031 | Customer Portal | Customer self-service presentation and commands | Auth, customer, pet, booking, sales, medical projection |
| PET-FTR-032 | System Settings | Versioned operational policy configuration | Authorization, approval, audit, runtime policy consumers |
| PET-FTR-033 | Integrations | Provider connection metadata and health | Secret manager, provider APIs, webhook handlers |

## Recommended Extensions

| Feature ID | Extension module | Suggested domain boundary | Status |
| --- | --- | --- | --- |
| PET-FTR-034 | CRM | Customer engagement | Recommended |
| PET-FTR-035 | Customer Service & Complaint | Customer service | Recommended |
| PET-FTR-036 | Pet Care Monitoring | Care operations | Recommended; may share boarding primitives |
| PET-FTR-037 | Veterinary Laboratory | Clinical diagnostics | Recommended |
| PET-FTR-038 | Surgery & Hospitalization | Advanced clinical | Recommended |
| PET-FTR-039 | Asset & Maintenance | Operations / finance | Recommended |
| PET-FTR-040 | Operational Checklist & SOP | Operations governance | Recommended |
| PET-FTR-041 | Document Management | File/document domain | Recommended; access remains owned by source record |
| PET-FTR-042 | Delivery & Shipping | Commerce fulfillment | Recommended; distinct from animal transport |
| PET-FTR-043 | Budget & Expense Control | Finance planning | Recommended |
| PET-FTR-044 | Tax Management | Finance compliance | Recommended; legal policy must be approved |
| PET-FTR-045 | Backup & Disaster Recovery | Platform operations | Recommended; platform-native backup responsibilities must be clarified |
| PET-FTR-046 | Online Store & E-commerce | Commerce | Recommended |

## Guideline

Domain modules own their write models and business rules. Cross-domain operations must use explicit service/API contracts and transaction boundaries; avoid importing another feature's internal UI/state. Reporting consumes read models and must not mutate source data. Recommended extensions require approval before being treated as committed roadmap scope.

## Related Documents

- [Feature catalog](../01-product/feature-catalog.md)
- [Module-to-database mapping](module-to-database-mapping.md)
- [Module architecture](../03-architecture/module-architecture.md)

