---
title: Requirements Traceability Matrix
document_id: PET-DOC-1301
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['feature-to-module-mapping.md', 'test-to-requirement-mapping.md']
---

# Requirements Traceability Matrix

Matriks ini menautkan kebutuhan bisnis ke target feature, workflow, logical data tables, API/UI surface, acceptance, dan test case. Karena source application/database belum ada di working tree, mapping ini adalah rancangan baseline, bukan bukti requirement sudah direpresentasikan atau diuji di kode.

## 1. Requirement-to-Feature Matrix

| Requirement ID | Requirement Description | Feature ID | Business Workflow | Module | Database Tables | API / Function | UI Page | Test Case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PET-REQ-001 | Branch, user, role, permission, and assignment | PET-FTR-002, PET-FTR-003, PET-FTR-004 | branch setup, user provisioning, role assignment | Organization & Security | organizations, branches, users, roles, permissions, user_role_assignments | auth-scopes, user-role-update, branch-create | Branch Setup / User Administration | PET-TST-010, PET-TST-011 |
| PET-REQ-002 | Customer and pet ownership/history | PET-FTR-005, PET-FTR-006 | customer registration, pet registration, ownership change | Customer & Pet | customers, pets, pet_owners | customer-create, pet-create, owner-change | Customer / Pet Detail | PET-TST-012 |
| PET-REQ-003 | Product/service catalog and pricing | PET-FTR-007 | product setup, unit conversion, price change | Product | products, product_prices, product_units | product-list, product-price-update | Product Catalog | PET-TST-013 |
| PET-REQ-004 | Inventory and stock movement | PET-FTR-008 | receiving, transfer, adjustment, opname | Inventory | stock_ledgers, inventory_locations, batches | stock-adjustment, stock-transfer | Inventory Overview | PET-TST-014 |
| PET-REQ-005 | POS checkout and payment | PET-FTR-009 | sales transaction, payment, refund, close shift | Sales | sales_transactions, sale_items, payments, refunds | checkout, payment, refund | POS Cashier | PET-TST-015 |
| PET-REQ-006 | Purchase order and receiving | PET-FTR-010 | PO creation/approval, partial receipt, invoice match | Purchasing | suppliers, purchase_orders, purchase_order_items, receiving_notes | po-create, receiving-create | Purchase Order / Receiving | PET-TST-016 |
| PET-REQ-007 | Booking and grooming service | PET-FTR-011, PET-FTR-012 | capacity check, booking, check-in, service completion | Service Ops | bookings, service_visits, grooming_sessions | booking-create, service-complete | Calendar / Grooming Queue | PET-TST-017 |
| PET-REQ-008 | Pet hotel and daycare | PET-FTR-013 | reservation, check-in, monitoring, check-out | Hotel & Care | bookings, room_assignments, daily_monitoring | boarding-checkin, boarding-checkout | Boarding Dashboard | PET-TST-018 |
| PET-REQ-009 | Animal transport and home grooming | PET-FTR-014, PET-FTR-015 | dispatch, pickup, handoff, home service | Field Services | transport_trips, vehicles, service_visits, bookings | transport-dispatch, trip-handoff, home-grooming-complete | Dispatch / Home Grooming | PET-TST-028 |
| PET-REQ-010 | Veterinary clinic operations | PET-FTR-016 | triage, consultation, diagnosis, treatment, consent | Clinical | visits, appointments, medical_records, consent_records | consult-create, clinical-finalize | Clinic Queue / Visit | PET-TST-019 |
| PET-REQ-011 | Medical record and revision | PET-FTR-017 | finalize, owner visibility, correction/revision | Clinical Records | medical_records, medical_record_revisions, medical_attachments | medical-record-finalize, medical-record-revise | Medical Record | PET-TST-029 |
| PET-REQ-012 | Pharmacy and medicine | PET-FTR-018 | prescription validation, dispense, medication use | Pharmacy | prescriptions, medication_usage, batches, stock_ledgers | dispense-medication | Pharmacy Dispense | PET-TST-020 |
| PET-REQ-013 | Membership and loyalty | PET-FTR-019, PET-FTR-020 | enroll, accrue, redeem, reverse | CRM & Loyalty | memberships, loyalty_points, loyalty_events | membership-create, point-redemption | Membership / Loyalty | PET-TST-021 |
| PET-REQ-014 | Promotions and campaign | PET-FTR-021 | campaign setup, eligibility, discount application | Promotion | promotions, promo_rules, promo_redemptions | promo-apply | Promotion Setup | PET-TST-022 |
| PET-REQ-015 | Staff, attendance, commission, payroll | PET-FTR-022, PET-FTR-023, PET-FTR-024, PET-FTR-025 | staff lifecycle, attendance, commission, payroll approval | HR & Payroll | employees, attendance, commissions, payroll_records | attendance-clockin, commission-calculate, payroll-generate | HR Dashboard | PET-TST-023 |
| PET-REQ-016 | Finance, accounting, and consignment | PET-FTR-026, PET-FTR-027, PET-FTR-028 | cash movement, journal posting, settlement, period close | Finance & Accounting | journal_entries, cash_flows, accounts, consignment_settlements | cash-post, journal-close, consignment-settle | Finance Ledger | PET-TST-024, PET-TST-030 |
| PET-REQ-017 | Reporting, notification, and customer portal | PET-FTR-029, PET-FTR-030, PET-FTR-031 | report/export, event notification, portal self-service | Analytics & Communication | dashboard_metrics, report_requests, notifications, customer_portal_access | report-generate, send-notification, portal-login | Analytics / Customer Portal | PET-TST-025, PET-TST-026 |
| PET-REQ-018 | Settings, integrations, security, and audit | PET-FTR-032, PET-FTR-033 | settings change/approval, provider setup, access audit | Governance & Security | audit_logs, system_settings, setting_versions, external_tokens | settings-save, settings-approve, integration-test, audit-export | System Settings / Integrations | PET-TST-027, PET-TST-SET-001..006 |
| PET-REQ-019 | CRM (recommended) | PET-FTR-034 | segment, consent, campaign follow-up | CRM | customer_segments, campaigns, campaign_members | crm-segment/campaign (TBD) | CRM workspace (TBD) | PET-TST-REC-001 planned |
| PET-REQ-020 | Customer service and complaint (recommended) | PET-FTR-035 | ticket intake, assignment, SLA, resolution | Customer Service | complaint_tickets, complaint_events, complaint_assignments | complaint-create/resolve (TBD) | Complaint inbox (TBD) | PET-TST-REC-002 planned |
| PET-REQ-021 | Pet care monitoring (recommended) | PET-FTR-036 | care plan, daily task, observation/report | Care Operations | care_plans, care_observations, care_media | care-task/observation (TBD) | Care timeline (TBD) | PET-TST-REC-003 planned |
| PET-REQ-022 | Veterinary laboratory (recommended) | PET-FTR-037 | order, sample, result, correction | Clinical Diagnostics | lab_orders, lab_samples, lab_results, lab_result_revisions | lab-order/result (TBD) | Laboratory queue (TBD) | PET-TST-REC-004 planned |
| PET-REQ-023 | Surgery and hospitalization (recommended) | PET-FTR-038 | consent, procedure, admit, monitor, discharge | Advanced Clinical | procedures, hospital_stays, hospital_observations, informed_consents | procedure/admission (TBD) | Procedure/stay workspace (TBD) | PET-TST-REC-005 planned |
| PET-REQ-024 | Asset and maintenance (recommended) | PET-FTR-039 | register, assign, maintain, retire | Operations / Asset | assets, asset_assignments, maintenance_events | asset-maintenance (TBD) | Asset register (TBD) | PET-TST-REC-006 planned |
| PET-REQ-025 | Operational checklist and SOP (recommended) | PET-FTR-040 | publish SOP, assign checklist, attest | Operations Governance | sop_documents, checklist_templates, checklist_runs, checklist_items | checklist-run/verify (TBD) | SOP/checklist workspace (TBD) | PET-TST-REC-007 planned |
| PET-REQ-026 | Document management (recommended) | PET-FTR-041 | upload, classify, link, access, expire | Documents | documents, document_links, document_access_events | document-upload/access (TBD) | Document center (TBD) | PET-TST-REC-008 planned |
| PET-REQ-027 | Parcel delivery/shipping (recommended) | PET-FTR-042 | create shipment, track, prove delivery | Commerce Fulfillment | shipments, shipment_events, delivery_proofs | shipment-create/webhook (TBD) | Shipping queue (TBD) | PET-TST-REC-009 planned |
| PET-REQ-028 | Budget and expense control (recommended) | PET-FTR-043 | budget request, approval, actual variance | Finance Planning | budgets, budget_lines, expense_requests, budget_actuals | budget-approve/expense (TBD) | Budget workspace (TBD) | PET-TST-REC-010 planned |
| PET-REQ-029 | Tax management (recommended) | PET-FTR-044 | configure effective tax, calculate, report | Finance Compliance | tax_rules, tax_categories, tax_calculation_snapshots | tax-rule/calculation (TBD) | Tax settings/report (TBD) | PET-TST-REC-011 planned |
| PET-REQ-030 | Backup and disaster recovery enhancement (recommended) | PET-FTR-045 | backup inventory, restore drill, evidence | Platform Operations | Platform backup inventory/restore evidence (external scope TBD) | Provider/platform workflow (TBD) | Operations console/runbook (TBD) | PET-TST-REC-012 planned |
| PET-REQ-031 | Online store and e-commerce (recommended) | PET-FTR-046 | catalog, cart, order, payment, fulfillment | Commerce | online_catalogs, carts, online_orders, online_order_items | online-checkout/order (TBD) | Online store/admin orders (TBD) | PET-TST-REC-013 planned |

## 2. Test Coverage Rule

Setiap requirement utama di atas harus memiliki:
- minimal satu acceptance criterion,
- satu workflow bisnis yang jelas,
- satu trace ke tabel basis data,
- satu test scenario validasi,
- satu mapping ke modul UI atau API yang relevan.

## 3. Status

Matriks ini bersifat Draft design baseline; nama tabel/API extension adalah logical proposal dan belum implementasi. PET-REQ-019..031 tetap recommended/not committed scope; `TBD` menandai contract yang dibuat saat item masuk approved roadmap. Update saat implementation discovery dan perubahan requirement.

## Related Documents

- [feature-to-module-mapping.md](feature-to-module-mapping.md)
- [module-to-database-mapping.md](module-to-database-mapping.md)
- [test-to-requirement-mapping.md](test-to-requirement-mapping.md)

