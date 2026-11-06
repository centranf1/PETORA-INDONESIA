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

Classify each value as public runtime configuration, sensitive credential, or signing/encryption key. Public browser configuration is not authorization. Secrets are created in a managed secret store, injected only into the server/runtime environment that needs them, access-controlled by named operators/service identities, and never committed, copied into `VITE_*`, stored in ordinary settings JSON, pasted into issue/chat, or logged.

## Examples

Supabase keys, payment gateway credentials, notification provider API keys, SMTP password, and webhook secret.

The Supabase public/anon key may be present in a browser build only when RLS and server authorization are correctly enforced. Supabase service-role key, payment secret, webhook signing key, database password, and private encryption key are server-only. Never infer safety from a variable name; inspect actual bundler exposure.

## Lifecycle Procedure

1. Owner requests a credential with purpose, environment, scope, and expiry/rotation expectation.
2. Security/engineering reviewer grants least privilege and stores it in the target secret manager.
3. CI/runtime injects the secret without printing its value; deploy verifies presence using a boolean/health check only.
4. Monitor use and access events; rotate after compromise, owner change, provider requirement, or approved interval.
5. Revoke the old credential only after new credential health is verified; record rotation event without recording secret value.
6. On offboarding, remove human access and rotate shared/service credentials whose access may have been exposed.

## Environment Separation and Emergency Rotation

Development, staging and production credentials are distinct. Production secrets are unavailable to local preview builds. If leakage is suspected: revoke/rotate immediately, disable affected integration if necessary, review access logs, identify impacted data/events, preserve evidence, and follow incident response. Do not remove the leaked string from git alone and assume the credential is safe.

## Rotation

Rotation intervals and approval ownership are set by provider/security policy; where no interval is approved, document the gap rather than inventing one. Validate health after rotation and maintain a revocation/fallback plan.

## Related Documents

- [Environment Configuration](../10-devops/environment-configuration.md)
- [Data Protection](data-protection.md)
- [Incident Response](../11-operations/incident-response.md)

