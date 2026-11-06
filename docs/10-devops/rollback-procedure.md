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

## Flow

Identify issue, freeze release, revert frontend/app version, restore DB migration or apply rollback script, validate core functionality, notify stakeholders.

## Postmortem

Record cause, impact, and corrective actions in incident tracker.

