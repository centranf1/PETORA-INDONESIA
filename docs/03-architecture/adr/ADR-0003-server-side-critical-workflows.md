---
title: ADR 0003: Server-Side Critical Workflows
document_id: PET-ADR-0003
status: Approved
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md', '../module-architecture.md', '../../04-database/transaction-integrity.md']
---

# ADR 0003: Server-Side Critical Workflows

## Status

Approved as an architecture baseline in [Architecture Decisions](../architecture-decisions.md). Approval does not mean the workflows or functions have been implemented.

## Context

PETORA's browser is an untrusted client. Operations such as checkout, payment confirmation, refund, stock adjustment, booking reservation, prescription dispensing, journal posting, settings approval, and privileged export can span multiple records or affect money, stock, clinical data, and tenant boundaries. Client-only validation and role-gated buttons cannot enforce these invariants.

## Decision

- Route security-sensitive commands through authenticated server-side application services/Edge Functions and/or database procedures selected for the transaction boundary.
- Validate actor, active account, action permission, organization/branch assignment, resource relationship, workflow state, request schema, and idempotency before privileged writes.
- Use PostgreSQL transactions for related local writes. Treat third-party provider calls as asynchronous operations with persisted attempts, idempotency, verified callbacks, reconciliation, and compensation; do not claim a cross-system atomic transaction.
- Keep RLS active for Data API-exposed tables. Privileged service-role use is server-only, narrowly scoped, logged, and never forwarded to the browser.
- Keep domain write ownership in the owning module; cross-domain workflows use explicit contracts.

## Alternatives Considered

1. Perform multi-table business mutations directly from browser PostgREST calls: rejected for privileged workflows because client-controlled sequencing cannot reliably enforce cross-row invariants, approval, and replay safety.
2. Put every rule in database triggers: not selected as a universal approach because external orchestration, explainable errors, and domain workflow ownership still require an application boundary. Database constraints/triggers remain appropriate for local invariants when reviewed.
3. Use a single unrestricted service-role endpoint: rejected because it creates an over-privileged generic API and bypass risk.

## Consequences

Positive: central authorization, predictable transaction boundaries, stable domain errors, replay/reconciliation support, and reduced risk of partial or unauthorized writes.

Trade-offs: additional server code, deployment/monitoring ownership, latency, idempotency storage, and operational queues are required. The exact function inventory, rate limits, timeout budgets, and service-role grants must be defined before implementation.

## Verification

Each critical command has direct API authorization tests, RLS tests, transaction rollback/concurrency tests, idempotent retry tests, and provider timeout/replay tests as applicable. Security review verifies that no privileged credential is included in browser artifacts.
---
title: ADR 0003: Server-Side Critical Workflows
 document_id: PET-ADR-0003
status: Approved
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md', '../module-architecture.md', '../../04-database/transaction-integrity.md']
---

# ADR 0003: Server-Side Critical Workflows

## Status

Approved as an architecture baseline in [Architecture Decisions](../architecture-decisions.md). Approval does not mean the workflows or functions have been implemented.

## Context

PETORA's browser is an untrusted client. Operations such as checkout, payment confirmation, refund, stock adjustment, booking reservation, prescription dispensing, journal posting, settings approval, and privileged export can span multiple records or affect money, stock, clinical data, and tenant boundaries. Client-only validation and role-gated buttons cannot enforce these invariants.

## Decision

- Route security-sensitive commands through authenticated server-side application services/Edge Functions and/or database procedures selected for the transaction boundary.
- Validate actor, active account, action permission, organization/branch assignment, resource relationship, workflow state, request schema, and idempotency before privileged writes.
- Use PostgreSQL transactions for related local writes. Treat third-party provider calls as asynchronous operations with persisted attempts, idempotency, verified callbacks, reconciliation, and compensation; do not claim a cross-system atomic transaction.
- Keep RLS active for Data API-exposed tables. Privileged service-role use is server-only, narrowly scoped, logged, and never forwarded to the browser.
- Keep domain write ownership in the owning module; cross-domain workflows use explicit contracts.

## Alternatives Considered

1. Perform multi-table business mutations directly from browser PostgREST calls: rejected for privileged workflows because client-controlled sequencing cannot reliably enforce cross-row invariants, approval, and replay safety.
2. Put every rule in database triggers: not selected as a universal approach because external orchestration, explainable errors, and domain workflow ownership still require an application boundary. Database constraints/triggers remain appropriate for local invariants when reviewed.
3. Use a single unrestricted service-role endpoint: rejected because it creates an over-privileged generic API and bypass risk.

## Consequences

Positive: central authorization, predictable transaction boundaries, stable domain errors, replay/reconciliation support, and reduced risk of partial or unauthorized writes.

Trade-offs: additional server code, deployment/monitoring ownership, latency, idempotency storage, and operational queues are required. The exact function inventory, rate limits, timeout budgets, and service-role grants must be defined before implementation.

## Verification

Each critical command has direct API authorization tests, RLS tests, transaction rollback/concurrency tests, idempotent retry tests, and provider timeout/replay tests as applicable. Security review verifies that no privileged credential is included in browser artifacts.
