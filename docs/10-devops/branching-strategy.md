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

Strategi target adalah trunk-oriented: satu branch protected `main`, change branch berumur pendek, dan immutable release tag. Hindari branch `release` jangka panjang kecuali kebutuhan regulasi/release cadence membenarkannya.

## Branches

`main`, `feat/<scope>`, `fix/<scope>`, `docs/<scope>`, dan `hotfix/<scope>`. Nama scope singkat dan kebab-case; hindari branch bersama yang menampung beberapa perubahan domain.

## Release Pattern

Feature/fix/docs branches merge ke `main` setelah PR gate. Deploy `main` ke staging; production dipromosikan dari commit/tag yang sama setelah approval, bukan rebuild dari branch berbeda yang tidak tervalidasi. Hotfix dibuat dari `main`, dites, di-merge kembali, dan diberi tag patch. Branch protection, tag format, dan approval count perlu dikonfigurasi di hosting Git.

## Related Documents

- [Git workflow](git-workflow.md)
- [CI/CD pipeline](ci-cd-pipeline.md)

