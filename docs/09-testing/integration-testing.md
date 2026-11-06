---
title: Integration Testing
document_id: PET-DOC-0904
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['unit-testing.md']
---

# Integration Testing

Integrasi test melibatkan endpoint dan interaksi database.

## Example Scenarios

Create sale with inventory update, create PO and receive stock, create medical record and prescription, and close finance period.

## Environment and Test Data

Run against an isolated test database/project with migrations and RLS enabled. Seed synthetic organizations A/B, multiple branches, role assignments, customers/pets, stock batches, payments and clinical records. Tests must use distinct identities/claims and clean data by test run ID; never use production secrets or real medical/customer data.

## Assertions

For each mutation verify HTTP result, persisted state, transaction atomicity, audit/version events, row scope, idempotent retry, and absence of duplicate side effects. Include direct DB/API calls that bypass frontend controls. Provider integrations use sandbox/fakes that simulate timeout-before/after-success, duplicate and out-of-order callback, invalid signature, rate limit, and server failure.

## Verification

Check stable response/error codes, state transitions, ledger/reconciliation, RLS for anon/user/server roles, migrations from clean and previous schema, and cleanup of external test objects. Failed tests must provide trace ID and reproducible seed without leaking sensitive payload.

## Related Documents

- [RLS Security Policies](../04-database/rls-security-policies.md)
- [Transaction Integrity](../04-database/transaction-integrity.md)
- [Test Scenarios](test-scenarios.md)

