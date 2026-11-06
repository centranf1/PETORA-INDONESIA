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

Use migration scripts, test schema before apply, validate data load, maintain rollback strategy, and back up production data before destructive change.

## Release Steps

Review schema diff, run migration in staging, validate RLS, test seed data, run integration tests, then deploy to production.

## Special Cases

Schema changes affecting roles or financial tables must be reconciled with ERD, permission matrix, and target queries.

## Rollback

Production rollback uses versioned SQL migration undo or restore from snapshot if required, with full data verification.

