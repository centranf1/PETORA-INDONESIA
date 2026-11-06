---
title: Git Workflow
document_id: PET-DOC-1002
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['branching-strategy.md']
---

# Git Workflow

Git workflow target menggunakan protected `main`, short-lived change branches, dan pull request review. Repository belum memiliki source/app-specific policy file; aturan ini perlu diaktifkan melalui branch protection saat implementasi.

## Flow

1. Sinkronkan `main` dan buat branch pendek `feat/<scope>`, `fix/<scope>`, `docs/<scope>`, atau `hotfix/<scope>`.
2. Buat perubahan satu tujuan, sertakan test/docs/migration yang relevan, dan push ke remote.
3. Buka PR yang menautkan requirement/issue, ringkasan risiko, test evidence, screenshot bila UI, dan rollout/rollback note bila perlu.
4. Tunggu required checks/review; selesaikan feedback dan hindari force-push yang menghilangkan audit diskusi tanpa koordinasi.
5. Squash/rebase merge sesuai kebijakan tim, hapus branch, tag release dari commit yang sudah lulus gate.

## Branch Policy

No direct push to protected `main`; minimal satu reviewer independen untuk perubahan produk, dua review/security-owner untuk auth/RLS/secret/finance/medical high-risk sesuai final branch policy. Required CI, CODEOWNERS/domain review, signed deployment approval, and protected environment secrets harus diaktifkan.

## Artifact Rule

Schema/config changes include versioned migration, ERD/data dictionary/RLS update, compatibility and rollback plan. Jangan commit generated secrets, local database dumps, real customer/patient data, or `.env` values.

## Related Documents

- [Branching strategy](branching-strategy.md)
- [Commit conventions](commit-conventions.md)
- [Pull request guidelines](../12-development-standards/pull-request-guidelines.md)

