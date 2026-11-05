# 21 — Requirement Traceability Matrix (RTM)

Matriks ini adalah baseline keterlacakan rancangan. Endpoint dan halaman adalah usulan; test ID menunjuk kasus di [test plan](../05-QA/16-TEST-PLAN-TEST-CASE.md). `TBD` menunjukkan keputusan belum ada atau belum dapat diverifikasi dari implementasi.

| Business / SRS requirement | FRD feature | Entitas inti | API usulan | UI/page | Test case |
|---|---|---|---|---|---|
| BR-ACCESS / SYS-FR-001–004: login, protected roles, backend RBAC dan scope | FRD-AUTH-001, FRD-RBAC-001 | users, roles, permissions, role_permissions, user_roles, user_branch_access, audit_logs | `POST /auth/login`, `/roles`, `/roles/{id}/permissions` | Login, Users, Roles, Permission Matrix | TC-AUTH-001, TC-RBAC-001, TC-RBAC-002 |
| BR-BRANCH / SYS-FR-005: operasi cabang dan laporan | FRD-BRANCH-001, FRD-DASH-001 | branches, branch_settings, warehouses, employees | `/branches`, `/reports/dashboard` | Branch list/detail/settings, Dashboard | TC-BRANCH-001, TC-SCOPE-001 |
| BR-CUSTOMER / SYS-FR-006–007,029 | FRD-CUST-001, FRD-PET-001 | customers, customer_addresses, pets, pet_owners, consents | `/customers`, `/pets` | Customer profile, Pet profile, Portal | TC-CUSTOMER-001, TC-PET-001, TC-PRIVACY-001 |
| BR-RETAIL / SYS-FR-008–012 | FRD-CAT-001, FRD-POS-001 | products, variants, prices, orders, order_items, payments, allocations, cash_sessions | `/products`, `/orders`, `/orders/{id}/payments`, `/cash-sessions` | Catalog, POS, Order detail, Cash close | TC-POS-001, TC-PAY-001, TC-REFUND-001 |
| BR-INVENTORY / SYS-FR-013–014 | FRD-STOCK-001 | warehouses, stock_batches, stock_movements, stock_transfers, stock_adjustments | `/inventory/movements`, `/stock-transfers` | Stock card, Adjustment, Transfer | TC-STOCK-001, TC-TRANSFER-001 |
| BR-PROCUREMENT / SYS-FR-015,027 | FRD-PO-001, FRD-CONSIGN-001 | suppliers, purchase_orders, goods_receipts, invoices, payables, consignments, settlements | `/purchase-orders`, `/goods-receipts`, `/consignments` | Purchasing, Receiving, Settlement | TC-PO-001, TC-PO-002, TC-CONSIGN-001 |
| BR-SERVICE / SYS-FR-016–019 | FRD-BOOK-001, FRD-GROOM-001, FRD-HOTEL-001, FRD-TRANSPORT-001 | bookings, services, assignments, rooms, stays, care_logs, trips | `/availability`, `/bookings`, `/grooming/sessions`, `/hotel/stays`, `/transport/trips` | Booking calendar, Grooming work order, Hotel board, Dispatch | TC-BOOK-001, TC-CAPACITY-001, TC-GROOM-001 |
| BR-VET / SYS-FR-020–022 | FRD-VET-001 | appointments, medical_visits, diagnoses, prescriptions, batches, dispensings, consents | `/veterinary/appointments`, `/medical-visits`, `/prescriptions` | Clinical queue, Encounter, Prescription, Pharmacy | TC-MEDICAL-001, TC-MEDICAL-ACCESS-001, TC-PHARMACY-001 |
| BR-LOYALTY / SYS-FR-023 | FRD-LOYALTY-001 | membership_plans, memberships, loyalty_accounts, loyalty_transactions, promotions | `/memberships`, `/loyalty/transactions`, `/promotions` | Membership, Rewards, Promotions | TC-PROMO-001 |
| BR-HR / SYS-FR-024 | FRD-HR-001 | employees, work_schedules, attendance, leave_requests, commission_rules, commission_transactions | `/employees`, `/attendance`, `/commissions` | Staff, Schedule, Attendance, Commission | TC-HR-001 |
| BR-FIN / SYS-FR-025–026 | FRD-FIN-001 | cash_accounts, expenses, receivables, payables, chart_of_accounts, journal_entries, lines | `/finance/expenses`, `/journal-entries`, `/reports/financial` | Finance, Accounting, Reconciliation | TC-FIN-001, TC-ACCOUNTING-001 |
| BR-REPORT / SYS-FR-028 | FRD-REPORT-001 | domain transaction tables and report views | `/reports/{domain}` | Reports / Analytics | TC-REPORT-001, TC-SCOPE-001 |
| BR-NOTIFY / SYS-FR-030 | FRD-NOTIFY-001 | notifications, templates, delivery_attempts | `/notifications` | Notification center | TC-NOTIFY-001 |
| BR-INTEGRATION / SYS-FR-031 | FRD-INT-001 | integration_providers, configurations, logs | `/integrations`, `/integrations/{id}/test` | Super Admin > Integrations | TC-INTEGRATION-001, TC-INTEGRATION-002 |
| BR-CONTROL / SYS-FR-032–035 | FRD-SYS-001 | settings, audit_logs, attachments, import_jobs, export_jobs | `/settings`, `/audit-logs`, `/files` | Settings, Audit, Upload/import | TC-AUDIT-001, TC-FILE-001 |

## Coverage rules

1. Setiap requirement wajib memiliki minimal satu FRD feature dan acceptance test.
2. Setiap endpoint dan UI page yang dibuat saat implementasi harus mendapat ID dan dipetakan kembali ke requirement.
3. Database entities dalam matriks adalah rancangan. Nama/relasi final mengikuti [database design](../02-ARCHITECTURE/06-DATABASE-DESIGN.md).
4. Tidak boleh menandai requirement implemented/pass tanpa build dan bukti test aktual.
5. Traceability belum memecah tiap field-level requirement menjadi test individual; lakukan saat backlog/refinement dan setelah kebijakan TBD diputuskan.
