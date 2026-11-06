---
title: Error Handling
document_id: PET-DOC-0508
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['api-specification.md']
---

# Error Handling

Error contract membedakan kesalahan input, authorization, domain state, dependency, dan internal failure; semua response stabil untuk client dan aman untuk observability.

## Error Categories

| Category | Example internal code | Client behavior |
| --- | --- | --- |
| Authentication | `UNAUTHENTICATED` | Re-authenticate; do not retry mutation blindly |
| Authorization/scope | `FORBIDDEN` / `NOT_FOUND_OR_FORBIDDEN` | Stop action; no cross-tenant existence leak |
| Validation | `VALIDATION_FAILED` | Safe field errors; correct input |
| Conflict/idempotency | `CONFLICT`, `IDEMPOTENCY_KEY_REUSED` | Refresh/review or return prior result |
| Business rule | `INSUFFICIENT_STOCK`, `CAPACITY_UNAVAILABLE`, `APPROVAL_REQUIRED` | Explain permitted next step without bypass |
| External dependency | `PROVIDER_TIMEOUT`, `PROVIDER_REJECTED`, `RECONCILIATION_REQUIRED` | Display pending/unknown or retry-safe status |
| Internal | `INTERNAL_ERROR` | Show trace ID; no stack or sensitive detail |

## Handling Rules

Return normalized `{code,message,trace_id,details?}` with HTTP semantics agreed in API contract. Log timestamp, actor/scope identifiers minimized, duration, retryability, and sanitized provider reference. Never expose stack trace, SQL, token, patient data, or cross-tenant record existence. For validation error, `details` contains only safe field-level issues.

## Operational Recovery

Retry only transient errors and idempotent operations with bounded exponential backoff; external unknown state goes to reconciliation. Permanent validation/permission errors are not retried. DB transaction failure leaves no partial writes; external side effects require compensation/manual resolution. Audit high-risk denial and state transitions without full request bodies.

## Related Documents

- [API specification](api-specification.md)
- [Edge Functions](edge-functions-specification.md)
- [Frontend error handling](../06-frontend/error-handling.md)

