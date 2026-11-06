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

All tests run only against isolated PETORA test/staging environments with synthetic identities and data. For each data class, test allowed access and denial at frontend, direct API, database/RLS, and storage boundary. Record caller role/scope, request ID, result, leaked fields (if any), audit outcome and remediation.

## Coverage Areas

- Authentication: missing/expired/invalid token, disabled account, role revocation, session refresh.
- Authorization: direct endpoint call bypassing UI, forged tenant/branch identifier, ownership/assigned-record scope, privileged command without approval.
- Data isolation: cross-organization and cross-branch read/write, pagination/count/search leakage, export and realtime subscription.
- Integrity: replayed idempotency key, concurrent stock/booking, stale setting version, duplicate/out-of-order webhook, unbalanced journal attempt.
- Input and upload: unknown fields, oversized payload, invalid file type, untrusted rich text, injection-safe filters.
- Secrets/privacy: frontend build scan, error/log redaction, signed URL expiry and object access denial.
- Availability controls: rate limit and bounded retry under test load without sending provider traffic.

Do not treat simulated penetration tests or sample SQL as proof of production RLS correctness; run automated tests against the actual migrated test schema.

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

## Release Evidence

Attach test run/version, environment, identities/roles, cases passed/failed, findings, retest evidence, and security owner disposition. Any test exclusion requires risk owner, reason, compensating control and expiry. Never attach credentials or raw sensitive payloads.

## Related Documents

- [Threat Model](../08-security/threat-model.md)
- [RLS Security Policies](../04-database/rls-security-policies.md)
- [Security Checklist](../08-security/security-checklist.md)
- [Test to Requirement Mapping](../13-traceability/test-to-requirement-mapping.md)


