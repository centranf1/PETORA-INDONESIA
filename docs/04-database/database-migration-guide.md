---
title: Database Migration Guide
document_id: PET-DOC-0405
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-conventions.md']
---

# Database Migration Guide

Panduan ini mengatur perubahan schema dan data secara repeatable, reviewable, dan aman terhadap RLS serta transaksi historis. Prosedur di bawah adalah target workflow; tool/repository migration belum ditemukan dan harus dipilih/di-bootstrap sebelum implementasi.

## Migration Principles

- Semua perubahan schema/data berjalan lewat migration versioned di Git; jangan mengubah production secara manual sebagai jalur normal.
- Migration harus deterministik, idempotent bila memungkinkan, dan dapat dijalankan pada database kosong serta database dengan data representatif.
- DDL/destructive cleanup dipisah dari deploy yang memerlukan kompatibilitas aplikasi lama.
- RLS, grants, indexes, functions/triggers, seed policy, dan test fixtures merupakan bagian dari perubahan database.
- Data migration mempunyai precondition, transform, verification query, audit/owner, dan recovery plan.

## Expand-Backfill-Contract Workflow

1. **Expand**: tambah nullable column/table/index/function yang kompatibel; deploy code yang dapat membaca format lama dan baru bila perlu.
2. **Backfill**: proses data dalam batch idempotent, terukur, dan resumable; catat jumlah berhasil/gagal.
3. **Switch**: deploy code baru, verifikasi query, RLS, writer, dan data invariants.
4. **Contract**: hapus struktur lama hanya setelah seluruh consumer lama berhenti dan periode rollback berakhir.

## Release Steps

1. Tautkan migration ke PR, ADR/requirement, data dictionary, ERD, RLS policy, dan rollback note.
2. Jalankan lint/static SQL review serta migration dari database kosong dan snapshot data uji.
3. Jalankan constraint, RLS allow/deny, transaction/concurrency, integration, dan performance checks yang terkait.
4. Terapkan ke staging dan lakukan smoke test workflow POS, inventory, clinical, finance, dan tenant isolation.
5. Catat backup/restore point serta compatibility window sebelum production release.
6. Deploy perubahan dengan monitoring; verifikasi schema version, error rate, slow query, dan business reconciliation.
7. Terapkan contract cleanup pada release terpisah jika aman.

## Special Cases

Perubahan pada role/RLS, payments, stock ledgers, medical records, payroll, journals, dan system settings memerlukan review owner domain + Security/DB reviewer. Perubahan data sensitif tidak boleh digabungkan dengan cleanup destruktif yang menyulitkan rollback.

## Rollback

Rollback database tidak selalu berarti menjalankan down migration: bila migration sudah menerima write baru, gunakan corrective forward migration atau recovery dari backup sesuai incident plan. Sebelum rollback, tentukan kompatibilitas aplikasi versi sebelumnya, efek eksternal yang telah terjadi, dan cara rekonsiliasi write terbaru. Restore backup membutuhkan verifikasi RPO/RTO, audit, dan persetujuan operasi.

## Acceptance Checklist

- Migration tidak menghapus atau mengubah histori finansial/medis secara diam-diam.
- Constraint dan RLS mencegah data invalid/cross-tenant, bukan hanya aplikasi.
- Migration dapat diulang pada environment uji, dan langkah recovery telah direview.
- Schema, ERD, dictionary, API contract, test fixture, dan release notes konsisten.

## Related Documents

- [Database conventions](database-conventions.md)
- [RLS policies](rls-security-policies.md)
- [Transaction integrity](transaction-integrity.md)
- [Rollback procedure](../10-devops/rollback-procedure.md)

