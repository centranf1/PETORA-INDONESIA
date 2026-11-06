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

Pemetaan fitur pusat ke modul domain.

## Feature Ownership Mapping

| Feature ID | Feature | Proposed domain module | Boundary / primary responsibility |
| --- | --- | --- | --- |
| PET-FTR-001 | Dashboard Management | analytics | Read-only scoped summaries and operational alerts; no independent source-of-truth writes |
| PET-FTR-002 | User Management | identity-access | User lifecycle, profile link, session state, and branch assignment |
| PET-FTR-003 | Role & Permission | identity-access | Permission catalog, role assignment, authorization decisions |
| PET-FTR-004 | Branch Management | organization | Organization, branch, warehouse/cash context and lifecycle |
| PET-FTR-005 | Customer Management | customer | Customer identity, contact, preferences, and interaction history |
| PET-FTR-006 | Pet Management | pet | Pet profile and owner relationship; clinical records remain in clinical module |
| PET-FTR-007 | Product Management | catalog | Product/service catalog, unit and price master data |
| PET-FTR-008 | Inventory & Warehouse | inventory | Stock ledger, batches, receiving, transfer, and counts |
| PET-FTR-009 | POS & Sales | sales | Cart, sale lifecycle, tender, receipt, refund/return orchestration |
| PET-FTR-010 | Purchasing & Supplier | purchasing | Supplier, purchase order, receipt matching, payable source records |
| PET-FTR-011 | Grooming | service-grooming | Grooming execution, condition checklist, service outcome |
| PET-FTR-012 | Booking & Reservation | scheduling | Capacity, slot reservation, booking state and cancellation |
| PET-FTR-013 | Pet Hotel & Daycare | service-boarding | Room/stay lifecycle, monitoring, care tasks, check-in/out |
| PET-FTR-014 | Transport | transport | Pet pickup/delivery assignment, handover, route event |
| PET-FTR-015 | Home Grooming | service-home | In-home service execution, area eligibility, travel and handover |
| PET-FTR-016 | Veterinary | clinical | Visit, triage, examination, diagnosis, treatment workflow |
| PET-FTR-017 | Medical Records | clinical-records | Finalized record, revision history, owner-visible data policy |
| PET-FTR-018 | Pharmacy & Medicine | pharmacy | Prescription validation, dispense, medication stock interaction |
| PET-FTR-019 | Membership | membership | Plan, entitlement, enrollment, renewal and usage |
| PET-FTR-020 | Loyalty | loyalty | Points events, balance projection, redemption and reversal |
| PET-FTR-021 | Promotion | promotions | Eligibility, pricing rule evaluation, stacking and campaign history |
| PET-FTR-022 | Staff | workforce | Employee profile, assignment, contract references |
| PET-FTR-023 | Attendance | workforce-attendance | Shift, time records, leave, correction approval |
| PET-FTR-024 | Commission | compensation | Rule snapshot, calculation, review and payment source |
| PET-FTR-025 | Payroll | payroll | Payroll period, calculation, approval, payslip and finance handoff |
| PET-FTR-026 | Finance | finance | Cash/bank movement, receivable/payable and reconciliation |
| PET-FTR-027 | Accounting | accounting | Chart of accounts, journal, posting, period close and correction |
| PET-FTR-028 | Consignment | consignment | Consigned stock custody, sale attribution, settlement and returns |
| PET-FTR-029 | Reports & Business Analytics | reporting | Scoped read models, aggregation, export and report jobs |
| PET-FTR-030 | Notification | communications | Template, preference, delivery attempt and retry tracking |
| PET-FTR-031 | Customer Portal | customer-portal | Self-service access; delegates domain changes to owning modules |
| PET-FTR-032 | System Settings | system-configuration | Allowlisted settings, validation, version, approval and audit |
| PET-FTR-033 | Integration Settings | integrations | Provider configuration, server-side secrets, webhooks and health |

## Recommended Modules Without Approved Feature IDs

CRM, customer service/complaints, pet-care monitoring, veterinary laboratory, surgery/hospitalization, asset maintenance, SOP/checklists, document management, delivery/shipping, budget/expense control, tax, backup/disaster recovery, and e-commerce are recommended README scope. They must receive explicit feature IDs, ownership, phase, and acceptance criteria when approved for delivery; do not silently treat them as committed features.

## Guideline

This mapping is a domain ownership proposal, not a source-code directory mandate. Cross-module workflows should call the owning module's documented service/API and must not write another module's private tables directly. Confirm module boundaries in architecture ADRs before implementation.

## Related Documents

- [Feature Catalog](../01-product/feature-catalog.md)
- [Module Architecture](../03-architecture/module-architecture.md)
- [Module to Database Mapping](module-to-database-mapping.md)
- [Requirements Traceability Matrix](requirements-traceability-matrix.md)

