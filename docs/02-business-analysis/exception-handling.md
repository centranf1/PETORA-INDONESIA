---
title: Exception Handling
document_id: PET-DOC-0207
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['business-rules.md']
---

# Exception Handling

Dokumen ini merinci skenario gagal dan prosedur penanganan pengecualian.

## Common Exceptions

Database connection loss, stock mismatch, invalid payment, duplicate booking, no-show, expired medicine, unauthorized access, and balance mismatch.

## Operational Policies

Void or refund require reason, actor identity, and full audit; failed stock adjustment suspends transaction until supervisor approval. Checkout can be retried only with idempotency key.

## Medical Exceptions

Emergency treatment and surgery must require consent with explicit escalation procedures.

## Customer Exceptions

Customer complaint or dispute enters CRM ticket and requires SLA-based follow-up.

## Recommendation

Sistem harus menampilkan pesan yang jelas dan tidak membocorkan detail internal pada user.

