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

## Entity Map and Cardinality Notes

Organization owns branches and tenant-wide configuration. User identity may be a platform identity linked to one or more organization assignments; role assignment is scoped and should not be modeled as a single role column on user. Customers may own multiple pets; multi-owner history requires a dedicated relationship entity if approved. Branch-scoped sales, stock, bookings, visits, payroll and journal source records retain organization and relevant branch references. Product catalog may be organization-wide with branch price/availability overrides.

The diagram is conceptual. Tables marked TBD in [module-to-database mapping](../13-traceability/module-to-database-mapping.md) require approved attributes, keys, constraints, and deletion rules before migration.

## Design Note

Diagram ini bersifat konseptual dan harus diperbarui saat skema final dibuat.

## Mermaid ER

```mermaid
erDiagram
	ORGANIZATIONS ||--o{ BRANCHES : owns
	ORGANIZATIONS ||--o{ USERS : contains
	USERS ||--o{ USER_ROLE_ASSIGNMENTS : receives
	ROLES ||--o{ USER_ROLE_ASSIGNMENTS : grants
	ORGANIZATIONS ||--o{ CUSTOMERS : serves
	CUSTOMERS ||--o{ PET_OWNERS : owns
	PETS ||--o{ PET_OWNERS : has
	ORGANIZATIONS ||--o{ PRODUCTS : catalogs
	BRANCHES ||--o{ INVENTORY_LOCATIONS : contains
	PRODUCTS ||--o{ STOCK_LEDGERS : affects
	INVENTORY_LOCATIONS ||--o{ STOCK_LEDGERS : records
	BRANCHES ||--o{ SALES_TRANSACTIONS : records
	SALES_TRANSACTIONS ||--|{ SALE_ITEMS : contains
	SALES_TRANSACTIONS ||--o{ PAYMENTS : paid_by
	PETS ||--o{ BOOKINGS : scheduled_for
	BRANCHES ||--o{ BOOKINGS : hosts
	PETS ||--o{ MEDICAL_RECORDS : has
	MEDICAL_RECORDS ||--o{ PRESCRIPTIONS : may_create
	ORGANIZATIONS ||--o{ SYSTEM_SETTINGS : configures
	SYSTEM_SETTINGS ||--o{ SETTING_CHANGE_REQUESTS : proposed_for
	SETTING_CHANGE_REQUESTS ||--o{ SETTING_VERSIONS : applies
```

`PET_OWNERS`, branch-level product price, payment attempts, refund requests, inventory batches, and several service/finance entities are logical candidates, not approved physical tables. Validate ER cardinalities and composite tenant foreign keys during schema design.

## Related Documents

- [Database Design](database-design.md)
- [Data Dictionary](data-dictionary.md)
- [Module to Database Mapping](../13-traceability/module-to-database-mapping.md)

