---
title: ADR 0002: Supabase Authorization Model
document_id: PET-ADR-0002
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md']
---

# ADR 0002: Supabase Authorization Model

## Status
Accepted

## Context
Multi-tenant organization and branch access require row-level security supporting role and permission checks.

## Decision
Use Supabase Auth + PostgreSQL RLS + Edge Functions for all critical workflow checks.

## Consequences
This enforces organization isolation and reduces exposure of service role credentials to frontend clients.
