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

## Rule

Every bug fix includes a reproducible regression test at the narrowest behavior layer; production incident fixes include a monitoring/alert or operational action if a test cannot detect recurrence.

## Related Documents

- [Test Scenarios](test-scenarios.md)
- [Test to Requirement Mapping](../13-traceability/test-to-requirement-mapping.md)
- [Definition of Done](../12-development-standards/definition-of-done.md)

