---
title: Transaction Integrity
document_id: PET-DOC-0408
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-migration-guide.md']
---

# Transaction Integrity

Dokumen ini fokus pada atomisitas transaksi kritis.

## Critical Workflow Boundaries

| Workflow | Authoritative local commit | External/asynchronous boundary |
| --- | --- | --- |
| Checkout | Sale items, confirmed payment state, stock ledger, loyalty event, accounting source per approved policy | Provider payment attempt/callback and receipt delivery |
| Refund | Linked refund state, stock return when accepted, loyalty reversal, journal correction | Provider refund request/confirmation |
| Receiving | PO receipt lines, stock ledger/batch, matched payable source | Supplier invoice exchange/notification |
| Booking | Capacity reservation and booking state under concurrency control | Reminder delivery |
| Prescription dispense | Prescription validation, dispense record, medicine stock ledger | External pharmacy/notification integration if selected |
| Payroll/accounting | Approved payroll snapshot/payment source and balanced journal | Bank transfer provider settlement |

Exact write set per workflow must be defined by owning module/API contract before implementation.

## Atomic Rules

Writes within one PostgreSQL business transaction must commit or roll back together. External calls cannot be part of a PostgreSQL atomic transaction; model them as persisted attempts with state machine, idempotency key, callback verification, retry, and reconciliation/compensation. Do not hold database locks while waiting for a provider response.

## Invariants

- Stock ledger delta and any materialized balance update are atomic; ledger is the source of truth.
- One idempotency key maps to one logical command and one stable outcome within its defined organization/actor/action scope.
- Payment amount/currency and provider reference match the sale before marking payment confirmed.
- Journal lines balance before posting; posted entries are corrected by reversal/adjustment.
- Booking capacity is reserved using a database constraint/locking strategy so concurrent requests cannot overbook.
- Approval applies only to the exact proposal version and scope reviewed.

## Failure Handling

If the database transaction fails, no partial local side effects remain; return a safe error and correlation ID. If an external action has already succeeded but local finalization fails, retain the attempt and reconcile/compensate; do not erase provider evidence or report false failure/success. Audit failure/denial without logging sensitive payload.

## Recommendation

Use PostgreSQL transactions/functions or server-side Edge Functions for multi-table writes, selected per workflow and security review. Prefer unique constraints, conditional updates, transaction isolation/locking, and outbox records over client-side read-then-write checks. Define isolation level and deadlock/retry behavior where contention exists.

## Required Tests

Test duplicate request, concurrent mutation, rollback at each write boundary, provider timeout after success, duplicate/out-of-order webhook, stale approval version, and recovery/reconciliation queue. Verify both persisted state and absence of duplicate side effects.

## Related Documents

- [Business Processes](../02-business-analysis/business-processes.md)
- [API Specification](../05-backend/api-specification.md)
- [Test Strategy](../09-testing/test-strategy.md)
- [Backup and Recovery](../10-devops/backup-recovery.md)

