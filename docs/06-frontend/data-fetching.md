---
title: Data Fetching
document_id: PET-DOC-0606
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['state-management.md']
---

# Data Fetching

Data fetching harus tetap terikat ke feature contract, permission backend, dan scope context aktif. Supabase client tidak boleh menjadi jalan pintas yang melewati business workflow.

## Patterns

Fetch melalui feature API adapter; query key memasukkan organization/branch/session generation dan filter. List besar memakai cursor pagination, server sort/filter, select field minimum, dan debounce search. Detail query ditunda sampai ID/context valid; query tidak dijalankan dalam kondisi unscoped.

Mutasi memanggil server-side command untuk transaksi kritis. Invalidasi ditentukan per mutation contract: checkout memengaruhi sale/payment/stock/customer summary; setting activation memengaruhi settings dan consumer policy; medical revision memengaruhi record history serta customer-visible projection bila diizinkan.

## Error States

Show retry, empty, and permission denial states. Do not swallow API errors.

## Performance

Prefer pagination, server-side sorting, and query parameter filtering for tables with many records.

Retry hanya untuk query atau mutation idempotent dan error transient. Jangan otomatis retry payment/checkout/approval tanpa idempotency key. Abort request lama saat filter/scope berubah. Cache stale time dan polling ditetapkan berdasarkan freshness need; hindari polling data klinis/keuangan tanpa tujuan operasional.

## Security Rules

- Tidak mengirim service role key atau server secret.
- RLS tetap aktif untuk direct read yang diizinkan; akses privileged melalui Edge Function yang terdokumentasi.
- Error body tidak disimpan/log dengan data sensitif; download/export divalidasi ulang oleh server.
- Cache protected data dibersihkan saat sign-out dan scope/account berubah.

