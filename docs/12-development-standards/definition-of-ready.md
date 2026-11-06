---
title: Definition of Ready
document_id: PET-DOC-1202
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['definition-of-done.md']
---

# Definition of Ready

Kriteria siap kerja untuk suatu item backlog.

## Ready Criteria

An item is ready only when applicable criteria are checkable:

- [ ] Linked to an approved or explicitly accepted `PET-REQ` / `PET-FTR` and identifies its business owner.
- [ ] User outcome, actors, preconditions, main workflow, alternate/failure paths, and acceptance criteria are clear.
- [ ] Roles, actions, organization/branch/ownership scope, sensitive data, and approval requirements are identified.
- [ ] Data entities, state transitions, audit, retention, and migration impact are known or explicitly marked as a blocking TBD.
- [ ] API/event contracts, UI states, integrations, and dependencies are identified where applicable.
- [ ] Security, privacy, concurrency, idempotency, and failure/retry risks are assessed for the affected workflow.
- [ ] Test levels and test data for positive, negative, boundary, and authorization cases are defined.
- [ ] Open decisions that affect finance, inventory, clinical care, privacy, permissions, tax, or legal compliance are resolved or explicitly accepted by the accountable owner.
- [ ] Rollout, monitoring, recovery, and documentation impact are identified for operationally significant changes.

## Engineering Ready

Implementation plan, module owner/boundary, environment prerequisites, migration approach, and test approach are clear. A task may not fabricate unresolved API/schema/policy details to pass this gate.

## Security Ready

Permission, server-side validation, RLS, secret handling, audit, data minimization, and relevant abuse cases have been considered. Security review is required for authorization, tenant scope, clinical, finance, payroll, or integration-secret changes.

## Readiness Decision

The product/engineering owner records Ready, Blocked, or Needs Clarification. A task with unresolved decisions may proceed only when the owner documents the accepted interim behavior and risk.

## Related Documents

- [Definition of Done](definition-of-done.md)
- [Documentation Guide](../00-overview/documentation-guide.md)
- [Open Decisions](../13-traceability/open-decisions.md)

