---
title: Product Roadmap
document_id: PET-DOC-0104
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['feature-catalog.md']
---

# Product Roadmap

Roadmap ini adalah proposal sequencing berbasis dependency dan risiko, bukan komitmen tanggal/release. Setiap phase memerlukan sign-off product owner dan readiness gate sebelum dimulai.

## Phase 1 - Foundation

### Outcomes

Identity/session, organization/branch context, permission/RLS, customer-pet ownership, catalog/pricing, stock ledger, cashier shift, POS/payment state machine, basic refund, audit, deployment/monitoring baseline.

### Exit Gate

Cross-tenant/branch denial tests pass; checkout/retry/refund and stock workflows reconcile; opening/closing shift is documented; migration, backup/restore, and support runbooks are rehearsed.

## Phase 2 - Service Operations

### Outcomes

Supplier/PO/receiving, booking capacity, grooming, boarding/daycare, clinical visit and immutable record revision, prescription/pharmacy dispensing, consent and care handoff.

### Exit Gate

Concurrency tests prevent overbooking; medical access is least-privilege; prescription/dispense and stock are linked; staff handover and emergency/exception workflow is accepted by domain owner.

## Phase 3 - Workforce & Finance

### Outcomes

Employee assignment, attendance correction, commission snapshots, payroll calculation/approval, cash/bank reconciliation, journal posting/period close, scoped operational and financial reports.

### Exit Gate

Finance/HR owner signs off formulas and access; posted journal is balanced and correctable through reversal; payroll/export access is tested; data retention and recovery requirements are approved.

## Phase 4 - Customer Experience

### Outcomes

Customer portal ownership/consent, notification preferences and delivery retries, membership/loyalty reversal, approved promotion evaluation, CRM and complaint management where prioritized.

### Exit Gate

Portal authorization, consent, opt-out, provider callback/retry, and customer support procedures are tested; campaign/discount policy is approved.

## Phase 5 - Scale & Intelligence

### Outcomes

Advanced analytics, e-commerce, forecast, delivery/marketplace/provider integrations, and scale optimizations only where business case and provider contracts are approved.

### Exit Gate

Capacity targets, data export/privacy rules, integration SLOs, reconciliation, incident ownership, and cost are approved.

## Recommendation

Rollout proposal: pilot one representative branch, observe real workload and reconciliation, close critical defects, then expand by branch cohorts with training, support owner, rollback criteria, and daily reconciliation. Pilot count, timing, and go/no-go thresholds are TBD.

## Dependencies and Planning Rules

- Authorization, audit, migrations, observability, and recovery are cross-cutting prerequisites, not later polish.
- A module does not enter a committed sprint until Definition of Ready is met and blocking open decisions are resolved/accepted.
- Feature priority P0/P1/P2 does not determine release date by itself.
- Phase scope must link to feature IDs, requirement IDs, acceptance criteria, tests, and business owner.

## Related Documents

- [Feature Catalog](feature-catalog.md)
- [Feature Backlog](feature-backlog.md)
- [Definition of Ready](../12-development-standards/definition-of-ready.md)
- [Open Decisions](../13-traceability/open-decisions.md)

