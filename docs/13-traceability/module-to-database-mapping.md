---
title: Module to Database Mapping
document_id: PET-DOC-1303
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['feature-to-module-mapping.md']
---

# Module to Database Mapping

Pemetaan modul ke tabel tertentu.

## Feature-to-Data Entity Mapping

Daftar berikut adalah peta logical entity untuk cakupan fitur PETORA. Nama yang sudah tercantum di data dictionary merupakan nama baseline; nama bertanda **TBD/proposed** belum menjadi kontrak fisik atau migration dan harus disahkan saat perancangan schema domain.

| Feature IDs | Domain module | Core logical entities / candidate tables |
| --- | --- | --- |
| PET-FTR-001, PET-FTR-029 | Reporting | dashboard_metrics, report_requests; report views/materialized aggregates TBD |
| PET-FTR-002, PET-FTR-003 | Identity & Access | users, roles, permissions, user_role_assignments |
| PET-FTR-004 | Organization | organizations, branches, inventory_locations, cash_registers (TBD) |
| PET-FTR-005, PET-FTR-006 | Customer & Pet | customers, pets, pet_owners (TBD), customer_interactions (TBD) |
| PET-FTR-007 | Catalog | products; product_prices, product_units, product_categories (TBD) |
| PET-FTR-008 | Inventory | inventory_locations, stock_ledgers; stock_batches, stock_counts, stock_transfers (TBD) |
| PET-FTR-009 | Sales | sales_transactions, sale_items, payments; refunds, returns, cashier_shifts (TBD) |
| PET-FTR-010 | Purchasing | suppliers, purchase_orders, purchase_order_items, receiving_notes; supplier_invoices (TBD) |
| PET-FTR-011, PET-FTR-012, PET-FTR-013, PET-FTR-014, PET-FTR-015 | Service Operations | bookings, service_visits; grooming_sessions, room_assignments, care_logs, transport_jobs (TBD) |
| PET-FTR-016, PET-FTR-017 | Clinical | visits (TBD), medical_records, medical_record_revisions (TBD), clinical_consents (TBD) |
| PET-FTR-018 | Pharmacy | prescriptions, medication_usage; medication_batches and dispense_events (TBD) |
| PET-FTR-019 | Membership | memberships, membership_plans (TBD), membership_events (TBD) |
| PET-FTR-020 | Loyalty | loyalty_points, loyalty_events |
| PET-FTR-021 | Promotions | promotions, promo_rules |
| PET-FTR-022, PET-FTR-023, PET-FTR-024 | Workforce | employees, attendance, commissions; shifts and leave_requests (TBD) |
| PET-FTR-025 | Payroll | payroll_cycles, payroll_records, payroll_approvals (TBD) |
| PET-FTR-026 | Finance | cash_flows, accounts, receivables/payables (TBD), bank_reconciliation_items (TBD) |
| PET-FTR-027 | Accounting | journal_entries, accounting_periods (TBD), journal_lines (TBD) |
| PET-FTR-028 | Consignment | consignment_partners, consignment_stock, settlements (TBD) |
| PET-FTR-030 | Communications | notifications, notification_templates (TBD), delivery_attempts (TBD) |
| PET-FTR-031 | Customer Portal | customer_portal_access; customer-owned data remains in its source domain |
| PET-FTR-032 | System Configuration | system_settings, setting_change_requests, setting_versions, setting_audit_log |
| PET-FTR-033 | Integrations | external_tokens (or secret-manager references), integration_events (TBD) |

## Mapping Rules

- Domain modules own their write models; cross-module workflows use documented service/API contracts and do not update another module's tables directly.
- Ledger and event/history entities are append-oriented. Corrections use explicit reversal/revision records.
- Each tenant-owned entity must document organization/branch ownership, RLS policy, retention class, and sensitivity.
- Define all columns, indexes, constraints, foreign keys, deletion behavior, and migration order in the data dictionary/database design before implementation; this table alone is not schema approval.
- Replace each TBD with a decided entity or explicitly remove the behavior from approved scope. Do not silently use JSONB or an unrelated table to cover an unmapped domain.

## Related Documents

- [Data Dictionary](../04-database/data-dictionary.md)
- [Database Design](../04-database/database-design.md)
- [Feature Catalog](../01-product/feature-catalog.md)
- [Requirements Traceability Matrix](requirements-traceability-matrix.md)

