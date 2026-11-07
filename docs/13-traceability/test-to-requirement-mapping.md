---
title: Test to Requirement Mapping
document_id: PET-DOC-1304
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['requirements-traceability-matrix.md']
---

# Test to Requirement Mapping

Pemetaan test ke requirement.

## Mapping Rules

- Setiap `PET-REQ` harus memiliki acceptance criteria dan setidaknya satu test scenario yang terdefinisi, bukan hanya nama suite.
- Test ID tidak boleh dipakai untuk skenario berbeda; jika skenario berubah secara material, perbarui definisi dan seluruh mapping.
- Test mencakup jalur sukses serta penolakan/exception untuk transaksi atau data sensitif.
- `PET-TST-SET-*` mengacu pada pengujian workflow konfigurasi; `PET-TST-SEC-SET-*` mengacu pada adversarial/security test.

## Requirement-to-Test Matrix

| Requirement ID | Acceptance Criteria reference | Test IDs | Coverage focus |
| --- | --- | --- | --- |
| PET-REQ-001 | PET-REQ-001 | PET-TST-003, PET-TST-006 | Branch isolation, inactive branch, history preservation |
| PET-REQ-002 | PET-REQ-002 | PET-TST-007, PET-TST-022 | Role revocation, unauthorized/cross-tenant access |
| PET-REQ-003 | PET-REQ-003 | PET-TST-008, PET-TST-027 | Customer/pet ownership and scoped customer listing |
| PET-REQ-004 | PET-REQ-004 | PET-TST-009, PET-TST-028 | Price authorization, transaction snapshot, and scoped catalog read |
| PET-REQ-005 | PET-REQ-005 | PET-TST-010, PET-TST-029 | Stock ledger, batch, concurrent mutation, and scoped inventory-location read |
| PET-REQ-006 | PET-REQ-006 | PET-TST-001, PET-TST-002, PET-TST-023, PET-TST-030 | Checkout, refund, retry/idempotency, scoped sales listing |
| PET-REQ-007 | PET-REQ-007 | PET-TST-011 | Partial receiving and PO reconciliation |
| PET-REQ-008 | PET-REQ-008 | PET-TST-012, PET-TST-013, PET-TST-024 | Service lifecycle and booking concurrency |
| PET-REQ-009 | PET-REQ-009 | PET-TST-004, PET-TST-014 | Prescription authority and immutable clinical history |
| PET-REQ-010 | PET-REQ-010 | PET-TST-015 | Loyalty accrual, redemption, and refund reversal |
| PET-REQ-011 | PET-REQ-011 | PET-TST-016 | Promotion eligibility, scope, and stacking |
| PET-REQ-012 | PET-REQ-012 | PET-TST-017 | Payroll source traceability and access restriction |
| PET-REQ-013 | PET-REQ-013 | PET-TST-005, PET-TST-025, PET-TST-026 | Balanced journal, cash and consignment reconciliation |
| PET-REQ-014 | PET-REQ-014 | PET-TST-018 | Report scope and export authorization |
| PET-REQ-015 | PET-REQ-015 | PET-TST-019 | Portal relationship scope and notification retry |
| PET-REQ-016 | PET-REQ-016 | PET-TST-SET-001..006, PET-TST-SEC-SET-004..005 | Settings validation, version, approval, lock, audit |
| PET-REQ-017 | PET-REQ-017 | PET-TST-021, PET-TST-SEC-SET-006 | Secret handling, webhook verification, exposure prevention |
| PET-REQ-018 | PET-REQ-018 | PET-TST-003, PET-TST-007, PET-TST-020, PET-TST-022, PET-TST-027, PET-TST-028, PET-TST-029, PET-TST-030, PET-TST-SEC-SET-001..006 | Tenant/branch isolation, role checks, audit, security abuse cases |

## Coverage Status

The mapping is a draft baseline. Test cases must be implemented and their execution evidence attached to the relevant PR/release before a requirement can be marked verified. A mapped ID alone is not proof of test coverage.

## Related Documents

- [Acceptance Criteria](../01-product/acceptance-criteria.md)
- [Test Scenarios](../09-testing/test-scenarios.md)
- [Security Testing](../09-testing/security-testing.md)
- [Requirements Traceability Matrix](requirements-traceability-matrix.md)

