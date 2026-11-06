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

Change management memastikan perubahan requirement, schema, policy, atau runtime behavior dapat ditelusuri dari proposal hingga release dan operasi.

## Required Updates

| Change type | Minimum documentation impact |
| --- | --- |
| Feature/business rule | PRD, feature catalog/backlog, workflow/use case, acceptance, API/UI/data mapping, tests |
| Permission/security | Roles, permission matrix, threat model, RLS, security checklist/tests, audit policy |
| Database | Migration, data dictionary, ERD, conventions/index/transaction, RLS, fixtures, rollback |
| API/provider | API contract, Edge Functions, auth/error/idempotency, integration/secrets/monitoring, contract tests |
| Architecture | ADR, architecture/context/component/data flow, module boundaries, deployment and risk |
| Operations/legal | Runbooks/manuals, data retention, incident, backup/restore, open decisions and training |

## Approvals

Requirement/business owner accepts policy and scope; Security/DB/Finance/Clinical owner reviews the relevant risk. Approval evidence, approver, decision date, status, and consequences are recorded. Draft recommendations do not authorize deployment.

## Risk Handling

Classify impact across tenant, branch, transaction, medical privacy, operational availability, external provider, and backward compatibility. High-risk changes need staged rollout, feature/config kill switch where safe, backup/recovery assessment, migration/rollback or forward-fix path, reconciliation, monitoring, owner, and stakeholder communication. A rollback is not assumed to undo external payments or committed data.

## Related Documents

- [Open decisions](../13-traceability/open-decisions.md)
- [Architecture decisions](../03-architecture/architecture-decisions.md)
- [Definition of Done](definition-of-done.md)

