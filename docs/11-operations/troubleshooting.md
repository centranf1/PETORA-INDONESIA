---
title: Troubleshooting
document_id: PET-DOC-1103
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['maintenance-procedures.md']
---

# Troubleshooting

Troubleshooting mengutamakan observasi dan diagnosis non-destruktif. Hentikan perubahan data bila menyangkut payment, stock, medical, payroll, permissions, atau journal sampai owner domain menilai risiko.

## Common Issues

| Symptom | First safe checks | Do not do |
| --- | --- | --- |
| Login/permission failure | Session status, account active, organization/branch assignment, trace ID | Jangan memberi role lebih luas sebagai workaround |
| Slow dashboard/search | Environment/branch scope, date filters, query/API latency dashboard | Jangan menjalankan unbounded export/query di production |
| Duplicate/unknown payment | Idempotency/reference, provider event status, reconciliation queue | Jangan charge/refund ulang sebelum status provider dipastikan |
| Stock mismatch | Ledger source, reservations, pending sales/receipts, batch/location | Jangan update saldo langsung; gunakan audited adjustment workflow |
| Missing booking/overbooking | Capacity scope/timezone, cancellation/no-show state, concurrent request trace | Jangan delete booking/slot untuk mengatasi konflik |
| Medical record access | Actor role/assignment, owner visibility, audit/permission error | Jangan export or broaden clinical permission untuk debugging |
| Settings not effective | Proposal status, active version, branch/org scope, cache refresh/trace | Jangan bypass approval atau edit DB manual |

## Method

Capture trace ID, timestamp/timezone, actor, scope, user-visible state, and sanitized reproduction. Inspect dashboards/logs with least privilege; use read-only queries and approved tooling. Compare expected business state with source ledger/event and related audit. Reproduce in staging where possible, create incident/ticket, obtain approval, apply one corrective action, and verify invariants.

## Escalation

Escalate financial mismatch to Finance, clinical/privacy to Clinical/Security, tenant/RLS/credential issue to Security/Engineering, and database integrity issue to DB owner. Preserve evidence and follow [incident response](incident-response.md); do not paste secret or patient data into tickets.

