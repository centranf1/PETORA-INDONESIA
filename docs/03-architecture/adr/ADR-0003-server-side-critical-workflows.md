---
title: ADR 0003: Server-side Critical Workflows
document_id: PET-ADR-0003
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md', '../../04-database/transaction-integrity.md', '../../05-backend/edge-functions-specification.md']
---

# ADR 0003: Server-side Critical Workflows

## Status

Proposed (Draft; belum disetujui)

## Context

PETORA memiliki workflow yang menulis beberapa record terkait atau berkomunikasi dengan payment, notification, dan integration providers. Browser tidak dapat dipercaya untuk menentukan harga final, scope tenant, approval, stock, atau status klinis/keuangan. Database harus tetap menjadi sumber kebenaran untuk invariant lokal.

## Decision

Jalankan critical commands melalui PostgreSQL transaction/function atau Edge Function yang memvalidasi actor, tenant/branch membership, permission, input, dan state transition. Gunakan transaction DB untuk semua perubahan lokal yang wajib atomik. Efek provider eksternal memakai idempotency, durable state, verified webhook, dan reconciliation; jangan mengklaim transaksi ACID lintas provider.

## Options Considered

- Client-side multi-table writes: ditolak untuk financial, stock, clinical, payroll, settings, and permissions karena dapat dimanipulasi dan gagal parsial.
- Edge Function untuk setiap query: ditolak sebagai aturan universal karena read sederhana dapat tetap menggunakan RLS-protected API; gunakan server command bila workflow membutuhkan privilege/invariant.
- Database-only workflow: tidak cocok untuk secret/provider HTTP orchestration, tetapi tetap menjadi tempat constraint dan atomic local writes.

## Consequences

Keamanan dan integritas meningkat, tetapi tim harus merawat API/RPC contracts, transaction functions, idempotency keys, webhook inbox, audit events, retries, and operator reconciliation. Service-role key bypasses RLS sehingga hanya dipakai pada code path yang di-review, diuji, dibatasi, dan diaudit. Failures provider dapat menghasilkan pending/unknown state yang harus terlihat di UI dan operasi.

## Follow-up

Tentukan command inventory, permission contract, function ownership/search_path, outbox/reconciliation mechanism, timeout/retry, and test environment. Validasi alur payment, refund, stock reservation, booking capacity, settings approval, and journal posting sebelum production.

## Related Documents

- [Transaction integrity](../../04-database/transaction-integrity.md)
- [Edge Functions specification](../../05-backend/edge-functions-specification.md)
- [RLS policies](../../04-database/rls-security-policies.md)
