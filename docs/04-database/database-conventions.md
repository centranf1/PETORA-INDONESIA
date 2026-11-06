---
title: Database Conventions
document_id: PET-DOC-0404
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-dictionary.md']
---

# Database Conventions

Konvensi menjaga schema PostgreSQL konsisten, dapat dimigrasikan, dan aman untuk tenant/branch RLS. Semua contoh di dokumen ini adalah target convention, bukan schema yang telah diterapkan.

## Naming

Gunakan lowercase `snake_case` untuk table/column/index/constraint/function. Tabel mengikuti plural yang sudah digunakan di logical data dictionary (`customers`, `pets`, `sales_transactions`); FK memakai `<entity>_id`; check/unique/FK names memakai pola konsisten `ck_`, `uq_`, `fk_`, `ix_`. Jangan mengganti nama table canonical tanpa update semua mapping.

## Timestamps

Gunakan `timestamptz` dan simpan instant UTC; timezone cabang disimpan terpisah sebagai IANA timezone untuk jam operasional/report. Jangan simpan local wall-clock tanpa timezone untuk event transaksi.

## ID Design

Gunakan UUID surrogate key untuk entities terdistribusi. Nomor invoice/receipt/PO yang perlu urutan human-readable dibuat dengan generator transaksional per organization/branch/period; jangan pakai `MAX(number)+1`. Foreign key tidak mengandung sensitive business value.

## Types and Scope

Money memakai PostgreSQL `numeric` dan currency code, bukan float; quantity juga `numeric` bila fractional unit tersedia. Status terbatas dengan check/enum sesuai evolution strategy. Tenant table memiliki `organization_id`; `branch_id` hanya bila data scoped. Gunakan composite FK/check untuk memastikan branch dan parent record milik organization yang sama.

## Audit

Record `created_at/created_by` dan `updated_at/updated_by` pada mutable entities yang memerlukannya. Append-only ledger/audit/event rows tidak memiliki update flow normal. `version_no` dipakai untuk optimistic concurrency bila stale update berisiko. Audit domain-sensitive memakai separate event table/trigger/function contract; jangan menambah kolom audit tanpa actor trust.

## Soft Delete

Jangan tambahkan `deleted_at` ke setiap tabel secara default. Master non-historis dapat dinonaktifkan melalui `status`; physical delete hanya bila tidak direferensikan dan retention mengizinkan. Financial, stock ledger, medical, permission, and audit history dikoreksi/reversed, bukan dihapus rutin.

## Indexing

Index mengikuti query plan dan RLS predicate; buat FK support index, unique/idempotency index, composite access path, serta partial index hanya bila terukur. PostgreSQL UNIQUE dengan nullable `branch_id` perlu partial index atau null semantics eksplisit.

## JSONB

Gunakan JSONB untuk payload yang memang variable (provider metadata, validated setting value/schema, version snapshots) dan pertahankan relation untuk ownership, role, transaction lines, ledgers, revisions, and accounting. Setiap JSONB structure punya schema/version/validation owner.

## Migration and Concurrency

Constraint/index/policy changes melalui versioned migration. Locking, transaction, idempotency, and optimistic version pattern harus didokumentasikan untuk setiap critical aggregate. Lihat [migration guide](database-migration-guide.md) dan [transaction integrity](transaction-integrity.md).

## Related Documents

- [Data dictionary](data-dictionary.md)
- [Indexing strategy](indexing-strategy.md)
- [RLS policies](rls-security-policies.md)

