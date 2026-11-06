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

Edge Functions adalah boundary server-side untuk command yang memerlukan secret, orchestration eksternal, atau otorisasi/transaksi lintas domain. Fungsi harus kecil dan idempotent; database constraint tetap menjadi pengaman invariant.

## Use Cases

| Function group | Tanggung jawab | Side effects / recovery |
| --- | --- | --- |
| Checkout/payment | Validasi actor/scope, harga server-side, create pending order, provider call | Idempotency key, webhook inbox, state machine, reconciliation untuk timeout/uncertain result |
| Refund | Authority, refundable amount, reason, provider refund, reversal events | Duplicate request safe; provider partial failure masuk retry/review |
| Inventory | Approval adjustment/transfer dan stock movement command | DB transaction/locking; ledger audit; no client balance update |
| Booking | Reserve/cancel/reschedule dan cek kapasitas | Atomic capacity guard; expired reservation cleanup yang idempotent |
| Clinical/pharmacy | Validasi doctor assignment, finalization, prescription/dispense command | RLS + clinical authorization; immutable revision; stock/medical event consistency |
| Accounting/payroll | Post balanced journal, close cycle/period | Server-side invariants, approval/segregation of duties, idempotent source reference |
| System settings | Validate draft, submit/approve/reject/activate/rollback | Version/audit transaction, expected version, cache invalidation after commit |
| Notifications/integrations | Dispatch queue, provider webhook, health check | Signature verification, deduplicate event, sanitized retry/dead-letter status |

## Security

Validate JWT, derive actor with `auth.uid()`, resolve organization/branch membership and permission, validate input schema, enforce rate/size limits, and write audit where required. Prefer user-scoped Supabase client so RLS remains active. Service role is permitted only for an explicitly reviewed server operation that cannot run under caller RLS; scope its code path and data query, keep key in platform secret store, and never return it or its bearer capability to client. Never trust raw role/org values sent in request.

Webhook handlers validate provider signature against raw request bytes, timestamp/replay window, endpoint secret version, and unique provider event ID before applying state changes. Do not treat redirect/browser success as authoritative payment confirmation.

## Implementation Pattern

Commands follow: parse -> authenticate -> authorize -> validate -> perform transaction/record intent -> call provider if needed -> reconcile -> emit structured result. Use stable response error codes, `trace_id`, safe field errors, and explicit retryable/permanent classification. Do not hold database transaction/row locks open across network calls. Logs redact tokens, customer sensitive data, medical details, and payment credentials.

## Operational Requirements

- Deploy secrets and function version via CI/platform process; no `.env` secret committed.
- Define timeout, concurrency, retry, provider rate limit, and alert threshold per function before production.
- Add function-level tests for allowed/denied actors, tenant/branch spoofing, malformed payload, duplicate requests/events, timeout, and DB failure.
- Every external side effect must have reconciliation or operator remediation path.

## Related Documents

- [API specification](api-specification.md)
- [Authentication and authorization](authentication-authorization.md)
- [Transaction integrity](../04-database/transaction-integrity.md)
- [Secrets management](../08-security/secrets-management.md)

