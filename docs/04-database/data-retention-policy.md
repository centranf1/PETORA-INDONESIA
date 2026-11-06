---
title: Data Retention Policy
document_id: PET-DOC-0409
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['transaction-integrity.md']
---

# Data Retention Policy

Kebijakan retensi data untuk transaksi, finansial, dan rekam medis.

## Retention

Customer and transaction histories must remain for audit and legal compliance; financial and medical records should be retained according to local law and business policy.

## Archiving

Inactive or closed data can be moved to archive tables or storage, but references must remain consistent.

## Deletion

Delete only soft records when allowed by policy; do not delete payment, stock movement, or medical records without proper approval and archive copy.

## Recommendation

Define retention periods by data class: operational 3-7 years, financial 10 years, medical 5-10 years depending regulation.

