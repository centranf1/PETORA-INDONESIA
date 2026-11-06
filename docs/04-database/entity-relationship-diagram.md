---
title: Entity Relationship Diagram
document_id: PET-DOC-0402
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-design.md']
---

# Entity Relationship Diagram

ERD menjabarkan hubungan antar tabel utama dalam sistem.

## Entity Map

Organizations -> Branches -> Users -> Roles -> Permissions; Branches -> Customers -> Pets -> Bookings; Branches -> Products -> Inventory; Product -> Purchase Orders -> Receipts -> Stock Ledger; Branch -> Sales -> Sales Items -> Payments; Branch -> Medical Records -> Prescriptions -> Pharmacy Usage; Branch -> Payroll and Finance journals.

## Design Note

Diagram ini bersifat konseptual dan harus diperbarui saat skema final dibuat.

## Mermaid ER

```mermaid
erDiagram
ORGANIZATION ||--o{ BRANCH : owns
BRANCH ||--o{ USER : has
USER ||--o{ ROLE_ASSIGNMENT : has
BRANCH ||--o{ CUSTOMER : serves
CUSTOMER ||--o{ PET : owns
BRANCH ||--o{ PRODUCT : stocks
PRODUCT ||--o{ STOCK_MOVEMENT : affects
BRANCH ||--o{ SALES_TRANSACTION : logs
SALES_TRANSACTION ||--o{ PAYMENT : includes
BRANCH ||--o{ MEDICAL_RECORD : manages
MEDICAL_RECORD ||--o{ PRESCRIPTION : includes
```

