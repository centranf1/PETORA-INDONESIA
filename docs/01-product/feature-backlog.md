---
title: Feature Backlog
document_id: PET-DOC-0105
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['product-roadmap.md']
---

# Feature Backlog

Backlog berisi daftar fitur yang perlu dikelola di sprint, release, dan maintenance.

## Initial Backlog by Dependency

| Order | Requirement / Feature IDs | Deliverable slice | Dependencies / proof |
| --- | --- | --- | --- |
| 1 | PET-REQ-001, 002, 018 / PET-FTR-002, 003, 004 | Authenticated organization/branch context, role assignment, RLS, audit | Approved role/scope model; cross-tenant/branch tests |
| 2 | PET-REQ-003, 004 / PET-FTR-005, 006, 007 | Customer/pet relationship, catalog, unit and price history | Ownership rules; uniqueness and change authorization tests |
| 3 | PET-REQ-005 / PET-FTR-008 | Stock ledger, receiving, transfer, batch/expiry and opname | Approved inventory model; concurrent ledger tests |
| 4 | PET-REQ-006 / PET-FTR-009 | Sale lifecycle, idempotent checkout, tender, receipt, refund | Payment state/provider contract; reconciliation and retry tests |
| 5 | PET-REQ-007 / PET-FTR-010 | Supplier, PO, partial receiving, invoice matching | Purchasing approval and payable policy |
| 6 | PET-REQ-008 / PET-FTR-011..015 | Booking capacity and service execution workflows | Service catalog, capacity and cancellation decisions |
| 7 | PET-REQ-009 / PET-FTR-016..018 | Clinical encounter, record revisions, prescription and dispense | Clinical role/consent/retention approval; security tests |
| 8 | PET-REQ-012, 013 / PET-FTR-022..028 | Workforce, payroll, cash, accounting and consignment | Payroll/legal rules, chart of accounts, finance owners |
| 9 | PET-REQ-010, 011, 014, 015 / PET-FTR-019..021, 029..031 | Membership, loyalty, promotions, reporting, notification, portal | Business policy, consent, provider contracts |
| 10 | PET-REQ-016, 017 / PET-FTR-032, 033 | Settings governance and external integrations | Key catalog, approval matrix, secret/webhook contracts |

Order is a dependency proposal; work may proceed in parallel only when interfaces and owners are agreed.

## Entry Criteria

Each item must identify owner, requirement/feature ID, user outcome, main/alternate/failure flows, acceptance criteria, permission/data scope, schema/API/UI impacts, dependencies, risks, test plan, documentation updates, and open decisions. Apply [Definition of Ready](../12-development-standards/definition-of-ready.md) before sprint commitment.

## Priority Notes

Deferred items: e-commerce, advanced analytics, and integrated external shipping need management sign-off.

## Release Strategy

Deliver vertical slices through UI/API/database/tests/operations rather than completing one layer for every module. A slice is releasable only when migration, authorization, telemetry, support/runbook, rollback/recovery, and acceptance evidence are ready. See [Product Roadmap](product-roadmap.md); phases are proposals pending approval.

## Related Documents

- [Feature Catalog](feature-catalog.md)
- [Product Roadmap](product-roadmap.md)
- [Definition of Ready](../12-development-standards/definition-of-ready.md)
- [Requirements Traceability Matrix](../13-traceability/requirements-traceability-matrix.md)

