---
title: Architecture Decision Records
document_id: PET-DOC-0310
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../architecture-decisions.md']
---

# Architecture Decision Records

ADR mencatat keputusan arsitektur dengan status eksplisit. Semua ADR dalam repository saat ini berstatus Draft/Proposed dan belum disetujui stakeholder; status tidak berubah menjadi Accepted tanpa approval yang tercatat.

- [ADR-0001: Modular Monolith](ADR-0001-monolithic-modules.md)
- [ADR-0002: Supabase Authorization Model](ADR-0002-supabase-authorization.md)
- [ADR-0003: Server-side Critical Workflows](ADR-0003-server-side-critical-workflows.md) (proposed)

## ADR Lifecycle

Status yang diizinkan: Proposed, Accepted, Rejected, Superseded. Dokumen berisi Context, Decision, Options, Consequences, Security/Operational impact, Follow-up, owner, tanggal keputusan, dan related ADR. Accepted membutuhkan bukti approval; superseded ADR tetap disimpan.

## Adding an ADR

Buat satu file `ADR-NNNN-short-kebab-title.md`, pilih nomor berikutnya, tautkan pada architecture-decisions.md, dan dokumentasikan trade-off serta migration path. Jangan menimpa keputusan lama; buat ADR baru yang menandai relasi `supersedes` bila pilihan berubah.
