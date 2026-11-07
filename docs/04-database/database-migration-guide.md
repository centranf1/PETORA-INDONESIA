---
title: Database Migration Guide
document_id: PET-DOC-0405
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-conventions.md']
---

# Database Migration Guide

Panduan migrasi mengatur bagaimana schema dan data berubah secara aman.

## Principles

All schema changes are versioned, deterministic, code-reviewed, and run in the same order across environments. A migration is not an ad-hoc dashboard edit. Prefer additive changes and backfills that can be paused/retried. Destructive changes require explicit data owner approval, verified backup/restore, impact analysis, and a recovery plan.

## Migration Procedure

1. Update database design, data dictionary, ERD, module mapping, and RLS requirements first.
2. Write forward migration with constraints, indexes, defaults, and grants explicit; avoid relying on production-only manual state.
3. Test from an empty database and from the latest supported schema; seed only non-sensitive synthetic data.
4. Test data backfill with realistic volume, idempotent rerun, lock duration, and failure recovery.
5. Run RLS/authorization tests under anon, user, and privileged server roles; confirm no newly exposed table lacks intended policy.
6. Deploy additive schema before application code that depends on it. For incompatible changes use expand-migrate-contract and keep old/new versions compatible during rollout.
7. Observe migration duration, errors, locks, row counts, and application health. Pause/abort on agreed thresholds.
8. Remove deprecated columns/paths only in a later migration after all deployed readers/writers have moved.

For local schema smoke validation, run `npm run test:db`. The script starts an ephemeral PostgreSQL 16 container, applies all migrations twice, verifies RLS is enabled on every public table, rejects unapproved public RLS policies, and confirms an authenticated role without scope cannot read tenant rows. The current zero-policy assertion is an interim deny-by-default gate, not a finished access model. It does not replace Supabase integration tests for Auth claims, grants, Edge Functions, or approved scoped RLS policies.

Migration `007_tenant_integrity.sql` adds composite organization-scoped foreign keys for existing single-column relationships where both tables have `organization_id`. Constraints start `NOT VALID` to avoid blocking rollout on legacy rows while rejecting new cross-tenant references. Audit existing rows and validate constraints in a controlled environment before considering the migration fully reconciled.

## Release Steps

Review migration diff and owner approval; run migration in staging; validate RLS, grants, seeds, application integration tests, backup/restore and rollback/forward recovery; deploy under change window; run smoke tests and monitor. Production is not the first environment to test an irreversible migration.

## Special Cases

Changes to roles, tenant scope, payments, stock, medical records, payroll, settings, or accounting require domain-owner review plus security and transaction tests. Data backfills must preserve actor/history semantics and cannot fabricate original business events.

## Rollback

Do not assume every migration can be reversed by down SQL. Before deployment classify recovery as backward-compatible forward-fix, compensating migration, or restore. If data has been written using a new schema, restoring an old snapshot may lose valid transactions; obtain owner approval, stop conflicting writes, reconcile external provider effects, and verify data after recovery.

## Required Migration Record

Every migration includes ID, purpose, affected requirements/tables, author/reviewer, deployment order, estimated lock/backfill impact, data-loss risk, RLS/grants, validation query, recovery route, and post-deploy verification evidence.

## Related Documents

- [Database Conventions](database-conventions.md)
- [RLS Security Policies](rls-security-policies.md)
- [Transaction Integrity](transaction-integrity.md)
- [Backup and Recovery](../10-devops/backup-recovery.md)

