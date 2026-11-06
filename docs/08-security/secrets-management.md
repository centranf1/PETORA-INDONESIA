---
title: Secrets Management
document_id: PET-DOC-0806
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['session-management.md']
---

# Secrets Management

Manajemen secret untuk integrasi dan konfigurasi umum.

## Principles

Never commit secrets to repo, never place service role in frontend, and store secrets in secure secret storage with access control.

## Examples

Supabase keys, payment gateway credentials, notification provider API keys, SMTP password, and webhook secret.

## Rotation

Rotate access regularly with review logs and update deployment configuration as part of release process.

