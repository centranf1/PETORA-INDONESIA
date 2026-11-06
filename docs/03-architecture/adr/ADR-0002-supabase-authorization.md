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
Proposed (Draft; belum disetujui)

## Context
Multi-tenant organization and branch access require row-level security supporting role and permission checks.

## Decision
Gunakan Supabase Auth untuk identitas, PostgreSQL RLS untuk row-level tenant/branch enforcement, dan Edge Functions/database functions untuk command yang butuh secret, approval, or multi-table integrity. Client-visible roles tidak menjadi sumber otorisasi final; actor diturunkan melalui `auth.uid()` dan trusted membership.

## Options Considered

- Client-only role checks: ditolak karena dapat dimanipulasi dan tidak mengamankan direct API access.
- Backend-only authorization without RLS: ditolak karena direct Data API/view/Realtime paths dapat terlewat.
- Auth + RLS + server command: dipilih sebagai target defense-in-depth; service-role path tetap berisiko karena bypass RLS dan harus dibatasi.

## Consequences
RLS policies dan integration tests menjadi release gate; membership schema, function owner/search_path, cache/session revocation, and custom claim trust must be reviewed. Service role hanya server-side. Decision belum diterima dan perlu security architecture review.

## Follow-up

Validasi helper RLS, organization membership cardinality, role/branch scope, Storage/Realtime policies, and production service-role use before implementation.
