---
title: Unit Testing
document_id: PET-DOC-0903
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['integration-testing.md']
---

# Unit Testing

Unit test fokus pada rule logic dan validation.

## Examples

Pure/domain functions: money rounding and discount allocation; state-transition guards; loyalty event calculation/reversal; booking slot rules; unit conversion; approval requirement resolver; stable error mapping; permission decision helpers using explicit inputs. Never encode unresolved tax, medical dosage, payroll or refund policy as a test constant and call it approved.

Test each rule's valid, invalid, boundary, missing/undefined and conflicting state. Use deterministic clock/IDs where useful; tests should assert business outputs/invariants rather than internal call counts or implementation trivia. Do not place real customer/patient data in fixtures.

## Rule

Write tests before or alongside behavior changes. Name tests by behavior/scenario, isolate external providers behind test adapters, and keep authorization policy logic testable without replacing integration/RLS tests that verify actual database behavior.

## Unit Test Layers

- Domain rule tests: no network/database; test state transitions and calculations.
- Schema tests: valid/invalid input and unknown-field rejection.
- UI component tests: accessible labels, validation, pending/error/forbidden outcomes.
- Do not mock a production method solely to assert that it was invoked when the actual result/invariant can be verified.

## Related Documents

- [Integration Testing](integration-testing.md)
- [Acceptance Criteria](../01-product/acceptance-criteria.md)
- [Definition of Done](../12-development-standards/definition-of-done.md)

