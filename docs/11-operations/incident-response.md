---
title: Incident Response
document_id: PET-DOC-1102
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['troubleshooting.md']
---

# Incident Response

Dokumen ini mengatur respons saat terjadi insiden.

## Service Impact

Prioritization based on data loss, finance error, unavailable sales, security breach, or branch downtime.

## Severity and Ownership

| Severity | Example | Initial owner |
| --- | --- | --- |
| SEV-1 | Confirmed sensitive data exposure, systemic financial/stock corruption, production unavailable across organization | Incident commander + security/engineering + business owner |
| SEV-2 | Critical workflow unavailable or materially degraded for a branch/cohort; reconciliation backlog growing | Service owner + operations lead |
| SEV-3 | Non-critical feature failure with workaround and no integrity/security risk | Domain support owner |
| SEV-4 | Question, cosmetic defect, or low-impact request | Product/support queue |

Final severity, paging SLA, external notification and regulatory reporting roles require approval; do not use this table to infer legal timelines.

## Response Steps

1. **Detect and declare:** open incident record, assign commander, severity, communication channel and scribe.
2. **Scope:** identify environments, tenants/branches, data classes, workflows, time window, provider and last known good state.
3. **Contain:** disable affected integration/command, revoke or rotate exposed credentials, restrict access or isolate service; avoid destructive cleanup.
4. **Preserve evidence:** retain trace IDs, audit records, redacted logs, artifact/migration IDs and provider references under least privilege.
5. **Assess impact:** determine data access/change, financial/stock/clinical effects, customer impact and reconciliation needs with domain owners.
6. **Communicate:** send approved internal/customer/regulatory messages through designated owner; do not speculate or share sensitive evidence broadly.
7. **Recover:** use deployment/backup runbooks, validate invariants and monitor for recurrence before restoring normal access.
8. **Close and learn:** record timeline, root cause, decisions, notifications, recovery evidence, action owners and due dates.

For security incidents, do not delete logs, reuse compromised credentials, or ask users to send secrets. For payment incidents, preserve provider event IDs and reconcile before retrying funds movement.

## Escalation

Escalate to business owner, engineering/security lead, clinical/finance owner when affected, and provider contact as necessary. Contact directory, on-call rotation, notification SLA and regulator/customer notification requirements are operational decisions that must be populated before production.

## Related Documents

- [Security Checklist](../08-security/security-checklist.md)
- [Monitoring and Logging](../10-devops/monitoring-logging.md)
- [Rollback Procedure](../10-devops/rollback-procedure.md)
- [Troubleshooting](troubleshooting.md)

