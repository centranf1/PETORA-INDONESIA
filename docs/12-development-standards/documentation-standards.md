---
title: Documentation Standards
document_id: PET-DOC-1206
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['engineering-handbook.md']
---

# Documentation Standards

Standar ini menjaga dokumentasi sebagai kontrak yang dapat dirawat dan diverifikasi, bukan status implementation tanpa bukti.

## Format

Gunakan metadata front matter sesuai template di [documentation guide](../00-overview/documentation-guide.md), judul/heading konsisten, tabel untuk mapping, fenced code dengan language identifier, Mermaid untuk workflow/architecture yang memang memperjelas behavior, dan relative link ke source of truth. Jangan membuat file kosong atau menyalin tabel yang sama ke banyak dokumen tanpa alasan.

## Language

Use Bahasa Indonesia for project docs and English for technical terms when appropriate.

## Quality

Labeli requirement vs derived requirement vs recommendation vs assumption vs implementation evidence. Open decision ada di register pusat. SQL/API/diagram yang belum diverifikasi diberi status rancangan. Hindari credential, PII, copied provider docs yang tidak perlu, numeric SLA/legal retention yang belum disetujui, dan claim “validated/implemented” tanpa bukti.

## Review Checklist

- Check metadata, owner, status, version, date, and related links.
- Validate local Markdown links, table shape, fenced code, Mermaid syntax, IDs and mappings.
- Update downstream docs affected by feature, schema, permission, API, release, or incident change.
- Review Indonesian terminology and consistent domain vocabulary.
- Record decision and ADR where architecture changes materially.

