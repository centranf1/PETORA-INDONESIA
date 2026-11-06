---
title: Frontend Error Handling
document_id: PET-DOC-0608
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['error-handling.md']
---

# Frontend Error Handling

Prinsip pencegahan dan penanganan bug pada frontend.

## Error States

Represent loading, empty, success, field validation, auth-required, forbidden, not-found, business-rule rejection, conflict/version-stale, pending external operation, network loss and unexpected server failure separately. For mutations after a timeout, show `unknown/pending` and reconcile by trace/idempotency reference; do not display a definite failure if the server may have committed.

## Operational Rule

Display the API's safe message and trace ID. Send only redacted technical context to monitoring; remove tokens, form bodies, customer contacts, medical data, payment details, and signed URLs. Global error boundaries catch rendering failures, not data/authorization errors.

## Retry

Retry reads with bounded backoff when appropriate. For commands, retry only with the same idempotency key and only when contract says safe; present a status-check action for ambiguous operations. Never auto-replay a payment, refund, stock adjustment, or approval with a new request identity.

## User Recovery Guidance

| State | UI response |
| --- | --- |
| Validation | Keep entered values; focus first invalid field and show summary |
| Forbidden | Explain the user lacks access and show safe next step; do not reveal hidden data |
| Conflict | Preserve draft, show current version and request reload/merge |
| Pending provider | Show pending reference and reconciliation status; disable duplicate submit |
| Network failure | Preserve safe form state and permit contract-safe retry |
| Unexpected error | Show trace ID and support path; do not expose stack trace |

## Related Documents

- [Backend Error Handling](../05-backend/error-handling.md)
- [Data Fetching](data-fetching.md)
- [Security Logging](../08-security/audit-logging.md)

