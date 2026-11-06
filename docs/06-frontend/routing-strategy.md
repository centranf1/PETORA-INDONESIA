---
title: Routing Strategy
document_id: PET-DOC-0603
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['project-structure.md']
---

# Routing Strategy

Routing mengatur URL, layout, navigation state, dan pengalaman akses. Pilihan library router belum diverifikasi pada source code; React Router adalah rekomendasi teknis yang harus dikonfirmasi sebelum bootstrap aplikasi.

## Base Pattern

Public routes: sign-in, password recovery, callback, and explicitly public information pages. Authenticated route groups: customer portal; staff operations; administration/system settings; and restricted clinical/finance/HR views. Route names should be stable, domain-readable, and avoid exposing sensitive values in URL.

## Route Guards

Guard performs client-side convenience checks for session, feature permission snapshot, and selected organization/branch; unauthorized navigation redirects to a safe page and preserves a non-sensitive return path. It must not be treated as a security boundary: server/API/RLS checks every request. Scope switching clears protected cache and refetches data.

## Recommended Implementation

Represent routes in a typed central map with lazy-loaded domain pages and layouts. Avoid duplicating permission rules in each component; consume a shared `can(action,resource,scope)` presentation helper for affordances, while backend remains authoritative. Never put access tokens, medical content, or secret values in route query parameters.

## Route States

- Unauthenticated: go to sign-in; protected redirect must be validated to prevent open redirect.
- No organization/branch context: show context selector or setup/empty state, never issue unscoped query.
- Forbidden: render a safe access-denied state without data details.
- Missing resource: show not-found semantics consistent with cross-tenant denial policy.
- Expired session: preserve safe workflow context, reauthenticate, then refetch rather than replaying a non-idempotent mutation automatically.

## Open Decisions

Router library, public portal authentication model, route localization, and whether role changes should force immediate reauthentication require architecture/product decision.

