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

## Encryption

Use HTTPS/TLS, encrypted storage for attachments, and encrypted configuration secrets. At-rest encryption is handled by platform and governance.

## Data Categories

Public, internal, confidential, restricted, regulated (medical, financial, customer identity, payroll).

## Handling

Restrict sharing and export; logs should redact sensitive fields.

