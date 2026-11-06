---
title: Module Architecture
document_id: PET-DOC-0306
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['component-diagram.md']
---

# Module Architecture

Arsitektur modul mengurutkan domain ke dalam boundary yang dapat dikelola secara mandiri.

## Domain Module Groups

| Group | Owned domains | Boundary |
| --- | --- | --- |
| Platform | Organization, identity/access, settings, audit | Tenant and user context, policy configuration, audit contracts; no direct ownership of sales/clinical records |
| Commerce | Catalog, inventory, sales, purchasing, promotions, membership, loyalty, consignment | Product/stock/transaction lifecycle, price snapshot, payment orchestration, supplier settlement inputs |
| Service Operations | Scheduling, grooming, hotel/daycare, transport, home grooming | Capacity, booking state, service assignment, care/handover events |
| Clinical | Veterinary visits, medical records, pharmacy | Clinical authority, finalized record/revision, prescription and dispense control |
| Workforce and Finance | Staff, attendance, commission, payroll, finance, accounting | Employee-sensitive data, payroll calculations, cash and posted journal lifecycle |
| Channels and Integration | Customer portal, notifications, provider adapters, reporting | Self-service projection, outbound delivery, external events, scoped read models |

The detailed feature ownership list is maintained in [Feature to Module Mapping](../13-traceability/feature-to-module-mapping.md). Groups are planning boundaries; they do not imply that every recommended README module is approved for the first release.

## Shared Domain

Tenant/org config, branch context, user permission, document management, and common types.

## Dependencies

All modules depend on a server-verified actor and tenant context. The modular monolith may share a PostgreSQL database, but a module may write only through its owning domain service/transaction contract. A shared physical database does not make cross-module direct mutations acceptable.

## Ownership Examples

- Sales owns sale and payment-attempt lifecycle; inventory owns stock ledger and reservations; finance/accounting own reconciliation and journal posting.
- Booking owns capacity reservation; service modules own execution records; customer/pet modules own profile and ownership changes.
- Clinical owns medical records and prescription authority; pharmacy owns dispense events and medicine stock interaction.
- Reporting owns read models and export jobs, not the underlying financial, clinical, or inventory source records.
- Settings service owns active policy resolution, change proposals, versioning, and audit; business modules consume validated policy through a server-side contract.

## Dependency Rules

- No circular module dependency. Shared/platform modules must not import domain-specific business rules.
- Cross-domain workflows document the orchestrator and transaction/event boundary.
- External side effects are retryable and idempotent; use outbox/reconciliation patterns instead of pretending provider calls are part of a database transaction.
- Database migrations must preserve ownership and RLS boundaries when schema spans modules.
- Recommended/optional features remain outside committed modules until a feature ID, owner, phase, and acceptance criteria are approved.

## Related Documents

- [Architecture Overview](architecture-overview.md)
- [Feature to Module Mapping](../13-traceability/feature-to-module-mapping.md)
- [Module to Database Mapping](../13-traceability/module-to-database-mapping.md)
- [Architecture Decisions](architecture-decisions.md)

