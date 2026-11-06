---
title: Backend Architecture
document_id: PET-DOC-0501
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['api-specification.md', 'authentication-authorization.md']
---

# Backend Architecture

Dokumen backend menjelaskan fungsi server-side dan pola integrasi PETORA.

## Primary Components

Supabase PostgREST, Edge Functions, Auth, Storage, Realtime, and Postgres triggers/procedures.

## Server-side Business Logic

Use edge functions for payment capture, stock adjustment approval, journal balancing, prescription validation, and external integrations.

## Design Pattern

Domain services are invoked through API endpoints. Frontend issues commands and receives results; server verifies actor, scope, and data integrity.

## Key Rule

Never trust browser-provided organization_id or branch_id; verify against authenticated identity and policy.

