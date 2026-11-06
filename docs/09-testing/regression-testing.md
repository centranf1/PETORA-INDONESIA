---
title: Regression Testing
document_id: PET-DOC-0909
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-scenarios.md']
---

# Regression Testing

Regression testing mengamankan perubahan yang memengaruhi fitur penting.

## Scope

Every release runs a risk-based suite including, at minimum, authentication/tenant isolation, customer/pet, checkout/payment retry, stock movement, receiving, booking concurrency, medical record revision/prescription, refund, journal balance, settings approval, report/export scope, and backup/deployment smoke where relevant. Exact selection and criticality are mapped by requirement IDs; do not omit a P0 scenario without recorded exception approval.

## Change-Based Regression Selection

Use changed requirement/feature/data/API boundaries to include impacted tests and direct dependents. Expand when shared auth, schema, shared components, payment, stock, clinical, finance, or settings logic changes. Keep a full suite for scheduled pre-release runs.

| Change area | Minimum regression expansion |
| --- | --- |
| Auth, role, RLS, tenant/branch context | Direct API denial/allow tests, cross-org and cross-branch read/write, role revocation, storage/realtime scope, cache reset on scope switch |
| Database migration or entity relationship | Clean install and upgrade path, constraints/FKs, RLS, backfill, rollback/forward recovery, dependent API flows |
| Catalog, price, promotion | Server price recalculation, branch/effective-date selection, discount eligibility/stacking, transaction snapshot, unauthorized override |
| Sales, payment, refund | Idempotent checkout retry, timeout before/after provider success, duplicate/out-of-order webhook, refund limit, stock/loyalty/journal reversal |
| Inventory and purchasing | Receiving partials, batch/expiry, concurrent movement, transfer reconciliation, adjustment approval, negative-stock policy |
| Booking/service/boarding | Capacity race, cancellation/no-show, handoff, care checklist, active branch/service hours |
| Clinical/pharmacy | Patient relationship, assigned clinician, consent, finalized-record revision, prescription authority, dispense and batch stock |
| Payroll/finance/accounting | Restricted data access/export, source snapshot, period close, balanced journal, correction and duplicate payout prevention |
| Settings/integrations | Key schema/scope, approval/version conflict, lock behavior, secret redaction, webhook signature and retry |
| Shared frontend/navigation | Loading/empty/forbidden/pending/conflict states, responsive/keyboard paths, role route guard plus direct API denial |

## Execution Procedure

1. Read the PR's changed `PET-REQ`/`PET-FTR` IDs and dependency map; identify source tables, permission boundaries, and consumer workflows.
2. Select tests from the impact matrix and add regression coverage for the reported defect/change.
3. Run focused unit/component tests first, then database/RLS and API/integration tests, then E2E/smoke tests for affected journeys.
4. Verify persisted state, audit/version events, no duplicate side effects, and absence of cross-scope data in addition to response status.
5. Record test IDs, command/build/schema version, environment, seed set, outcome and trace/artifact reference in the PR/release record.
6. If a test is unavailable or flaky, assign an owner and expiry, document risk and compensating check; never silently skip P0 security or financial integrity coverage.

## Pass and Failure Criteria

A regression suite passes only when all selected required tests pass and no unexpected state/data side effect remains. A failure is triaged as product defect, test defect, environment issue, or approved behavior change; update expected results only after requirement/acceptance owner approval. For production bugs, retain a stable reproducer and link it to the incident/requirement.

## Rule

Every bug fix includes a reproducible regression test at the narrowest behavior layer; production incident fixes include a monitoring/alert or operational action if a test cannot detect recurrence.

## Related Documents

- [Test Scenarios](test-scenarios.md)
- [Test to Requirement Mapping](../13-traceability/test-to-requirement-mapping.md)
- [Definition of Done](../12-development-standards/definition-of-done.md)

