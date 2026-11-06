---
title: Data Protection
document_id: PET-DOC-0804
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['security-policies.md']
---

# Data Protection

Dokumen ini menetapkan handling baseline berdasarkan data class dan threat model. Legal basis, jurisdiction, exact retention, and encryption key ownership memerlukan keputusan stakeholder/platform.

## Encryption

Gunakan TLS untuk transport dan platform at-rest encryption yang tersedia; verifikasi konfigurasi provider, backup encryption, key ownership, region, dan restore controls sebelum klaim compliance. Secret integrasi disimpan di server secret manager. Field-level encryption hanya ditambahkan dengan threat/key-management requirement jelas; encryption tidak menggantikan RLS.

## Data Categories

| Classification | Examples | Minimum handling |
| --- | --- | --- |
| Public | Public service catalogue, branch hours approved for publication | Published intentionally; no internal identifiers or hidden fields |
| Internal | Operational dashboard aggregates, SOP non-sensitive | Authenticated staff, organization scope, export controls as needed |
| Confidential | Customer contact, supplier terms, staff records, payment references | Need-to-know access, audit for export/change, log redaction |
| Restricted | Medical records, payroll, credentials, security/audit evidence | Specific permission, secure storage, restricted export/download, access audit |

Final statutory/regulatory category mapping must be approved by Legal/Compliance; “regulated” is not a classification shortcut.

## Handling

Minimize collection and response fields; mask sensitive settings; use private Storage buckets and short-lived signed URL only after parent-record authorization; validate MIME/size and safe download headers; do not put sensitive data in URL/query/logs; apply retention/legal hold and deletion decisions per data class. Browser cache, error monitoring, analytics, screenshots, and exports must not unintentionally retain restricted data.

Access to medical, payroll, and financial data is logged according to audit policy. Customer portal serves an explicit owner-visible projection, not the underlying unrestricted clinical record. Data correction should preserve audit/history and follow retention rules.

## Related Documents

- [Threat model](threat-model.md)
- [Data retention](../04-database/data-retention-policy.md)
- [Storage management](../05-backend/storage-management.md)
- [Secrets management](secrets-management.md)

