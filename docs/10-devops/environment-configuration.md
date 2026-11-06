---
title: Environment Configuration
document_id: PET-DOC-1001
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['ci-cd-pipeline.md', 'deployment-guide.md']
---

# Environment Configuration

Environment harus terpisah secara identitas, data, provider credential, dan access control. Nama variable berikut adalah placeholder target; konfigurasi runtime belum ditemukan di repository.

## Client-safe Build/Runtime Configuration

| Variable | Consumer | Classification |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Browser | Public endpoint; environment-specific |
| `VITE_SUPABASE_ANON_KEY` | Browser | Public/anon key, safe to expose only with complete RLS and API policy |
| `VITE_APP_ENV` | Browser | Non-secret environment identifier |
| `VITE_SENTRY_DSN` | Browser if approved | Public ingest identifier; configure scrubbing/rate controls |

## Server-only Secrets

`SUPABASE_SERVICE_ROLE_KEY`, `PAYMENT_PROVIDER_SECRET`, `PAYMENT_WEBHOOK_SECRET`, `NOTIFICATION_PROVIDER_TOKEN`, SMTP credentials, and signing keys must be stored only in the platform/Edge Function secret store. **Never prefix server secrets with `VITE_`**; Vite exposes prefixed values to browser bundles. Do not include real values in `.env.example`.

## Environment Rule

Never keep secrets in repository, code, docs, CI output, or browser storage; inject via environment-scoped secret store. Separate projects and keys for local, staging, and production. Keep `.env.local` ignored and provide placeholder-only `.env.example`; rotate any credential accidentally committed.

## Environments

Development: synthetic fixtures and sandbox providers. Staging: isolated Supabase project, production-like RLS/configuration, no real sensitive data unless explicitly approved. Production: least-privilege operator access, alerting, protected deployment, backup/restore and change audit. Preview deployment must never inherit production secrets.

## Open Decisions

Select hosting provider, Supabase project/region layout, preview environment policy, allowed origins/redirect URLs, and secret ownership before setup. See [secrets management](../08-security/secrets-management.md).

