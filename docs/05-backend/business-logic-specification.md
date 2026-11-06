---
title: Business Logic Specification
document_id: PET-DOC-0502
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['backend-architecture.md']
---

# Business Logic Specification

Dokumen ini menandai aturan business kritis di layer backend.

## Sales Logic

Stock deduction is permitted only after valid payment, price validation, and sale item mapping. Loyalty points update only on successful completed sales.

## Inventory Logic

Stock adjustments require approved reason and resulting ledger entry. Force-negative stock requires explicit configuration and supervisor approval.

## Clinical Logic

Medicine dispensing requires doctor-issued prescription, valid patient, and patient allergy checks before dispensing.

## Finance Logic

Any cash movement requires voucher, account posting, and balance reconciliation.

## Recommendation

Use DB functions for atomic mutating procedures and store logic in versioned SQL when professional grade.

