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

Dokumen ini merinci design token dasar PETORA.

## Token Model

Define semantic tokens rather than embedding raw color values in components: `surface`, `surface-raised`, `text-primary`, `text-muted`, `border`, `focus`, `brand`, `success`, `warning`, `danger`, and `info`. Brand hue and exact palette remain unapproved; semantic contrast and status meaning are mandatory.

Typography tokens define display/page heading/section heading/body/label/caption with a small consistent scale. Spacing uses a documented 4px base. Define focus ring, disabled opacity, motion duration/reduced-motion behavior, control heights, icon size, and responsive breakpoints in one token source.

Prefer compact operational density for tables and repeated workflows. Do not use color alone for status, do not use arbitrary gradients as a substitute for hierarchy, and keep layout stable when content/validation appears.

## Components

| Component | Required variants/states |
| --- | --- |
| Button | primary/secondary/tertiary/danger, loading, disabled, icon-only tooltip |
| Input/select/combobox | label, hint, required, invalid, disabled, loading options, empty results |
| Data table | loading, empty, error, sorted, filtered, selected, paginated, narrow viewport |
| Dialog/drawer | title/description, focus management, cancel/confirm, destructive variant |
| Status badge | semantic label + icon/text, never color-only |
| Toast/banner | success, pending, warning, error with appropriate persistence/action |
| Tabs/navigation | selected state and keyboard behavior |
| Currency/date | locale display, canonical data value, explicit timezone/currency |

## Open Decision

Specific brand palette, typeface/license, density preference, and dark-mode requirement need design owner approval. Do not finalize a brand palette or claim WCAG conformance before contrast testing.

## Related Documents

- [Design Guidelines](design-guidelines.md)
- [Accessibility Guidelines](accessibility-guidelines.md)
- [Interaction Patterns](interaction-patterns.md)

