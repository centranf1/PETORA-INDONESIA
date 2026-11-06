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

Roadmap ini adalah urutan dependensi yang diusulkan, bukan estimasi tanggal, komitmen release, atau approval stakeholder. Semua fase tetap tunduk pada kapasitas tim, keputusan bisnis/legal, dan bukti readiness. Core scope berasal dari README bagian 4; extension README bagian 5 belum menjadi release commitment.

## Delivery Waves (Proposed)

| Wave | Scope | Entry conditions | Exit / quality gate |
| --- | --- | --- | --- |
| 0. Product and platform foundation | Resolve tenant model, role/permission ownership, environment setup, migration policy, audit baseline, CI/security test design | Product Owner confirms core scope and named decision owners | Architecture ADRs accepted; local/staging path and baseline RLS tests defined |
| 1. Organization and master data | Auth, organizations, branches, users/roles, customer/pet, catalog, supplier | Wave 0 gates complete | Tenant/branch isolation verified; master data validation and audit pass |
| 2. Inventory and commerce | Stock ledger, batches, receiving, transfer, POS, payment, refund/void, shift close, accounting events | Product/pricing/tax/payment policies selected or explicitly deferred | Concurrent stock and payment/idempotency/reconciliation tests pass; no unbalanced journal |
| 3. Service operations | Booking/capacity, grooming, boarding/daycare, transport, home grooming | Service catalog, capacity and cancellation rules decided | Capacity race, handoff, care checklist, failure/incident tests pass |
| 4. Clinical and pharmacy | Clinical visit, consent, immutable medical record/revision, prescriptions, dispensing | Clinical owner approves access and record policy; provider/lab scope clarified | Clinical privacy, revision, prescription and batch/expiry tests pass |
| 5. Workforce and finance | Employee, attendance, commission, payroll, cash/bank, accounting, consignment | Finance/HR owners approve period, approval, and legal policies | Segregation of duties, payroll privacy, journal, close and reconciliation gates pass |
| 6. Customer engagement and analytics | Membership, loyalty, promotions, notifications, portal, reports | Consent, retention, promotional and notification policies agreed | Portal isolation, promo concurrency, report scope/export and delivery tests pass |
| 7. Recommended extensions | PET-FTR-034..046, only after item-level approval | Product Owner accepts business case and dependencies for each extension | Separate acceptance, security/data design, operational ownership, test and rollout plan |

## Cross-wave Release Gates

- No production phase may bypass RLS, secrets, audit, backup/restore, migration review, smoke tests, rollback rehearsal, and incident ownership.
- External payment/email/SMS/WhatsApp/shipping providers require sandbox, webhook verification, idempotency, and reconciliation.
- Requirements with unresolved tax, medical retention, fiscal, payroll, or service policy cannot be silently assumed; scope is blocked or explicitly constrained pending decision.
- Pilot one branch first only as an operational recommendation; branch count and pilot criteria remain decisions for the owner.

## Planning Rules

Estimate, dates, responsible teams, dependencies external to the documented baseline, and release scope must be managed in the delivery tracker after roadmap approval. This document does not assert a feature is implemented or scheduled.

## Related Documents

- [Feature catalog](feature-catalog.md)
- [Feature backlog](feature-backlog.md)
- [Open decisions](../13-traceability/open-decisions.md)

