---
title: Component Architecture
document_id: PET-DOC-0604
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['frontend-architecture.md']
---

# Component Architecture

Dokumen ini merancang komponen UI yang dapat dipakai ulang.

## Component Layers

1. **Application shell:** session boundary, navigation, active scope selector, global error boundary.
2. **Route page:** loads feature state and composes page-level sections.
3. **Domain components:** customer selector, sale cart, stock movement form, clinical timeline, settings diff; own domain-specific rendering but not server authority.
4. **Shared interaction primitives:** text/number/date input, combobox, data table, dialog, drawer, tabs, toast, status badge, pagination.
5. **Design tokens/utilities:** semantic color, spacing, typography, focus, formatting, and date/currency helpers.

Component ownership should follow domain boundaries. Repeated entity detail layouts may share primitives, but different workflows should not be forced into one generic CRUD screen.

## Standard Rules

Use composition over inheritance. Shared components accept typed value/event props, expose accessible labels and error descriptions, and avoid fetching data or embedding role/business checks. Feature pages pass already-scoped data and command callbacks.

## Patterns

Use shadcn/ui as a base where present and map it to PETORA semantic tokens. Tables must support loading/empty/error, sort/filter/pagination, row selection and keyboard behavior as applicable. Dialogs require title/description, initial focus, focus containment, escape/cancel behavior, and explicit destructive confirmation. Combobox/date/time pickers need accessible names and localized display while transmitting canonical values.

## State and Error Ownership

Page owns layout/section composition; TanStack Query owns server state; form library owns field state; component-local state owns ephemeral open/selection UI. Shared primitive must not swallow server errors or optimism conflicts.

## Related Documents

- [Frontend Architecture](frontend-architecture.md)
- [Design System](../07-ui-ux/design-system.md)
- [Interaction Patterns](../07-ui-ux/interaction-patterns.md)
- [Page Specifications](../07-ui-ux/page-specifications.md)

