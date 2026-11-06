---
title: Integration Guide
document_id: PET-DOC-0509
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['realtime-architecture.md']
---

# Integration Guide

Panduan integrasi untuk gateway eksternal dan platform pendukung.

## Common Integrations

Payment gateway, email, SMS/WhatsApp, shipping, and Sentry or analytics.

Provider selection, data region, fees, terms, throughput, and support SLA are unresolved and must be recorded before enabling a provider in production.

## Implementation

Use a provider adapter with an internal contract so domain logic is not coupled to vendor-specific SDK responses. Credentials are injected server-side from an approved secrets manager. Persist internal operation ID, provider reference, idempotency key, amount/currency when relevant, status, timestamps, retry count, and last safe error. Verify webhooks before trusting them; polling/manual reconciliation is a fallback only when documented.

## Operational Protection

Define per adapter: connect/read timeout, safe retry classes, exponential backoff limits, rate limit handling, duplicate event handling, signature/key rotation, circuit-breaker policy if needed, redaction, alert owner, and reconciliation queue. Avoid retrying non-idempotent operations without provider idempotency guarantees. A provider outage must not silently mark local payment/message as complete.

## Integration Test Requirements

- Provider sandbox/test credentials are isolated from production and never checked into the repository.
- Test valid/invalid signature, duplicate/out-of-order callbacks, timeout-before/after-provider-success, amount mismatch, unknown reference, provider 429/5xx, credential rotation and retry exhaustion.
- Use synthetic customer/pet/clinical data in provider tests.
- Reconcile pending/unknown operations and verify duplicate messages/payments do not create duplicate business effects.

## Related Documents

- [Integration Architecture](../03-architecture/integration-architecture.md)
- [Secrets Management](../08-security/secrets-management.md)
- [Error Handling](error-handling.md)
- [Test Scenarios](../09-testing/test-scenarios.md)

