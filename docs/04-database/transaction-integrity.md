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

Checkout, payment finalization, refund, stock mutation, purchase receiving, salary posting, accounting journal, dan medical prescription dispensation. Setiap workflow harus memiliki invariant data yang jelas, idempotency strategy, concurrency control, dan recovery path.

## Atomic Rules

- Perubahan yang seluruhnya berada di PostgreSQL harus dilakukan dalam satu transaksi DB, umumnya melalui function/RPC yang tervalidasi atau service backend dengan transaction boundary yang jelas.
- Efek yang melibatkan provider eksternal tidak dapat dianggap atomik bersama PostgreSQL. Gunakan state machine, idempotency key, webhook verification, dan reconciliation; jangan mengklaim rollback otomatis membatalkan pembayaran eksternal.
- Gunakan unique constraint untuk idempotency/request key, external event ID, nomor dokumen dalam scope, dan referensi sumber yang tidak boleh diproses dua kali.
- Gunakan `SELECT ... FOR UPDATE`, constraint, atau strategi concurrency lain untuk saldo stok, kapasitas booking, saldo loyalty, dan posting periode.
- Urutan lock harus konsisten dan transaksi dijaga singkat untuk mengurangi deadlock.

## Checkout and Payment State Model

Baseline state yang direkomendasikan:

`draft -> pending_payment -> paid -> fulfilled`

Jalur gagal atau koreksi menggunakan state eksplisit seperti `payment_failed`, `cancelled`, `refund_pending`, dan `refunded`; transisi yang diizinkan harus terdokumentasi dan tidak boleh menghapus event sebelumnya.

1. Server menghitung ulang harga, pajak, diskon, dan total dari sumber tepercaya; client hanya mengirim pilihan item dan kuantitas.
2. Dalam transaksi DB, validasi stock/capacity, tulis order `pending_payment`, buat reservation bila diperlukan, dan simpan idempotency key.
3. Edge Function memanggil provider dengan idempotency reference yang sama; jangan menahan row lock selama network call.
4. Callback/webhook diverifikasi tanda tangannya dan deduplikasi berdasarkan provider event ID.
5. Finalisasi transaksi DB mengubah status payment/order, mem-post stock ledger, loyalty, serta journal sesuai rule; semua write DB final harus commit atau rollback bersama.
6. Jika provider sukses tetapi finalisasi DB gagal, simpan state untuk retry/reconciliation dan jangan mengirim charge kedua.

## Stock, Refund, and Purchasing Invariants

- Saldo persediaan berasal dari stock ledger atau projection yang dapat direkonsiliasi; jangan mengubah saldo tanpa movement record.
- Checkout bersaing untuk stok harus mengunci/menguji saldo secara transaksional sesuai policy stok negatif.
- Refund membuat reversal/compensating entry; jumlah refund kumulatif tidak melebihi jumlah captured yang dapat dikembalikan.
- Penerimaan parsial memperbarui hanya kuantitas yang diterima; PO, receiving, invoice, dan payable mempunyai status serta rekonsiliasi yang terpisah.
- Perubahan harga, pajak, komisi, kurs, dan policy yang memengaruhi transaksi harus disnapshot pada detail transaksi agar histori tidak berubah ketika master berubah.

## Accounting Invariants

- Jurnal yang diposting harus seimbang per mata uang dan dalam batas organisasi/periode yang sama.
- Periode tertutup menolak posting baru kecuali ada proses reopen berotorisasi dan tercatat.
- Jurnal yang sudah diposting tidak diedit atau dihapus; koreksi menggunakan reversal dan jurnal pengganti.
- Total payments/refunds dan cash/bank movement harus dapat direkonsiliasi ke jurnal terkait.

## Failure and Retry Handling

Retry hanya dilakukan untuk operasi idempotent dan error transient. Simpan status attempts, next retry, provider reference, dan error code yang sudah disanitasi. Permanent validation failure memerlukan koreksi input atau tindakan operator; jangan melakukan retry tanpa batas.

## Required Verification

- Uji concurrent checkout untuk item terakhir, duplicate request/webhook, payment timeout dengan provider success, refund parsial berulang, receiving parsial, dan journal imbalance.
- Uji bahwa DB failure tidak meninggalkan partial writes pada satu transaksi PostgreSQL.
- Uji reconciliation untuk event eksternal yang hasilnya belum pasti.
- Audit semua retry, reversal, manual reconciliation, dan state transition sensitif.

## Implementation Boundary

Gunakan PostgreSQL transaction/function untuk invariant relasional; Edge Functions untuk validasi session, integrasi provider, dan orkestrasi. Edge Function tidak menggantikan constraint DB dan tidak menjadikan API eksternal bagian dari transaksi ACID.

## Related Documents

- [Database design](database-design.md)
- [API specification](../05-backend/api-specification.md)
- [Edge Functions specification](../05-backend/edge-functions-specification.md)
- [Test plan](../09-testing/test-plan.md)

