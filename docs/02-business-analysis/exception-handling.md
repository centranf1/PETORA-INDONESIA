---
title: Exception Handling
document_id: PET-DOC-0207
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['business-rules.md']
---

# Exception Handling

Dokumen ini merinci skenario gagal dan prosedur penanganan pengecualian.

## Exception Handling Contract

Setiap exception harus memiliki stable error code, state outcome, user-safe message, retryability, audit/correlation identity, dan escalation owner. Jangan hanya tampilkan toast lalu membiarkan client menebak apakah transaksi telah commit.

| Exception | Detection and state | System behavior | User/operations action |
| --- | --- | --- | --- |
| Database/network loss | Request timeout; commit outcome may be unknown | Return trace ID; client queries/retries with same idempotency key; reconcile unknown state | Do not create a new transaction key until outcome is known |
| Payment provider timeout | Payment attempt remains pending | Verify callback/poll provider; do not mark paid or refund optimistically | Finance reviews reconciliation queue; customer receives pending status |
| Duplicate checkout/replay | Existing idempotency key | Return prior outcome; do not repeat stock, loyalty, or journal effects | Cashier checks original receipt/reference |
| Insufficient/concurrent stock | Ledger/reservation check fails at commit | Reject or adjust cart; never allow stale client balance to win | Inventory reviews discrepancy and performs approved adjustment if needed |
| Booking capacity conflict | Atomic capacity reservation finds no slot | Return conflict with available alternatives; create no duplicate booking | Staff/customer selects another slot or waitlist if enabled |
| Branch/role mismatch | Server authorization/RLS denies | Fail closed with safe denial; record minimal security event | User requests correct assignment; admin reviews suspicious attempts |
| Expired or invalid medicine | Batch/expiry or prescription validation fails | Block dispense; preserve prescription and stock state | Pharmacist contacts veterinarian or selects valid batch |
| Medical consent/urgent case | Required consent absent or emergency flag raised | Follow approved emergency workflow; do not infer consent from silence | Escalate to veterinarian/owner contact and record decision |
| Journal imbalance/closed period | Validation fails before post | Roll back posting; retain source transaction and diagnostic ID | Accounting investigates mapping or uses approved adjustment workflow |
| Settings version conflict | expected version differs from active version | Reject stale proposal; no last-write-wins | Reload diff, merge intentionally, resubmit for approval |
| Storage/provider failure | Upload/delivery not confirmed | Preserve retryable state; avoid duplicate side effect | Retry within policy or use documented manual fallback |

## Operational Policies

Void/refund require reason, actor identity, state validation, approval when required, and full audit. Failed stock adjustment leaves the original balance unchanged and the request pending/failed; only an authorized adjustment command can proceed. Checkout retry must reuse the same idempotency key for the same logical attempt.

## Medical Exceptions

Emergency treatment and surgery follow a clinically approved consent/escalation procedure. System behavior must record who made the clinical decision, contact attempts, consent status, timestamp, and resulting treatment; legal requirements and exact emergency policy require veterinary/legal owner approval.

## Customer Exceptions

Customer complaint/dispute must receive a reference ID, category, owner, status, evidence, and follow-up due date. CRM/ticket feature and SLA are not approved implementation scope yet; until then the operational fallback must be documented by the business owner and must not imply a ticketing system exists.

## Recommendation

System messages must explain whether the action completed, failed, or is pending, show a safe reference ID, and give the next action. Never disclose SQL, provider secrets, protected record existence, or security policy internals.

## Related Documents

- [Business Processes](business-processes.md)
- [API Error Handling](../05-backend/error-handling.md)
- [Test Scenarios](../09-testing/test-scenarios.md)
- [Incident Response](../11-operations/incident-response.md)

