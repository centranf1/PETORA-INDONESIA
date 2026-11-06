---
title: Acceptance Criteria
document_id: PET-DOC-0106
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['feature-catalog.md']
---

# Acceptance Criteria

Dokumen ini menegaskan kriteria penerimaan umum untuk fitur utama PETORA.

## General AC

Semua fitur harus memiliki role-based access, validasi input, database audit, user feedback, and test coverage.

## POS AC

Checkout hanya dapat diproses jika stok tersedia, harga valid, payment authorized, and invoice generated in one transaction.

## Clinical AC

Medical record finalization must preserve historical data and allow revisions through audit mechanism. Prescriptions require valid doctor authorization.

## Inventory AC

Stock movement must produce journal/stock ledger, cannot exceed valid policy, and support branch-level tracking.

## Finance AC

A payment event must reconcile to cash or bank movement and the accounting journal cannot remain unbalanced.

## Portal AC

Customer can see only allowed record types and must not access data beyond allowed owner or branch scope.

