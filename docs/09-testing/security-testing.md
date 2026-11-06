---
title: Security Testing
document_id: PET-DOC-0906
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-strategy.md']
---

# Security Testing

Testing keamanan menekankan isolasi dan otorisasi.

## Mandatory Tests

Attempt cross-branch access, invalid branch_id, unauthorized medical record viewing, refund without authority, direct API calls without login, and role escalation injection.

## Dynamic Settings Security Tests

| Test ID | Scenario | Preconditions | Expected Result |
| --- | --- | --- | --- |
| PET-TST-SEC-SET-001 | Unauthorized settings edit | Cashier or branch manager session | Request rejected; audit log created |
| PET-TST-SEC-SET-002 | Cross-organization config tampering | User from Org A with manipulated org_id | RLS denies access and no data returned |
| PET-TST-SEC-SET-003 | Branch override bypass | Manager from Branch A tries Branch B data | Denied by scope validation |
| PET-TST-SEC-SET-004 | Critical policy bypass | Value set without approval while `requires_approval=true` | Save blocked; record remains draft |
| PET-TST-SEC-SET-005 | Locked settings mutation | `is_system_locked=true` and regular admin session | Mutation denied and logged |
| PET-TST-SEC-SET-006 | Secret exposure | Direct browser inspection of config payload | Secret values absent; masked response only |

## Validation Rules

Semua hasil uji keamanan harus mengecek tidak hanya response code, tetapi juga:

- audit trail created
- no sensitive value leakage
- no branch/org mismatch accepted
- no direct update to active config without approval
- no frontend access to service role secret

## Expected Result

All unauthorized operations fail with clear denial and are recorded in audit log.


