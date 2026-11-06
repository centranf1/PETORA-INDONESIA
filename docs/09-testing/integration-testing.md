---
title: Integration Testing
document_id: PET-DOC-0904
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['unit-testing.md']
---

# Integration Testing

Integration test memverifikasi contract antara API/Edge Function, PostgreSQL, RLS, Storage, dan provider boundary. Gunakan project database terisolasi yang dibuat dari migration; mock hanya sistem eksternal yang tidak berada di bawah kontrol PETORA.

## Example Scenarios

Checkout menghasilkan sale/payment intent/stock ledger yang konsisten; partial PO receiving mengubah stok sesuai jumlah; clinical finalization membuat medical record revision; prescription dispensing membuat medication/stock event; settings proposal dan approval mencatat version+audit; journal posting menolak imbalance/closed period.

## Verification

Verifikasi status/error contract, row state langsung di database, constraint, transaction rollback, audit entries, idempotency, tenant/branch RLS dengan authenticated role, Storage object policy, serta webhook dedupe. Tes allow dan deny untuk setiap tabel/API yang tersentuh. Gunakan clock/provider simulator hanya bila boundary eksternal memerlukan determinisme.

DB tests tidak dijalankan sebagai superuser/service role ketika menguji user access; service role dapat melewati RLS dan menghasilkan false confidence. Fixture dibersihkan per test atau project ephemeral; test parallel tidak boleh berbagi data scope yang saling bertabrakan.

## Release Gate

Semua P0 integration test dan migrasi/RLS checks harus lulus di CI/staging sebelum production. Jika Supabase local/test environment belum tersedia, nyatakan gap dan jangan mengklaim gate lulus.

## Related Documents

- [RLS policies](../04-database/rls-security-policies.md)
- [Transaction integrity](../04-database/transaction-integrity.md)
- [Test strategy](test-strategy.md)

