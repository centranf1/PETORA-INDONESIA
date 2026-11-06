---
title: PETORA Documentation Index
document_id: PET-DOC-0000
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../README.md', '00-overview/documentation-guide.md']
---

# PETORA Documentation Index

Dokumen ini adalah indeks sumber utama dokumentasi engineering PETORA.

## Objective
PETORA merupakan sistem manajemen petshop dan pet care yang terintegrasi. Dokumentasi ini berfungsi sebagai baseline untuk arsitektur, bisnis, database, security, operasi, dan maintenance.

## Documentation Map

| Area | Description | Key documents |
| --- | --- | --- |
| Overview | Gambaran umum project dan pedoman dokumentasi | [00-overview/project-overview.md](00-overview/project-overview.md) |
| Product | PRD, SRS, feature catalog, backlog | [01-product/product-requirements-document.md](01-product/product-requirements-document.md) |
| Business Analysis | Workflow, peran, permission, use cases | [02-business-analysis/business-overview.md](02-business-analysis/business-overview.md) |
| Architecture | Arsitektur aplikasi dan sistem | [03-architecture/software-architecture-document.md](03-architecture/software-architecture-document.md) |
| Database | Relational design, ERD, RLS | [04-database/database-design.md](04-database/database-design.md) |
| Backend | API, business logic, edge functions | [05-backend/backend-architecture.md](05-backend/backend-architecture.md) |
| Frontend | React, routing, state, standards | [06-frontend/frontend-architecture.md](06-frontend/frontend-architecture.md) |
| UI/UX | Design system and page specs | [07-ui-ux/design-guidelines.md](07-ui-ux/design-guidelines.md) |
| Security | RLS, auth, audit, threat model | [08-security/security-architecture.md](08-security/security-architecture.md) |
| Testing | Strategy and test scenario | [09-testing/test-strategy.md](09-testing/test-strategy.md) |
| DevOps | CI/CD, deployment, monitoring | [10-devops/environment-configuration.md](10-devops/environment-configuration.md) |
| Operations | Troubleshooting and manuals | [11-operations/operational-guidelines.md](11-operations/operational-guidelines.md) |
| Standards | Engineering and change management | [12-development-standards/engineering-handbook.md](12-development-standards/engineering-handbook.md) |
| Traceability | Requirement mapping and completeness | [13-traceability/requirements-traceability-matrix.md](13-traceability/requirements-traceability-matrix.md) |

## Important Baseline Documents

- [Canonical product requirements](01-product/product-requirements-document.md) uses PET-REQ-001..018 for core scope.
- [Feature catalog](01-product/feature-catalog.md) defines PET-FTR-001..033 as README core and PET-FTR-034..046 as recommended extensions.
- [Requirements traceability matrix](13-traceability/requirements-traceability-matrix.md) links features, workflows, logical data, API/UI, and test IDs.
- [Open decisions](13-traceability/open-decisions.md) records unresolved stakeholder choices; recommendations there are not approved policy.
- [Documentation completeness report](13-traceability/documentation-completeness-report.md) reports validation evidence and known gaps.

## Status
- Status validasi dokumen: Draft
- Sumber utama: README.md
- Pembatasan: dokumen ini mencatat asumsi dan open decision bila informasi belum final
- Implementation note: repository source, migration, CI, and runnable test suite must be inspected before treating the target stack/design as implemented.

## Related Files
- [README.md](../README.md)

Catatan: aturan kerja AGENTS.md diberikan sebagai instruksi sesi dan tidak tersedia sebagai file di working tree yang diperiksa.
