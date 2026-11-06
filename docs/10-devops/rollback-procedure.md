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

Rollback meminimalkan dampak; tidak menjamin perubahan eksternal atau write database dapat dibatalkan. Incident commander memilih app rollback, disable feature/config, corrective migration, atau restore berdasarkan data dan kompatibilitas.

## Trigger

Crash/availability breach, failed migration, suspected credential compromise, cross-tenant exposure, duplicate/incorrect payment, stock/journal corruption, broken critical workflow, or unsafe settings activation.

## Flow

1. Declare incident, freeze deployment/mutation if required, assign Incident Commander, Security/DB/Finance/Clinical owner, and record trace IDs.
2. Scope tenant, branches, time window, data class, external provider state, and users affected; preserve logs/evidence.
3. Choose mitigation: disable UI/feature/config safely, roll back compatible frontend/function, or apply reviewed forward fix. Do not run destructive down migration blindly.
4. Reconcile provider payments, stock movements, refunds, and journals; restore from backup only with recovery approval and point-in-time impact assessment.
5. Run smoke/RLS/invariant checks before reopen; monitor after recovery.
6. Notify impacted stakeholders/users according to incident and legal policy; document timeline and decision.

## Postmortem

Record cause, impact, detection gap, data integrity/privacy impact, recovery evidence, follow-up owner/deadline, and lessons. Preserve audit/incident records under retention policy. RTO/RPO targets and notification obligations are open decisions and must not be invented during incident.

## Related Documents

- [Incident response](../11-operations/incident-response.md)
- [Database migration guide](../04-database/database-migration-guide.md)
- [Backup and recovery](backup-recovery.md)

