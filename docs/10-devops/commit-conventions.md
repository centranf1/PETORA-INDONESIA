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

Gunakan format Conventional Commits: `<type>(<scope>): <imperative summary>`; breaking API/schema change memakai footer `BREAKING CHANGE:`.

| Type | Meaning |
| --- | --- |
| `feat` | Perilaku/fitur baru |
| `fix` | Perbaikan bug dengan regression coverage |
| `docs` | Dokumentasi saja |
| `refactor` | Struktur tanpa perubahan perilaku yang disengaja |
| `test` | Test/fixtures |
| `build` / `ci` | Toolchain atau pipeline |
| `perf` | Perubahan performa yang disertai bukti benchmark |
| `security` | Hardening/security fix, tanpa membocorkan detail sensitif pada subject |

Scope memakai nama domain kecil seperti `pos`, `inventory`, `clinical`, `auth`, `settings`, `docs`. Contoh: `fix(pos): keep checkout retry idempotent`.

## Rule

Commit harus menggambarkan satu perubahan koheren, menyertakan alasan melalui issue/PR reference, dan tidak memasukkan secret, generated output, atau file unrelated. Subject ringkas menggunakan imperative mood; detail berisiko/security dijelaskan melalui channel review terkontrol, bukan secret/log payload.

## Validation

Sebelum commit, review `git diff`, jalankan check relevan, pastikan file staging sesuai task, dan cari secret/temporary output. Jangan amend/rewrite shared history setelah push tanpa koordinasi. Commit signing requirement dan release tag format menunggu keputusan repository owner.

## Related Documents

- [Git Workflow](git-workflow.md)
- [Branching Strategy](branching-strategy.md)
- [Pull Request Guidelines](../12-development-standards/pull-request-guidelines.md)

