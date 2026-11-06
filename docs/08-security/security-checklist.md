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

Checklist keamanan untuk release dan operasional.

## Pre-Release Checklist

### Identity and Authorization

- [ ] Authentication/session behavior reviewed; privileged roles use the approved MFA policy.
- [ ] Every protected API/function validates role, organization, branch assignment, record ownership/assignment and workflow state server-side.
- [ ] RLS and storage policies are enabled/tested; no client scope is trusted.
- [ ] Role revocation and account deactivation behavior is verified.

### Data and Secrets

- [ ] No service-role key, provider secret, private key, or credential is present in bundle, source, logs, screenshots, or ordinary config response.
- [ ] Sensitive data is minimized/redacted in telemetry and error reports.
- [ ] Medical, payroll, financial, and customer exports have authorization and audit.
- [ ] Retention/legal decision is approved or explicitly blocks production collection.

### Workflow Integrity

- [ ] Checkout/payment/refund/stock/journal/clinical/settings mutations have idempotency, concurrency and failure-path tests as applicable.
- [ ] Webhook signatures, duplicate replay, provider timeout and reconciliation are tested.
- [ ] Audit is written for sensitive mutation/approval and cannot be changed through normal app roles.

### Release and Operations

- [ ] Security tests, dependency/config scans and code review pass; findings have owner and disposition.
- [ ] Backup restore, alert routing, incident contact and rollback/forward recovery are rehearsed.
- [ ] No undocumented production bypass or policy exception remains.

## Release Gate

Before production deploy, attach evidence and accountable sign-off for applicable items. Any exception records scope, reason, expiry, compensating controls, approver, and audit reference; emergency bypass must be time-bound and reviewed after incident.

## Related Documents

- [Threat Model](threat-model.md)
- [Security Testing](../09-testing/security-testing.md)
- [Audit Logging](audit-logging.md)
- [Deployment Guide](../10-devops/deployment-guide.md)

