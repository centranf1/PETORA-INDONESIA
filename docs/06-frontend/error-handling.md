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

Frontend memetakan error contract backend menjadi tindakan yang aman dan dapat dipahami tanpa membocorkan detail teknis atau data yang tidak berhak dilihat user.

## Error States

Modelkan loading, empty, success, field validation, unauthenticated, forbidden, not found, conflict/stale version, rate limit, network timeout, provider pending, and server failure secara terpisah. Untuk cross-tenant resource, jangan menyatakan record ada/tidak ada jika itu dapat mengungkap keberadaannya.

## Operational Rule

Tampilkan message dan recovery action yang aman; sertakan `trace_id` untuk support. Technical error dapat dikirim ke Sentry/solusi setara bila disetujui, dengan scrub PII, medical details, tokens, request body, dan URL secret. Jangan log credential atau full record.

## Retry

Query dapat di-retry untuk transient error dengan bounded backoff. Mutation hanya retry bila idempotency key menjamin satu efek; payment, checkout, refund, settings approval, dispensing, dan payroll tidak boleh auto-repeat tanpa idempotency. Provider `pending/unknown` menampilkan status reconciliation, bukan success/failure yang ditebak.

## Recovery UX

Conflict meminta refresh/review perubahan terbaru. Validation meminta koreksi field. Permission denial menghentikan submit. Session expiry meminta reauthentication tanpa mengulang command non-idempotent secara otomatis. Form action harus disabled selama request pending, tetapi backend tetap wajib deduplikasi.

