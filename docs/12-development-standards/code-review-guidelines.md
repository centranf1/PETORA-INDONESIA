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

Panduan review kode untuk menjaga kualitas.

## Focus

Review behavior and risk at the owning boundary. Verify requirement/acceptance coverage, authorization, tenant scope, transaction/idempotency, privacy, audit, failure/retry behavior, data migration, performance impact, accessibility, and docs. Reviewers should prefer concrete behavior/evidence over style-only preference.

## Required Review Points

| Area | Review questions |
| --- | --- |
| Product/business | Is user flow consistent with PRD/business rules and approved decisions? Are exceptions represented? |
| Security | Is every API action authorized server-side? Can a user manipulate organization/branch/owner IDs? Are secrets/logs/storage safe? |
| Integrity | Can retry/concurrency duplicate payment, stock, loyalty, payroll or journal effects? Are posted/final records corrected safely? |
| Data | Are schema constraints, tenant relationships, indexes, retention, RLS and migration order documented and tested? |
| API/integration | Are DTOs/errors stable? Are timeout, webhook replay, rate limit and reconciliation handled? |
| Frontend | Are loading/empty/error/forbidden/pending/conflict states clear? Does scope change clear stale data? Is keyboard/responsive UX sound? |
| Verification | Do tests assert real behavior and negative authorization cases? Are commands/results included? |
| Documentation | Are affected docs/traceability/open decisions updated and status honest? |

## Review Rule

Do not approve unresolved blocker/critical findings. For accepted non-blocking risk, link issue, accountable owner, mitigation and expiry; security/financial/clinical bypass needs explicit owner sign-off. Reviewers must not request secrets or production customer data in a PR.

## Related Documents

- [Pull Request Guidelines](pull-request-guidelines.md)
- [Definition of Done](definition-of-done.md)
- [Security Checklist](../08-security/security-checklist.md)

