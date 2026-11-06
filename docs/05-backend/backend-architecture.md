---
title: Backend Architecture
document_id: PET-DOC-0501
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['api-specification.md', 'authentication-authorization.md']
---

# Backend Architecture

Dokumen backend menjelaskan fungsi server-side dan pola integrasi PETORA.

## Proposed Components

Supabase Auth, Postgres/RLS, Edge Functions, Storage, Realtime, and PostgREST are the documented platform baseline. This list is a design proposal until ADRs and deployment ownership are approved; use triggers/procedures only when transaction semantics, permissions, migration, and test coverage are explicit.

## Server-side Business Logic

Use server-side functions/services for authorization-sensitive orchestration such as payment attempts/webhook verification, stock adjustment approval, journal posting, prescription validation, settings approval, and external integrations. Keep core invariants in an authoritative transactional boundary; client code must not directly compose privileged multi-table writes.

## Design Pattern

Domain services are invoked through documented API/command contracts. Frontend issues commands and receives stable success/error outcomes; server verifies actor, role, organization/branch assignment, workflow state, idempotency, and data integrity. External calls use persisted attempts, timeouts, safe retries, verified webhooks, and reconciliation/compensation rather than an assumed cross-system transaction.

## Key Rule

Never trust browser-provided organization_id or branch_id; verify against authenticated identity and policy.

## Error, Audit, and Observability

Every request carries a correlation ID. Errors use the shared safe error contract; logs exclude credentials and sensitive payloads. Privileged and business-critical commands emit audit events and metrics for success, failure, retry, and reconciliation backlog.

## Related Documents

- [API Specification](api-specification.md)
- [Authentication and Authorization](authentication-authorization.md)
- [Edge Functions Specification](edge-functions-specification.md)
- [Error Handling](error-handling.md)
- [Transaction Integrity](../04-database/transaction-integrity.md)

