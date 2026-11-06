---
title: Test Scenarios
document_id: PET-DOC-0908
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-plan.md']
---

# Test Scenarios

Dokumen ini mencatat scenario testing penting dengan ID dan prioritas.

## PET-TST-001

Checkout with valid stock and payment. Preconditions: user has cashier role and inventory available. Expected: sale created, payment accepted, stock reduced, receipt generated.

## PET-TST-002

Refund flow by authorized manager. Expected: refund recorded, stock reversal if applicable, and loyalty points adjusted.

## PET-TST-003

Branch isolation. Expected: same user cannot access another branch data without grant.

## PET-TST-004

Prescription validation. Expected: no controlled medicine release without doctor authorization.

## PET-TST-005

Accounting balance. Expected: journal total debits equal credits and close period fails if not balanced.

## Additional Traceable Scenarios

| Test ID | Requirement | Scenario and setup | Expected result |
| --- | --- | --- | --- |
| PET-TST-006 | PET-REQ-001 | Attempt a new transaction in an inactive branch while retaining historical report access for an authorized user. | New transaction is rejected; permitted historical data remains readable and auditable. |
| PET-TST-007 | PET-REQ-002 | Revoke a user's role/branch assignment, then call a protected API with the existing session. | The next authorized operation is denied according to session/claim refresh rules; no protected data is returned. |
| PET-TST-008 | PET-REQ-003 | Customer A attempts to access or change ownership of a pet owned by Customer B. | Access/change is denied unless an authorized ownership transfer is completed and audited. |
| PET-TST-009 | PET-REQ-004 | Change product price with and without approval, then inspect an already-created sale. | Unauthorized price change is rejected; sale retains the price snapshot used at checkout. |
| PET-TST-010 | PET-REQ-005 | Receive a batch and run concurrent stock movements against the same location. | Ledger, batch quantities, and resulting balance reconcile; invalid/oversold movement is rejected. |
| PET-TST-011 | PET-REQ-007 | Receive only part of an approved purchase order and reconcile the supplier invoice. | Received quantity and payable reflect matched documents; remaining quantity stays open. |
| PET-TST-012 | PET-REQ-008 | Complete grooming check-in, service, condition notes, and handover for a valid booking. | Status history, staff assignment, notes, and completion event are retained. |
| PET-TST-013 | PET-REQ-008 | Check in/out a hotel stay with required monitoring and care records. | Capacity and stay dates remain valid; missing mandatory care records block completion or raise the defined exception. |
| PET-TST-014 | PET-REQ-009 | Finalize a medical record, then submit a correction and dispense a prescribed medicine. | Final record is not overwritten; correction is versioned/audited and dispensing checks valid prescription and stock. |
| PET-TST-015 | PET-REQ-010 | Earn and redeem loyalty points, then refund the originating sale. | Events reconcile; refund reverses/adjusts points once without duplicating balance changes on retry. |
| PET-TST-016 | PET-REQ-011 | Apply a promotion outside its period/branch/eligibility and test a permitted stacking case. | Ineligible promotion is rejected; permitted discount calculation and applied rule snapshot are recorded. |
| PET-TST-017 | PET-REQ-012 | Generate payroll from attendance and commission inputs, then access it as an unauthorized role. | Payroll components trace to source records; unauthorized role receives no sensitive payroll data. |
| PET-TST-018 | PET-REQ-014 | Request and export a report as a branch-scoped user, including a request for another branch. | Export includes only authorized scope; denied export is not delivered and is auditable. |
| PET-TST-019 | PET-REQ-015 | Retry notification delivery and request a customer portal record belonging to another owner. | Retry does not duplicate the business effect; unrelated owner/pet data is denied. |
| PET-TST-020 | PET-REQ-018 | Call protected endpoints without authentication or with a forged organization/branch identifier. | Request is denied by server/RLS; no data is disclosed and security event is logged where required. |
| PET-TST-021 | PET-REQ-017 | Configure an integration and submit invalid webhook signature or replayed event. | Secret is never returned to client/log; invalid signature is rejected and replay is idempotently handled. |
| PET-TST-022 | PET-REQ-002, PET-REQ-018 | Attempt an action outside the authenticated user's role and data scope via direct API, bypassing UI controls. | Server authorization denies the action and returns a safe error response. |
| PET-TST-023 | PET-REQ-006 | Submit checkout/payment twice with the same idempotency key and retry after a simulated timeout. | Exactly one sale/payment/stock effect is committed; retry returns the original outcome. |
| PET-TST-024 | PET-REQ-008 | Submit concurrent booking requests for the last available service slot or room. | Capacity is reserved at most once; losing request receives a conflict and no duplicate reservation. |
| PET-TST-025 | PET-REQ-013 | Post a source transaction to accounting and attempt an unbalanced or closed-period journal. | Valid event produces balanced journal; invalid posting is rejected without partial finance state. |

Settings-specific workflow cases are defined in [test plan](test-plan.md); adversarial configuration cases are defined in [security testing](security-testing.md).

