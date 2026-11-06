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

Matriks keterlacakan menautkan kebutuhan bisnis dan teknis PETORA ke fitur, workflow, modifikasi basis data, API, UI, dan test case. Keterlacakan ini berfungsi sebagai bukti bahwa setiap requirement utama memiliki representasi di kode, database, dan validasi.

## 1. Requirement-to-Feature Matrix

| Requirement ID | Requirement Description | Feature ID | Business Workflow | Module | Database Tables | API / Function | UI Page | Test Case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PET-REQ-001 | Multi-branch organization management | PET-FTR-004 | branch setup, daily operations | Organization & Branch | organizations, branches | branch-list, branch-create | Branch Setup | PET-TST-010 |
| PET-REQ-002 | User and role management | PET-FTR-002, PET-FTR-003 | user creation, role assignment | Security | users, roles, user_role_assignments | auth-scopes, user-role-update | User Administration | PET-TST-011 |
| PET-REQ-003 | Customer and pet profile | PET-FTR-005, PET-FTR-006 | registration, owner assignment | Customer & Pet | customers, pets, pet_owners | customer-create, pet-create | Customer Detail | PET-TST-012 |
| PET-REQ-004 | Product catalog and pricing | PET-FTR-007 | product setup, price change approval | Product | products, product_prices | product-list, product-price-update | Product Catalog | PET-TST-013 |
| PET-REQ-005 | Inventory and stock movement | PET-FTR-008 | receiving, transfer, stock adjustment, opname | Inventory | stock_ledgers, inventory_locations | stock-adjustment, stock-transfer | Inventory Overview | PET-TST-014 |
| PET-REQ-006 | POS checkout and payment | PET-FTR-009 | sales transaction, payment, receipt | Sales | sales_transactions, sale_items, payments | checkout, refund | POS Cashier | PET-TST-015 |
| PET-REQ-007 | Purchase order and receiving | PET-FTR-010 | PO creation, approval, receipt | Purchasing | purchase_orders, purchase_order_items, receiving_notes | po-create, receiving-create | Purchase Order | PET-TST-016 |
| PET-REQ-008 | Grooming service operation | PET-FTR-011, PET-FTR-012 | booking, check-in, execution, payment | Service Ops | bookings, service_visits, grooming_sessions | booking-create, service-complete | Grooming Queue | PET-TST-017 |
| PET-REQ-009 | Pet hotel / daycare management | PET-FTR-013 | reservation, check-in, monitoring, check-out | Hotel & Care | bookings, room_assignments, daily_monitoring | boarding-checkin, boarding-checkout | Boarding Dashboard | PET-TST-018 |
| PET-REQ-010 | Veterinary consultation and diagnosis | PET-FTR-016, PET-FTR-017 | consultation, diagnosis, treatment | Clinical | visits, medical_records, prescriptions | consult-create, prescription-create | Clinic Queue | PET-TST-019 |
| PET-REQ-011 | Pharmacy dispensing | PET-FTR-018 | prescription validation, dispensing | Pharmacy | prescriptions, medication_usage | dispense-medication | Pharmacy Dispense | PET-TST-020 |
| PET-REQ-012 | Membership and loyalty | PET-FTR-019, PET-FTR-020 | member registration, reward issuance | CRM & Loyalty | memberships, loyalty_points, loyalty_events | membership-create, point-redemption | Member Portal | PET-TST-021 |
| PET-REQ-013 | Promotion and campaign | PET-FTR-021 | discount application, campaign validation | Promotion | promotions, promo_rules | promo-apply | Promotion Setup | PET-TST-022 |
| PET-REQ-014 | Staff, attendance, commission, payroll | PET-FTR-022, PET-FTR-023, PET-FTR-024, PET-FTR-025 | attendance, commission, payslip | HR & Payroll | employees, attendance, commissions, payroll_records | attendance-clockin, payroll-generate | HR Dashboard | PET-TST-023 |
| PET-REQ-015 | Finance, accounting, and cash | PET-FTR-026, PET-FTR-027 | cash movement, journal, closing | Finance | journal_entries, cash_flows, accounts | cash-post, journal-close | Finance Ledger | PET-TST-024 |
| PET-REQ-016 | Reporting and analytics | PET-FTR-029 | dashboard and export | Reporting | dashboard_metrics, report_requests | report-generate | Analytics Dashboard | PET-TST-025 |
| PET-REQ-017 | Notifications and customer portal | PET-FTR-030, PET-FTR-031 | reminder delivery, portal access | Communication | notifications, customer_portal_access | send-notification, portal-login | Customer Portal | PET-TST-026 |
| PET-REQ-018 | Security, audit, and compliance | PET-FTR-032, PET-FTR-033 | settings, integrations, audit log | Governance & Security | audit_logs, system_settings, external_tokens | settings-save, audit-export | System Settings | PET-TST-027 |

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

