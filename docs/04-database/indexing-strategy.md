---
title: Indexing Strategy
document_id: PET-DOC-0407
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-conventions.md']
---

# Indexing Strategy

Strategi indexing untuk kebutuhan pencarian dan analitik.

## Indexes

Indexes for customer lookup, pet by owner, product by branch + status, stock by SKU + branch + warehouse, sales by date, payment by transaction id, medical record by pet and date, payroll by employee and period.

## Composite Indexes

Combine organization_id, branch_id, status, and date when frequent filtering occurs.

## Performance

Avoid over-indexing; use partial indexes for active records and statuses.

## Monitoring

Review slow query logs and pg_stat_statements regularly.

