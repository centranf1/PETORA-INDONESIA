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

IA menyusun workspace berdasarkan pekerjaan pengguna dan hubungan record, bukan sekadar daftar tabel. Screen dan result list selalu menunjukkan organization/branch context yang aktif serta record relationship penting.

## Navigation Structure

1. Workspace: Dashboard, Organization/Branch, Users/Roles.
2. Customers & Pets: customer registry, pet profile, ownership and history.
3. Commerce: Catalog/Pricing, POS/Sales, Membership/Loyalty, Promotions.
4. Operations: Inventory/Warehouse, Purchasing/Suppliers, Bookings, Grooming, Boarding/Daycare, Transport, Home Grooming.
5. Clinical: Queue/Visits, Medical Records, Pharmacy/Dispensing.
6. Workforce: Staff, Attendance, Commission, Payroll.
7. Finance: Cash, Payables/Receivables, Accounting, Consignment.
8. Insights & Communication: Reports, Notifications, Customer Portal.
9. Governance: System Settings, Integrations, Audit.

Recommended extensions CRM, Complaints, Pet Care Monitoring, Laboratory, Surgery/Hospitalization, Asset, SOP, Documents, Shipping, Budget, Tax, Backup/DR, and E-commerce remain hidden from core navigation until approved/implemented.

## Page Pattern

List/detail/create/edit patterns are used only where appropriate. Transaction detail pages emphasize state timeline, linked source documents, actor/time, branch, totals, and allowed corrective action. Medical detail emphasizes clinical timeline and visibility. Read-only/report pages show freshness and filter scope. Role-aware UI does not replace server authorization.

## Search and Filter

Large data sets use server search, date/branch/status facets, pagination, sort, clear-filter, and accessible filter summary. Preserve filter context when opening/returning to a detail where safe; never persist sensitive query content in public URLs. Report filters must display timezone, date range, and scope semantics.

## Related Documents

- [Navigation structure](navigation-structure.md)
- [Page specifications](page-specifications.md)
- [Feature catalog](../01-product/feature-catalog.md)

