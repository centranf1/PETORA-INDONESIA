---
title: Frontend Architecture
document_id: PET-DOC-0601
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['project-structure.md', 'state-management.md']
---

# Frontend Architecture

Dokumen frontend menjelaskan struktur UI React + TypeScript untuk PETORA.

## Architecture

Use feature-based modules with shared components, layouts, hooks, services, validations, and types.

## Technology

React, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, react-hook-form, and zod.

## Pattern

Business logic stays in services/hooks; UI components remain presentational for reuse and testing.

## State Strategy

Use server state via TanStack Query; local UI state via React state; form state via react-hook-form; schema validation via zod.

