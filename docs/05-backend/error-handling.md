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

Dokumen ini menyiapkan pola standard untuk semua service dan endpoint.

## Error Categories

Validation Error, Authorization Error, Business Rule Error, Duplicate Record, External Service Failure, and System Failure.

## Response Envelope

```json
{
	"error": {
		"code": "PAYMENT_PENDING",
		"message": "Pembayaran sedang diverifikasi.",
		"retryable": false,
		"field_errors": [],
		"trace_id": "req_opaque_id"
	}
}
```

The example is illustrative. Do not expose SQL, stack traces, provider credential, protected record existence, or sensitive input in `message`/`field_errors`. `retryable` describes whether the same logical operation may be retried; mutation retries must reuse the idempotency key.

## Stable Error Families

| HTTP class | Example code | Meaning | Client behavior |
| --- | --- | --- | --- |
| 400 | `VALIDATION_FAILED` | Payload/schema invalid | Correct indicated fields; do not retry unchanged |
| 401 | `AUTH_REQUIRED` | Missing/expired authentication | Reauthenticate/refresh session safely |
| 403 | `PERMISSION_DENIED` | Action or scope not authorized | Do not retry with altered IDs; request assignment review |
| 404 | `RESOURCE_NOT_FOUND` | Resource unavailable or intentionally hidden | Show safe not-found; do not infer other tenant existence |
| 409 | `STATE_CONFLICT` / `VERSION_CONFLICT` | Concurrent update, stale version, duplicate unique state | Refresh authoritative state and reconcile intent |
| 422 | `BUSINESS_RULE_REJECTED` | Valid shape violates policy/state | Explain safe reason and permitted next action |
| 429 | `RATE_LIMITED` | Caller/provider quota reached | Respect `Retry-After` if provided |
| 502/503 | `DEPENDENCY_UNAVAILABLE` | Provider or dependency unavailable | Retry only if safe/idempotent; otherwise inspect status |
| 500 | `INTERNAL_ERROR` | Unexpected system failure | Present trace ID; never expose internal details |

Exact route status codes must align with API framework, but error `code` remains stable for consumers.

## Handling Rules

Normalize errors at the API boundary. Log trace ID, actor/scope identifiers only as allowed, operation, dependency and timing. Redact credentials, payment data, medical details and request bodies. Authorization denials should avoid revealing whether a restricted resource exists.

## Operational Recovery

Retry external actions with persisted idempotency state and bounded backoff. Do not auto-retry validation/authorization failures. For ambiguous payment timeout, return a pending status and reconcile with provider before accepting a new payment attempt. Alert when dead-letter/reconciliation queues exceed the approved threshold.

## Related Documents

- [API Specification](api-specification.md)
- [Exception Handling](../02-business-analysis/exception-handling.md)
- [Monitoring and Logging](../10-devops/monitoring-logging.md)

