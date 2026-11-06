---
title: Session Management
document_id: PET-DOC-0805
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-protection.md']
---

# Session Management

Pengelolaan sesi pengguna dan hak akses.

## Controls

Short session timeout, refresh tokens, secure cookies, invalidation on logout, concurrent session rules, and login attempt limits.

## Critical Rule

No browser operation may assume a valid session without server verification of token and tenant context.

