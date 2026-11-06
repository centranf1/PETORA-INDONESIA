---
title: Business Overview
document_id: PET-DOC-0201
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['business-processes.md', 'permission-matrix.md']
---

# Business Overview

Analisis bisnis menetapkan proses inti, peran, kebijakan, dan mekanisme penanganan pengecualian PETORA.

## Business Model

PETORA mendukung satu organization yang dapat menjalankan retail petshop dan beberapa service line: grooming, boarding/daycare, transport, klinik, farmasi, serta fungsi back office. Semua service line memakai hubungan customer-pet, tetapi setiap layanan tetap memiliki workflow, owner data, otorisasi, state, dan perhitungan transaksi sendiri.

## Customer Segments

Consumer pet owners, business owners, branch managers, pet care staff, veterinarians, suppliers, and employees.

## Value Streams

| Value stream | Trigger to outcome | Primary controls |
| --- | --- | --- |
| Acquire and serve customer | Registrasi/booking → service or sale → follow-up | Owner verification, consent, branch/capacity, communication preference |
| Retail commerce | Cart → price/promo validation → payment → stock/receipt | Idempotency, price snapshot, stock ledger, payment reconciliation |
| Procurement | Request → approval → PO → receiving → invoice/payment | Separation of duties, quantity/price match, supplier audit |
| Pet care | Check-in → assessment → treatment/service → handover | Condition/consent, assigned staff, clinical authority, history |
| Workforce | Shift/attendance → commission/payroll → payment | Employee scope, correction approval, calculation provenance |
| Financial control | Source event → cash/bank reconciliation → journal → close | Balanced posting, evidence, period lock and correction trail |
| Multi-branch oversight | Branch events → scoped aggregation → owner action | Tenant isolation, access scope, data freshness and audit |

## Business Drivers

Operational efficiency, improved customer experience, better stock control, financial accuracy, and multi-branch governance.

## Key Risks

Double transaction, stock mismatch, unauthorized medical access, branch leakage, and business process inconsistency.

## Operating Actors and Handoffs

Customer initiates demand; customer service or portal creates booking; domain staff deliver service; cashier/finance collect and reconcile payment; inventory/pharmacy records stock consumption; veterinarian owns clinical decisions; manager/owner approves exceptions; reporting aggregates committed source records. Handoffs must carry stable transaction/booking/visit IDs and the responsible actor.

## Business Invariants

- One organization owns its branches; a record's tenant cannot be changed by client input.
- A paid transaction is corrected by refund/return/adjustment, not overwritten.
- Stock balance is supported by ledger events; booking capacity cannot be over-allocated.
- Final clinical records and posted journals preserve revisions/reversals.
- Approval and audit are tied to the exact object version, reason, scope, and actor.

## Unresolved Business Parameters

Tax, discount stacking, cancellation/refund limits, loyalty expiry, commission/payroll formula, medical visibility/consent, legal retention, payment methods, and provider selection remain in the open decision register; examples are not default policy.

## Related Documents

- [Business Processes](business-processes.md)
- [Business Rules](business-rules.md)
- [Permission Matrix](permission-matrix.md)
- [Open Decisions](../13-traceability/open-decisions.md)

