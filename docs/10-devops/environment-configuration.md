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

Konfigurasi environment untuk development, staging, and production.

## Configuration Classes

| Variable / class | Visibility | Handling |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Browser-public | Environment-specific endpoint; validate allowed origin/CORS |
| `VITE_SUPABASE_ANON_KEY` | Browser-public key | Only usable with correct Auth/RLS; never treated as authorization |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only secret | Runtime secret manager only; must never use `VITE_` prefix or enter browser build |
| `PAYMENT_*`, `EMAIL_*`, `SMS_*`, `WHATSAPP_*` credentials | Server-only secrets | Separate by provider/environment; least privilege and rotation |
| `SENTRY_DSN` or public telemetry identifier | May be browser-visible | Configure data scrubbing and environment tagging; never include private auth token |
| `APP_ENV` / build metadata | Non-secret | Explicit `development`, `staging`, or `production`; avoid accidental prod endpoints in local builds |

Names are illustrative; actual variables must match deployment tooling and a documented runtime schema. Never put example values or secrets in this document.

## Environment Rule

Keep secrets out of repository, frontend bundles, URL, logs, screenshots and normal database settings. Inject server secrets through the approved platform secret manager with named access and rotation. Validate configuration at startup and fail closed for missing production secrets; do not print secret values when reporting config errors.

## Environments

Development: synthetic data and local/non-production credentials; Preview: isolated build without production secrets; Staging: production-like configuration with synthetic/de-identified data and provider sandbox; Production: restricted access, approved secrets, backups, alerts and change control. Database/storage/Auth projects must be isolated where supported; environment labels alone do not ensure isolation.

## Configuration Change Procedure

Change one environment at a time; review variables, secret references, URLs/CORS/redirect allowlists, storage buckets, webhooks and telemetry destinations. Test rollback/rotation and confirm no protected environment variable is exposed by the build. Record owner and change reference, not values.

## Related Documents

- [Secrets Management](../08-security/secrets-management.md)
- [Deployment Guide](deployment-guide.md)
- [Integration Architecture](../03-architecture/integration-architecture.md)

