---
title: Regression Testing
document_id: PET-DOC-0909
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-scenarios.md']
---

# Regression Testing

Regression coverage menjaga invariant lintas domain saat schema, permission, policy, atau feature berubah.

## Scope

Setiap merge/release menjalankan suite yang sesuai dampak: auth/RLS tenant+branch, customer/pet, price/promo, stock ledger/concurrent checkout, duplicate payment/webhook, PO partial receiving, booking capacity, medical revision/owner visibility, prescription dispensing, payroll privacy, balanced journal/period close, report export scope, notification/portal, settings approval/version/audit, dan rollback/reconciliation.

## Rule

Bug fix yang mengubah behavior harus menambah/memperbarui test pada layer paling murah yang dapat menangkap regressi; shared permission/transaction change juga menjalankan integration/security suite. Test scenario ID merujuk [catalogue](test-scenarios.md); hasil run dicatat pada CI/release evidence, bukan disimpulkan dari dokumen.

## Selection

Gunakan dependency mapping dari changed modules/requirements; perubahan schema atau RLS memperluas suite ke seluruh consumer yang menggunakan table/policy tersebut. Semua P0 release gate selalu dijalankan; non-blocking suite harus memiliki owner dan jadwal.

