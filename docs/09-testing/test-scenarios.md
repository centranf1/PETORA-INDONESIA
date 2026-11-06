---
title: Test Scenarios
document_id: PET-DOC-0908
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-plan.md']
---

# Test Scenarios

Dokumen ini mencatat scenario testing penting dengan ID dan prioritas.

## PET-TST-001

Checkout with valid stock and payment. Preconditions: user has cashier role and inventory available. Expected: sale created, payment accepted, stock reduced, receipt generated.

## PET-TST-002

Refund flow by authorized manager. Expected: refund recorded, stock reversal if applicable, and loyalty points adjusted.

## PET-TST-003

Branch isolation. Expected: same user cannot access another branch data without grant.

## PET-TST-004

Prescription validation. Expected: no controlled medicine release without doctor authorization.

## PET-TST-005

Accounting balance. Expected: journal total debits equal credits and close period fails if not balanced.

