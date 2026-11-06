---
title: User Manual
document_id: PET-DOC-1106
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['administrator-manual.md']
---

# User Manual

Manual pengguna menjelaskan alur umum untuk user role utama.

## Guidance

### Cashier

Open the assigned branch/shift, verify customer and cart, review price/discount, submit payment once, and wait for confirmed/pending/failure status. Use the same transaction reference for status checks; do not retry an uncertain payment with a new operation. Refund/void uses the approved workflow and reason.

### Service / Inventory Staff

Work only from assigned booking/warehouse queues. Record check-in condition, quantities, batch/expiry and handoff evidence before completing a workflow. Never adjust stock by editing an on-screen balance; submit an authorized movement/adjustment.

### Veterinarian / Pharmacy

Verify pet identity and visit assignment. Finalize records only after review; correct through revision with reason. Dispense only against valid authorized prescription and record actual quantity/batch. Share owner-visible information only through the permitted record view.

### Finance / Manager

Reconcile source transactions before close, review pending/unknown provider operations, verify branch/date filters before export, and use approval controls for high-risk actions. Escalate discrepancies instead of overwriting posted records.

## Support

If access or a transaction status is unexpected, preserve the displayed reference/trace ID, note branch and time, and contact the administrator/support channel. Do not share passwords, MFA codes, payment details, full medical documents or secret links.

## Related Documents

- [Administrator Manual](administrator-manual.md)
- [Troubleshooting](troubleshooting.md)
- [Security Policies](../08-security/security-policies.md)

