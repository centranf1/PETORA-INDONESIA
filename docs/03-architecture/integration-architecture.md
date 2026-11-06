---
title: Integration Architecture
document_id: PET-DOC-0308
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-flow-diagram.md']
---

# Integration Architecture

Integrasi eksternal tidak dipercaya sebagai source of truth sampai response/webhook diverifikasi. Provider final belum dipilih; setiap koneksi di bawah adalah logical boundary dan harus memiliki owner, contract, sandbox, error model, dan exit/reconciliation path.

## Integrations

Payment gateway, email/SMS/WhatsApp, shipping provider (recommended extension), Supabase Storage, and error/monitoring service. Animal transport is an internal operational domain and distinct from parcel shipping provider.

## Pattern

All sensitive calls originate server-side through dedicated Edge Functions. Secrets live in environment-scoped secret manager; database stores a reference/status only. Enforce timeout, bounded retry, rate limit, circuit/degraded state, provider-specific idempotency, and secret rotation. Use an outbox/queue for asynchronous delivery when request latency or reliability requires it.

## Data Contracts

Every command/event defines internal ID, provider event/reference ID, organization/branch validated from trusted context, correlation/trace ID, idempotency key, amount/currency where applicable, status, occurred/received time, and version. Do not send sensitive medical/customer payload unless necessary and approved.

## Webhook Boundary

Verify signature over raw body, configured key version, timestamp/replay window, provider/event relationship, and unique provider event ID. Persist inbox event before applying state transition; handle duplicate and out-of-order events. Browser redirect is not payment confirmation. Reconcile unmatched provider/internal records and create operator-visible exceptions.

## Failure and Observability

Map provider errors to stable internal code and retryability. Store sanitized request/response references and status, not secret headers/payment credentials. Monitor latency, error/timeout rate, callback backlog, and unresolved reconciliation. Numeric thresholds and provider contracts remain open decisions.

## Related Documents

- [Integration guide](../05-backend/integration-guide.md)
- [Secrets management](../08-security/secrets-management.md)
- [Transaction integrity](../04-database/transaction-integrity.md)

