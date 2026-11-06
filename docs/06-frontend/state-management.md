---
title: State Management
document_id: PET-DOC-0605
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-fetching.md']
---

# State Management

Pilih state owner berdasarkan lifecycle data; hindari menduplikasi sumber kebenaran. Client state tidak menjadi pengganti transaksi backend atau database.

## Server State

TanStack Query mengelola remote read state, caching, pagination, retries, mutation lifecycle, dan invalidation. Semua protected query key menyertakan user/session generation, organization scope, branch scope, resource, dan filter agar cache tidak bocor saat context berganti. Pada logout/account/scope switch, cancel request lama dan clear/invalidate data protected.

## Local State

Gunakan React state untuk modal, tab, hover-independent selection, dan transient UI. Simpan filter/pagination yang dapat dibagikan pada URL. Context hanya untuk cross-tree stable context (session, selected scope, theme) dan bukan pengganti domain server store.

## Form Validation

Use RHF + Zod schema and adapter for server errors.

## Optimistic Updates

Gunakan hanya pada interaksi low-risk yang idempotent dan memiliki rollback UX yang jelas. Jangan optimistically commit sales/payment/refund, stock, booking capacity, medical record, payroll, accounting, approval, atau system settings. Invalidate/refetch setelah server result; mutation conflict harus meminta refresh/review, bukan silent overwrite.

## Realtime

Realtime memperbarui freshness, bukan otoritas. Subscription memakai tenant scope yang diizinkan, dibersihkan saat context berubah, dan diikuti refetch dari authorized query. Jangan menyimpan sensitive payload yang tidak diperlukan di cache.

