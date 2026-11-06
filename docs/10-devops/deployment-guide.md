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

Panduan ini adalah target deployment untuk React/Vite frontend dan Supabase backend. Hosting/provider aktual belum dipilih atau diverifikasi, sehingga langkah dashboard/command spesifik harus dilengkapi setelah platform diputuskan.

## Frontend

Pilih Vercel atau Cloudflare Pages; siapkan domain/redirect allowlist/CORS, public `VITE_` vars saja, build artifact immutability, cache policy hashed assets, CSP/security headers, and source-map policy. Preview deployments memakai staging project dan tidak menerima production secrets.

## Backend

Deploy Supabase migrations, RLS/grants/functions, Edge Functions, Storage policies, Auth redirect config, and secrets secara versioned/reviewed. Run against staging first. Secret di-set melalui project secret manager/operator flow, bukan SQL seed atau source file. Deploy ordering harus mempertahankan compatibility antara frontend dan schema selama rollout.

## Step

1. Approve release artifact, migration diff, decisions, test evidence, backup point, and rollback procedure.
2. Verify target project/environment, schema version, redirects, provider sandbox/production mode, and secret references.
3. Apply backward-compatible migrations and deploy Edge Functions; verify RLS and function health.
4. Deploy frontend artifact; execute health, auth, branch-scope, POS/inventory/clinical/finance smoke tests without creating unintended financial side effects.
5. Validate webhook/reconciliation and alerts; promote only after sign-off.
6. Record release ID, commit, migration version, approver, timestamps, and post-deploy verification.

## Open Decision

Pilih frontend host, domain, Supabase region/project topology, production approval owner, migration operator, maintenance window, and environment-specific data policy sebelum go-live.

## Related Documents

- [CI/CD pipeline](ci-cd-pipeline.md)
- [Environment configuration](environment-configuration.md)
- [Rollback procedure](rollback-procedure.md)

