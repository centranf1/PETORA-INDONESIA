---
title: Open Decisions
document_id: PET-DOC-1305
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['requirements-traceability-matrix.md']
---

# Open Decisions

Daftar keputusan yang masih perlu persetujuan stakeholder.

## Areas

Daftar keputusan lintas product, engineering, security, legal, finance, clinical, HR, dan operations. Discount stacking/loyalty expiry -> PET-OD-PROMO-001; shift/attendance/overtime/payroll policy -> PET-OD-HR-001; customer portal/medical visibility -> PET-OD-PORTAL-001; medical/financial/customer retention -> PET-OD-LEGAL-001. Setiap keputusan berstatus Open sampai ada approver dan bukti tertulis.

## Product, Security, and Operations Decisions

| Decision ID | Decision Required | Interim Recommendation (Not Approved) | Owner | Related Documents |
| --- | --- | --- | --- | --- |
| PET-OD-PROD-001 | Apakah README bagian 5 recommendations masuk release scope, dan dengan urutan apa? | Perlakukan sebagai deferred extensions sampai Product Owner menyetujui item per item. | Product Owner | [Feature catalog](../01-product/feature-catalog.md), [Roadmap](../01-product/product-roadmap.md) |
| PET-OD-SEC-001 | Apakah user dapat menjadi anggota beberapa organization; apakah Super Admin tenant punya akses lintas tenant? | Default membership per organization dan larang role tenant mengakses tenant lain. | Security Owner / Architect | [RLS policies](../04-database/rls-security-policies.md), [SRS](../01-product/software-requirements-specification.md) |
| PET-OD-SEC-002 | Kapan 2FA/step-up authentication wajib, session timeout, revocation SLA, dan concurrent session rule? | Terapkan step-up untuk administrative/finance/clinical-critical actions setelah provider support diverifikasi. | Security Owner / Product Owner | [Session management](../08-security/session-management.md), [Authentication](../05-backend/authentication-authorization.md) |
| PET-OD-OPS-001 | Berapa target availability, RPO/RTO, backup frequency/retention, dan restore drill cadence per environment? | Tetapkan berdasarkan criticality dan platform capability; jangan klaim target sebelum drill evidence. | Operations Owner / Business Owner | [Backup and recovery](../10-devops/backup-recovery.md), [Product NFR](../01-product/product-requirements-document.md) |
| PET-OD-OPS-002 | Siapa on-call/incident commander, alert threshold, escalation SLA, serta user/legal notification owner? | Sediakan roster domain owners dan escalation coverage sebelum production launch. | Operations Owner / Security Owner | [Incident response](../11-operations/incident-response.md), [Monitoring](../10-devops/monitoring-logging.md) |
| PET-OD-TECH-001 | Hosting frontend, Supabase region/project topology, CI/CD provider, domain, and environment separation? | Pilih sesuai residency, recovery, access governance, and cost review. | Engineering Owner / Operations Owner | [Environment configuration](../10-devops/environment-configuration.md), [Deployment guide](../10-devops/deployment-guide.md) |
| PET-OD-TECH-002 | Target latency/throughput, browser support, locale/timezone/currency, scale and export limits? | Set measurable targets from representative branch workload before production acceptance. | Product Owner / Engineering Owner | [PRD NFR](../01-product/product-requirements-document.md), [Performance testing](../09-testing/performance-testing.md) |
| PET-OD-LEGAL-001 | Applicable Indonesian tax/payroll/privacy/clinical obligations, retention periods, legal hold and deletion process? | Obtain qualified Legal/Compliance review; do not infer exact retention or regulatory compliance from generic guidance. | Legal/Compliance Owner / Business Owner | [Data retention](../04-database/data-retention-policy.md), [Tax feature](../01-product/feature-catalog.md) |
| PET-OD-INT-001 | Payment, email, SMS, WhatsApp, shipping, and mapping providers; sandbox/webhook/idempotency contract? | Select provider per channel and complete security/operational review before enabling production integration. | Product Owner / Engineering Owner / Finance Owner | [Integration architecture](../03-architecture/integration-architecture.md), [Secrets management](../08-security/secrets-management.md) |
| PET-OD-FIN-001 | Chart of accounts, tax/rounding, refund rules, discount stacking, bank reconciliation, and accounting close policy? | Finance owner approves a policy catalogue and effective dates before financial posting is production-ready. | Finance Owner / Accounting Owner | [Business rules](../02-business-analysis/business-rules.md), [Transaction integrity](../04-database/transaction-integrity.md) |
| PET-OD-CLIN-001 | Clinical consent, medical visibility, revision authorization, emergency handling, and medication dosage governance? | Clinical owner defines role and record policies with legal review before clinical release. | Clinical Owner / Legal/Compliance Owner | [Medical records](../01-product/feature-catalog.md), [Security policies](../08-security/security-policies.md) |
| PET-OD-PROMO-001 | Bagaimana aturan stacking voucher/promo, loyalty point ratio/expiry, refund reversal, and membership benefit boundaries? | Define effective-dated policy by campaign/organization and test duplicate redemption; values are not defaults until approved. | Product Owner / Marketing Owner / Finance Owner | [Business rules](../02-business-analysis/business-rules.md), [Feature catalog](../01-product/feature-catalog.md) |
| PET-OD-HR-001 | Bagaimana shift, overtime, leave correction, commission, payroll component, approval, and employee self-service rules? | HR owner defines policy and approval separation; Legal reviews payroll obligations before implementation. | HR Owner / Finance Owner / Legal/Compliance Owner | [Feature catalog](../01-product/feature-catalog.md), [Acceptance criteria](../01-product/acceptance-criteria.md) |
| PET-OD-PORTAL-001 | Field/record apa yang customer dapat lihat/ubah, bagaimana multi-owner consent bekerja, dan siapa menyetujui medical visibility? | Default deny; expose only explicit owner-visible projections and audit sensitive changes. | Product Owner / Clinical Owner / Security Owner | [Customer portal page spec](../07-ui-ux/page-specifications.md), [Security policies](../08-security/security-policies.md) |

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

Semua keputusan pada tabel berstatus **Open**. Rekomendasi interim bukan kebijakan final dan tidak boleh diterapkan sebagai persetujuan stakeholder sebelum disahkan. Setelah diputuskan, catat decision date, approver, evidence, scope, effective date, dan dokumen/ADR yang diperbarui.

## Escalation

Decision owner: role pada tabel; Product Owner mengkoordinasikan keputusan lintas domain dan memastikan status register diperbarui.

