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

Backend PETORA memakai modular monolith di Supabase/PostgreSQL. Domain boundaries dipisahkan lewat schema ownership, service/API contract, database constraints, dan tests; microservices tidak menjadi baseline.

## Primary Components

| Component | Responsibility | Not responsible for |
| --- | --- | --- |
| Supabase Auth | Identity, login/session, JWT lifecycle | Business permission by itself |
| PostgREST + RLS | Scoped read/simple mutations under database policies | Trusting client input or complex multi-domain orchestration |
| PostgreSQL functions/constraints | Atomic relational invariants, idempotency, ledger/journal validation | External HTTP provider calls |
| Edge Functions | Server-verified commands, integrations, webhooks, sensitive workflows | Replacing DB constraints or long-lived unbounded jobs |
| Storage | Private files with parent-record authorization | Public access by opaque path alone |
| Realtime | Delivery of permitted state changes to subscribed clients | Source of truth or authorization bypass |

## Server-side Business Logic

Use a database transaction for all local state that must commit atomically. Use Edge Functions for payment provider orchestration, stock adjustment approval, journal posting commands, prescription validation/dispense, settings change lifecycle, webhook processing, and notification/integration calls.

## Design Pattern

Frontend issues a command with an idempotency key and receives a stable result/error plus trace ID. Backend validates identity, permission, tenant/branch scope, business rule and expected version. Read paths use RLS; write paths use caller-scoped RPC or reviewed server function. Domain updates create audit events, state transitions and downstream events in a consistent transaction/outbox approach.

## Key Rule

Never trust browser-provided organization, branch, role, amount, approval, or final status. Resolve membership from trusted server-side relations. Service-role operations bypass RLS and therefore must be rare, explicit, tested, and logged.

## Cross-domain Events and Consistency

Use a transactional outbox or equivalent durable event record when committed DB changes must trigger asynchronous notification/provider work. Consumers deduplicate by event ID. Reports consume authorized read models, not mutable tables without scope policy. External payments are eventually reconciled; PostgreSQL transactions cannot atomically commit with a third-party provider.

## Reliability and Observability

Every command has timeout/budget, safe retry rule, correlation ID, structured result, and operator recovery path. Monitor function errors/latency, webhook backlog, reconciliation mismatches, failed notification delivery, and PostgreSQL lock/slow-query signals. Numeric SLOs remain open decisions.

## Related Documents

- [API specification](api-specification.md)
- [Edge Functions specification](edge-functions-specification.md)
- [Transaction integrity](../04-database/transaction-integrity.md)
- [RLS policies](../04-database/rls-security-policies.md)

