---
title: Container Diagram
document_id: PET-DOC-0304
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['system-context.md']
---

# Container Diagram

Container view menggambarkan runtime target berdasarkan technology baseline, bukan inventory deployment yang telah diverifikasi.

## Containers

React + TypeScript + Vite web app; Supabase Auth; Supabase Data API/PostgREST with RLS; Supabase Edge Functions; PostgreSQL; Supabase Storage; Supabase Realtime; external payment/notification providers; frontend hosting (Vercel or Cloudflare Pages); Sentry/equivalent monitoring. GraphQL, queue provider, and separate backend services are not baseline requirements unless an ADR approves them.

## Deployment Base

Frontend may deploy to Vercel or Cloudflare Pages; database/Auth/Storage/Edge Functions/Realtime use Supabase. Environment separation and provider/region/backup configuration remain open decisions.

## Mermaid

```mermaid
flowchart TB
USER[Desktop / Tablet / Mobile Browser] --> HOST[Static Frontend Host]
HOST --> APP[React + TypeScript + Vite App]
APP --> AUTH[Supabase Auth]
APP -->|user-scoped reads| API[Supabase Data API + RLS]
APP -->|critical commands| FN[Supabase Edge Functions]
API --> PG[(Supabase PostgreSQL)]
FN --> PG
APP --> STORAGE[Supabase Storage + Policies]
APP --> RT[Supabase Realtime]
FN --> PAYMENT[Payment Provider]
FN --> NOTIFY[Email / SMS / WhatsApp Provider]
PAYMENT -->|verified webhook| FN
APP --> OBS[Error Monitoring]
```

## Container Responsibilities

- Browser holds no service-role/database credential; it sends user intent and renders authorized data.
- Data API is for RLS-protected access; Edge Functions orchestrate secret-bearing or multi-step commands.
- PostgreSQL enforces constraints, transactions, RLS, and durable audit/outbox.
- Storage/Realtime policies mirror parent record scope; events are hints that trigger refetch.
- Provider calls have idempotency/reconciliation; monitoring scrubs PII/medical values.

Note: no separate queue technology is selected; an outbox/async mechanism is a logical requirement where needed, while implementation choice remains an ADR/open decision.

