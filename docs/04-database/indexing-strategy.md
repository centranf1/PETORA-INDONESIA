---
title: Indexing Strategy
document_id: PET-DOC-0407
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-conventions.md']
---

# Indexing Strategy

Index harus dibangun dari query nyata dan predicate RLS, lalu diverifikasi menggunakan `EXPLAIN (ANALYZE, BUFFERS)` pada dataset representatif. Rancangan berikut adalah kandidat, bukan kewajiban untuk menambahkan semua index tanpa pengukuran.

## Query Patterns

- Lookup customer berdasarkan `organization_id` dan normalized phone/name.
- Produk aktif menurut organisasi/cabang, kategori, dan pencarian SKU/barcode.
- Saldo/mutasi stok berdasarkan organization, branch, location, product, batch, dan waktu.
- Penjualan/pembayaran berdasarkan cabang dan waktu; event idempotency berdasarkan provider reference.
- Booking berdasarkan branch dan rentang waktu/status untuk kalender serta capacity check.
- Medical record berdasarkan pet dan waktu dengan predicate permission/visibility.
- Payroll berdasarkan organization/cycle/employee dengan role-restricted query.
- Settings berdasarkan org/optional branch dan key definition; audit berdasarkan setting serta timestamp.

## Candidate Index Rules

- Letakkan equality filter tenant/branch lebih dulu jika query rutin memakai scope itu, lalu status/date/order keys sesuai query plan.
- Index FK yang sering dipakai join/filter dan unique/idempotency references; PostgreSQL tidak otomatis membuat index pada referencing FK columns.
- Gunakan partial index untuk active/open rows hanya bila predicate query identik dan cardinality mendukung.
- GIN hanya untuk kebutuhan JSONB/full-text yang terukur; jangan index setiap JSONB key.
- Untuk unique scope dengan nullable `branch_id`, gunakan partial unique indexes atau strategi null semantics yang disepakati; UNIQUE biasa memperbolehkan beberapa NULL.

## Performance

Hindari redundant indexes dan index kolom dengan cardinality rendah tanpa komposit yang tepat; index juga menambah biaya write. Tentukan kebutuhan retention/partitioning dari volume dan maintenance evidence, bukan praduga. Query report besar harus memiliki timeout, pagination/export limits, serta server-side authorization.

## Monitoring

Review slow query logs, `pg_stat_statements` bila extension diaktifkan, index usage, bloat, lock waits, and query plans per release. Baseline latency/SLO dan threshold alert memerlukan keputusan operasi.

## Change Checklist

Migration PR menyertakan query/use case yang dilayani, EXPLAIN evidence, write overhead consideration, cleanup plan, serta pengujian dengan predicate RLS aktif.

## Related Documents

- [Database conventions](database-conventions.md)
- [Data dictionary](data-dictionary.md)
- [Transaction integrity](transaction-integrity.md)

