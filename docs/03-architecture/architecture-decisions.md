---
title: Architecture Decisions
document_id: PET-DOC-0309
status: Approved
version: 1.1
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['adr/README.md']
---

# Architecture Decisions

Stack teknologi ditetapkan: frontend React + TypeScript, backend Supabase (Postgres + RLS + Edge Functions), arsitektur modular monolith. Status Approved oleh product owner.

## Approval Status

ADR-01 sampai ADR-05 disetujui sebagai baseline arsitektur. Implementasi belum dimulai.

## ADR-01

Modular monolith is the proposed baseline to keep domain boundaries simple while supporting multi-branch complexity.

## ADR-02

Supabase Postgres + RLS is proposed because it fits multi-tenant organization and branch security needs; claim shape, assignment resolver, and service-role boundary remain subject to security review.

## ADR-03

Sensitive business flows are executed in Edge Functions or database transactions, not client-side.

## ADR-04

Frontend uses React + TypeScript and shared state patterns to keep maintainability and testability.

## ADR-05

Audit log must record every change with actor, timestamp, and reason.

