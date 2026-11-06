---
title: Change Management
document_id: PET-DOC-1207
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['definition-of-done.md']
---

# Change Management

Dokumen ini mengatur perubahan feature dan system baseline.

## Required Updates

For every change, classify impact and update affected artifacts before merge:

| Change type | Minimum artifacts |
| --- | --- |
| Product behavior/scope | PRD/SRS, feature catalog/backlog, business process/rule, acceptance, test mapping, open decisions |
| Role/tenant/security | User roles, permission matrix, auth, RLS, threat/security tests, audit and traceability |
| Data/schema | Database design, dictionary, ERD, migration, indexes, retention, module mapping and migration tests |
| API/workflow | API DTO/error, business logic/Edge Function, frontend consumer, integration tests and E2E cases |
| UI/UX | Page spec, navigation/design/accessibility, component/interaction behavior, user/admin manual and UI tests |
| Architecture/integration | ADR, context/container/data flow, secret/environment/deployment, monitoring/incident docs |
| Release/operations | CI/CD, deployment, backup/restore, rollback, incident/support and release evidence |

Use stable requirement/feature/test/document IDs. Add open decisions where facts or approvals are missing rather than inventing values.

## Approvals

Architecture changes require an ADR and approval from the architecture owner; security/auth/data-scope changes require security owner review. Database changes require migration, RLS/grant, data-retention and rollback/forward-recovery review. Business-impacting settings, money, clinical, payroll or legal changes require the corresponding domain owner.

## Risk Handling

High-impact changes require risk/impact assessment, staged rollout or feature flag where appropriate, monitoring, rollback/forward-fix plan, reconciliation of external effects, support/training plan and stakeholder notice. A feature flag does not replace authorization or migration compatibility.

## Change Record

Record request/requirement IDs, reason, owner, options/decision, affected docs/data/API/roles, rollout strategy, test evidence, approvers, deployment reference and unresolved risks. For emergency changes, document the exception and complete review after stabilization.

## Related Documents

- [Definition of Ready](definition-of-ready.md)
- [Definition of Done](definition-of-done.md)
- [Open Decisions](../13-traceability/open-decisions.md)

