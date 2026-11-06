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

Dokumen ini menentukan invariant business logic yang tidak boleh dihitung hanya oleh UI. Angka policy final harus berasal dari approved version atau open decision; contoh tidak boleh di-hardcode sebagai keputusan.

## Sales Logic

Server memuat catalog/branch price dan mengevaluasi promo/pajak dari policy efektif; total yang dikirim browser diabaikan. Buat order/payment intent dengan idempotency key dan expected stock/capacity state. Finalisasi paid harus mengikuti provider-confirmation/cash acceptance yang sah; stock reservation/ledger, sale, payment event, loyalty, dan journal lokal harus commit konsisten sesuai transaction design. Poin hanya accrue pada state eligible; refund/void membuat reversal event.

## Inventory Logic

Setiap delta stok harus memiliki movement type, source reference, location, quantity, unit/batch, actor, timestamp, and reason jika adjustment. Checkout/transfer/dispense mengunci atau mengevaluasi saldo secara concurrent-safe. Opname membuat count snapshot lalu adjustment berotorisasi; saldo tidak diupdate direct. Kebijakan negative stock, threshold variance, FEFO/FIFO, and reservation expiry tetap open decision dan tidak dapat menonaktifkan audit/tenant isolation.

## Purchasing and Supplier Logic

PO mempunyai state draft/submitted/approved/ordered/partially_received/received/cancelled sesuai policy final. Receiving hanya menambah kuantitas yang benar-benar diterima; mismatch/duplicate invoice masuk exception, bukan auto-post. AP/payment terhubung ke invoice, receipt, cash/bank, dan journal reference.

## Booking and Service Logic

Validasi service availability, branch hours, duration/buffer, resource assignment, pet eligibility, and active capacity policy di server. Reservation/slot claim harus concurrent-safe. Reschedule/cancel/no-show menghasilkan event; fee/deposit hanya diterapkan bila policy disetujui. Service completion merekam pet condition, assigned staff, consent, materials, and outcome.

## Clinical Logic

Visit mengaitkan patient, assigned clinician, triage, observations, diagnosis/action, and required consent. Finalized record tidak ditimpa; revision menyimpan snapshot/reason/actor. Prescription hanya dapat diselesaikan oleh veterinarian yang berwenang. Dispense memverifikasi prescription state, patient, product/lot/expiry, dosage fields dan allergy alert bila data tersedia; dispensing menghasilkan medication history dan stock movement yang konsisten.

## Finance Logic

Cash/bank/payment/refund/payroll/consignment event memiliki source reference, evidence, approval, currency, and reconciliation state. Journal line debit/credit harus balance sebelum posting dan closed period menolak write kecuali approved reopen policy. Posted journal hanya dikoreksi melalui reversal/correction record.

## Dynamic Settings Logic

Runtime hanya membaca active version untuk key terdaftar dan scope yang cocok; validation schema, approval requirement, lock, and default dikelola definition registry/server. Proposal memakai optimistic version check. Critical change pending/rejected tidak mengubah effective value. Cache invalidation setelah commit; audit event/version/active pointer konsisten. Security invariants bukan user-configurable business values.

## Error and Recovery Contract

Domain errors memiliki stable code dan tidak membuat partial DB state. Provider uncertainty menjadi pending/reconciliation; retry idempotent and bounded. Manual adjustment memerlukan authorized workflow, reason, audit evidence, dan reconciliation.

## Recommendation

Use PostgreSQL constraints/functions for local invariants and versioned SQL migrations for reviewable behavior; Edge Functions orchestrate secret/provider work. Do not keep duplicate conflicting rules in client and database.

## Related Documents

- [Business rules](../02-business-analysis/business-rules.md)
- [Transaction integrity](../04-database/transaction-integrity.md)
- [API specification](api-specification.md)

