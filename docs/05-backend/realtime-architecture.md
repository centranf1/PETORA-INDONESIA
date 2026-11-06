---
title: Realtime Architecture
document_id: PET-DOC-0507
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['storage-management.md']
---

# Realtime Architecture

Supabase Realtime dapat digunakan untuk mendorong perubahan yang aman dan berguna pada UI; subscription bukan source of truth, authorization authority, atau jaminan exactly-once delivery.

## Use Cases

Booking/clinic queue state, stock alerts, payment state updates, approval tasks, and operational notifications. Jangan broadcast full medical record, payroll, payment credentials, or unrestricted organization events.

## Design

Subscribe hanya ke schema/table/channel yang disetujui, dengan minimal fields and payload. Scope context berasal dari authenticated subscription and RLS/policy; branch switch/sign-out unsubscribes and clears cache. UI menangani reconnect, duplicate/out-of-order updates, stale messages, and refetches authorized state after resume.

## Security

Uji subscriber allow/deny per tenant/branch/role dengan authenticated identities. Validate publication/table exposure, no client-selected privileged channel, rate/payload size, and role revocation. Critical state transitions (paid, refunded, dispensed, setting active) harus diverifikasi ulang melalui authorized query/command; event hanya invalidates/refetches.

## Reliability and Cost

Realtime degradation must fall back to polling/refetch or manual refresh for workflows where freshness matters. Define backoff, subscription count and channel limits after Supabase plan/load validation. Never promise zero-latency delivery without tested evidence.

## Related Documents

- [Data fetching](../06-frontend/data-fetching.md)
- [RLS policies](../04-database/rls-security-policies.md)
- [Security testing](../09-testing/security-testing.md)

