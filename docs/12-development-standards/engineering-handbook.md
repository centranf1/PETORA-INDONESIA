---
title: Engineering Handbook
document_id: PET-DOC-1201
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['definition-of-ready.md']
---

# Engineering Handbook

Buku panduan engineering untuk seluruh tim.

## Standards

For each task, read `AGENTS.md`, root `README.md`, documentation index/guide, open decisions, completeness report, and all relevant domain/technical docs before coding. Trace changes from requirement/feature through actor/workflow/data/API/UI/test. Follow Definition of Ready/Done and preserve user changes.

## Working Rules

No undocumented feature in production. No service role in frontend. No RLS bypass. No unapproved migration to production. No direct balance/journal/medical-history overwrite. No silent policy selection where stakeholder decision is open. No production claims without evidence.

## Principles

Security, data integrity, observability, maintainability, accessibility, and usability are mandatory. Treat external providers as failure-prone asynchronous systems; design idempotency/reconciliation. Treat organization/branch scope as a server-enforced boundary. Make source-of-truth ownership explicit per module.

## References

README is product scope source; detailed docs are draft technical/business contracts whose status matters. AGENTS describes AI/agent behavior. Open decisions are not approvals. Keep the docs index/readiness report current, and distinguish implemented behavior from proposals.

## Daily Workflow

1. Select a Ready backlog item with owner and IDs.
2. Read linked docs, inspect working tree and relevant source/tests.
3. State a behavior hypothesis and narrow validation check; edit the owning slice.
4. Run focused test/check immediately after the edit, then broader gates required by risk.
5. Update docs, mapping, tests and open decisions; request domain/security review when needed.
6. Deliver a concise record of changed behavior, validation evidence and remaining risk.

## Related Documents

- [AGENTS.md](../../AGENTS.md)
- [Documentation Index](../README.md)
- [Definition of Ready](definition-of-ready.md)
- [Definition of Done](definition-of-done.md)

