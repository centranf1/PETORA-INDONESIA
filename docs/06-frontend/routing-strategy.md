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

Strategi routing mengatur pengalaman pengguna dan akses layout.

## Base Pattern

Public routes are limited to authentication/recovery and any explicitly approved public catalog/booking landing pages. Customer portal and staff operations require authentication. Protected groups follow domain navigation: organization, customer/pet, commerce, service, clinical, workforce, finance, reporting, settings, and integration.

## Route Guards

Route guards wait for session bootstrap and required scope. If unauthenticated, preserve an allowlisted return path and redirect to sign-in. If the account is inactive, clear protected cache and show account support state. If permission is missing, show forbidden page without querying protected resource. Backend still rechecks every request; route guards are not security controls.

Selected organization/branch must be verified before scoped loaders execute. On scope switch, cancel old requests, clear protected page state/cache, then load new route data. Deep links must re-run authorization and must not leak resource details in the redirect/error state.

## Recommended Implementation

Use the existing project router; if React Router is chosen, encode route metadata (required permission, layout, public/protected, scope requirement) declaratively and test nested/deep-link behavior. Not-found, forbidden, session-expired and error boundaries are explicit routes. Avoid role-name checks scattered across components.

## Related Documents

- [Frontend Architecture](frontend-architecture.md)
- [Information Architecture](../07-ui-ux/information-architecture.md)
- [Permission Matrix](../02-business-analysis/permission-matrix.md)

