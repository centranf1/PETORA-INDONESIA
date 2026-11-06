---
title: Code Review Guidelines
document_id: PET-DOC-1204
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['pull-request-guidelines.md']
---

# Code Review Guidelines

Review menilai behavior, risk, dan operability, bukan hanya gaya kode. Reviewer harus memahami affected requirement, domain contract, dan data classification.

## Focus

Review correctness/business rules, boundary and domain ownership, failure/concurrency paths, authorization/RLS, privacy/secrets, transaction/idempotency, performance, accessibility/UX states, tests, migrations, observability, and documentation. Pertimbangkan backward compatibility untuk deployed client/functions/data.

## Required Review Points

Untuk perubahan permission/RLS: test allowed AND denied role/tenant/branch and view/RPC/storage/realtime paths. Untuk transaksi: duplicate request/webhook, conflict/retry, compensation/reconciliation, balanced ledger. Untuk settings: definition trust, version conflict, approval separation, audit, secret masking. Untuk medical/payroll: least privilege and retention/privacy. Untuk UI: role-hidden action plus backend denial, keyboard/accessibility, cache scope/invalidation.

## Review Rule

No approval untuk blocker/critical security, data-integrity, or correctness comments. Reviewer meminta test/evidence yang sesuai; nit style dipisahkan dari blocking findings. Jangan menambah broad cleanup yang tidak relevan pada risk area.

## Related Documents

- [Pull request guidelines](pull-request-guidelines.md)
- [Security checklist](../08-security/security-checklist.md)

