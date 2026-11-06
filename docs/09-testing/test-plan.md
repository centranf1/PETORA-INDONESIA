---
title: Test Plan
document_id: PET-DOC-0902
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-strategy.md']
---

# Test Plan

Rencana testing menandai jalur, data, dan prioritas tahapan.

## Execution Levels

Unit -> integration -> DB/RLS -> API -> component -> end-to-end -> acceptance.

## Critical Scenarios

Double checkout, double payment, illegal price modification, negative stock, unauthorized data access, medical record revision, and refund handling.

## Dynamic Settings Scenarios

| Test ID | Scenario | Preconditions | Steps | Expected Result |
| --- | --- | --- | --- | --- |
| PET-TST-SET-001 | Create draft stock policy | Super Admin authenticated | Open settings dashboard, create stock policy draft | New draft created with status draft |
| PET-TST-SET-002 | Approve critical refund policy | Owner authenticated | Open pending approval list | Policy becomes active only after approval |
| PET-TST-SET-003 | Reject invalid value_type | Admin authenticated | Set value_type mismatch with value_json | Request rejected and logged |
| PET-TST-SET-004 | Cross-organization access | User from Org A tries Org B config | Query settings by raw org_id | Request denied by RLS |
| PET-TST-SET-005 | Branch-only config restriction | Manager on Branch A read Branch B config | Access branch config | Forbidden and recorded |
| PET-TST-SET-006 | Non-admin mutation | Cashier or branch manager submits a settings mutation directly to the API | Request denied; active value unchanged; denial event is logged |

## Execution Schedule

- Smoke test: every PR merge
- Critical regression suite: nightly
- Security and RLS suite: before each release
- UAT sign-off: before production go-live

## Scheduling

Critical test suite runs on every merge to main and before production release; UAT sign-off required before go-live.


