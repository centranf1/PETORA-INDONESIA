---
title: Unit Testing
document_id: PET-DOC-0903
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['integration-testing.md']
---

# Unit Testing

Unit test menguji fungsi/komponen terkecil secara deterministic tanpa jaringan atau database. Tujuannya adalah mengunci aturan lokal, formatter, schema, dan state transition yang tidak membutuhkan RLS/transaction nyata.

## Examples

Price/discount rounding rules yang telah disetujui, typed settings schema, loyalty conversion, scope/permission presentation helper, booking interval validation, payroll component calculation, journal balance calculator, date/time/currency formatter, and reducer/state machine transitions.

## Rule

Write tests before or alongside implementation. Gunakan boundary-value, invalid input, timezone/currency edge, duplicate event, and state-transition cases. Pure function test bukan bukti otorisasi/RLS aman; aturan kritis tetap memerlukan database/API integration test.

Test harus menguji behavior/hasil, bukan private implementation detail. External provider boleh memakai deterministic fake di unit test, tetapi signature/replay/database effects diuji di integration. Gunakan fixture synthetic; jangan masukkan PII/medical real data. Jangan menambah production method khusus hanya untuk test.

## Exit Criteria

Semua domain calculation/schema memiliki positive dan negative coverage; test bersifat repeatable, cepat, bebas urutan, dan gagal dengan pesan yang menunjukkan case. Coverage percentage bukan pengganti risk coverage dan targetnya perlu ditetapkan tim saat toolchain dipilih.

## Related Documents

- [Integration testing](integration-testing.md)
- [Test scenarios](test-scenarios.md)

