---
title: Threat Model
document_id: PET-DOC-0802
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['security-architecture.md']
---

# Threat Model

Analisis ancaman menetapkan resiko umum dan mitigasinya.

## Threats

Unauthorized access, cross-branch data leakage, stock manipulation, double invalid payment, session hijacking, phishing, injection, and data exfiltration.

## Assets and Trust Boundaries

Assets: customer identity/contact, pet/clinical records, payment and journal data, payroll, stock/price policy, authentication/session material, provider credentials, uploaded documents, and audit history. Boundaries: browser-to-API, organization-to-organization, branch-to-branch, staff-to-customer portal, database-to-storage, and PETORA-to-provider/webhook.

## Threat / Control / Evidence Matrix

| Threat | Likely abuse path | Required control | Verification evidence |
| --- | --- | --- | --- |
| Cross-tenant/branch disclosure | Forged IDs, unscoped query, cached data after branch switch | Server-derived scope, RLS, scoped query keys, private storage checks | Negative RLS/API/storage tests; cache-scope test |
| Privilege escalation | UI-only guard, editable role metadata, stale claims | Server permission resolver, trusted claims, revocation behavior, fail closed | Direct API tests for each role/action and revoked assignment |
| Payment/stock manipulation | Client-supplied total, replay, concurrency, callback spoof | Server recalculation, idempotency, signed webhook, ledger transaction | Duplicate/concurrent/invalid-signature/reconciliation tests |
| Clinical privacy/integrity | Generic listing, overwritten final record, unauthorized prescription | Sensitive role checks, immutable revision, consent/prescriber validation | Role isolation and record-revision tests |
| Secret exposure | Build-time env leakage, log/exception, public storage/config | Server-only secret manager, redaction, restricted object policies | Bundle/config scan, log review, storage denial tests |
| Settings abuse | Arbitrary key/value, scope override, approval bypass, stale version | Key allowlist/schema, server-derived scope, approval, lock, expected version | Settings API/RLS abuse suite |
| Injection/content abuse | Unvalidated filter, file upload, rich text | Parameterized queries, schema allowlists, content validation/encoding | Input boundary, upload and dependency tests |
| Availability/data loss | Provider outage, bad migration, ransomware/operator error | Rate limits, backups, restore drills, rollback/forward fix | Recovery exercise, alert and incident evidence |
| Insider misuse | Excessive export, shared account, direct production mutation | Least privilege, audit, separation of duties, access review | Audit sampling and access recertification |

## Risk Ownership

Security/engineering owners maintain technical mitigations; business, clinical, finance and compliance owners accept domain/legal risks. Residual risk and severity rubric must be approved; this document does not assign legal risk ratings.

## Mitigations

RLS, server-side authorization, 2FA where approved, signed URLs, input validation, rate limiting, redacted logs, separation of duties, backup recovery, and external event verification.

## Priorities

Priority 1: data isolation and financial integrity; Priority 2: patient privacy and external integrations; Priority 3: user phishing and UI tampering.

## Review Triggers

Review the model when a new integration/provider, permission scope, storage bucket, sensitive data class, admin workflow, external portal, or material threat is introduced; also after a security incident or significant platform change.

## Related Documents

- [Security Architecture](security-architecture.md)
- [Security Testing](../09-testing/security-testing.md)
- [Secrets Management](secrets-management.md)
- [Incident Response](../11-operations/incident-response.md)

