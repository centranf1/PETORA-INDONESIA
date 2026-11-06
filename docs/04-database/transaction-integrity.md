---
title: Transaction Integrity
document_id: PET-DOC-0408
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-migration-guide.md']
---

# Transaction Integrity

Dokumen ini fokus pada atomisitas transaksi kritis.

## Critical Transactions

checkout, payment, refund, stock mutation, purchase receiving, salary posting, accounting journal, and medical prescription dispensation.

## Atomic Rules

All side effects must be committed in a single transaction or coordinated server-side workflow. Never partially commit stock and payment without reconciliation.

## Failure Handling

If transaction fails, revert journal balance, payment status, point changes, and stock update; emit an error code and audit log.

## Recommendation

Use Postgres transaction blocks and database functions or edge functions for multi-table writes.

