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

Komponen UI mengikuti design system PETORA dan memiliki satu tanggung jawab jelas. Shared component hanya menyediakan interaction/presentation contract; policy bisnis tetap dimiliki feature/backend.

## Component Layers

App shell/providers, role-aware navigation, domain page, feature section, shared form controls, data table, dialog/drawer, status indicator, empty/error state, charts, and accessible utilities. Domain-specific workflows (checkout, prescription, setting approval) harus berupa feature component, bukan generic modal yang menyembunyikan state.

## Standard Rules

Gunakan composition dan typed props; hindari inheritance, giant components, boolean-prop explosion, dan broad `any`. Component mengangkat state hanya bila ada beberapa consumer. Table, dialog, date/number input, select/combobox, confirmation, and notification components harus menyepakati keyboard, focus, loading, disabled, and error behavior.

## Patterns

Gunakan shadcn/ui sebagai primitive bila library tersedia; wrapper PETORA menjaga token, accessibility, dan interaksi konsisten. Hindari wrapper generik tanpa policy tambahan. Forms mendukung label, helper text, field error, summary error, dan pending state. Dialog konfirmasi memuat konsekuensi tindakan dan nilai before/after untuk perubahan sensitif.

## Testing Contract

Uji behavior pengguna: role/keyboard interaction, loading/error/empty states, field validation, callback, dan accessible name. Domain mutation diuji melalui service/integration contract; jangan menambah method production khusus untuk mempermudah test.

## Related Documents

- [Design system](../07-ui-ux/design-system.md)
- [Accessibility guidelines](../07-ui-ux/accessibility-guidelines.md)
- [Frontend architecture](frontend-architecture.md)

