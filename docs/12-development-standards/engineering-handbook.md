---
title: Engineering Handbook
document_id: PET-DOC-1201
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['definition-of-ready.md']
---

# Engineering Handbook

Buku pegangan ini menjadi baseline perilaku engineering untuk seluruh feature team. Semua aturan tetap berstatus Draft sampai pemilik engineering/product menyetujui tata kelola; tidak ada implementasi yang diasumsikan sudah berjalan.

## Standards

Gunakan requirement ID/feature ID yang canonical, pisahkan core requirement dan recommended extension, dokumentasikan business rule/open decision, dan jaga domain ownership. Setiap mutation sensitif dikerjakan server-side, transaction/data invariants ditegakkan database, authorization dites dengan RLS, dan external effect memakai idempotency/reconciliation.

## Working Rules

Tidak ada feature production tanpa acceptance criteria, monitoring, error/failure handling, support owner, dan dokumentasi relevan. Jangan mengirim service role ke frontend, bypass RLS sebagai workaround, mengubah production DB manual, menyimpan credential/data real pada repository, atau menyatakan keputusan draft sebagai policy final. Perubahan akses, settings, transaction, dan medical data memerlukan audit trace.

## Principles

Security/privacy, financial/stock/clinical integrity, observability, maintainability, accessibility, and supportability diperlakukan sebagai acceptance criteria lintas fitur. Prefer modular monolith; architecture deviation memerlukan ADR dengan trade-off dan migration path.

## Development Loop

Discovery -> refine requirement/workflow -> update contracts and test scenarios -> implement smallest vertical slice -> run unit/integration/RLS/UI checks -> review -> deploy staging -> UAT/release gate -> observe and maintain. Jangan mulai dari UI-only path untuk proses yang memiliki payment, stock, approval, clinical, or journal effects.

## References

README.md adalah source of truth produk; `docs/` adalah baseline spesifikasi target; source/migrations/CI menjadi evidence implementasi setelah tersedia. Lihat [documentation guide](../00-overview/documentation-guide.md) untuk klasifikasi evidence dan [Definition of Ready](definition-of-ready.md) / [Definition of Done](definition-of-done.md) untuk gate kerja.

