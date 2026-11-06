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

snake_case for tables and columns, singular table names where practical, and suffixes like _history, _log, _archive for specialized tables.

## Timestamps

Use timestamptz for created_at, updated_at, and event times. Prefer UTC.

## ID Design

Use UUID for distributed identifiers and maintain surrogate primary keys. Use numeric sequences only when there is a strong need for order or compatibility.

## Audit

Every mutable table requires created_by, updated_by, and version history derived from audit_events when required.

## Soft Delete

Use deleted_at with filtered queries; do not physically delete financial or medical records without archiving.

## Indexing

Index by organization_id, branch_id, status, and search keys. Use composite indexes for frequent filters.

