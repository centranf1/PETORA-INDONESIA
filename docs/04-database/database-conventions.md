---
title: Database Conventions
document_id: PET-DOC-0404
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-dictionary.md']
---

# Database Conventions

Panduan konvensi database menjaga konsistensi schema dan operasi.

## Naming

Use `snake_case` for schema objects and columns. Use plural table names consistent with the existing dictionary; choose one convention before adding a new domain table. Name foreign keys `<referenced_entity>_id`, timestamps `<event>_at`, boolean columns with `is_`/`has_` where clear, and constraints/indexes with table + purpose. Avoid reserved words and ambiguous abbreviations. Use explicit schema qualification in migrations and privileged SQL.

## Timestamps

Use `timestamptz` for instants, store/compare in UTC, and format in organization/branch timezone at the UI boundary. Store a local service date separately only where business semantics require it. Keep `created_at` immutable; update `updated_at` consistently. Define whether a date represents an instant, local calendar day, or period boundary.

## ID Design

Use UUID primary keys for database/API identity. Human-readable invoice/receipt/PO numbers are separate organization-scoped sequences and must not be used as foreign keys. Define uniqueness with the correct tenant scope and handle concurrent number allocation transactionally.

## Audit

Document ownership, immutable/mutable fields, `created_by`/`updated_by`, audit source and retention per table. Append-only ledgers, final clinical records and posted journals use correction/revision records. Use `version_no` only for an explicitly defined optimistic concurrency contract; do not treat it as a substitute for historical snapshots.

## Soft Delete

Soft delete is allowed only for entity types whose business/legal lifecycle permits it. Every normal query must intentionally filter deleted rows. Do not soft-delete ledger, posted journal, payment, finalized medical history, or audit event as a means of hiding corrections; use reversal/revision. Physical deletion follows approved retention and legal-hold procedure.

## Indexing

Design indexes from observed query predicates and order. Tenant/branch prefix order depends on selectivity and access path; do not add every column to every index. Confirm with `EXPLAIN (ANALYZE, BUFFERS)` on representative data. Unique constraints and FK indexes are documented separately from performance indexes.

## Numeric and Money Types

Use `numeric(p,s)` or integer minor units with an explicitly chosen currency scale; never use floating point for money. Amount, currency, rounding mode, tax inclusion, and discount allocation must be defined per transaction contract and stored with the result needed for audit.

## Constraints and Relationships

Use foreign keys for same-database relationships, `CHECK` for local invariants, unique constraints/partial indexes for identity, and transaction logic for cross-row invariants. Composite tenant constraints should prevent linking records across organizations where feasible. Document deletion behavior and `ON DELETE` actions explicitly; default to restrictive behavior for historical records.

## Migration and Review

Schema changes require migration, data dictionary/ERD update, RLS/grant review, query/index impact, rollback/forward-recovery plan, and tests. Production migrations must be backward compatible during rolling deploys or use an expand-migrate-contract sequence.

