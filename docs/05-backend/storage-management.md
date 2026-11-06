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

Each category must map to a data class, owning record, organization/branch scope, allowed role, retention class, accepted MIME/size limits, and malware/content handling. Public product images may use a separate public bucket; customer, clinical, financial and employee files default to private storage.

## Policies

Upload flow: authorize metadata/parent record → issue constrained upload path/token → validate size/type/checksum and scan where supported → commit metadata row linked to owner/scope → expose download through an authorized short-lived URL. Do not accept client-selected arbitrary bucket/path. Download rechecks current permission; old signed URLs should have bounded expiry.

Use opaque object keys without customer names, phone numbers, pet names, medical diagnoses, or other sensitive identifiers. Set file size/type limits and reject executable/active content unless explicitly required and sanitized.

## Retention

Retention follows the owning record's approved data class policy. Archive/move must preserve object identity/checksum, access restrictions, audit reference and restore procedure. Deletion or anonymization must update metadata and object store consistently, record outcome, and respect legal hold; the exact retention period is TBD.

## Compliance

Medical attachments and customer documents require access rules consistent with clinical authorization, customer/pet ownership, organization/branch policy and consent. A database row's RLS does not automatically secure its storage object; test object retrieval directly with unauthorized identities.

## Operational Failure Cases

- Orphan upload: scheduled reconciliation finds objects without committed metadata; delete/quarantine only under an approved policy.
- Missing object: return safe unavailable state, alert owner, and preserve record reference for recovery.
- Expired URL: issue a new URL only after current authorization check.
- Malware/invalid content: quarantine; never expose to users until review.

## Related Documents

- [Authentication and Authorization](authentication-authorization.md)
- [Data Protection](../08-security/data-protection.md)
- [Data Retention Policy](../04-database/data-retention-policy.md)

