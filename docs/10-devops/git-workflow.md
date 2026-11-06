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

Panduan git workflow PETORA.

## Flow

Default proposal: trunk-based workflow with short-lived topic branch from latest `main`, PR review, required status checks, and merge back to `main`. Do not keep long-lived feature branches that drift from schema/API changes. Release/maintenance branches are optional only if the release owner approves a support need.

## Branch Policy

No direct push, force-push, or branch deletion for protected `main`. PRs require linked requirement/issue, scoped diff, domain/security review where applicable, required checks and a documented release/migration impact. Resolve reviews and rerun checks after changes.

## Artifact Rule

Schema changes require versioned migration, dictionary/ERD/RLS update, clean/upgrade test and recovery plan. Runtime configuration changes use the approved settings workflow and never rely on manual production edits. CI/release artifacts must identify commit SHA and build digest.

## Safe Daily Commands

- Start by reviewing `git status --short` and reading existing edits in affected files.
- Pull/rebase latest `main` according to repository policy; resolve conflicts by preserving both intent and tests.
- Inspect `git diff --check` and staged diff before commit; stage only task-related files.
- Do not use destructive reset/checkout to clean a worktree with user changes.
- Never commit secrets, local env files, customer data, database dumps, or unreviewed generated files.

## Merge and Release

Use the repository-configured merge method; avoid rewriting shared history. After merge, verify CI result, deployment artifact and smoke status. Tag/release approval rules remain open until the release owner defines them.

## Related Documents

- [Branching Strategy](branching-strategy.md)
- [Commit Conventions](commit-conventions.md)
- [CI/CD Pipeline](ci-cd-pipeline.md)

