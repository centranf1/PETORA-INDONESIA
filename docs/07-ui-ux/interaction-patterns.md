---
title: Interaction Patterns
document_id: PET-DOC-0706
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['page-specifications.md']
---

# Interaction Patterns

Pola interaksi digunakan lintas modul agar tindakan, status, dan risiko dipahami konsisten oleh pengguna.

## Patterns

Inline validation, confirmation for irreversible/high-impact actions, multi-step forms with preserved safe values, batch actions with explicit selection count, filter summary, detail drawer, status timeline, and optimistic concurrency conflict. Actions include submitter, current scope, and resulting state when relevant.

## Feedback

Show skeleton/disabled pending state, inline progress for long operation, stable success result, and actionable error. For external payment `pending/unknown`, do not infer outcome; direct user to reconciliation state. For approval, distinguish saved draft, submitted, approved, rejected, activated, and rolled back. Toast must not be the only indication of critical result.

## Confirmation and Recovery

- Confirm refund, void, stock adjustment, payroll posting, journal close, access change, and policy activation with summary of effect and reason.
- Double-click is guarded in UI but backend idempotency remains mandatory.
- On stale data, preserve draft and ask user to reload/rebase; never silently overwrite.
- Cancellation/undo is offered only where the domain state supports a safe compensating action.

## Accessibility

Keyboard support, focus styles, labels, and screenreader-friendly descriptions are mandatory.

## Related Documents

- [Page specifications](page-specifications.md)
- [Accessibility guidelines](accessibility-guidelines.md)

