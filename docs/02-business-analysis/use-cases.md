---
title: Use Cases
document_id: PET-DOC-0206
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['business-processes.md']
---

# Use Cases

Kasus penggunaan utama PETORA dibuat untuk menghubungkan kebutuhan user dengan fungsi sistem.

Use case description uses authenticated actor, organization/branch scope, business rule, and failure outcomes. Exact phone normalization and duplicate resolution must be defined in customer domain schema.

## UC-01 Register Customer

- **Primary actor:** Customer Service or customer portal user.
- **Preconditions:** Active account/organization; actor can create a customer in scope; contact data meets validation rules.
- **Trigger:** New customer requests service or self-registers.
- **Main flow:** Enter contact and consent → normalize/validate contact → search possible duplicate within organization → create customer and audit event → return stable customer ID.
- **Alternatives:** Existing customer is linked/selected after identity verification; optional fields are omitted.
- **Failure:** Duplicate conflict, invalid contact, inactive organization, permission denial, or timeout; no duplicate record is created on retry.
- **Postcondition:** Customer exists with source, consent state, created actor, and organization scope.
- **Acceptance/test:** PET-REQ-003; duplicate and cross-organization tests.

## UC-02 Register Pet

- **Primary actor:** Customer or authorized Customer Service.
- **Preconditions:** Customer is verified and has permission to register a pet in the organization.
- **Trigger:** Customer provides pet identity/care information.
- **Main flow:** Enter species/name and optional identifiers → validate required fields → associate owner relation → mark primary owner under permission → save profile and audit owner changes.
- **Alternatives:** Additional co-owner is invited/linked through an approved relationship workflow.
- **Failure:** Customer is out of scope, conflicting identifier/ownership, invalid attachment, or denied access; record is not silently assigned to another customer.
- **Postcondition:** Pet and owner relationship are linked; clinical notes are not created as a substitute for veterinarian-authored record.
- **Acceptance/test:** PET-REQ-003; owner access and transfer tests.

## UC-03 Create Sale

- **Primary actor:** Cashier.
- **Preconditions:** Authenticated cashier, active branch/shift, items and price rules active, stock/service capacity valid.
- **Trigger:** Customer agrees to purchase.
- **Main flow:** Build cart → resolve customer/pet if needed → server recalculates price/promo/tax → reserve/validate stock → create idempotent payment attempt → verify tender/provider result → commit sale/ledger/loyalty/journal according to approved transaction boundary → issue receipt.
- **Alternatives:** Split tender, permitted partial payment, voucher or loyalty redemption according to policy.
- **Failure:** Invalid price, stock race, payment decline/timeout, duplicate request; no success receipt until committed/confirmed, and retry uses same idempotency key.
- **Postcondition:** Sale, payment status, stock movement, and accounting source can be reconciled by stable reference.
- **Acceptance/test:** PET-REQ-006; PET-TST-001, PET-TST-023.

## UC-04 Process Refund

- **Primary actor:** Cashier initiates; authorized supervisor/finance approves where policy requires.
- **Preconditions:** Original sale is found in same organization; refundable amount/items and provider settlement state are known.
- **Trigger:** Customer requests refund/return/correction.
- **Main flow:** Select original items/amount → record reason/evidence → validate timeframe and permission → approve if required → issue idempotent provider/cash refund → after final result create linked stock/loyalty/journal corrections → notify customer.
- **Alternatives:** Exchange or partial refund only when approved policy supports it.
- **Failure:** Amount exceeds refundable balance, provider pending/failure, item not returnable, or permission denied; original transaction remains unchanged and request remains traceable.
- **Postcondition:** Original sale is preserved; refund and all reversals reference it.
- **Acceptance/test:** PET-REQ-006; PET-TST-002.

## UC-05 Receive Stock

- **Primary actor:** Inventory Staff; Purchasing/Finance reconcile documents.
- **Preconditions:** Approved PO, authorized receiving location, supplier and item identities valid.
- **Trigger:** Goods arrive at warehouse/branch.
- **Main flow:** Select PO lines → count/inspect items and batch/expiry → record accepted/rejected/short quantities → commit receiving and stock ledger → match invoice and payable against PO and receipt.
- **Alternatives:** Partial receipt leaves remaining quantity open; damaged/expired goods enter quarantine/return workflow.
- **Failure:** Wrong supplier/item, duplicate invoice, over-receipt, or scope mismatch; no stock/AP posting without valid receipt.
- **Postcondition:** Each received quantity has location, batch when relevant, operator, timestamp, and PO reference.
- **Acceptance/test:** PET-REQ-007; PET-TST-011.

## UC-06 Veterinary Consultation

- **Primary actor:** Veterinarian; support staff may prepare visit context.
- **Preconditions:** Patient/pet and owner relationship verified; clinician has assigned branch/visit permission.
- **Trigger:** Patient is checked in or follow-up begins.
- **Main flow:** Triage → capture complaint/vitals/exam → record diagnosis/treatment → obtain consent where required → finalize signed medical record → create prescription → pharmacy validates/dispenses → charge/payment links to visit.
- **Alternatives:** Emergency, referral, lab, or hospitalization follows dedicated approved workflow.
- **Failure:** Wrong patient, clinician unauthorized, allergy/prescription conflict, missing consent, or stock unavailable; no unauthorized prescription or silent record overwrite.
- **Postcondition:** Final record is versioned/attributed and owner visibility follows clinical/data policy.
- **Acceptance/test:** PET-REQ-009; PET-TST-004, PET-TST-014.

## UC-07 Staff Payroll

- **Primary actor:** HR prepares; authorized reviewer/Finance approves and pays.
- **Preconditions:** Payroll period open, employee roster/attendance/commission inputs reviewed, formulas and statutory rules approved.
- **Trigger:** Payroll period close.
- **Main flow:** Freeze period inputs → calculate itemized amounts → reconcile exceptions → review/approve → create payment instructions and accounting entries → publish restricted payslips.
- **Failure:** Missing attendance, changed formula, unapproved adjustment, unbalanced posting, or unauthorized export; period is not finalized.
- **Postcondition:** Calculation inputs and rule snapshot are auditable; corrections use an adjustment cycle, not overwrite.
- **Acceptance/test:** PET-REQ-012; PET-TST-017.

## UC-08 Customer Portal

- **Primary actor:** Authenticated customer.
- **Preconditions:** Active identity linked to verified customer and pet relationship.
- **Trigger:** Customer opens profile, booking, transaction, reward, or permitted medical summary.
- **Main flow:** Authenticate → resolve own customer scope → fetch only allowed records → submit a booking/change request → display authoritative status and reference.
- **Failure:** Expired session, owner mismatch, consent restriction, or unavailable service; return safe denial and no other customer's data.
- **Postcondition:** Reads are scoped and sensitive access is auditable; changes requiring staff approval remain pending until acted on.
- **Acceptance/test:** PET-REQ-015 and PET-REQ-018; PET-TST-019, PET-TST-020.

## Related Documents

- [Business Processes](business-processes.md)
- [Permission Matrix](permission-matrix.md)
- [Acceptance Criteria](../01-product/acceptance-criteria.md)
- [Test Scenarios](../09-testing/test-scenarios.md)

