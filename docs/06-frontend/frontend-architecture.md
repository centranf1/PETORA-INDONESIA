---
title: Frontend Architecture
document_id: PET-DOC-0601
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['project-structure.md', 'state-management.md']
---

# Frontend Architecture

Dokumen frontend menjelaskan struktur UI React + TypeScript untuk PETORA.

## Architecture

Use feature-based modules with typed route pages, domain components, API/query modules, schemas, command hooks and tests. A feature must not import another feature's private data access; share stable design primitives and domain contracts only.

## Technology

React, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, react-hook-form, and zod.

## Pattern

Keep business invariants and permission decisions on the server. Frontend feature services map typed API requests/responses and query keys; hooks orchestrate loading/mutations; presentational components render props and emit user intent. A hook is not a security boundary and must not calculate trusted price, permission, stock, tax, or approval outcome.

## Runtime Boundaries

- Public routes (login/recovery) do not require tenant context; portal/staff routes require an authenticated session.
- Protected pages wait until session and permitted organization/branch context resolve before querying.
- Scope changes cancel or isolate in-flight queries, clear incompatible cached data, and trigger refetch under the new key.
- User-facing actions call documented API/Edge Function contracts for privileged multi-table writes.
- Browser environment variables contain only public runtime values. No service-role/provider secret, private key, or privileged DB credential is allowed.

## Feature Contract

Each feature exposes route/page, typed API functions, query keys, input schema, loading/empty/error/forbidden states, tests, and documented data scope. Shared UI components do not own API calls or domain state transitions.

## State Strategy

Use server state via TanStack Query; local/transient UI state via React state or existing shared context; form state via react-hook-form; schema validation guidance via zod. Select state ownership deliberately; avoid duplicating server state in global context.

## Build and Quality

Follow React/TypeScript standards in `coding-standards.md`. Verify typecheck, lint, build and component/API tests when tooling exists; track missing project scripts as readiness gaps rather than presumed success.

## Related Documents

- [Project Structure](project-structure.md)
- [Routing Strategy](routing-strategy.md)
- [Data Fetching](data-fetching.md)
- [State Management](state-management.md)
- [API Specification](../05-backend/api-specification.md)

