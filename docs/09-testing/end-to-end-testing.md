---
title: End-to-End Testing
document_id: PET-DOC-0905
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['integration-testing.md']
---

# End-to-End Testing

E2E test memverifikasi workflow kritis melalui browser UI, API, dan environment backend yang menyerupai target. E2E tidak menggantikan unit, RLS, atau transaction tests.

## Journey Examples

Customer/pet -> booking -> grooming/boarding -> payment -> portal history; cashier checkout + duplicate-submit prevention; purchasing PO -> partial receiving -> stock card; clinic visit -> medical finalization -> prescription dispense; staff attendance -> payroll approval -> finance posting; Super Admin settings draft -> Owner approval -> active version/runtime effect; refund -> reversal and reconciliation.

## Automation

Pilih tool browser automation saat bootstrap repo (Playwright adalah rekomendasi, bukan dependency yang sudah terpasang). Seed synthetic multi-tenant/multi-role data secara deterministic; isolate browser context/session antar role. Assert visible state, API result, key persistence/audit effect, and forbidden paths. Hindari test yang hanya assert toast.

E2E data memiliki cleanup dan tidak memanggil live payment/notification provider. Provider behavior ditutup integration/sandbox tests. Jalankan critical smoke suite pada pull request/release; jadwalkan suite lebih luas sesuai waktu execution.

## Reliability

Gunakan stable selectors/accessibility roles, bounded waits berdasarkan state, dan idempotent setup. Flaky test harus diperbaiki atau dikeluarkan dari blocking gate dengan alasan/owner/expiry, bukan ditutupi retry tanpa batas.

