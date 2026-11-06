---
title: Software Requirements Specification
document_id: PET-DOC-0102
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['product-requirements-document.md']
---

# Software Requirements Specification

Dokumen ini menjabarkan kebutuhan software yang diperlukan untuk memenuhi PRD.

## 1. System Context and Scope

PETORA adalah platform operasional multi-organisasi/multi-cabang untuk petshop dan pet care. Baseline product scope adalah seluruh 33 feature pada README bagian 4. Pengembangan tambahan pada README bagian 5 berstatus rekomendasi dan memerlukan prioritas terpisah. Tidak ada implementasi produk yang diverifikasi di repository saat dokumen ini dibuat; seluruh teknologi pada bagian arsitektur adalah target baseline, bukan klaim implementasi aktual.

## 2. User and System Requirements

Pengguna dapat login, memilih context organisasi/cabang yang diizinkan, melihat data yang sesuai scope, dan menjalankan aksi berdasarkan permission. Kelompok pengguna mencakup Super Admin, Owner, Branch Manager, Administrator, Cashier, Inventory, Purchasing, Groomer, Veterinarian, Pharmacist, Customer Service, HR/Payroll, Finance/Accounting, dan Customer. Satu orang dapat memiliki beberapa assignment; hak akhir ditentukan assignment dan policy, bukan nama role pada UI.

## 3. Functional Requirement Groups

| Requirement | System behavior |
| --- | --- |
| PET-REQ-001 | Menyediakan branch, user, role, action permission, dan assignment scope dengan validasi dan audit. |
| PET-REQ-002 | Mempertahankan customer, pet, multi-owner, primary owner, serta hubungan histori yang konsisten. |
| PET-REQ-003 | Mengelola catalog, unit/konversi, branch pricing, supplier link, dan price history. |
| PET-REQ-004 | Menegakkan inventory ledger, batch/expiry, stock movement, opname, dan concurrency guard. |
| PET-REQ-005 | Menjalankan POS/payment/refund dengan server-side pricing, idempotency, state transitions, dan reconciliation. |
| PET-REQ-006 | Mengelola supplier, PO, partial receiving, invoice matching, payable, serta retur. |
| PET-REQ-007 | Mengelola booking capacity, grooming assignment, check-in, service record, dan payment link. |
| PET-REQ-008 | Mengelola pet hotel/daycare occupancy, care schedule, monitoring, incident, dan check-out. |
| PET-REQ-009 | Mengelola animal transport serta home-grooming dispatch, handoff, dan service completion. |
| PET-REQ-010 | Mengelola clinical appointment, triage, examination, diagnosis, action, dan consent. |
| PET-REQ-011 | Menyimpan immutable finalized medical records dan audited revision serta owner-visible projection. |
| PET-REQ-012 | Mengelola prescription authorization, batch/expiry-aware dispensing, dan medication ledger. |
| PET-REQ-013 | Mengelola membership benefit dan loyalty ledger/reversal secara idempotent. |
| PET-REQ-014 | Mengevaluasi promosi di server berdasarkan waktu, scope, audience, stacking, dan quota. |
| PET-REQ-015 | Mengelola HR, attendance, commission snapshots, payroll approvals, dan disbursement history. |
| PET-REQ-016 | Menjaga cash, supplier/customer balances, consignment settlements, dan balanced accounting entries. |
| PET-REQ-017 | Menyediakan scope-safe analytics/export, delivery-tracked notifications, dan customer self-service. |
| PET-REQ-018 | Menjaga configuration/version/approval/audit dan integration secrets/status melalui server-side controls. |

Semua requirement ID mengacu ke [PRD](product-requirements-document.md) dan [traceability matrix](../13-traceability/requirements-traceability-matrix.md).

## 4. Data and Interface Requirements

Setiap tabel tenant-aware harus memuat `organization_id`; `branch_id` digunakan pada data yang benar-benar branch-scoped dan tidak dipaksakan pada master organisasi global. Tabel mutable mencatat actor dan waktu sesuai sifatnya. Relasi finansial, stok, klinis, booking, audit, serta integrasi harus memiliki foreign key atau reference strategy yang dijelaskan. Soft delete tidak menggantikan reversal/historical revision. Contract API memakai payload DTO yang divalidasi server; client tidak menentukan tenant identity, price total, authorization, atau final transaction state.

## 5. Non-functional Requirements and Verification

- NFR untuk performance, availability, compatibility, RPO/RTO, dan retention belum memiliki angka yang disetujui. Produk/operasi harus menetapkan measurable targets sebelum UAT production.
- Dashboard dan laporan agregat dihitung server-side dengan scope authorization; export dibatasi permission, ukuran, dan audit.
- Operasi kritis harus mendukung retry aman, idempotency, penanganan concurrency, dan observability dengan correlation ID.
- Uji test minimum mencakup tenant/branch RLS, unauthorized mutation, duplicate checkout/payment/webhook, stock race, capacity race, refund, balanced journals, clinical privacy, dan settings approval.
- Persyaratan setiap modul ditelusuri melalui [acceptance criteria](acceptance-criteria.md) dan [test mapping](../13-traceability/test-to-requirement-mapping.md).

## 6. Security and Data Protection

RLS aktif pada tabel API-exposed. Otorisasi memeriksa `auth.uid()`, tenant membership, branch assignment, dan action permission dari sumber tepercaya. Service role hanya digunakan di server-side operation yang dibatasi. Medical, payroll, payment, dan integration data mengikuti least privilege, redaction, audit, retention decision, dan workflow khusus. Security details ada di [RLS policies](../04-database/rls-security-policies.md) dan [security architecture](../08-security/security-architecture.md).

## 7. Assumptions and Open Decisions

- Baseline stack React/TypeScript/Vite dan Supabase/PostgreSQL mengikuti AGENTS.md; repository saat ini belum memuat implementasi untuk diverifikasi.
- Pilihan payment/notification provider, deployment target, target NFR, policy legal/tax/retention, dan prioritas fase memerlukan keputusan stakeholder.
- Detail role dan branch scope yang spesifik perlu divalidasi terhadap operating model setiap organisasi.

