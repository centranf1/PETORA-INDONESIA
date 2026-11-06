---
title: Architecture Decisions
document_id: PET-DOC-0309
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['adr/README.md']
---

# Architecture Decisions

Dokumen ini mencatat keputusan utama yang mendasari rancangan PETORA.

## ADR-01

Modular monolith is the baseline to keep domain boundaries simple while supporting multi-branch complexity.

## ADR-02

Supabase Postgres + RLS is selected because it fits multi-tenant organization and branch security needs.

## ADR-03

Sensitive business flows are executed in Edge Functions or database transactions, not client-side.

## ADR-04

Frontend uses React + TypeScript and shared state patterns to keep maintainability and testability.

## ADR-05

Audit log must record every change with actor, timestamp, and reason.

