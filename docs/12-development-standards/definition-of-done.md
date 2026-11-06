---
title: Definition of Done
document_id: PET-DOC-1203
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['definition-of-ready.md']
---

# Definition of Done

DoD berlaku pada feature, defect, migration, dan dokumentasi; “merged” tidak otomatis berarti “production-ready”.

## Required

Semua acceptance criteria lulus dan bukti terhubung ke requirement/test ID; happy, validation, denial, concurrency/retry cases sesuai risiko dites; data contract/API/error/permissions terdokumentasi; observability/audit/support path tersedia; UX loading/empty/error/forbidden/accessibility ditangani; migration/rollback dan release notes tersedia bila relevan; tidak ada blocker security/data integrity atau open decision tersembunyi; product owner menerima hasil UAT bila diperlukan.

## Quality gate

Lint, type-check, build, unit, integration, RLS, and E2E checks yang diwajibkan CI lulus; docs links/diagrams/metadata diperiksa; secrets tidak terpapar; database/schema/ERD/dictionary/RLS/index/migration docs sinkron; feature flag/config defaults aman. Test execution evidence harus berasal dari runner, bukan check list manual yang belum dijalankan.

## Production Readiness

Release owner menyetujui deployment, backup/restore point, rollback/failure response, monitoring alerts, support instructions, and affected users/branches. Numeric SLO atau compliance claim hanya bila disepakati dan dibuktikan.

## Related Documents

- [Definition of Ready](definition-of-ready.md)
- [CI/CD pipeline](../10-devops/ci-cd-pipeline.md)

