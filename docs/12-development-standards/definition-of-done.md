---
title: Definition of Done
document_id: PET-DOC-1203
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['definition-of-ready.md']
---

# Definition of Done

Kriteria selesai untuk item pengembangan.

## Required

- [ ] Acceptance criteria pass, including negative and failure-path behavior.
- [ ] Authorization is enforced server-side and RLS/security tests cover changed scope.
- [ ] Data migrations, constraints, transaction integrity, idempotency, and rollback/forward-recovery have been checked where applicable.
- [ ] Tests run at the required unit/integration/database/API/UI/E2E/security level; results are recorded accurately.
- [ ] Lint, typecheck, and build pass for the changed application surface where such tooling exists.
- [ ] Documentation, test mapping, requirement traceability, and open decisions are updated.
- [ ] Audit, privacy, retention, monitoring, support and operational procedures are updated for sensitive or production-facing changes.
- [ ] No secrets, sensitive test data, or unrelated user changes are committed or exposed.
- [ ] Review feedback is resolved and there are no unaccepted critical issues.

## Quality gate

Updated code uses project-standard linting and type checks. Database, permission, API, and security changes are documented and validated. If application code or tooling is absent, mark those checks **Not Applicable/Not Available**; do not claim they passed.

## Closure Record

The delivery record names the requirement/feature IDs, changed behavior, validation commands/results, migration/deployment notes, and remaining risks or approved exceptions.

## Related Documents

- [Definition of Ready](definition-of-ready.md)
- [Code Review Guidelines](code-review-guidelines.md)
- [Requirements Traceability Matrix](../13-traceability/requirements-traceability-matrix.md)

