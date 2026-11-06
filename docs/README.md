---
title: PETORA Documentation Index
document_id: PET-DOC-0000
status: Draft
version: 1.1
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../README.md', '../AGENTS.md', '00-overview/documentation-guide.md', '13-traceability/documentation-completeness-report.md']
---

# PETORA Documentation Index

Dokumen ini adalah indeks dan peta baca dokumentasi engineering PETORA. Sumber ruang lingkup produk adalah README.md di root; aturan kerja AI/agent ada pada AGENTS.md.

## Mandatory Reading Order

Untuk setiap task implementasi, AI/agent wajib:

1. Membaca seluruh [AGENTS.md](../AGENTS.md) dan [README.md](../README.md).
2. Membaca [documentation guide](00-overview/documentation-guide.md), [open decisions](13-traceability/open-decisions.md), dan [completeness report](13-traceability/documentation-completeness-report.md).
3. Membaca dokumen domain dan dokumen teknis yang relevan dengan requirement, lalu mengikuti cross-reference sampai batas implementasi jelas.
4. Memperbarui dokumen terkait dan traceability saat perilaku berubah.

Pembacaan seluruh dokumen dibutuhkan untuk perubahan lintas domain; untuk task sempit, baca seluruh dokumen terkait beserta dependensinya. Jangan mengklaim telah membaca semua dokumentasi jika belum dilakukan.

## Objective
PETORA merupakan sistem manajemen petshop dan pet care yang terintegrasi. Dokumentasi ini berfungsi sebagai baseline untuk arsitektur, bisnis, database, security, operasi, dan maintenance.

## Documentation Map

| Area | Description | Key documents |
| --- | --- | --- |
| Overview | Gambaran umum project dan pedoman dokumentasi | [00-overview/project-overview.md](00-overview/project-overview.md) |
| Product | PRD, SRS, feature catalog, backlog | [01-product/product-requirements-document.md](01-product/product-requirements-document.md) |
| Business Analysis | Workflow, peran, permission, use cases | [02-business-analysis/business-overview.md](02-business-analysis/business-overview.md) |
| Architecture | Arsitektur aplikasi, boundary modul, dan keputusan teknis | [Software Architecture Document](03-architecture/software-architecture-document.md), [ADR Index](03-architecture/adr/README.md) |
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

## Reading by Change Type

| Change type | Minimum documents to review |
| --- | --- |
| Product behavior or scope | README, PRD, SRS, feature catalog, business rules/processes, acceptance criteria, open decisions |
| Roles, tenant or branch access | user roles, permission matrix, authentication/authorization, database RLS, security architecture, security tests |
| Schema or data lifecycle | database design, data dictionary, conventions, migration guide, RLS, transaction integrity, retention |
| API or business workflow | API specification, backend architecture, business logic, edge functions, error handling, integration tests |
| Frontend or interaction | frontend architecture, routing, state/data fetching, form validation, UI design/accessibility, page specifications |
| External integrations or secrets | integration architecture/guide, secrets management, environment configuration, monitoring, incident response |
| Release or operations | CI/CD, deployment, backup/recovery, rollback, maintenance, administrator/user manuals |

## Document Status and Authority

- Documents remain Draft until approved by the designated business, product, security, or engineering owner.
- README defines baseline product scope; detailed docs define proposed implementation contracts.
- Open decisions and examples are not approved production policy.
- When documents conflict, do not silently select behavior that changes material business outcomes; record the conflict and resolve it through the decision owner.

## Status
- Status validasi dokumen: Draft
- Sumber utama: README.md
- Pembatasan: dokumen ini mencatat asumsi dan open decision bila informasi belum final
- Kesiapan implementasi: belum dinyatakan siap produksi; lihat [completeness report](13-traceability/documentation-completeness-report.md) untuk audit dan gap.

## Related Files
- [README.md](../README.md)
- [AGENTS.md](../AGENTS.md)
- [Documentation Guide](00-overview/documentation-guide.md)
- [Open Decisions](13-traceability/open-decisions.md)
