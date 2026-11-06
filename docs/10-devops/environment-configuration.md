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

## Variables

VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SENTRY_DSN, EMAIL_PROVIDER_KEY, PAYMENT_GW_API_KEY, APP_ENV.

## Environment Rule

Never keep secrets in repository or code; inject via environment secret store and deployment platform.

## Environments

Development: local dev and preview branches; Staging: integrated test environment; Production: live environment with alerts and restricted access.

