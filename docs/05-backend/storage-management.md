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

Storage menyimpan file object, sedangkan database menyimpan metadata, ownership, retention class, and relationship to domain record. Bucket/provider configuration belum diverifikasi.

## Categories

Pet/customer-uploaded photos, product images, grooming/boarding evidence, medical attachments, customer documents, receipts/invoices, accounting evidence. Public catalog images may use public read only after owner approves; customer, financial, and medical files use private buckets.

## Policies

Validate actor, parent record, tenant/branch, purpose, MIME allowlist, max size, filename normalization, and upload ownership. Never use user-provided object path as authorization. Private download uses short-lived signed URL only after server authorization; URLs are bearer capabilities and must not be logged/shared. Enforce no direct public write for private classes, malware/content scanning decision, safe content disposition, and orphan cleanup.

## Retention

Archive/delete follows parent record data class, retention/legal hold, and approved lifecycle. Keep metadata/reference and access audit; ensure archival preserves access control and recovery. Storage backups/restores must reconcile object versions with DB references.

## Compliance

Medical attachments and customer documents require same or stricter access as parent record; customer portal serves explicitly owner-visible files only. Financial evidence access is scoped and export/download audited. Do not expose signed URL or metadata through unrestricted realtime/report payload.

## Related Documents

- [Data protection](../08-security/data-protection.md)
- [Data retention](../04-database/data-retention-policy.md)
- [RLS policies](../04-database/rls-security-policies.md)

