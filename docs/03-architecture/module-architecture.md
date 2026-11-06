---
title: Module Architecture
document_id: PET-DOC-0306
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['component-diagram.md']
---

# Module Architecture

Architecture modular monolith memetakan Feature IDs ke domain owner; detail lengkap berada di [feature-to-module mapping](../13-traceability/feature-to-module-mapping.md). Domain ownership mengurangi coupling dan memastikan transaksi lintas domain memakai command/contract teruji.

## Core Modules

Organization/Access; Customer/Pet; Catalog/Pricing; Inventory; Sales/Payment; Procurement; Booking/Services; Boarding; Field Services; Clinical/Medical Records; Pharmacy; Membership/Loyalty/Promotion; HR/Payroll; Finance/Accounting/Consignment; Reporting/Notifications/Portal; Settings/Integrations. Semuanya merupakan core scope README section 4.

## Shared Domain

Organization identity, authorization contract, branch context, audit, event/correlation IDs, common value types, and file access primitives. Shared utilities tidak memiliki kewenangan bisnis domain dan harus menghindari cyclic import. Document Management adalah recommended extension, bukan shared core service yang dianggap telah disetujui.

## Dependencies

Semua domain mendapatkan actor/tenant context dari backend authorization boundary. Sales membaca catalog/promo dan meminta inventory/payment commands; clinical menghubungkan pet/booking/medical/pharmacy; payroll/finance menerima snapshot source events; reporting membaca authorized projections. Mutasi milik domain lain hanya melalui documented service/DB transaction contract, bukan direct UI write.

## Dependency Rules

- Avoid circular domain dependency; create small shared contract or one-way event when needed.
- Shared identifiers/context are not shared authorization: each module checks its own action/scope.
- Cross-domain posting uses stable reference/idempotency and compensating record for correction.
- Recommended extensions stay outside core dependency graph until approved.

## Related Documents

- [Feature-to-module mapping](../13-traceability/feature-to-module-mapping.md)
- [Data flow](data-flow-diagram.md)
- [Architecture overview](architecture-overview.md)

