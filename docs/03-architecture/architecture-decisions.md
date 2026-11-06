---
title: Architecture Decisions
document_id: PET-DOC-0309
status: Approved
version: 1.1
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['adr/README.md']
---

# Architecture Decisions

Stack teknologi ditetapkan: frontend React + TypeScript, backend Supabase (Postgres + RLS + Edge Functions), arsitektur modular monolith. Status Approved oleh product owner.

## Approval Status

ADR-01 sampai ADR-05 disetujui sebagai baseline arsitektur. Implementasi belum dimulai.

## ADR-01

Modular monolith is the approved baseline to keep domain boundaries explicit while supporting multi-branch complexity. See [ADR-0001](adr/ADR-0001-monolithic-modules.md).

## ADR-02

Supabase Auth + PostgreSQL RLS + Edge Functions is the approved authorization platform baseline. Claim shape, assignment resolver, per-table policies, and service-role boundary remain implementation/security details to be verified. See [ADR-0002](adr/ADR-0002-supabase-authorization.md).

## ADR-03

Sensitive business flows are executed in authenticated server-side services and/or database transactions, not client-side. External provider calls require persisted idempotency/reconciliation. See [ADR-0003](adr/ADR-0003-server-side-critical-workflows.md).

## ADR-04

Frontend uses React + TypeScript and feature boundaries; server state, form state and transient UI state have explicit ownership. See [ADR-0004](adr/ADR-0004-frontend-platform.md).

## ADR-05

Sensitive mutations and privileged actions produce attributable audit events; immutable ledgers/finalized records are corrected through revisions/reversals. Retention and disposal follow approved policy. See [ADR-0005](adr/ADR-0005-audit-and-history.md).

## Implementation Status

The architecture baseline is Approved by the Product Owner; implementation has not started in this repository. Approval does not approve numeric NFRs, data retention periods, provider selection, claim schemas, table-level RLS policies or release readiness. Track those in [Open Decisions](../13-traceability/open-decisions.md).

