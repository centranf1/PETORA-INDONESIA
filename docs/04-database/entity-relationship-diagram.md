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

ERD ini adalah model logical konseptual untuk domain core PETORA. Nama tabel/relasi masih rancangan dan harus disinkronkan dengan database design serta data dictionary sebelum migration; diagram tidak mengklaim schema telah diimplementasikan.

## Relationship Summary

Organization memiliki branches dan user profiles; user memperoleh role melalui assignment dengan scope branch. Customer dapat memiliki banyak pets melalui ownership relation dengan satu current primary owner. Product/service catalog digunakan inventory, sales, purchasing, booking, pharmacy, dan reporting. Stock ledger mencatat seluruh penerimaan, pengeluaran, transfer, reservation, adjustment, dan dispensing. Booking menghubungkan customer/pet, branch, service, resource, dan service visit. Clinical visit memiliki medical record final/revisions, consent, prescription, dan medication usage. Sales/payment dan purchasing/receiving menghasilkan posting finance/accounting yang dapat direkonsiliasi. Settings menggunakan registry, scoped settings, version, dan append-only audit log.

## Mermaid ERD

```mermaid
erDiagram
	ORGANIZATIONS ||--o{ BRANCHES : owns
	ORGANIZATIONS ||--o{ USERS : contains
	USERS ||--o{ USER_ROLE_ASSIGNMENTS : receives
	ROLES ||--o{ USER_ROLE_ASSIGNMENTS : assigned
	ROLES ||--o{ ROLE_PERMISSIONS : grants
	PERMISSIONS ||--o{ ROLE_PERMISSIONS : mapped
	ORGANIZATIONS ||--o{ CUSTOMERS : serves
	CUSTOMERS ||--o{ PET_OWNERS : owns
	PETS ||--o{ PET_OWNERS : has
	ORGANIZATIONS ||--o{ PRODUCTS : catalogs
	PRODUCTS ||--o{ PRODUCT_PRICES : priced
	BRANCHES ||--o{ INVENTORY_LOCATIONS : contains
	PRODUCTS ||--o{ STOCK_LEDGERS : moved
	INVENTORY_LOCATIONS ||--o{ STOCK_LEDGERS : records
	BRANCHES ||--o{ SALES_TRANSACTIONS : records
	SALES_TRANSACTIONS ||--|{ SALE_ITEMS : contains
	SALES_TRANSACTIONS ||--o{ PAYMENTS : paid_by
	SUPPLIERS ||--o{ PURCHASE_ORDERS : receives
	PURCHASE_ORDERS ||--o{ RECEIVING_NOTES : received
	BRANCHES ||--o{ BOOKINGS : schedules
	PETS ||--o{ BOOKINGS : booked_for
	BOOKINGS ||--o{ SERVICE_VISITS : fulfills
	PETS ||--o{ VISITS : clinical
	VISITS ||--o{ MEDICAL_RECORDS : documents
	MEDICAL_RECORDS ||--o{ MEDICAL_RECORD_REVISIONS : revised
	MEDICAL_RECORDS ||--o{ PRESCRIPTIONS : prescribes
	PRESCRIPTIONS ||--o{ MEDICATION_USAGE : dispensed
	JOURNAL_ENTRIES ||--|{ JOURNAL_LINES : balances
	ORGANIZATIONS ||--o{ SYSTEM_SETTINGS : configures
	SETTING_DEFINITIONS ||--o{ SYSTEM_SETTINGS : defines
	SYSTEM_SETTINGS ||--o{ SETTING_VERSIONS : versions
	SYSTEM_SETTINGS ||--o{ SETTING_AUDIT_LOG : audits
```

## Integrity and Scope Notes

- Child transaction boleh menyimpan tenant scope untuk RLS/query, tetapi konsistensi harus dijaga dengan composite FK atau validasi server-side.
- `branch_id` bukan relasi universal; master tingkat organisasi tidak dipaksakan ke satu branch.
- Audit/history bersifat append-only dan tidak menghapus source record.
- Extension README bagian 5 belum ditampilkan; ERD-nya dibuat saat extension disetujui.

## Related Documents

- [Database design](database-design.md)
- [Data dictionary](data-dictionary.md)
- [Module-to-database mapping](../13-traceability/module-to-database-mapping.md)

