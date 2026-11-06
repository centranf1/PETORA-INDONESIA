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

Pemetaan feature ke logical table groups yang dibutuhkan. Nama tabel di bawah adalah rancangan domain konseptual, bukan bukti schema terpasang dan bukan migration. Nama/kolom final harus diselaraskan pada database design, data dictionary, RLS policy, dan migration sebelum implementasi.

## Core Feature Mapping

| Feature ID | Logical table group (proposed) | Data integrity note |
| --- | --- | --- |
| PET-FTR-001 | `dashboard_metrics` (optional read model), `report_requests` | Derived data only; source values remain in domain tables |
| PET-FTR-002 | `users`, `user_role_assignments`, `user_branch_assignments` (if separated) | Auth identity link; deactivate, do not erase transaction actor history |
| PET-FTR-003 | `roles`, `permissions`, `role_permissions`, `user_role_assignments` | Scope and action assignment must be auditable and tenant-bound |
| PET-FTR-004 | `organizations`, `branches`, `inventory_locations`, `cash_registers`, `branch_service_settings` | Branch deactivation blocks new operations without deleting history |
| PET-FTR-005 | `customers`, `customer_contacts`, `customer_interactions` | Unique phone policy and retention need business/legal confirmation |
| PET-FTR-006 | `pets`, `pet_owners`, `pet_health_flags` | Ownership history; enforce one current primary owner |
| PET-FTR-007 | `products`, `product_variants`, `product_units`, `product_prices`, `supplier_products` | Price/unit snapshots on transaction lines |
| PET-FTR-008 | `inventory_locations`, `stock_ledgers`, `stock_batches`, `stock_reservations`, `stock_counts`, `stock_transfers` | Ledger is source of truth; derived balance must reconcile |
| PET-FTR-009 | `sales_transactions`, `sale_items`, `payments`, `payment_events`, `refund_requests`, `cash_shifts` | Idempotency/reference uniqueness; refunds are compensating records |
| PET-FTR-010 | `suppliers`, `purchase_orders`, `purchase_order_items`, `receiving_notes`, `supplier_invoices`, `supplier_payments`, `purchase_returns` | Partial receiving and invoice match are separate states |
| PET-FTR-011 | `services`, `service_packages`, `grooming_sessions`, `service_visits`, `grooming_checklists` | Preserve assigned staff, condition notes, and service completion |
| PET-FTR-012 | `bookings`, `booking_items`, `capacity_slots`, `booking_events`, `waitlist_entries` | Capacity race must be guarded by DB transaction/constraint strategy |
| PET-FTR-013 | `rooms`, `room_assignments`, `boarding_stays`, `daily_monitoring`, `care_tasks`, `daycare_visits` | Track occupancy interval and care task actor/time |
| PET-FTR-014 | `transport_trips`, `transport_assignments`, `vehicles`, `trip_events`, `handoff_evidence` | Separate animal transport from parcel shipping |
| PET-FTR-015 | `home_grooming_visits`, `service_assignments`, `travel_events`, `service_visits` | Reuse booking/service references where appropriate; avoid duplicate pet/customer master |
| PET-FTR-016 | `appointments`, `visits`, `triage_records`, `clinical_observations`, `medical_consents` | Clinical event history; restrict data by clinician/permission |
| PET-FTR-017 | `medical_records`, `medical_record_revisions`, `medical_attachments`, `owner_visible_records` (or visibility fields) | Finalized record immutable; attachment visibility follows parent record |
| PET-FTR-018 | `prescriptions`, `prescription_items`, `medication_usage`, `stock_batches`, `stock_ledgers` | Dispensing references prescription, lot, actor, and patient |
| PET-FTR-019 | `membership_plans`, `memberships`, `membership_benefits`, `benefit_events` | Snapshot plan terms at enrollment/usage |
| PET-FTR-020 | `loyalty_accounts`, `loyalty_events`, `loyalty_rewards` | Event ledger is authoritative; balance is derived or reconciled |
| PET-FTR-021 | `promotions`, `promo_rules`, `promo_redemptions` | Redemption limits require atomic concurrency protection |
| PET-FTR-022 | `employees`, `employee_assignments`, `employment_documents` | Sensitive HR fields require tighter access and retention policy |
| PET-FTR-023 | `work_schedules`, `attendance_events`, `leave_requests`, `attendance_adjustments` | Corrections preserve original event and approval history |
| PET-FTR-024 | `commission_rules`, `commission_rule_versions`, `commission_accruals`, `commission_adjustments` | Snapshot applied rule at eligible source event |
| PET-FTR-025 | `payroll_cycles`, `payroll_records`, `payroll_components`, `payroll_approvals`, `payroll_disbursements` | Segregate preparer/approver; immutable approved payroll history |
| PET-FTR-026 | `cash_accounts`, `cash_flows`, `receivables`, `payables`, `reconciliations` | Reference original payment/receipt and prevent duplicate posting |
| PET-FTR-027 | `accounts`, `accounting_periods`, `journal_entries`, `journal_lines`, `journal_reversals` | Balance and period constraints; no destructive posted-entry update |
| PET-FTR-028 | `consignment_partners`, `consignment_agreements`, `consignment_receipts`, `consignment_sales`, `consignment_settlements` | Partner-owned inventory and settlement must reconcile |
| PET-FTR-029 | `report_requests`, `report_exports`, views/materialized views as justified | Enforce scope before aggregation and export; document freshness |
| PET-FTR-030 | `notification_templates`, `notification_preferences`, `notification_events`, `notification_deliveries` | Store provider status and retry metadata; exclude secrets |
| PET-FTR-031 | `customer_portal_profiles` only if not represented by Auth/profile relations | Prefer relationship authorization over duplicate customer data |
| PET-FTR-032 | `system_settings`, `setting_versions`, `setting_audit_log` | Organization/branch scope, approval, optimistic version, append-only audit |
| PET-FTR-033 | `integrations`, `integration_events`, `webhook_receipts` plus secret references | Secret material stays in server secret manager, not these client-readable records |

## Recommended Extension Mapping

| Feature ID | Logical table group (proposed) | Dependency / decision |
| --- | --- | --- |
| PET-FTR-034 | `customer_segments`, `campaigns`, `campaign_members` | Requires consent and notification preference model |
| PET-FTR-035 | `complaint_tickets`, `complaint_events`, `complaint_assignments` | Requires service SLA and compensation approval policy |
| PET-FTR-036 | `care_plans`, `care_observations`, `care_media` | May extend boarding tasks; do not duplicate medical records |
| PET-FTR-037 | `lab_orders`, `lab_samples`, `lab_results`, `lab_result_revisions` | Clinical validation and result retention decision |
| PET-FTR-038 | `procedures`, `hospital_stays`, `hospital_observations`, `informed_consents` | Requires clinical scope, staffing, inventory, billing decisions |
| PET-FTR-039 | `assets`, `asset_assignments`, `maintenance_events` | Depreciation integration depends on accounting requirements |
| PET-FTR-040 | `sop_documents`, `checklist_templates`, `checklist_runs`, `checklist_items` | Versioned SOP and attestation/audit requirements |
| PET-FTR-041 | `documents`, `document_links`, `document_access_events` | Storage object policies and retention must follow linked data class |
| PET-FTR-042 | `shipments`, `shipment_events`, `delivery_proofs` | Provider contract and boundary from animal transport |
| PET-FTR-043 | `budgets`, `budget_lines`, `expense_requests`, `budget_actuals` | Approval thresholds and fiscal period are open decisions |
| PET-FTR-044 | `tax_rules`, `tax_categories`, `tax_calculation_snapshots` | Requires jurisdiction, legal review, and effective-date policy |
| PET-FTR-045 | Platform backup inventory and restore evidence (likely external to tenant tables) | Select platform-native backup scope, RPO/RTO and retention before design |
| PET-FTR-046 | `online_catalogs`, `carts`, `online_orders`, `online_order_items` | Requires customer auth, payment, inventory reservation, shipping integration |

## Design Note

All names are illustrative design proposals. `jsonb` is reserved for genuinely variable payloads and provider metadata; it must not replace normalized relations for ownership, transactions, ledger entries, permissions, or clinical history. The data dictionary must be updated before schema migration is approved.

## Related Documents

- [Data dictionary](../04-database/data-dictionary.md)
- [Database design](../04-database/database-design.md)
- [Feature catalog](../01-product/feature-catalog.md)

