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

Exact business policies for discount stacking, loyalty expiry, staff shift configuration, medical data retention, bank reconciliation workflow, and customer portal permissions.

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

Decision owner: business or product owner.

