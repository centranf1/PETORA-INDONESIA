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

Dokumen ini menegaskan perlindungan data di rest, transit, and process.

## Protection Controls

- Use HTTPS/TLS for network transport and platform-supported encryption at rest; validate provider and key-management responsibilities before production.
- Store integration credentials only in an approved server-side secret manager; ordinary settings tables and browser bundles must not contain secrets.
- Apply least-privilege storage policies, time-limited access, and malware/content checks where appropriate for uploaded files.
- Redact sensitive values from logs, analytics, error reports, exports, and support tickets.

## Data Categories

| Category | Examples | Minimum handling |
| --- | --- | --- |
| Public | approved public catalog and service descriptions | publish only after business review |
| Internal | routine operational configuration | authenticated staff access and scope checks |
| Confidential | customer contact, supplier terms, staff records | purpose-limited access, export control, redacted logs |
| Restricted | clinical records, payroll, payment/security events, credentials | explicit authorization, audit, secure storage, restricted export; credentials in secret manager only |

Final legal classification and lawful basis require compliance review; this table is an engineering handling baseline, not a legal determination.

## Handling

Restrict sharing and export by role, tenant, branch, owner, and purpose. Exports must be auditable, minimized, and protected during transfer/storage. Correct or delete data only through the approved retention and data-subject request process.

## Related Documents

- [Security Policies](security-policies.md)
- [Data Retention Policy](../04-database/data-retention-policy.md)
- [Secrets Management](secrets-management.md)
- [Audit Logging](audit-logging.md)

