---
title: Test Plan
document_id: PET-DOC-0902
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-strategy.md']
---

# Test Plan

Rencana testing menandai jalur, data, dan prioritas tahapan.

## Execution Levels

Run the narrowest relevant unit/component check first, then integration/API/database/RLS checks, E2E and UAT according to risk. Security-sensitive changes require direct authorization/RLS/storage tests even when UI tests pass.

## Test Environment and Data

- Use isolated local/test/staging projects with migrations applied and RLS enabled.
- Seed synthetic organization A/B, branch A/B, role and relationship fixtures; define run-scoped identifiers and cleanup.
- Use provider sandbox/fakes. Never make real payment, send real messaging, or use real clinical/customer records in automated tests.
- Record build/commit, schema version, environment, seed set and trace ID for reproducibility.

## Critical Scenarios

Double checkout/payment, client price tampering, concurrent stock movement, negative-stock policy, booking capacity conflict, invalid prescription/dispense, unauthorized cross-tenant access, finalized medical revision, refund timeout/retry, unbalanced journal, stale settings approval, secret exposure, and report/export scope.

## Dynamic Settings Scenarios

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PET-TST-SET-001 | Create draft stock policy | Super Admin authenticated | Open settings dashboard, create stock policy draft | New draft created with status draft |
| PET-TST-SET-002 | Approve critical refund policy | Owner authenticated | Open pending approval list | Policy becomes active only after approval |
| PET-TST-SET-003 | Reject invalid value_type | Admin authenticated | Set value_type mismatch with value_json | Request rejected and logged |
| PET-TST-SET-004 | Cross-organization access | User from Org A tries Org B config | Query settings by raw org_id | Request denied by RLS |
| PET-TST-SET-005 | Branch-only config restriction | Manager on Branch A read Branch B config | Access branch config | Forbidden and recorded |
| PET-TST-SET-006 | Non-admin mutation | Cashier or branch manager submits a settings mutation directly to the API | Request denied; active value unchanged; denial event is logged |

## Scheduling Proposal

- Pull request: changed-slice tests, lint/typecheck/build, secret/dependency checks, and required P0 tests.
- Main/staging promotion: full integration, database/RLS, security and smoke suite.
- Nightly/scheduled: broad regression and performance trend suite where infrastructure exists.
- Before production: migration/restore rehearsal, release-critical security suite, owner UAT and go/no-go sign-off.

Exact schedules depend on CI cost/runtime and must be configured by repository owner; a written schedule is not evidence that a pipeline currently runs.

## Entry and Exit Criteria

Entry: requirement and acceptance are approved/accepted, test data and environment are available, and blocking decisions are resolved. Exit: expected result passes, no unresolved blocker/critical defect, relevant logs/evidence are attached, and exception owners/expiry are recorded.

## Related Documents

- [Test Strategy](test-strategy.md)
- [Test Scenarios](test-scenarios.md)
- [Regression Testing](regression-testing.md)
- [UAT](user-acceptance-testing.md)


