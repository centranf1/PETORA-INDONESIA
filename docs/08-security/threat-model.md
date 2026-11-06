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

Threat model baseline ini mengikuti data flow React browser -> Supabase API/Edge Functions -> PostgreSQL/Storage -> external providers. Scope utama adalah confidentiality antar-tenant, integrity transaksi, privasi klinis/HR, dan availability operasi cabang. Review ulang dilakukan saat boundary, provider, atau data class berubah.

## Assets and Trust Boundaries

Assets: identity/session, tenant/branch data, financial ledger/payment references, stock ledger, medical records/attachments, payroll, system settings/roles, integration credentials, audit evidence, and backups. Browser/request body is untrusted; Auth JWT identifies actor but authorization comes from trusted membership/permission and RLS. Provider callbacks and file uploads are untrusted until verified.

## Threat Register

| Threat | Impact | Required controls | Verification |
| --- | --- | --- | --- |
| Cross-organization/branch query or ID tampering | Confidentiality breach | RLS by trusted membership; composite tenant checks; scoped Storage/Realtime; no client scope trust | DB allow/deny tests for every table/API/storage path |
| Role/permission escalation via user metadata or stale JWT | Unauthorized finance/clinical/settings action | DB-backed assignment; action permission; revocation strategy; approval separation | Change role/revoke session then attempt direct API/RPC |
| Price, discount, stock, booking-capacity manipulation | Financial loss or operational harm | Server recomputation; constraints/locks; idempotency; policy validation | Tampered amount and concurrent last-stock/slot tests |
| Duplicate/replayed/spoofed payment webhook | Double posting or false paid state | Signature/timestamp validation, provider event uniqueness, reconciliation state machine | Replay, invalid signature, out-of-order callback tests |
| Dynamic settings approval bypass/race | Organization-wide policy corruption | Definition registry; server validation; base version; approval/version/audit transaction | Unauthorized, stale version, self-approval policy, audit atomicity tests |
| Clinical attachment/API leakage | Patient privacy breach | Least privilege, owner-visible projection, short-lived signed access where justified, audit | Cross-pet, cross-role, stale URL, export tests |
| Service-role or integration secret leakage | Tenant compromise | Server-only secret manager, least privilege, masking, rotation, CI log redaction | Repo/Bundle/deployment log scan and browser response inspection |
| Report/export abuse or injection | Mass data exfiltration | Scope before aggregation, permission, limits, expiring private artifact, download audit | Cross-scope filter/export and volume-limit tests |
| Injection, unsafe upload, malicious content | Data compromise or stored XSS | Parameterized queries, schema validation, output encoding, file type/size scanning policy | Static/security tests and adversarial input suite |
| Abuse/DoS or provider outage | Service interruption/cost | Rate limits, timeouts, bounded retries, queues, circuit/recovery procedures | Load/failure injection against agreed targets |

## Priorities

P0 gates: tenant isolation, authz/RLS, payments, stock/accounting integrity, medical privacy, secrets. P1: provider/webhook security, exports, session recovery, incident response. Priorities do not replace risk assessment for a specific feature. Numeric risk scoring and residual-risk acceptance owner remain open decisions.

## Related Documents

- [Security architecture](security-architecture.md)
- [RLS policies](../04-database/rls-security-policies.md)
- [Security testing](../09-testing/security-testing.md)

