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

## Query Workloads and Candidate Indexes

Final index definitions depend on approved schema and query plans. Candidate access patterns:

| Workload | Predicate/order | Candidate index shape |
| --- | --- | --- |
| Customer search | organization + normalized phone exact match | unique `(organization_id, normalized_phone)` if business uniqueness is approved |
| Pet list by owner | organization + owner relation + active status | relationship index `(customer_id, pet_id)` and reverse `(pet_id, customer_id)` |
| Product lookup | organization + SKU/barcode + status | unique scoped SKU/barcode; branch overrides in separate relation if modeled |
| Stock balance | organization + location + product + batch | `(organization_id, location_id, product_id, created_at)` for ledger reads; snapshot strategy TBD at volume |
| Sales list | organization + branch + created_at descending + status | `(organization_id, branch_id, created_at DESC)` with optional partial status index if query evidence supports |
| Payments by sale/provider | sale ID or provider reference | `(sales_transaction_id)` and unique provider transaction/event reference |
| Clinical history | organization + pet + occurred_at descending | `(organization_id, pet_id, occurred_at DESC)` with restricted RLS |
| Payroll period | organization/branch + period + employee | `(organization_id, period_start, employee_id)` after payroll schema approval |
| Settings lookup | organization + branch + group + key | partial unique indexes for org-level and branch-level keys |

## Composite Indexes

Composite order follows equality filters first, then range/order columns, based on actual query shape. Do not blindly append every column; a composite index is useful only for matching left-prefix predicates/order. Include tenant context in uniqueness constraints to prevent cross-tenant collisions.

## Performance

Avoid over-indexing due write amplification and storage. Use partial indexes only when predicate is stable and matches queries. Use GIN/trigram/full-text indexes only for demonstrated JSONB/text search requirements and document reindex/cost behavior.

## Monitoring

Capture representative `EXPLAIN (ANALYZE, BUFFERS)` plans in non-production with realistic data. Review `pg_stat_statements`, slow-query logs, index size/hit ratio, write latency, and vacuum/bloat. Numeric query budgets and alerts remain TBD until workload targets are approved. RLS predicates must be included in plan review.

## Related Documents

- [Database Conventions](database-conventions.md)
- [Performance Testing](../09-testing/performance-testing.md)
- [Data Dictionary](data-dictionary.md)

