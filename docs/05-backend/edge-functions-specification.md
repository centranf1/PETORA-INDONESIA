---
title: Edge Functions Specification
document_id: PET-DOC-0504
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['api-specification.md']
---

# Edge Functions Specification

Dokumen ini memerinci fungsi edge untuk workflow kritis.

## Use Cases

Checkout orchestration, payment reconciliation, refund processor, stock adjustment review, appointment conflict detection, and notification dispatch.

Also includes privileged settings proposal/approval, webhook verification, journal posting, clinical dispensing checks, and scoped exports where direct client database access is inappropriate. A function should map to a bounded command/use case rather than a generic privileged CRUD proxy.

## Security

Every function must:

1. Validate method, content type, size, JWT signature/issuer/audience, account status, and allowed caller.
2. Resolve organization/branch assignment server-side; reject client scope claims not matching membership.
3. Check action permission and record/workflow state before privileged database access.
4. Validate request schema and business limits; do not accept client-supplied approval flags or trusted totals.
5. Apply rate limits/idempotency and use the minimum database privilege necessary.
6. Emit a correlation ID and audit event for privileged actions; redact secret and sensitive payload.
7. Return stable response/error envelope without stack trace or service credential.

Service-role credentials may be used only inside protected server runtime, never in browser output, client-readable environment, logs, or returned error.

## Implementation Pattern

Use the shared error contract in `error-handling.md`. For mutations accept an idempotency key scoped to authenticated actor/organization/action and persist its result under a uniqueness constraint. A repeated key with different request hash is rejected. External calls use durable attempts; do not keep a database transaction open while waiting on provider network.

## Function Contract Template

| Contract item | Required detail |
| --- | --- |
| Name/version | Stable operation and compatibility policy |
| Caller | User JWT, service-to-service identity, or provider webhook |
| Authorization | Permission, tenant/branch scope, ownership and workflow checks |
| Request | Validated schema, size limits, idempotency and correlation identifiers |
| Writes | Transaction boundary, constraints, audit and outbox records |
| External effects | Provider, timeout, retry, signature and reconciliation |
| Responses | Success/pending/error status, safe code and trace ID |
| Verification | Unit/integration/RLS/security tests and operational metrics |

## Operations

Set bounded execution time and payload size, monitor error/latency/retry counts, and alert on reconciliation backlog. Deploy environment-specific secrets without logging values. Document rollback/compatibility when function payloads change.

## Repository Runtime Status

Deployable Supabase entry points are exposed as `auth-me`, `auth-signin`, `auth-signup`, `customers-list`, `products-list`, `inventory-locations`, `sales-list`, `settings-approve`, `settings-propose`, and `settings-reject`; nested handler modules are invoked by these `Deno.serve` wrappers. `npm run typecheck:backend` checks their TypeScript separately from the Vite application. This typecheck does not prove deployment, database migration validity, RLS behavior, or transactional correctness. Customer, product, inventory-location, and sales-header reads are bounded read-only endpoints guarded by verified identity and explicit role permission. Until provisioning and settings policies are approved and atomic database commands are implemented, signup and all settings endpoints return `503 POLICY_NOT_APPROVED` without accessing the database. Stock ledger reads and inventory mutations remain unavailable.

## Related Documents

- [Authentication and Authorization](authentication-authorization.md)
- [API Specification](api-specification.md)
- [Error Handling](error-handling.md)
- [Integration Architecture](../03-architecture/integration-architecture.md)

