---
title: Pull Request Guidelines
document_id: PET-DOC-1205
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['code-review-guidelines.md']
---

# Pull Request Guidelines

PR harus berupa unit perubahan yang dapat direview, dites, dan di-rollback; jangan gunakan label draft untuk melewati branch protection.

## PR Requirements

Cantumkan requirement/feature/test IDs, status core/recommendation, masalah/perilaku sebelum-sesudah, domain/API/schema/UI impact, risk/security/privacy, evidence test command/output, migration/data/backfill compatibility, monitoring/release/rollback notes, open decisions, dan screenshot/video untuk UI yang membantu reviewer. Break down PR jika diff mencampur domain.

## Checklist

- [ ] Acceptance criteria dan negative cases tercakup.
- [ ] Permission/RLS dan tenant/branch scope tervalidasi.
- [ ] Transaction, idempotency, audit, retry/reconciliation diperiksa sesuai domain.
- [ ] Migrations, ERD/data dictionary, API, tests, and docs diperbarui.
- [ ] No secrets, real PII/medical data, debug bypass, or unrelated generated files.
- [ ] Accessibility/responsive/error states diperiksa untuk perubahan UI.
- [ ] Runbook, telemetry, rollback, and deployment dependency dicatat.

## Approval

Reviewer harus independen dari author untuk perubahan high-risk; domain/security/DB owner review ditentukan berdasarkan CODEOWNERS/policy setelah repository bootstrap. Tidak ada merge dengan critical comment belum selesai atau waived secara formal.

