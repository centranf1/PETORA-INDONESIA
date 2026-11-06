---
title: Monitoring and Logging
document_id: PET-DOC-1009
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['backup-recovery.md']
---

# Monitoring and Logging

Monitoring memberi sinyal kesehatan, integritas transaksi, dan abuse dengan data minimum yang diperlukan. Provider Sentry atau setara adalah baseline pilihan, belum terpasang/terverifikasi.

## Sources

Frontend error/performance telemetry (scrubbed), Edge Function outcomes/latency, PostgreSQL slow queries/locks, Auth anomalies, Storage access failures, provider webhooks/queues, payment reconciliation, background job lag, and deployment/migration health. Semua event menggunakan `trace_id`/request ID yang konsisten tanpa menaruh PII/medical content ke trace label.

## Alerts

Prioritaskan payment state unknown/reconciliation mismatch, duplicate/out-of-order webhook, stock invariant breach, journal imbalance, RLS/auth denial spike, settings unauthorized/approval anomalies, clinical access anomaly, DB availability/connection/lock saturation, failed backup, queue backlog, and expired integration credential. Threshold, on-call routing, and alert SLA memerlukan keputusan operasi.

## Log quality

Structured logs memiliki timestamp UTC, environment, component, action/result, actor pseudonymous ID bila perlu, tenant/branch identifier yang di-minimize, `trace_id`, duration, error code, and retryability. Redact access tokens, secrets, payment credentials, customer contacts, and clinical details. Access ke log dan export diaudit; retention mengikuti [data retention policy](../04-database/data-retention-policy.md).

## Dashboard and Response

Pisahkan service availability dari business-integrity signals. Alert harus punya owner, severity, runbook, false-positive review, and recovery confirmation. Dashboard tidak boleh menampilkan tenant data kepada operator yang tidak berwenang.

