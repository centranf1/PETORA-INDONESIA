---
title: Project Scope
document_id: PET-DOC-0003
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['project-overview.md', 'product-vision.md']
---

# Project Scope

Ruang lingkup mencakup kebutuhan bisnis, sistem, dan operasional dari PETORA.

## In Scope

### Core Product Baseline

- Organization, branch, user, role, permission, customer, pet, catalog, and pricing.
- Inventory ledger, batch/expiry concepts, purchasing, receiving, transfer, stock count, POS, payment, refund/return, and cashier close.
- Booking and service operations: grooming, hotel/daycare, transport, home grooming.
- Veterinary visit, medical record, prescription, pharmacy, membership, loyalty, and promotion.
- Employee, attendance, commission, payroll, finance, accounting, consignment, and scoped reporting.
- Notification, customer portal, system settings, integrations, security, audit, operations.

Feature-level requirements are tracked in the 33-ID [feature catalog](../01-product/feature-catalog.md). Each item still requires its linked workflow, acceptance criteria, schema/API contract, and test.

### Recommended Extensions

CRM, customer complaint/ticketing, pet-care monitoring, laboratory, surgery/hospitalization, assets, SOP/checklists, document management, product delivery, budget, tax, backup/disaster recovery, and e-commerce are recommended README items. They are not committed release scope until they have approved priority, owner, feature ID, and acceptance criteria.

## Out of Scope / Not Assumed

- PETORA does not imply ownership of third-party payment rails, messaging networks, or logistics infrastructure; it integrates providers through adapters.
- No provider, tax rate, legal retention period, payroll formula, medical decision, or statutory compliance status is assumed by this scope document.
- No cross-organization public/global administrator is assumed; tenant governance remains an open decision.
- No e-commerce or external marketplace behavior is part of the core launch unless approved as a release increment.
- This scope does not claim that features are implemented merely because they appear in documentation.

## External Dependencies

| Dependency | Used for | Required contract before implementation |
| --- | --- | --- |
| Supabase Auth | Identity and session | Claim lifecycle, MFA, revocation, environment ownership |
| PostgreSQL / RLS | Persistent data and tenant isolation | Approved schema, grants, RLS tests, migrations |
| Storage | Documents, images, receipts | Private buckets, object paths, access policy, retention |
| Edge Functions / server runtime | Privileged workflows and provider adapters | Auth verification, timeout, idempotency, logging, deploy secret handling |
| Payment provider | Payment/refund confirmation | Provider choice, webhook signatures, settlement/reconciliation, sandbox |
| Messaging provider | Email/SMS/WhatsApp delivery | Consent/preference, templates, retries, quotas, delivery status |
| Hosting / monitoring | Frontend delivery and observability | Provider choice, alert owner, SLO and incident process |

## Constraints and Non-Functional Baseline

- Every protected request has an authenticated subject and server-verified organization/branch context.
- RLS protects exposed tenant data; privileged server credentials never reach the browser.
- Database writes within one domain transaction are atomic. External side effects require durable state, retry/idempotency and reconciliation.
- Clinical, financial, payroll, inventory and audit records require controlled correction/history.
- Numeric performance, availability, capacity and recovery targets are TBD until workload and owners approve them.

## Scope Change Control

Perubahan scope harus mengidentifikasi requirement/feature ID baru atau terdampak, actor/workflow, data/security impact, dependency, acceptance criteria, test impact, dan fase rilis. Perubahan keputusan yang belum final masuk [open decision register](../13-traceability/open-decisions.md).

## Related Documents

- [Feature Catalog](../01-product/feature-catalog.md)
- [Product Roadmap](../01-product/product-roadmap.md)
- [Requirements Traceability Matrix](../13-traceability/requirements-traceability-matrix.md)
- [Open Decisions](../13-traceability/open-decisions.md)

