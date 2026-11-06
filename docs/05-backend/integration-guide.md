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

Panduan ini menetapkan checklist saat menambahkan provider. Provider dan credential final belum diputuskan; contoh tidak boleh diartikan sebagai integrasi aktif.

## Common Integrations

Payment gateway, email, SMS/WhatsApp, parcel shipping bila extension disetujui, monitoring/error reporting. Supabase Auth/Storage/Realtime adalah platform components pada baseline, bukan third-party business provider yang dipilih bebas.

## Implementation

Sebelum implementasi, dokumentasikan owner, sandbox/production account, scope data, API version, timeout/rate limits, idempotency, webhook verification, secret rotation, data residency/retention, failure/retry, and provider support SLA. Dedicated Edge Function/service adapter menjadi boundary; secret disimpan di secret manager. Persist internal intent/reference and sanitized status; dedupe inbound events before applying domain transition.

Untuk payment, browser redirect bukan bukti sukses; verified webhook/reconciliation menentukan state. Untuk notification, check consent/preference/frequency, delivery receipt, retry, and opt-out. Untuk shipping, gunakan shipment domain terpisah dari animal transport.

## Operational Protection

Record provider, internal/external IDs, status, timestamps, trace ID, attempt count, and safe error code. Do not persist secret/authorization header or unnecessary personal/clinical payload. Monitor callback backlog and unmatched records; define manual reconciliation and provider outage procedure.

## Related Documents

- [Integration architecture](../03-architecture/integration-architecture.md)
- [Secrets management](../08-security/secrets-management.md)
- [Transaction integrity](../04-database/transaction-integrity.md)

