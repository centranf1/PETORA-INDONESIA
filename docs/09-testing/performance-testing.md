---
title: Performance Testing
document_id: PET-DOC-0907
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-plan.md']
---

# Performance Testing

Performance testing mengukur jalur yang dipengaruhi volume, concurrency, dan scope authorization: dashboard, customer/product search, POS checkout, stock contention, booking capacity, clinical timeline, report/export, and notifications.

## Targets

Numeric latency, throughput, concurrency, dataset scale, availability, and error budget belum disetujui; hasil tidak boleh dilabeli memenuhi SLA sebelum target ditetapkan. Product/Operations menentukan target berdasarkan user journey, cabang, dan data volume. Setiap test mencatat environment, seed size, request mix, percentile latency, error rate, DB load, lock waits, dan resource usage.

## Monitoring

Track query time, API/function latency, queue depth, cache hit/staleness, CPU/memory/connection use, lock/deadlock, and provider rate limit. Load test memakai synthetic data dan RLS aktif; hindari data pasien/real customer. Tune indexes/caching hanya setelah query plan and consistency impact review.

## Test Profiles

- Baseline: normal shift mix across branches with reporting queries.
- Peak: opening/closing or campaign/clinic peak concurrency.
- Stress: find saturation and graceful failure; do not run against production without explicit approval.
- Soak: detect queue/backlog, connection, and cache degradation over a representative period.

Verify backpressure/timeouts, pagination/export limits, degraded provider behavior, and no cross-tenant leakage under load. Performance test tool and thresholds are deployment decisions.

