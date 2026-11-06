---
title: ADR 0005: Audit and Historical Record Integrity
document_id: PET-ADR-0005
status: Approved
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md', '../../08-security/audit-logging.md', '../../04-database/transaction-integrity.md']
---

# ADR 0005: Audit and Historical Record Integrity

## Status

Approved as an architecture baseline in [Architecture Decisions](../architecture-decisions.md). Retention periods and legal handling remain open decisions.

## Context

PETORA manages financial, inventory, clinical, payroll, identity, and settings events where silent overwrites impair reconciliation, safety, and accountability. Audit logs themselves may contain sensitive information and must not become an uncontrolled data store.

## Decision

- Sensitive changes and privileged actions emit attributable audit events with actor/service identity, time, action, organization/branch scope, target reference, reason where required, outcome, and correlation ID.
- Write audit/version events in the same database transaction as successful local changes, or use a transactional outbox with delivery guarantees where an asynchronous sink is used.
- Normal application roles cannot update or delete committed audit events. Access to read/export is separately authorized, scoped, minimized, and itself auditable.
- Posted financial entries, stock ledgers, finalized medical records, payments, and approval decisions are not silently overwritten. Corrections use linked reversal, adjustment, or revision records.
- Redact credentials, tokens, unnecessary customer/medical/payment values, and raw provider payloads before logging. Retention and disposal follow approved data-class policy.

## Alternatives Considered

1. Rely on application text logs only: rejected as the sole evidence because logs may not be transactionally linked to a committed state change.
2. Store full request/response payloads indefinitely: rejected due privacy, secret exposure, and retention risk.
3. Allow administrators to edit/delete audit history: rejected for normal operations; exceptional legal/disposal process must be separately governed.

## Consequences

Positive: traceable correction, incident investigation, and reconciliation.

Trade-offs: storage/retention cost, schema/event versioning, access governance, and redaction controls are required. Exact retention durations, legal hold, export authority, and disposal workflow remain open decisions.

## Verification

Tests assert audit presence for successful/denied critical actions, transaction rollback behavior, append-only permissions, redaction of sensitive fields, correct tenant scope, and traceability from a correction to its source record.
---
title: ADR 0005: Audit and Historical Record Integrity
document_id: PET-ADR-0005
status: Approved
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md', '../../08-security/audit-logging.md', '../../04-database/transaction-integrity.md']
---

# ADR 0005: Audit and Historical Record Integrity

## Status

Approved as an architecture baseline in [Architecture Decisions](../architecture-decisions.md). Retention periods and legal handling remain open decisions.

## Context

PETORA manages financial, inventory, clinical, payroll, identity, and settings events where silent overwrites impair reconciliation, safety, and accountability. Audit logs themselves may contain sensitive information and must not become an uncontrolled data store.

## Decision

- Sensitive changes and privileged actions emit attributable audit events with actor/service identity, time, action, organization/branch scope, target reference, reason where required, outcome, and correlation ID.
- Write audit/version events in the same database transaction as successful local changes, or use a transactional outbox with delivery guarantees where an asynchronous sink is used.
- Normal application roles cannot update or delete committed audit events. Access to read/export is separately authorized, scoped, minimized, and itself auditable.
- Posted financial entries, stock ledgers, finalized medical records, payments, and approval decisions are not silently overwritten. Corrections use linked reversal, adjustment, or revision records.
- Redact credentials, tokens, unnecessary customer/medical/payment values, and raw provider payloads before logging. Retention and disposal follow approved data-class policy.

## Alternatives Considered

1. Rely on application text logs only: rejected as the sole evidence because logs may not be transactionally linked to a committed state change.
2. Store full request/response payloads indefinitely: rejected due privacy, secret exposure, and retention risk.
3. Allow administrators to edit/delete audit history: rejected for normal operations; exceptional legal/disposal process must be separately governed.

## Consequences

Positive: traceable correction, incident investigation, and reconciliation.

Trade-offs: storage/retention cost, schema/event versioning, access governance, and redaction controls are required. Exact retention durations, legal hold, export authority, and disposal workflow remain open decisions.

## Verification

Tests assert audit presence for successful/denied critical actions, transaction rollback behavior, append-only permissions, redaction of sensitive fields, correct tenant scope, and traceability from a correction to its source record.
