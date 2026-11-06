---
title: Test Strategy
document_id: PET-DOC-0901
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-plan.md', 'security-testing.md']
---

# Test Strategy

Strategi testing PETORA mencakup unit, integration, database, security, performance, and UAT.

## Scope

Testing covers customer, sales, stock, clinical, payroll, finance, and security requirements, termasuk konfigurasi dinamis yang diatur oleh Super Admin.

## Strategy

Automated tests for critical workflows; manual UAT for role-based approval and business acceptance; load and security tests before major release.

## Dynamic Configuration Testing Strategy

Kebijakan runtime seperti refund, stock, pricing, loyalty, booking, dan notification harus diuji melalui layer konfigurasi yang sama dengan di produksi. Pendekatan ini memastikan perubahan policy dari dashboard Super Admin tidak secara tidak sengaja menghasilkan kondisi yang tidak valid.

### Mandatory Coverage

- system settings CRUD
- approval workflow for critical configuration
- branch-specific and org-specific scope validation
- invalid value_type rejection
- lock state enforcement
- cross-role access denial
- database transaction integrity when config changes affect runtime logic

### Risk-Based Priorities

| Priority | Test Area | Example |
| --- | --- | --- |
| P0 | Finance and stock policy | allow_negative_stock, refund max hours |
| P0 | Authorization and audit | direct attempt to edit config without permission |
| P1 | Clinical and service policy | cancellation fee, patient access visibility |
| P1 | Notification policy | reminder lead time and retry limit |
| P2 | Non-critical configuration | theme, label, dashboard summary setting |

## Minimum Test Cases

| Test ID | Requirement ID | Scenario | Priority |
| --- | --- | --- | --- |
| PET-TST-SET-001 | PET-REQ-018 | Super Admin creates draft setting | P0 |
| PET-TST-SET-002 | PET-REQ-018 | Owner approves critical config | P0 |
| PET-TST-SET-003 | PET-REQ-018 | Branch-scoped config cannot be read outside branch | P0 |
| PET-TST-SET-004 | PET-REQ-018 | Invalid value_type is rejected | P0 |
| PET-TST-SET-005 | PET-REQ-018 | Locked setting cannot be edited without approval | P0 |
| PET-TST-SET-006 | PET-REQ-018 | Non-admin cannot mutate settings | P0 |

## Tools and Execution Layers

- Unit tests: schema validation and reducer logic
- Integration tests: API contract and Edge Function validation
- Database tests: RLS, transaction, and audit behavior
- Security tests: role isolation and tampering detection
- E2E tests: full settings approval flow from dashboard to runtime rules

## Release Gate

Semua P0 dan P1 test untuk konfigurasi dinamis harus lulus sebelum production deployment. Jika ada perubahan pada policy critical, password atau approval rule, release harus diakses oleh owner dan super admin.

## Priority

P0 tests: checkout, payment, stock deduction, medical prescription validation, refund, authorization, accounting journal, and multi-branch isolation.


