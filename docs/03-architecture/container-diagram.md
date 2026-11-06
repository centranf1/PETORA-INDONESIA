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

Diagram container mengilustrasikan penyebaran platform.

## Containers

Web app (React/Vite), API layer (Supabase PostgREST + Edge Functions), Database (PostgreSQL), Storage, Realtime, Auth, Monitoring, and External services.

## Deployment Base

Frontend can run on Vercel or Cloudflare Pages; backend and database on Supabase; monitoring via Sentry or equivalent.

## Mermaid

```mermaid
flowchart TB
A[Browser / Mobile Web] --> B[Frontend App]
B --> C[Supabase Auth]
B --> D[Supabase REST / GraphQL]
D --> E[Edge Functions]
E --> F[(PostgreSQL)]
E --> G[Storage]
E --> H[Realtime]
E --> I[External Gateway]
B --> J[Sentry]
```

