---
title: CI/CD Pipeline
document_id: PET-DOC-1005
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['deployment-guide.md']
---

# CI/CD Pipeline

Panduan pipeline integrasi dan deployment.

## Pipeline

Lint -> type-check -> unit tests -> integration tests -> build -> security scan -> deploy to staging -> smoke tests -> promotion to production.

## Deployment Gate

Production deploy requires passing CI tests, security checks, review, and release checklist.

## Tooling

Use GitHub Actions or equivalent CI/CD, with access restricted by environment and branch protection.

