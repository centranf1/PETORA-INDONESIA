---
title: Open Decisions
document_id: PET-DOC-1305
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['requirements-traceability-matrix.md', '../01-product/product-requirements-document.md', '../03-architecture/architecture-decisions.md']
---

# Open Decisions

Daftar keputusan yang masih perlu persetujuan stakeholder.

## Business and Technical Decision Register

| Decision ID | Decision Required | Interim Position (Not Approved) | Accountable Owner | Related Documents |
| --- | --- | --- | --- | --- |
| PET-OD-001 | Final role/permission matrix and own/branch/all/assigned-record scope, including customer/clinical/payroll access | Use least privilege and fail-closed authorization; do not grant broad access based on role label alone. | Business Owner / Security Owner | [Permission matrix](../02-business-analysis/permission-matrix.md), [RLS policies](../04-database/rls-security-policies.md) |
| PET-OD-002 | Applicable tax rules, legal obligations, and fiscal document requirements | Keep tax configuration explicit and do not infer rates or compliance status. | Finance Owner / Legal or Tax Advisor | [PRD](../01-product/product-requirements-document.md), [Feature Catalog](../01-product/feature-catalog.md) |
| PET-OD-003 | Payment, email, SMS, and WhatsApp providers and their operational contracts | Keep providers behind integration boundaries; provider selection, fees, webhook rules, and SLA remain TBD. | Product Owner / Finance Owner / Operations Owner | [Integration Guide](../05-backend/integration-guide.md), [Integration Architecture](../03-architecture/integration-architecture.md) |
| PET-OD-004 | Retention, archival, legal hold, export, and disposal periods for medical, finance, payroll, customer, and audit data | Preserve records until legal/business policy is approved; do not invent retention durations. | Compliance Owner / Business Owner | [Data Retention Policy](../04-database/data-retention-policy.md), [Data Protection](../08-security/data-protection.md) |
| PET-OD-005 | Measurable availability, latency, throughput, concurrency, capacity, RPO, and RTO targets | Instrument and test critical paths; numeric SLO/recovery commitments remain TBD. | Product Owner / Engineering Owner / Operations Owner | [SRS](../01-product/software-requirements-specification.md), [Performance Testing](../09-testing/performance-testing.md), [Backup Recovery](../10-devops/backup-recovery.md) |
| PET-OD-006 | Product release phases, P0/P1/P2 sequencing, pilot branches, and go-live sign-off | Treat roadmap phases as proposals, not delivery commitments. | Product Owner / Business Owner | [Product Roadmap](../01-product/product-roadmap.md), [Feature Backlog](../01-product/feature-backlog.md) |
| PET-OD-007 | Source and lifecycle of signed authorization claims, branch switching, and role revocation latency | Use server-managed authorization context, validate assignment, fail closed, and document claim refresh before implementation. | Security Owner / Engineering Owner | [Authentication and Authorization](../05-backend/authentication-authorization.md), [ADR-0002](../03-architecture/adr/ADR-0002-supabase-authorization.md) |
| PET-OD-008 | Deployment provider, environment ownership, secrets ownership, and production support responsibility | Keep deployment/provider choice open until operations and security review. | Engineering Owner / Operations Owner | [Deployment Guide](../10-devops/deployment-guide.md), [Environment Configuration](../10-devops/environment-configuration.md) |
| PET-OD-009 | Exact bank reconciliation workflow, approval limits, and close-period exceptions | Require reconciliation evidence and audit; threshold and workflow are not final. | Finance Owner / Accounting Owner | [Business Rules](../02-business-analysis/business-rules.md), [Accounting requirements](../01-product/product-requirements-document.md) |
| PET-OD-010 | Discount stacking, loyalty expiry, shift configuration, and customer portal visibility rules | Keep rules configurable only within validated, allowlisted policy; exact values require product/business approval. | Product Owner / Operations Owner | [Business Rules](../02-business-analysis/business-rules.md), [Open Settings Decisions](#dynamic-settings-governance) |

## Dynamic Settings Governance

| Decision ID | Decision Required | Interim Recommendation (Not Approved) | Owner | Related Documents |
| --- | --- | --- | --- | --- |
| PET-OD-SET-001 | Apakah pembuat perubahan boleh menyetujui usulannya sendiri? | Larang self-approval untuk policy finance, inventory, clinical, dan security; tentukan pengecualian secara eksplisit bila diperlukan. | Business Owner / Product Owner | [Page specifications](../07-ui-ux/page-specifications.md), [Administrator manual](../11-operations/administrator-manual.md) |
| PET-OD-SET-002 | Role apa yang dapat membaca, mengubah, dan menyetujui setting per kategori? | Tetapkan permission per aksi dan kategori, terpisah dari akses umum ke dashboard; validasi di server dan RLS. | Business Owner / Security Owner | [Security policies](../08-security/security-policies.md), [Permission matrix](../02-business-analysis/permission-matrix.md) |
| PET-OD-SET-003 | Apakah scope `global` diperlukan, mengingat model tenant organisasi? | Batasi scope ke organization dan branch sampai kebutuhan global serta boundary tenant disepakati. | Product Owner / Architect | [Page specifications](../07-ui-ux/page-specifications.md), [Database design](../04-database/database-design.md) |
| PET-OD-SET-004 | Siapa yang dapat mendaftarkan setting key baru dan schema validasinya? | Kelola key melalui katalog terkontrol; dashboard hanya mengubah nilai key yang telah terdaftar. | Product Owner / Engineering Owner | [Page specifications](../07-ui-ux/page-specifications.md), [API specification](../05-backend/api-specification.md) |
| PET-OD-SET-005 | Berapa SLA approval, masa kedaluwarsa draft, dan jalur eskalasi? | Tetapkan SLA per tingkat risiko; jangan mengaktifkan draft secara otomatis saat melewati batas waktu. | Business Owner / Operations Owner | [Administrator manual](../11-operations/administrator-manual.md), [Operational guidelines](../11-operations/operational-guidelines.md) |
| PET-OD-SET-006 | Bagaimana rollback darurat diotorisasi dan bagaimana transaksi in-flight diperlakukan? | Siapkan prosedur rollback terkontrol dan tentukan secara eksplisit apakah policy diterapkan pada transaksi baru saja atau juga transaksi berjalan. | Product Owner / Operations Owner / Engineering Owner | [Administrator manual](../11-operations/administrator-manual.md), [Operational guidelines](../11-operations/operational-guidelines.md) |
| PET-OD-SET-007 | Berapa lama audit settings disimpan dan bagaimana legal hold / disposal dijalankan? | Jangan menghapus audit sebelum retention period, legal requirement, dan disposal approval ditetapkan. | Compliance Owner / Business Owner | [Audit logging](../08-security/audit-logging.md) |
| PET-OD-SET-008 | Kapan konfigurasi kritis memerlukan approval dan siapa approver per policy group? | Wajibkan approval untuk finance, stock, clinical, pricing, dan access policy; konfirmasi threshold dan approver sebelum production. | Business Owner / Finance Owner / Clinical Owner | [Security architecture](../08-security/security-architecture.md), [Security policies](../08-security/security-policies.md) |

## Status

Semua keputusan pada tabel berstatus **Open**. Rekomendasi interim bukan kebijakan final dan tidak boleh diterapkan sebagai persetujuan stakeholder sebelum disahkan.

## Escalation

Decision owner: the accountable owner listed in each row. Record decision, approver, date, rationale, and affected document/requirement IDs before changing status from Open. A recommendation is not approval.

