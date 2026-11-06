---
title: Deployment Guide
document_id: PET-DOC-1006
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['ci-cd-pipeline.md']
---

# Deployment Guide

Panduan deployment PETORA saat go-live.

## Frontend

Vercel/Cloudflare Pages are alternatives, not selected provider. Build a reviewed immutable artifact from a tagged/approved commit; inject only browser-public config into the bundle. Configure TLS, security headers, origin/CORS and auth redirect allowlists, cache immutable static assets, and avoid caching authenticated HTML/API data publicly. Verify source maps/telemetry policy before publication.

## Backend

Deploy database migrations and Edge Functions through versioned CI or a controlled reviewed operation. Use expand-migrate-contract for incompatible schema, deploy compatible functions before callers where required, and keep service role/secrets server-side. Confirm function regions, JWT verification, webhook URLs, scheduled jobs and provider sandbox/production mode.

## Step

1. **Preflight:** approved release record, diff, test evidence, open-decision disposition, backup/restore status, provider status, on-call owner, maintenance window and rollback/forward-fix plan.
2. **Stage:** deploy migration in staging, validate RLS/grants, Edge Functions, storage policies and critical smoke journeys.
3. **Promote:** deploy the same immutable frontend artifact and compatible functions; apply migrations in documented order.
4. **Verify:** login/role scope, customer search, POS/payment sandbox or approved safe smoke, stock ledger, booking, clinical access, settings approval, monitoring and error rates.
5. **Observe:** monitor agreed stabilization window and reconcile pending payments/jobs before declaring release complete.
6. **Close:** record artifact/migration IDs, approver, smoke results, incidents, support handoff and any exceptions.

Never use a real payment, customer notification, or clinical record for a smoke test without approved test procedure.

## Open Decision

Select hosting, region/data residency, Supabase project ownership, domain, DNS, secret ownership, cost, support, and production access via [open decisions](../13-traceability/open-decisions.md). No deployment is production-ready until owners and recovery responsibilities are assigned.

## Related Documents

- [CI/CD Pipeline](ci-cd-pipeline.md)
- [Environment Configuration](environment-configuration.md)
- [Rollback Procedure](rollback-procedure.md)
- [Security Checklist](../08-security/security-checklist.md)

