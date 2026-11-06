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

## Checklist

Authentication enabled, RLS enabled, no service role in frontend, branch/organization checks in all endpoints, audit log present, secrets stored securely, external APIs validated, and testing performed for unauthorized access.

## Release Gate

Before production deploy, verify critical test cases and security review. No production by-pass without sign-off.

