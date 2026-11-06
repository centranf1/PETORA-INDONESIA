---
title: Data Flow Diagram
document_id: PET-DOC-0307
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['integration-architecture.md']
---

# Data Flow Diagram

Diagram aliran data menggambarkan bagaimana transaksi dan event dialirkan melalui aplikasi dan database.

## Key Flows

Customer registration, product sale, stock receipt, appointment booking, and financial posting.

## Mermaid

```mermaid
flowchart LR
A[User Action] --> B[Validation] --> C[Business Logic] --> D[Database Transaction] --> E[Audit + Notification] --> F[Dashboard/Report]
```

