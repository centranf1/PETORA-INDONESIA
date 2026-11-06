---
title: Branching Strategy
document_id: PET-DOC-1003
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['git-workflow.md']
---

# Branching Strategy

Strategi cabang yang sesuai untuk tim.

## Proposed Branch Model

Gunakan trunk-based development dengan short-lived branches dari `main`; branch model ini Draft sampai repository protection dan CI dikonfigurasi.

| Branch | Purpose | Rule |
| --- | --- | --- |
| `main` | Integrasi kode yang siap deploy ke staging | Protected; merge lewat PR dan required checks |
| `feature/<issue>-<short-name>` | Capability baru | Umur pendek, satu scope, rebase/merge sesuai repo setting |
| `fix/<issue>-<short-name>` | Bug fix | Sertakan regression test dan link incident bila ada |
| `docs/<issue>-<short-name>` | Dokumentasi saja | Validasi link/metadata/ID dan review domain |
| `hotfix/<issue>-<short-name>` | Perbaikan urgent pada release aktif | Domain/security owner approval, post-incident review wajib |
| `release/*` | Tidak dipakai dalam trunk-based default | Hanya dibuat bila release governance menyetujui maintenance branch |

## Release Pattern

Merge melalui PR setelah rebase/merge main sesuai kebijakan repo, resolve conflict tanpa menghapus perubahan rekan, dan jalankan ulang checks. Tag release yang immutable mengacu pada commit/artifact yang benar-benar deploy. Hotfix dimulai dari commit release yang terdampak bila ada versi production terpisah, lalu forward-merge ke main agar fix tidak hilang. Nama dan alur dapat disesuaikan setelah CI/branch protection tersedia.

## Branch Lifecycle

1. Update `main` dan buat branch pendek dengan issue/requirement ID.
2. Commit perubahan yang berhubungan dan jalankan checks lokal.
3. Buka PR draft saat kontrak belum siap review; tandai Ready hanya setelah Definition of Ready/PR checklist dipenuhi.
4. Merge dengan strategi repo yang disetujui; hapus branch setelah merge.
5. Untuk hotfix, catat incident, risiko, approval, validation minimum dan follow-up review.

## Protection Requirements

Protect `main` from force-push/deletion; require status checks, reviewer approval, code owner review for security/schema areas, and no secret-bearing untrusted workflow. Exact GitHub settings remain deployment-owner work.

## Related Documents

- [Git Workflow](git-workflow.md)
- [Commit Conventions](commit-conventions.md)
- [CI/CD Pipeline](ci-cd-pipeline.md)

