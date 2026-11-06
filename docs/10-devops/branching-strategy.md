---
title: Branching Strategy
document_id: PET-DOC-1003
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['git-workflow.md']
---

# Branching Strategy

Strategi cabang yang sesuai untuk tim.

## Branches

main, release, hotfix, feature/*, bugfix/*, docs/*.

## Release Pattern

Feature branches merge to main; release branches created for staging and versioned production rollouts. Hotfix branches branch from release or main as needed.

