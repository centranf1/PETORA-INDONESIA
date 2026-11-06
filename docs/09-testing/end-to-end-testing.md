---
title: End-to-End Testing
document_id: PET-DOC-0905
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['integration-testing.md']
---

# End-to-End Testing

E2E test menguji complete user journey dari frontend melalui backend.

## Journey Examples

| Journey | Roles and key assertions |
| --- | --- |
| Customer service | Customer Service registers customer/pet -> creates booking -> checks in -> records service/consent -> cashier collects payment -> customer receives permitted status |
| POS retry | Cashier creates sale -> simulated timeout -> retry same idempotency key -> exactly one sale/payment/stock effect |
| Procurement | Purchasing drafts PO -> approver approves -> Inventory receives partial batch -> Finance matches invoice -> stock/payable reconcile |
| Clinical | Staff checks in pet -> assigned vet documents/finalizes visit -> authorized prescription -> Pharmacist dispenses -> owner sees only permitted summary |
| Settings governance | Super Admin proposes config -> Owner reviews diff/scope/reason -> approve/reject -> runtime reads active version only |
| Unauthorized access | User from branch/org A attempts another scope via direct route/API/storage -> deny without data leak |

## Automation

Use browser automation for UI journey/state/accessibility checks and pair it with API/database assertions; E2E should not replace focused RLS, transaction or domain tests. Use isolated synthetic accounts/data, reset state deterministically, record screenshots/traces with redaction, and avoid sending actual provider payments/messages. Verify mobile layout and keyboard operation on critical pages.

## Flake and Failure Policy

Wait for observable state rather than arbitrary time. A failed test includes trace and artifact reference. Quarantine only with issue owner and expiry; security/financial isolation tests cannot be silently skipped.

## Related Documents

- [Test Scenarios](test-scenarios.md)
- [Integration Testing](integration-testing.md)
- [Accessibility Guidelines](../07-ui-ux/accessibility-guidelines.md)

