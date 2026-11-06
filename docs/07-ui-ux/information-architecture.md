---
title: Information Architecture
document_id: PET-DOC-0703
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['navigation-structure.md']
---

# Information Architecture

Arsitektur informasi mengorganisir data dan navigasi module.

## Navigation Structure

| Navigation group | Main destinations | Typical task |
| --- | --- | --- |
| Overview | Branch/organization dashboard, alerts | Review status and exceptions |
| Customers & Pets | Customer search, pet profile, histories | Register, verify owner, review permitted service history |
| Commerce | POS, sales, refund requests, products, promotions | Sell, reconcile, manage catalog |
| Inventory & Purchasing | Stock, receiving, transfer, counts, suppliers/PO | Control goods and procurement |
| Services | Booking, grooming, boarding, transport | Schedule, deliver, hand over care |
| Clinical & Pharmacy | Queue, visit, records, prescription, dispense | Document care and medication |
| Workforce & Finance | Employee, attendance, payroll, cash, accounting | Close periods and reconcile |
| Reporting | Operational/financial reports and exports | Review permitted metrics |
| Administration | Users/roles, settings, integrations, audit | Govern access and configuration |
| Customer Portal | Profile, pets, bookings, permitted records | Self-service |

Navigation visibility follows permissions for usability. Direct route/API access is independently authorized.

## Page Pattern

Each domain uses the smallest relevant page pattern: queue/board for active work, list/search for collection, detail/timeline for a record, and create/edit only when the lifecycle permits it. Transactions and final medical/accounting records use commands/revision flows rather than generic edit forms. Detail pages expose related records only after each relation's scope is checked.

## Search and Filter

Use server-side search/filter for large datasets. Filters include organization/branch where relevant, date range, status, owner/assignee and domain-specific facets. Display active filters and result count only within authorized scope. Search must not reveal hidden record existence through autocomplete or count.

## Related Documents

- [Navigation Structure](navigation-structure.md)
- [Page Specifications](page-specifications.md)
- [Permission Matrix](../02-business-analysis/permission-matrix.md)

