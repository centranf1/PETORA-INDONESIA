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

Frontend PETORA menggunakan React + TypeScript + Vite dan dibagi berdasarkan domain feature. Frontend bertanggung jawab atas presentasi, interaksi, validasi awal, navigasi, dan pemanggilan API; business rules, authorization, harga final, transaksi, serta tenant isolation tetap ditegakkan server/database.

## Layers and Dependency Rules

1. `app`: bootstrap, providers, route tree, error boundary, global session/scope context.
2. `features/<domain>`: page, domain UI, query/mutation hooks, API adapter, schema, and local types.
3. `shared`: design-system components, layout primitives, common form/table patterns that contain no domain policy.
4. `lib`: Supabase client, query client, API/error utilities, date/currency formatting, validators.

Feature may import shared/lib contracts, but shared components must not import feature internals. Cross-feature reads/mutations go through service/API contracts and invalidate documented query keys.

## Technology

React, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, react-hook-form, and zod.

## Interaction Pattern

- Pages compose feature components and route context; components own accessible presentation and explicit state.
- Hooks coordinate UI with query/mutation APIs; domain calculations that affect persisted business outcomes are server-side.
- API client normalizes transport errors and attaches request/correlation idempotency where appropriate.
- Keep generated DB/API types separate from presentation/view-model types; do not make `any` the escape hatch for schema drift.
- Feature modules expose a small public contract through `index.ts` only when cross-feature use is necessary.

## State Strategy

TanStack Query owns remote/cache state; React state owns transient UI; React Hook Form owns form state; URL owns shareable filters/pagination; auth/scope provider owns current session and selected valid context. Do not copy query data into a second global store without a demonstrated requirement.

## Runtime States

Every data page handles loading, empty, stale/revalidating, validation error, forbidden, not-found, network/server error, conflict, and success states. Mutations with financial, stock, clinical, payroll, or settings effects must await server confirmation and display the returned state/version. Do not optimistically show a transaction as paid, stock decremented, prescription dispensed, or setting active.

## Security and Performance

- UI guards improve navigation only; API/RLS remains authoritative.
- Query and mutation payloads never contain service-role secrets or trusted role claims.
- Clear protected caches on sign-out, account change, organization switch, or branch switch; scope is part of every protected query key.
- Paginate server-side lists and exports. Avoid loading entire ledger/history into browser memory.
- Avoid persistent storage of sensitive medical/payroll/payment data; threat-review any offline persistence.

## Related Documents

- [Project structure](project-structure.md)
- [Routing strategy](routing-strategy.md)
- [Data fetching](data-fetching.md)
- [Frontend error handling](error-handling.md)

