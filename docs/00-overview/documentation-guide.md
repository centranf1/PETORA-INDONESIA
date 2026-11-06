---
title: Documentation Guide
document_id: PET-DOC-0005
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['project-overview.md']
---

# Documentation Guide

Panduan ini menetapkan cara membaca dan memelihara dokumentasi PETORA. Dokumen ini menjadi satu-satunya sumber resmi untuk status, istilah, traceability, dan validasi paket docs; aplikasi atau database aktual tetap menjadi bukti implementasi ketika tersedia.

## Evidence Categories

- **Product requirement**: eksplisit pada README.md. Core scope ada di bagian 4; rekomendasi ada di bagian 5.
- **Existing implementation**: hanya boleh dinyatakan setelah diverifikasi di source code, migration, konfigurasi, atau lingkungan berjalan.
- **Derived requirement**: kontrol teknis yang diperlukan untuk memenuhi kebutuhan bisnis; jelaskan alasan dan hubungan requirement.
- **Recommendation**: usulan yang belum menjadi komitmen; tandai jelas dan jangan masukkan sebagai release scope final.
- **Assumption**: sementara untuk menguraikan desain; catat pemilik validasi dan dampak bila salah.
- **Open decision**: keputusan yang menunggu stakeholder, dicatat di [open decisions register](../13-traceability/open-decisions.md).

## Document Status and Metadata

Gunakan status `Draft`, `In Review`, `Approved`, atau `Deprecated`. `Approved` hanya boleh dicantumkan setelah owner menyetujui secara eksplisit; tanggal update bukan bukti approval. Setiap dokumen memiliki `title`, `document_id` unik, `status`, `version`, `owner`, `last_updated`, dan `related_documents`. File non-standar yang tidak relevan harus dijelaskan di guide, bukan dibiarkan kosong.

## Required Structure

Gunakan bagian Purpose, Scope, Definitions, Requirements, Detailed Specification, Workflow, Data/Validation, Error Handling, Security, Dependencies, Acceptance Criteria, Related Documents, Assumptions, dan Open Decisions sesuai topik. Setiap contoh SQL/config/API yang belum diterapkan diberi label **rancangan/contoh** dan diuji sebelum dianggap implementable.

## Change Governance

- Perubahan fitur: PRD, feature catalog, workflow, acceptance criteria, UI/API/data mapping, tests, and roadmap/backlog status.
- Perubahan permission/security: roles, permission matrix, RLS policy, threat model, security tests, and audit requirements.
- Perubahan schema: database design, ERD, data dictionary, RLS matrix, migration/rollback, and test fixtures.
- Perubahan API/integration: API contract, Edge Function, auth/error handling, idempotency, monitoring, and contract tests.
- Perubahan arsitektur: ADR baru/updated dengan context, options, decision, consequences, status, dan superseded links.
- Perubahan operasional: deployment, runbook, incident/troubleshooting, backup/restore, and user/admin manuals.

## Traceability Rule

Setiap core requirement PET-REQ-001..018 harus terhubung ke PET-FTR, workflow/domain, logical data tables, API/function, UI surface, acceptance criteria, dan test ID. Extension PET-REQ-019..031 tetap ditandai recommended sampai disetujui. ID tidak boleh diubah atau digunakan ulang tanpa memperbarui semua referensi dan dokumentasikan migration ID.

## Quality Rule

Tautan lokal, diagram Mermaid, ID coverage, metadata, dan claim status harus diperiksa sebelum menyatakan paket valid. Jangan menyebut test passed/implementation complete tanpa output pemeriksaan aktual. Hindari menyalin isi yang mudah drift; gunakan tautan menuju dokumen sumber. Dokumen yang belum diverifikasi terhadap implementasi harus menyebutkan batas tersebut.

## Current Repository Evidence

Pada pemeriksaan working tree ini, file di root adalah README.md dan direktori docs/. AGENTS.md tersedia sebagai instruksi sesi/attachment tetapi tidak ada sebagai file lokal. Source application, migration, CI workflow, package manifest, serta executable test suite belum ditemukan. Karena itu stack/schema di docs adalah target/rancangan dan tidak membuktikan aplikasi siap deploy.

