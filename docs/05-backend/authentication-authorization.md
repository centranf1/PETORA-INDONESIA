---
title: Authentication and Authorization
document_id: PET-DOC-0505
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['backend-architecture.md']
---

# Authentication and Authorization

Panduan ini menjelaskan bagaimana autentikasi dan otorisasi dikelola.

## Authentication

Use Supabase Auth with email/password, OTP, or SSO when required. Session must be managed with secure cookies or auth tokens per platform.

## Authorization

Role and permission checks run at server level and RLS policy layer. Multi-branch access is based on user assignment and authorization contexts.

## Sensitive Rule

If authorization fails, do not expose reasons beyond generic denial message.

## Two-Factor

2FA recommended for admin, finance, owner, and vet roles.

