---
title: Commit Conventions
document_id: PET-DOC-1004
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['git-workflow.md']
---

# Commit Conventions

Konvensi commit memudahkan tracking dan review.

## Format

Gunakan `type(scope): imperative summary` (Conventional Commits sebagai rekomendasi): `feat(pos): support mixed payment`, `fix(inventory): reject duplicate transfer`, `docs(auth): clarify branch scope`, `test(rls): cover cross-tenant denial`, `chore(ci): pin tool versions`.

## Rule

Commit satu tujuan, summary singkat, alasan/requirement dapat ditelusuri lewat PR, dan jangan campur generated artifacts/secrets. Gunakan tipe yang konsisten: `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `chore`, `revert`. Format belum otomatis enforced; pilih commit lint/tool saat repository implementasi tersedia.

Breaking public/API/schema changes may include `!` and a migration note in the PR; commit message alone is not the migration/approval record. Avoid force-push after review approval unless coordinated. Do not include production data dumps, `.env`, provider credentials, or generated build artifacts. Commit format is a recommendation until lint/tool configuration is approved.

