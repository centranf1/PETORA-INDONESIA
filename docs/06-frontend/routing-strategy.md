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

Public routes: login, forgot password, public portal. Protected routes: dashboard, sales, inventory, services, administration. Role-based route groups for managers and admins.

## Route Guards

Each route validates auth and required permission; tenant/branch selected before loading feature data.

## Recommended Implementation

Use React Router with route config and permission guard components.

