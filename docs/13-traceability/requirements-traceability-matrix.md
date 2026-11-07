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

Matriks keterlacakan menautkan kebutuhan bisnis dan teknis PETORA ke fitur, workflow, modifikasi basis data, API, UI, acceptance criteria, dan test case. Matriks ini membuktikan kelengkapan hubungan antar-artifact dokumentasi, bukan bukti bahwa requirement sudah diimplementasikan di kode.

## 1. Requirement-to-Feature Matrix

| Requirement ID | Requirement Description | Feature ID | Business Workflow | Module | Database Tables | API / Function | UI Page | Test Case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PET-REQ-001 | Multi-branch organization management | PET-FTR-004 | branch setup, daily operations | Organization & Branch | organizations, branches | branch-list, branch-create | Branch Setup | PET-TST-003, PET-TST-006 |
| PET-REQ-002 | User and role management | PET-FTR-002, PET-FTR-003 | user creation, role assignment | Security | users, roles, user_role_assignments | auth-scopes, user-role-update | User Administration | PET-TST-007, PET-TST-022 |
| PET-REQ-003 | Customer and pet profile | PET-FTR-005, PET-FTR-006 | registration, owner assignment | Customer & Pet | customers, pets, pet_owners | customers-list, customer-create, pet-create | Customer Detail | PET-TST-008, PET-TST-027 |
| PET-REQ-004 | Product catalog and pricing | PET-FTR-007 | product setup, price change approval | Product | products, product_prices | products-list, product-price-update | Product Catalog | PET-TST-009, PET-TST-028 |
| PET-REQ-005 | Inventory and stock movement | PET-FTR-008 | receiving, transfer, stock adjustment, opname | Inventory | stock_ledgers, inventory_locations | inventory-locations, stock-adjustment, stock-transfer | Inventory Overview | PET-TST-010, PET-TST-029 |
| PET-REQ-006 | POS checkout and payment | PET-FTR-009 | sales transaction, payment, receipt | Sales | sales_transactions, sale_items, payments | sales-list, checkout, refund | POS Cashier | PET-TST-001, PET-TST-002, PET-TST-023, PET-TST-030 |
| PET-REQ-007 | Purchase order and receiving | PET-FTR-010 | PO creation, approval, receipt | Purchasing | purchase_orders, purchase_order_items, receiving_notes | po-create, receiving-create | Purchase Order | PET-TST-011 |
| PET-REQ-008 | Service, booking, hotel, and transport operations | PET-FTR-011, PET-FTR-012, PET-FTR-013, PET-FTR-014, PET-FTR-015 | booking, check-in, execution, monitoring, payment | Service Ops | bookings, service_visits, room_assignments | booking-create, service-complete | Service / Boarding Dashboard | PET-TST-012, PET-TST-013, PET-TST-024 |
| PET-REQ-009 | Veterinary consultation, medical records, and pharmacy | PET-FTR-016, PET-FTR-017, PET-FTR-018 | consultation, diagnosis, prescription, dispensing | Clinical & Pharmacy | visits, medical_records, prescriptions, medication_usage | consult-create, prescription-create, dispense-medication | Clinic / Pharmacy | PET-TST-004, PET-TST-014 |
| PET-REQ-010 | Membership and loyalty | PET-FTR-019, PET-FTR-020 | member registration, reward issuance | CRM & Loyalty | memberships, loyalty_points, loyalty_events | membership-create, point-redemption | Member Portal | PET-TST-015 |
| PET-REQ-011 | Promotion and campaign | PET-FTR-021 | discount application, campaign validation | Promotion | promotions, promo_rules | promo-apply | Promotion Setup | PET-TST-016 |
| PET-REQ-012 | Staff, attendance, commission, payroll | PET-FTR-022, PET-FTR-023, PET-FTR-024, PET-FTR-025 | attendance, commission, payslip | HR & Payroll | employees, attendance, commissions, payroll_records | attendance-clockin, payroll-generate | HR Dashboard | PET-TST-017 |
| PET-REQ-013 | Finance, accounting, cash, and consignment | PET-FTR-026, PET-FTR-027, PET-FTR-028 | cash movement, journal, closing, settlement | Finance | journal_entries, cash_flows, accounts | cash-post, journal-close | Finance Ledger | PET-TST-005, PET-TST-025, PET-TST-026 |
| PET-REQ-014 | Reporting and analytics | PET-FTR-029 | dashboard and export | Reporting | dashboard_metrics, report_requests | report-generate | Analytics Dashboard | PET-TST-018 |
| PET-REQ-015 | Notifications and customer portal | PET-FTR-030, PET-FTR-031 | reminder delivery, portal access | Communication | notifications, customer_portal_access | send-notification, portal-login | Customer Portal | PET-TST-019 |
| PET-REQ-016 | Dynamic settings governance | PET-FTR-032 | settings, approval, version and audit | Governance & Security | system_settings, setting_change_requests, setting_versions, setting_audit_log | settings-save, settings-approve | System Settings | PET-TST-SET-001..006, PET-TST-SEC-SET-004..005 |
| PET-REQ-017 | Integration settings and secret handling | PET-FTR-033 | integration setup and event processing | Integrations | external_tokens, integration_events | integration-health, webhook-handler | Integration Settings | PET-TST-021, PET-TST-SEC-SET-006 |
| PET-REQ-018 | Security, tenant isolation, audit, and compliance | Cross-cutting | authorization, audit, access review | Governance & Security | audit_logs, RLS policies | auth-scopes, customers-list, products-list, inventory-locations, sales-list, audit-export | User Administration / System Settings | PET-TST-003, PET-TST-007, PET-TST-020, PET-TST-022, PET-TST-027, PET-TST-028, PET-TST-029, PET-TST-030, PET-TST-SEC-SET-001..006 |

## 2. Test Coverage Rule

Setiap requirement utama di atas harus memiliki:
- minimal satu acceptance criterion,
- satu workflow bisnis yang jelas,
- satu trace ke tabel basis data,
- satu test scenario validasi,
- satu mapping ke modul UI atau API yang relevan.

## 3. Status

Matriks ini bersifat draft baseline dan harus diperbarui saat implementasi nyata dimulai atau pada perubahan persyaratan yang signifikan.

## Related Documents

- [feature-to-module-mapping.md](feature-to-module-mapping.md)
- [module-to-database-mapping.md](module-to-database-mapping.md)
- [test-to-requirement-mapping.md](test-to-requirement-mapping.md)

