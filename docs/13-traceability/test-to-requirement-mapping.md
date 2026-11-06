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

Pemetaan ini menggunakan test ID canonical dari [test scenarios](../09-testing/test-scenarios.md). Test status untuk baseline core adalah **planned design**, bukan hasil test yang telah dijalankan.

## Core Requirements

| Requirement ID | Test IDs | Coverage focus |
| --- | --- | --- |
| PET-REQ-001 | PET-TST-003, PET-TST-010, PET-TST-011 | Branch isolation, role assignment, privilege escalation |
| PET-REQ-002 | PET-TST-012 | Customer uniqueness, pet ownership and history |
| PET-REQ-003 | PET-TST-013 | Catalog, price/unit validation, client price tampering |
| PET-REQ-004 | PET-TST-014 | Ledger, batch, concurrency, negative stock policy |
| PET-REQ-005 | PET-TST-001, PET-TST-002, PET-TST-015 | Idempotent checkout/payment, refund and journal/stock consistency |
| PET-REQ-006 | PET-TST-016 | Partial receiving, duplicate invoice, PO/invoice match |
| PET-REQ-007 | PET-TST-017 | Booking capacity race and grooming lifecycle |
| PET-REQ-008 | PET-TST-018 | Occupancy, incomplete care tasks, boarding handoff |
| PET-REQ-009 | PET-TST-028 | Transport/home grooming assignment and handoff |
| PET-REQ-010 | PET-TST-019 | Clinical role, triage, consent, visit finalization |
| PET-REQ-011 | PET-TST-029 | Medical record immutability, revision, owner visibility |
| PET-REQ-012 | PET-TST-004, PET-TST-020 | Prescription authorization, expiry and dispensing ledger |
| PET-REQ-013 | PET-TST-021 | Membership benefit and loyalty earn/redeem/refund reversal |
| PET-REQ-014 | PET-TST-022 | Promo eligibility, stacking, scope and concurrent quota |
| PET-REQ-015 | PET-TST-023 | Attendance correction, payroll approval and HR privacy |
| PET-REQ-016 | PET-TST-005, PET-TST-024, PET-TST-030 | Balanced journals, cash reconciliation, consignment settlement |
| PET-REQ-017 | PET-TST-025, PET-TST-026 | Report scope/export, notification and customer portal isolation |
| PET-REQ-018 | PET-TST-027, PET-TST-SET-001, PET-TST-SET-002, PET-TST-SET-003, PET-TST-SET-004, PET-TST-SET-005, PET-TST-SET-006 | Settings approval, RLS, audit and secret masking |

## Recommended Extensions

Test IDs berikut direncanakan untuk rekomendasi README bagian 5. Test detail dibuat ketika extension masuk release scope; saat ini bukan release gate core.

| Requirement | Feature | Planned test |
| --- | --- | --- |
| PET-REQ-019 | PET-FTR-034 | PET-TST-REC-001 |
| PET-REQ-020 | PET-FTR-035 | PET-TST-REC-002 |
| PET-REQ-021 | PET-FTR-036 | PET-TST-REC-003 |
| PET-REQ-022 | PET-FTR-037 | PET-TST-REC-004 |
| PET-REQ-023 | PET-FTR-038 | PET-TST-REC-005 |
| PET-REQ-024 | PET-FTR-039 | PET-TST-REC-006 |
| PET-REQ-025 | PET-FTR-040 | PET-TST-REC-007 |
| PET-REQ-026 | PET-FTR-041 | PET-TST-REC-008 |
| PET-REQ-027 | PET-FTR-042 | PET-TST-REC-009 |
| PET-REQ-028 | PET-FTR-043 | PET-TST-REC-010 |
| PET-REQ-029 | PET-FTR-044 | PET-TST-REC-011 |
| PET-REQ-030 | PET-FTR-045 | PET-TST-REC-012 |
| PET-REQ-031 | PET-FTR-046 | PET-TST-REC-013 |

## Completion Rule

Requirement dianggap terlacak bila memiliki acceptance criterion, workflow, feature, table group, API/UI surface, dan test. “Planned test” bukan bukti lulus; hasil eksekusi hanya dapat dicatat setelah runner dan lingkungan uji tersedia.

