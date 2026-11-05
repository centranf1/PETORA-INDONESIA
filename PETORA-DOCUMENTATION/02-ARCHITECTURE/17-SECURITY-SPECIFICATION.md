# 17 — Security Specification

**Status:** Requirements and recommended controls; no deployed implementation or security test evidence was found.

## 1. Security objectives and boundaries

Protect customer/employee personal information, clinical data, credentials, financial transactions, inventory and business configuration. Enforce least privilege across four protected roles, custom roles, branches, ownership and assignments. Trust boundary: browser is untrusted; backend validates all identity, permissions, values, transitions and scope.

## 2. Authentication and session management

- Use a modern password hashing function with per-user salt and parameters reviewed for chosen runtime; never store reversible plaintext passwords.
- Protect login, reset and enrollment endpoints with rate limiting, secure recovery verification, enumeration-resistant responses and audit.
- Prefer secure, HttpOnly, SameSite cookies for browser sessions when compatible; enforce TLS, expiration, rotation, logout/revocation and CSRF controls.
- MFA is recommended for privileged accounts; required policy, factors and recovery process TBD.
- Avoid long-lived tokens in browser local storage. Do not log passwords, reset tokens, session cookies or authorization headers.
- Define account lockout/risk policy without enabling trivial denial-of-service.

## 3. Authorization and data privacy

- Backend evaluates role permission, action, branch, ownership, assignment and sensitivity for every read/write/export.
- UI menu/button hiding is not authorization. Prevent IDOR by loading resource through authorized scope.
- Customer access is limited to their own profile, pets, bookings, orders, payments, membership, points, notifications and approved medical information.
- Medical data is need-to-know, attributable to clinician, auditable, and corrected through addenda rather than silent overwrite.
- Restrict exports and bulk queries; apply the same policy to report, file, search, autocomplete and background job paths.
- Consent, retention, deletion/anonymization and privacy notice requirements need legal/business confirmation.

## 4. Input, application and database security

- Server-side allowlist validation for types, length, ranges, enumerations, relationships, branch, state and monetary values.
- Use parameterized query/ORM APIs; never concatenate untrusted input into SQL, shell commands or template code.
- Output-encode contextually; use Content Security Policy and safe template defaults to mitigate XSS.
- CSRF protection for cookie-authenticated state changes; CORS allowlist and secure headers.
- Rate limit authentication, search, booking, payment, export and webhook interfaces.
- Avoid mass assignment; explicitly bind writable fields. Recompute price, discount, tax, totals, scope and status server-side.
- Use database least privilege, encrypted transport, constraints, transaction boundaries and reviewed migrations.
- Keep error messages useful but non-sensitive; attach request/correlation ID.

## 5. Integration and secret management

- Credentials are entered via protected Super Admin UI but sent only to backend over TLS; backend validates, encrypts at rest using managed keys or a secrets manager, and never returns plaintext.
- Secrets are excluded from frontend bundles, source control, local storage, telemetry, exception traces, analytics and integration logs.
- Support rotation and revocation; show only configured/masked metadata.
- Provider endpoints are server-controlled/allowlisted to reduce SSRF risk; do not allow arbitrary URL fetch without strong validation.
- Verify webhook signatures, timestamp/replay window, provider event identity and idempotency before processing.
- Connector calls use timeouts, bounded retries and least-privilege provider credentials. New protocol needs backend implementation/review.

## 6. Files and uploads

Validate extension, MIME and content signature; set size limits; generate storage keys; scan for malware as required by deployment; store outside executable web root/private bucket. Prevent path traversal, public bucket exposure, unsafe SVG/HTML execution and unauthorized download. Apply retention and audit for sensitive attachments.

## 7. Financial, medical and audit integrity

- Payment/refund callbacks are signed, deduplicated and reconciled; client cannot mark a payment settled.
- Stock changes use immutable movements; ledger and balance projection reconcile.
- Posted journal/medical signed record/audit logs cannot be deleted through ordinary CRUD; corrections are attributable.
- Audit includes actor, action, resource, result, time, branch and correlation ID; minimize sensitive payload and define tamper resistance/retention.
- Approval separation and dual control thresholds are TBD and require finance/operations approval.

## 8. Encryption, backups and operations

Use TLS for transport and encryption at rest for database, storage, backup and integration secrets; key ownership/rotation and data residency TBD. Restrict backup access separately from runtime. Monitor auth abuse, access denials, privilege changes, provider failures, backup status and anomalous export. Define incident classification, on-call contact, containment, evidence preservation, notification and recovery procedure before production.

## 9. Threat scenarios to test

| Threat | Required defense |
|---|---|
| Cross-branch IDOR | Server-side branch scope on detail, mutation, report, export and file endpoints |
| Customer data enumeration | Ownership checks and safe not-found behavior; rate limits |
| Privilege escalation | Delegation caps, protected role invariants, no self-grant |
| Price/quantity tampering | Server recomputation and transaction constraints |
| Duplicate payment/webhook | Idempotency, signature check and reconciliation |
| Concurrent overbooking/oversell | Atomic reservation/stock transaction and conflict response |
| Credential exposure | Secret manager/encryption, write-only UX, redaction and scanning |
| Malicious file | Type/size/content validation, private storage, scan policy |
| SQL injection/XSS/CSRF | Parameterized queries, output encoding, CSRF controls and security tests |
| Backup compromise | Encryption, separate identity/access, retention and restore test |

## 10. Security acceptance and unresolved policy

Security release gate: no unresolved critical/high findings; all authorization-negative tests pass; secrets absent from browser/log/source; dependency/image scans reviewed; webhook replay/idempotency tested; backup restore verified. Security incident SLA, compliance obligations, penetration test scope, MFA policy, retention and notification timelines are TBD. See [decision log](../00-DOCUMENT-CONTROL/23-DECISION-LOG-ASSUMPTIONS.md).
