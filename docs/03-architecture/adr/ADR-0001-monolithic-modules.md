---
title: ADR 0001: Modular Monolith for PETORA
document_id: PET-ADR-0001
status: Approved
version: 1.1
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md']
---

# ADR 0001: Modular Monolith for PETORA

## Status
Approved as an architecture baseline by the Product Owner, as recorded in [Architecture Decisions](../architecture-decisions.md). This is an architectural decision, not a claim that code has been implemented.

## Context
PETORA covers retail, inventory, service, clinical, workforce, finance and customer-facing domains. The first product must share tenant and transaction boundaries while avoiding the deployment and operational overhead of independently deployed services before scale and ownership justify them.

## Alternatives Considered

- Separate microservices per domain: deferred because independent deployment, distributed transaction, observability and on-call costs are not justified by current evidence.
- Single unstructured application module: rejected because domain rules, table ownership, test scope and security review would become difficult to isolate.
- Modular monolith: selected as the balance between one deployment and explicit domain boundaries.

## Decision
Use a modular monolith with domain-owned application services, schemas/contracts, and tests, deployed as one product runtime initially. Modules may share PostgreSQL but write through the owning module's service/transaction contract. Cross-domain operations document orchestration and transaction/event boundaries. Extract a service only when independent scaling, release, reliability, or ownership needs are evidenced and approved by a new ADR.

## Consequences
Benefits: simpler delivery, one authoritative database transaction for local workflows, and lower operational overhead. Trade-offs: shared deployment can couple releases; code boundaries can be bypassed unless enforced in dependency rules and review. Database sharing does not authorize direct writes across module ownership.

## Guardrails and Verification

- No circular domain dependencies; shared/platform modules contain stable primitives only.
- Feature/module ownership is documented in [Feature to Module Mapping](../../13-traceability/feature-to-module-mapping.md).
- Cross-module writes are reviewed against the owning domain contract; ledger/final records use correction workflows.
- Revisit this ADR if independent scaling/deployment, team ownership, or data-boundary requirements materially change.
