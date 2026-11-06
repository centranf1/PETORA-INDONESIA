---
title: User Acceptance Testing
document_id: PET-DOC-0910
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-plan.md']
---

# User Acceptance Testing

UAT memastikan workflow sesuai kebutuhan dan operasi nyata melalui acceptance criteria yang disetujui. UAT bukan pengganti security, RLS, concurrency, atau reconciliation tests otomatis.

## Participants

Product/Business Owner sebagai penerima, Branch Manager, Cashier, Inventory/Purchasing, Veterinarian/Pharmacy, Grooming/Boarding, HR/Payroll, Finance/Accounting, Customer Service, dan Customer representative sesuai feature. Security/Operations ikut untuk permission, migration, backup, dan recovery flows.

## Exit Criteria

Setiap UAT case memiliki requirement/feature ID, persona, branch context, precondition, langkah, expected result, bukti, pass/fail/blocked, defect link, dan tester. Exit: seluruh acceptance critical pass, blocker di-resolve atau memiliki exception formal, role/scope telah diverifikasi, data report direkonsiliasi, user/admin guide tersedia, dan named Product Owner memberi sign-off tertulis. Belum ada sign-off berarti status tetap In Review/Draft.

UAT memakai staging dan synthetic/sanitized data; jangan gunakan real medical/payroll data tanpa approval dan safeguards. Keputusan yang belum final ditandai blocked/open, tidak diselesaikan dengan asumsi tester.

## Related Documents

- [Acceptance criteria](../01-product/acceptance-criteria.md)
- [Test scenarios](test-scenarios.md)
- [Administrator manual](../11-operations/administrator-manual.md)

