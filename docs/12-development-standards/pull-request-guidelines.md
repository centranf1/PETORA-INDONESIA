---
title: Pull Request Guidelines
document_id: PET-DOC-1205
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['code-review-guidelines.md']
---

# Pull Request Guidelines

Panduan PR menjamin konsistensi merge dan deployment.

## PR Requirements

Every PR states why, scope/non-goals, linked `PET-REQ`/`PET-FTR`/test IDs, user-visible behavior, affected modules, data/API/security impacts, rollout and recovery notes, validation commands/results, and unresolved decisions. Screenshots/video are appropriate for meaningful UI changes but must contain synthetic/de-identified data.

## Checklist

## Author Checklist

- [ ] Changes are limited to the requested behavior; pre-existing user edits are preserved.
- [ ] Tests cover positive, negative, boundary, retry/concurrency and authorization behavior as applicable.
- [ ] Database migration, RLS, permission, API error, secrets, audit and retention implications are documented.
- [ ] UI states include loading/empty/error/forbidden/pending/conflict and accessible mobile/keyboard behavior where relevant.
- [ ] No secrets, production data, debug bypasses, generated temp files or unrelated reformats.
- [ ] Docs, IDs, traceability, open decisions, runbooks and release notes are updated.
- [ ] CI results and known limitations are stated honestly.

## Approval

At least one code reviewer; add business/domain owner for policy/workflow changes, security reviewer for auth/RLS/data-sensitivity/integration changes, and database/operations reviewer for high-risk schema/deployment/recovery changes. Approval does not waive required CI or production controls.

## PR Description Template

```text
Why / requirement IDs:
What changed and out of scope:
Data/API/permission impact:
Tests and validation evidence:
Migration/deployment/rollback:
Docs and traceability updated:
Open decisions / residual risks:
```

## Related Documents

- [Code Review Guidelines](code-review-guidelines.md)
- [Definition of Done](definition-of-done.md)
- [Change Management](change-management.md)

