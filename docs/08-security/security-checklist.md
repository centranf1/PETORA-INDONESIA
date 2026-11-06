---
title: Security Checklist
document_id: PET-DOC-0808
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['audit-logging.md']
---

# Security Checklist

Checklist ini merupakan gate review, bukan bukti otomatis bahwa sistem aman. Simpan link test/evidence dan owner untuk setiap pengecualian.

## Checklist

### Before Merge

- [ ] Actor, tenant, branch, permission, and data classification documented.
- [ ] RLS enabled and allow/deny database tests cover each exposed operation.
- [ ] Input and server-side business validation; no client authority for price, scope, role, approval, or final status.
- [ ] Idempotency/concurrency/failure paths covered for critical writes.
- [ ] Secrets and sensitive fields are absent from frontend, logs, test fixtures, and error messages.
- [ ] Storage, Realtime, views, RPC, exports, and direct API paths reviewed.
- [ ] Audit event, retention class, and corrective/reversal path defined.
- [ ] Dependency/vulnerability and static checks run using project-supported tooling.

### Before Production

- [ ] Production keys isolated; service role server-only; rotation/contact ownership documented.
- [ ] Cross-organization/branch RLS, customer portal ownership, clinical and payroll restrictions tested.
- [ ] Payment webhook signature/replay, duplicate checkout, stock race, refund, journal balance, settings approval/version tested.
- [ ] Backup restore, rollback, incident contacts, alert routing, and runbooks exercised.
- [ ] Threat model and open security decisions reviewed by Security Owner.
- [ ] SLO, RPO/RTO, data region, and retention claims have evidence and approval before any compliance statement.

## Release Gate

Before production deploy, all blocking items pass and evidence is attached to release. Any exception requires named risk owner, scope, expiry, compensating control, and explicit approval; no undocumented bypass.

