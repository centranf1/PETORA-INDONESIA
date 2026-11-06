---
title: Component Diagram
document_id: PET-DOC-0305
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['module-architecture.md']
---

# Component Diagram

Diagram komponen menunjukkan pembagian fitur agar domain tetap terisolasi.

## Main Components

App shell, auth gateway, dashboard, customer module, sales pos, inventory, clinical, finance, payroll, reports, and shared services.

## Cross-cutting Components

Validation layer, RBAC service, audit logger, notifications, cache layer, and API client helpers.

## Mermaid

```mermaid
flowchart TD
A[App Shell] --> B[Auth Provider]
A --> C[Dashboard]
A --> D[Customer Module]
A --> E[POS Module]
A --> F[Inventory Module]
A --> G[Clinical Module]
A --> H[Finance Module]
A --> I[Reporting Module]
A --> J[Shared Services]
J --> K[Validation]
J --> L[RBAC]
J --> M[Audit]
```

