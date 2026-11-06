---
title: Business Logic Specification
document_id: PET-DOC-0502
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['backend-architecture.md']
---

# Business Logic Specification

Dokumen ini menandai aturan business kritis di layer backend.

## Sales and Payment Logic

Server menerima item identifiers/quantities, customer/pet reference bila diperlukan, tender request, dan idempotency key. Server tidak mempercayai unit price/discount/tax total yang dihitung browser; ia memuat aturan aktif, memvalidasi eligibility, dan menyimpan snapshot harga/promo pada sale item.

| Object | Proposed states | Allowed transitions / invariant |
| --- | --- | --- |
| Sale | draft -> pending_payment -> completed; draft/pending_payment -> cancelled; completed -> partially_refunded/refunded via linked records | Completed sale is immutable; only valid payment state permits completion |
| Payment attempt | created -> pending -> succeeded/failed/expired/unknown | A timeout is `unknown/pending`, never success; same idempotency key returns same outcome |
| Refund attempt | requested -> pending_approval -> submitted -> succeeded/failed/unknown | Refund amount cannot exceed remaining refundable amount; provider confirmation reconciled |

Stock reservation/deduction, sale, payment confirmation, loyalty event and journal source must commit in a documented database boundary. Provider calls occur outside that transaction with durable attempt/outbox and idempotent reconciliation. Loyalty accrues only on completed eligible sales and reversals reference the original event.

## Inventory Logic

Stock is derived from ledger entries by organization, location, product, and optional batch. Receiving, transfer, sale, return, dispense, write-off, and adjustment are typed movements with source reference, actor, reason, quantity unit and effective timestamp. Corrections append compensating movements; no endpoint sets a balance directly.

Negative stock is denied unless an approved setting key allows it for the applicable scope and action. Even where allowed, authorization, reason, audit, and reconciliation remain mandatory. Concurrent mutations use atomic conditional writes/locks or reservations; browser checks alone do not guarantee availability.

## Clinical Logic

Clinical command validates assigned veterinarian, pet/owner relation, encounter state, allergies and consent requirements. Finalization stores author, timestamp and immutable content snapshot; corrections create a linked revision with reason. A prescription must reference an authorized finalized encounter and prescriber. Pharmacy validates prescription state, patient, dose/quantity, expiry/batch, allergy warnings and dispense permission; actual dispense and stock ledger commit together. Clinical decision logic remains the veterinarian's responsibility.

## Finance Logic

Every cash/bank movement references source document, currency, amount, account, actor, evidence and branch/organization scope. Journal posting verifies debit equals credit, period is open, and source has not already posted. Posted entries are corrected through reversal/adjustment, never overwritten. Reconciliation differences remain explicit exceptions until reviewed.

## Booking and Capacity Logic

Booking validation checks active service, branch hours, staff/resource availability, required pet/customer data and capacity. Reserve capacity atomically using a unique/exclusion/locking strategy selected during schema design. State transitions include requested/pending confirmation, confirmed, checked-in, in-service/completed, cancelled, and no-show only as applicable. Cancellation fees, deposits and waitlist policy remain configurable decisions, not hardcoded assumptions.

## System Settings Logic

Only registered keys and server-owned schemas may change. Server derives type, limits, scope and approval requirement from the setting catalog; it validates `expected_version_no`, lock and role, stores a proposal, and applies active value + version + audit transactionally after approval where required. Pending proposals never affect runtime.

## Contract for Domain Commands

Each command defines actor/scope, request schema, preconditions, state transition, local write set, idempotency behavior, audit event, external side effect, retry/reconciliation path, stable error codes, and acceptance tests. SQL functions/Edge Functions are implementation choices per transaction and security review, not a blanket rule for all logic.

## Related Documents

- [Business Rules](../02-business-analysis/business-rules.md)
- [Transaction Integrity](../04-database/transaction-integrity.md)
- [API Specification](api-specification.md)
- [Test Scenarios](../09-testing/test-scenarios.md)

