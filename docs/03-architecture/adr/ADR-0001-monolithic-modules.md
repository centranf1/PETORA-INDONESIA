---
title: ADR 0001: Modular Monolith for PETORA
document_id: PET-ADR-0001
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md']
---

# ADR 0001: Modular Monolith for PETORA

## Status
Proposed (Draft; belum disetujui)

## Context
PETORA covers many domains but it remains a single business platform and must minimize coordination complexity.

## Decision
Gunakan modular monolith pada tingkat aplikasi/database: domain modules memiliki ownership, contract, query/write boundary, dan tests terpisah tetapi menggunakan baseline deployment yang dikelola sebagai satu platform.

## Options Considered

- Microservices per domain: ditolak sebagai baseline karena belum ada kebutuhan deployment independence/scale team yang terukur dan menambah distributed transaction/operations burden.
- Single unstructured application: ditolak karena feature/permission/data ownership sulit dijaga lintas 33 core modules.
- Modular monolith: dipilih sebagai proposal dengan domain boundary eksplisit, server-side command, dan extraction path bila ada evidence.

## Consequences
Benefit: transaksi lokal dan konsistensi data lebih mudah dikelola, deployment/observability lebih sederhana. Trade-off: domain coupling dan shared database berisiko; wajib enforce ownership, avoid cross-module direct writes, document events/API, and test dependency graph.

## Follow-up

Owner domain, package/schema boundary, event contract, and criteria to revisit microservices must be set during implementation design.
