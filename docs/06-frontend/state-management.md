---
title: State Management
document_id: PET-DOC-0605
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-fetching.md']
---

# State Management

Dokumen ini mengatur state dan data fetching pada frontend.

## Server State

TanStack Query owns remote data, request lifecycle, cache, invalidation and controlled polling. Query keys include organization/branch and relevant filters. Mutations invalidate dependent data and use server responses as authoritative. Optimistic updates are prohibited for payments, refunds, inventory ledger, approval, finalized clinical records and accounting posting unless an explicit reversible design is reviewed.

## Local State

Use component state for local dialog, selection, focus and unsaved UI. Shared context is limited to session/scope/design preferences and must not duplicate mutable server records. Filters may be URL state when deep linking/shareability helps; never place sensitive values or credentials in the URL.

## Form Validation

Use React Hook Form + Zod for form draft state and client feedback. Map server field errors, preserve safe values on failure, and reset only after authoritative success or explicit cancel. Server validation and authorization remain authoritative.

## State Ownership Table

| State | Owner | Persistence |
| --- | --- | --- |
| User/organization/branch session | Auth/scope provider | Secure auth session; not arbitrary local storage |
| Customer/sale/stock/booking records | API + TanStack Query | Server source of truth |
| Form draft | React Hook Form | In memory by default; persist only with explicit sensitive-data review |
| Current tab/filter/search | Component or URL | URL only for non-sensitive shareable state |
| Dialog/expanded row | Component state | Ephemeral |
| Authorization grant | Server/RLS | Never client-owned state |

## Scope Lifecycle

Sign-out, account switch, organization switch and branch switch cancel requests and clear/invalidate protected caches. Realtime reconnect causes refetch, not assumed replay of every event.

## Related Documents

- [Data Fetching](data-fetching.md)
- [Routing Strategy](routing-strategy.md)
- [Authentication and Authorization](../05-backend/authentication-authorization.md)

