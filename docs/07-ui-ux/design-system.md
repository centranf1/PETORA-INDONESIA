---
title: Design System
document_id: PET-DOC-0702
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['design-guidelines.md']
---

# Design System

Design system menyediakan semantic token dan perilaku komponen bersama. Brand identity/color/font PETORA belum ditemukan di README atau implementasi, sehingga nilai visual final tetap open decision.

## Tokens

Implement token CSS/theme untuk:

| Token group | Required tokens | Rule |
| --- | --- | --- |
| Color | `surface`, `surface-muted`, `text`, `text-muted`, `border`, `accent`, `success`, `warning`, `danger`, `info`, `focus` | Semantic names; contrast checked; status not color-only |
| Typography | `display`, `heading`, `body`, `label`, `caption`, `numeric` | Approved typeface is a design decision; numeric totals use tabular alignment where supported |
| Spacing | 4px base: 4, 8, 12, 16, 24, 32, 40 | Avoid arbitrary one-off spacing |
| Radius/elevation | small 4px, default <= 8px; restrained shadow levels | No nested cards; use elevation only for real layering |
| Layout | content min-width, table density, sidebar width, responsive breakpoints | Use stable grid/flex constraints; test long Indonesian labels |
| Motion | short transition for state change, reduced-motion alternative | No motion required to understand an action |

## Components

Button hierarchy (primary/secondary/tertiary/destructive), text/numeric input, select/combobox, date/time range, table, pagination, filter bar, dialog/drawer, toast/inline alert, tabs, status badge, skeleton, empty state, permission-denied state, and data visualization. Setiap komponen memiliki default, hover, focus-visible, disabled, loading, invalid, and responsive states.

### Component Contracts

- Primary action tunggal per context; destructive action menggunakan destructive style dan confirmation saat berdampak historis.
- Table memiliki caption/accessible name, sort/filter state, pagination, empty/error/loading behavior, dan row action permission-aware.
- Dialog memelihara focus dan mengembalikan focus setelah tutup; modal tidak dipakai untuk form panjang bila page/drawer lebih jelas.
- Monetary values memakai formatter currency yang ditentukan organisasi; angka internal tetap decimal, bukan string untuk perhitungan.
- Status badge selalu menampilkan label dan tidak menggantikan detail status di workflow.

## Open Decision

Warna brand, typography, logo, icon family, currency/locale, density default, dan breakpoints final memerlukan persetujuan Product/Design Owner. Jangan memilih brand palette hanya dari asumsi industri.

## Related Documents

- [Design guidelines](design-guidelines.md)
- [Interaction patterns](interaction-patterns.md)
- [Accessibility guidelines](accessibility-guidelines.md)

