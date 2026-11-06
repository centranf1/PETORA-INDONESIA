---
title: ADR 0002: Supabase Authorization Model
document_id: PET-ADR-0002
status: Approved
version: 1.1
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md']
---

# ADR 0002: Supabase Authorization Model

## Status
Approved. Stack Supabase (Auth + PostgreSQL RLS + Edge Functions) ditetapkan.

## Context
PETORA stores organization- and branch-scoped customer, inventory, financial, clinical and workforce records. Browser scope selection and UI controls are untrusted; direct table access without tenant enforcement could expose or mutate records across boundaries.

## Decision
Use Supabase Auth for identity/session, PostgreSQL RLS for defense-in-depth on API-exposed data, and server-side Edge Functions/application services for sensitive business commands. Authorization resolves active account, organization membership, branch assignment, action permission, ownership and workflow state. Claims used for authorization must be server-managed; client-supplied tenant/role identifiers are not grants. Service-role credentials remain server-only and narrowly scoped.

## Consequences
## Consequences

The model provides one database-enforced tenant boundary and an explicit server command path, but it requires a reviewed claim/assignment lifecycle, RLS policy per exposed table/action, service-role governance, session revocation rules, and negative tests. The approved platform choice does not approve any particular SQL example or prove that RLS is implemented correctly.

## Verification and Follow-up

Test anonymous access, same-tenant/branch access, cross-tenant/branch denial, role revocation, storage object access, and privileged service paths. Define the signed claim shape, multi-branch context resolver, and claim refresh/revocation bound before implementation; see [Open Decisions](../../13-traceability/open-decisions.md).
