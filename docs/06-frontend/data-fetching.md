---
title: Data Fetching
document_id: PET-DOC-0606
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['state-management.md']
---

# Data Fetching

Strategi fetching data hendaknya aman, efisien, dan kompatibel dengan Supabase.

## Patterns

Fetch through feature-owned API functions. Every query key contains the resource plus all authorization-relevant scope and filters, for example `['inventory', organizationId, branchId, filters]`. Use stable normalized filters, bounded pagination and server-side sorting. Keys are not authorization; API/RLS still enforce scope.

For writes, use mutation hooks with typed variables, preserve server response as authoritative, invalidate or update only related keys, and expose pending/error/conflict outcomes. Optimistic updates are allowed only for reversible low-risk UI state and must roll back on failure; do not optimistically mark payment, refund, stock or clinical finalization successful.

On logout, account switch, organization change, or branch change, cancel relevant in-flight requests and remove or isolate cached protected data before rendering the new scope. Avoid persisting sensitive query cache to local storage.

## Error States

Model loading, initial error, background refresh error, empty result, forbidden, not-found, conflict, and stale-data states distinctly. Retry uses bounded policy and same idempotency key for an in-flight command. Do not swallow API errors or automatically retry non-idempotent actions.

## Performance

Prefer cursor pagination, server-side sorting/filtering, and minimal projections for large tables. Debounce search without submitting stale results. Use TanStack Query freshness/invalidation settings per domain; polling/realtime must refetch the authorized API source of truth.

## Query Key Governance

Centralize query-key builders in each feature. Include `organizationId` and `branchId` when applicable; never reuse an unscoped key across tenants. If selected branch is absent, do not issue branch-specific query unless the endpoint explicitly returns an authorized aggregate.

## Related Documents

- [State Management](state-management.md)
- [API Specification](../05-backend/api-specification.md)
- [Realtime Architecture](../05-backend/realtime-architecture.md)

