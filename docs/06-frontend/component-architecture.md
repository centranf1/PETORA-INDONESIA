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

App shell, layout, page sections, forms, tables, dialogs, cards, charts, status chips, and utilities.

## Standard Rules

Use composition over inheritance. Shared components must accept typed props and avoid domain logic.

## Patterns

Use shadcn/ui as base and map to PETORA-specific design system. Build consistent table, modal, combobox, and date-picker patterns.

