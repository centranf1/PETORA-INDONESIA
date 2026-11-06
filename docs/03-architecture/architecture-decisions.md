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

Ringkasan ini menunjuk ke ADR canonical. Tidak ada decision pada repository yang sudah disetujui; seluruh status tetap Draft/Proposed sampai owner memberikan approval tertulis.

## ADR-01

Proposed modular monolith; lihat [ADR-0001](adr/ADR-0001-monolithic-modules.md).

## ADR-02

Proposed Supabase Auth + PostgreSQL/RLS; lihat [ADR-0002](adr/ADR-0002-supabase-authorization.md).

## ADR-03

Proposed server-side critical workflows; lihat [ADR-0003](adr/ADR-0003-server-side-critical-workflows.md).

## ADR-04

React/TypeScript/Vite dan supporting stack adalah baseline dari AGENTS.md attachment; code/config belum ada untuk verifikasi. Hosting/router/CI choices memerlukan approval/implementation ADR.

## ADR-05

Audit actor/timestamp/reason adalah security requirement dari README; format/retention dibahas pada security/database docs dan exact retention masih open decision. Ini bukan keputusan terpisah yang sudah diterima.

## Decision Governance

Jika proposal berubah, update ADR status, decision owner/date, consequences, and links. Architecture decision tidak menyatakan implementation exists until repository/environment evidence confirms it.

