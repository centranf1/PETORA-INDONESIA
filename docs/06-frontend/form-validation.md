---
title: Form Validation
document_id: PET-DOC-0607
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-fetching.md']
---

# Form Validation

Dokumen ini memerinci pendekatan validasi form.

## Schema Rules

Every form uses zod schema and react-hook-form. Validation is server-checked plus client guidance.

## Examples

Customer phone number unique check, product price not below cost, branch selection required, appointment time within open hours, and patient age within service rules.

## UX Rule

Field-level and summary-level errors should be friendly and actionable.

