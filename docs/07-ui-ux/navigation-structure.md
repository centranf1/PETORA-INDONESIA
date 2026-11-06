---
title: Navigation Structure
document_id: PET-DOC-0704
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['information-architecture.md']
---

# Navigation Structure

Struktur navigasi sistem dibuat untuk kecepatan operasional.

## Sidebar

Group by domain and permission. Proposed hierarchy: Overview; Customers & Pets; Commerce (POS, Sales, Catalog, Promotions); Inventory & Purchasing; Services (Booking, Grooming, Boarding, Transport); Clinical & Pharmacy; Workforce & Finance; Reports; Administration (Users, Roles, Settings, Integrations, Audit); Customer Portal. Hide unavailable actions, but retain clear forbidden behavior for direct links.

## Topbar

Topbar includes current organization/branch context when applicable, global search only across authorized domains, notification center, user/session menu, and role-appropriate quick actions. Branch switch revalidates assignment and clears old-scope data before loading the new context. Do not put sensitive record content in notification previews.

## Responsive

At narrow width, use an accessible drawer/menu with labeled destinations rather than icon-only navigation without names. Preserve current location, back behavior, focus return, and visible branch context. Primary page action stays reachable and does not overlap search/filters.

## Navigation States

- Loading session: do not show privileged destinations until permissions resolve.
- No access: omit navigation item; direct route still renders safe forbidden state.
- No branch selected: show context-selection step before branch-specific data loads.
- Inactive branch: allow authorized history only; disable new operational commands.
- Role changed: refresh permission-derived navigation and invalidate protected state.

## Related Documents

- [Information Architecture](information-architecture.md)
- [Routing Strategy](../06-frontend/routing-strategy.md)
- [Page Specifications](page-specifications.md)

