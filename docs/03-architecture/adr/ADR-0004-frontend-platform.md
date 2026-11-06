---
title: ADR 0004: Frontend Platform and Feature Boundaries
document_id: PET-ADR-0004
status: Approved
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md', '../../06-frontend/frontend-architecture.md', '../../06-frontend/state-management.md']
---

# ADR 0004: Frontend Platform and Feature Boundaries

## Status

Approved as an architecture baseline in [Architecture Decisions](../architecture-decisions.md). The repository does not yet contain an application implementation.

## Context

PETORA has many staff and customer workflows, substantial server state, sensitive data boundaries, and a multi-branch UI. The frontend must support frequent operational actions without becoming the authority for business rules or access control.

## Decision

Use React + TypeScript with Vite as the documented web baseline. Organize code by domain feature, with shared UI primitives and explicit typed API/query modules. Use Tailwind CSS and shadcn/ui as the UI foundation, TanStack Query for server state, React Hook Form for form state, and Zod for client-side schema feedback, subject to dependency/repository verification when implementation starts.

The frontend:

- Treats client data, route guards, hidden buttons, and selected branch as untrusted for authorization.
- Uses server/API/RLS as the source of truth for permissions, prices, balances, stock and state transitions.
- Scopes query keys and clears/invalidate protected cache on logout/account/organization/branch changes.
- Models loading, empty, validation, forbidden, pending, conflict, success and failure states explicitly.
- Keeps domain features isolated; shared components do not own domain rules or direct privileged mutations.

## Alternatives Considered

A fully server-rendered or native mobile-first client could be selected later if product/platform requirements justify it. A single global state store for all server data is not selected because it duplicates cache lifecycle and increases scope leakage risk. The selected libraries are a baseline, not a requirement to use them for every state type.

## Consequences

Positive: feature ownership, typed contracts, reusable accessible components, and managed server-state caching.

Trade-offs: dependency versions, React Router choice, design tokens, authentication storage/cookie architecture, and browser support policy need verification at project initialization. This ADR does not establish a specific application directory structure beyond feature boundaries.

## Verification

Typecheck/lint/build and unit/component tests; route and permission-negative tests; query-cache isolation tests on scope switch; keyboard/accessibility checks on critical journeys; bundle scan for privileged secrets.
---
title: ADR 0004: Frontend Platform and Feature Boundaries
document_id: PET-ADR-0004
status: Approved
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md', '../../06-frontend/frontend-architecture.md', '../../06-frontend/state-management.md']
---

# ADR 0004: Frontend Platform and Feature Boundaries

## Status

Approved as an architecture baseline in [Architecture Decisions](../architecture-decisions.md). The repository does not yet contain an application implementation.

## Context

PETORA has many staff and customer workflows, substantial server state, sensitive data boundaries, and a multi-branch UI. The frontend must support frequent operational actions without becoming the authority for business rules or access control.

## Decision

Use React + TypeScript with Vite as the documented web baseline. Organize code by domain feature, with shared UI primitives and explicit typed API/query modules. Use Tailwind CSS and shadcn/ui as the UI foundation, TanStack Query for server state, React Hook Form for form state, and Zod for client-side schema feedback, subject to dependency/repository verification when implementation starts.

The frontend:

- Treats client data, route guards, hidden buttons, and selected branch as untrusted for authorization.
- Uses server/API/RLS as the source of truth for permissions, prices, balances, stock and state transitions.
- Scopes query keys and clears/invalidate protected cache on logout/account/organization/branch changes.
- Models loading, empty, validation, forbidden, pending, conflict, success and failure states explicitly.
- Keeps domain features isolated; shared components do not own domain rules or direct privileged mutations.

## Alternatives Considered

A fully server-rendered or native mobile-first client could be selected later if product/platform requirements justify it. A single global state store for all server data is not selected because it duplicates cache lifecycle and increases scope leakage risk. The selected libraries are a baseline, not a requirement to use them for every state type.

## Consequences

Positive: feature ownership, typed contracts, reusable accessible components, and managed server-state caching.

Trade-offs: dependency versions, React Router choice, design tokens, authentication storage/cookie architecture, and browser support policy need verification at project initialization. This ADR does not establish a specific application directory structure beyond feature boundaries.

## Verification

Typecheck/lint/build and unit/component tests; route and permission-negative tests; query-cache isolation tests on scope switch; keyboard/accessibility checks on critical journeys; bundle scan for privileged secrets.
