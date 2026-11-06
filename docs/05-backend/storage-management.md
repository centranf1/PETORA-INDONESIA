---
title: Storage Management
document_id: PET-DOC-0506
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['authentication-authorization.md']
---

# Storage Management

Dokumen ini mengelola file media seperti foto hewan, resep, dokumen medis, dan invoice.

## Categories

Pet photos, product images, medical attachments, customer documents, and accounting evidence.

## Policies

Use signed URLs with short expiry, no direct public write access, and role-based storage policies.

## Retention

Migrate old or expired attachments to archive storage but retain metadata references in database.

## Compliance

Medical attachments and customer documents require access rules consistent with patient privacy and branch restrictions.

