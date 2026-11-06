---
title: Architecture Decision Records
document_id: PET-DOC-0310
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md']
---

# Architecture Decision Records

Folder ini menyimpan Architecture Decision Record (ADR), yaitu catatan keputusan dengan konteks, opsi, keputusan, konsekuensi, owner, dan approval status.

| ADR | Topic | Status |
| --- | --- | --- |
| [ADR-0001](ADR-0001-monolithic-modules.md) | Modular monolith and domain boundaries | Approved; implementation not started |
| [ADR-0002](ADR-0002-supabase-authorization.md) | Supabase Auth, RLS, and authorization | Approved; claim/RLS implementation details remain TBD |
| [ADR-0003](ADR-0003-server-side-critical-workflows.md) | Server-side critical workflow boundary | Approved; implementation not started |
| [ADR-0004](ADR-0004-frontend-platform.md) | Frontend platform and feature boundaries | Approved baseline; dependency/runtime verification pending |
| [ADR-0005](ADR-0005-audit-and-history.md) | Audit and historical record integrity | Approved baseline; retention periods remain open |

The ADR approval states match the approved baseline in [Architecture Decisions](../architecture-decisions.md). Approval does not prove implementation, migration, test or deployment readiness. Changes that supersede an approved ADR require a new ADR and owner approval.

## ADR Workflow

Create an ADR when a decision changes system boundaries, data ownership, security model, integration strategy, persistence, deployment, or operational guarantees. Include context and constraints, considered options, decision owner/date/status, consequences, migration impact, and follow-up/open decisions. Supersede an ADR by a new record; do not rewrite historical rationale as though it never changed.

## Related Documents

- [Architecture Decisions](../architecture-decisions.md)
- [Documentation Guide](../../00-overview/documentation-guide.md)
