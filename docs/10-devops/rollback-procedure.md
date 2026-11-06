---
title: Rollback Procedure
document_id: PET-DOC-1007
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['deployment-guide.md']
---

# Rollback Procedure

Prosedur rollback untuk mencegah downtime dan data loss.

## Trigger

Crash, failed migration, injection, broken deployment, or high-impact bug.

Trigger when agreed release guardrails show material data-integrity/security/availability regression, migration corruption, unauthorized exposure, elevated critical workflow failure, or provider/payment mismatch. Stop promotion and preserve trace/evidence; do not wait for a numerical threshold that has not been agreed if a credible security/data-loss incident exists.

## Flow

1. Declare incident/change rollback owner and freeze further promotion; capture commit/artifact/migration IDs and trace references.
2. Assess whether issue is code, config, provider, or data; disable unsafe feature/route/provider if needed without destroying evidence.
3. Revert the immutable app/function artifact only if backward-compatible with current schema/data. Otherwise forward-fix using a reviewed compatible release.
4. Do not blindly run down migration or restore a database snapshot. Follow database recovery plan, consider writes since backup, preserve user transactions, and reconcile provider effects.
5. Validate auth/RLS, checkout/payment status, stock balance, bookings, clinical access, accounting, settings active version, storage and monitoring.
6. Notify impacted stakeholders/support and reopen service only after owner verifies critical invariants.
7. Record decision, actions, data impact, recovery evidence, and follow-up incident work.

## Postmortem

Within the agreed review window, document timeline, scope/impact, detection gap, root cause, recovery, customer/regulatory notification decision, and preventive actions with owners/dates. Preserve audit/forensic evidence under access controls.

## Related Documents

- [Deployment Guide](deployment-guide.md)
- [Database Migration Guide](../04-database/database-migration-guide.md)
- [Backup and Recovery](backup-recovery.md)
- [Incident Response](../11-operations/incident-response.md)

