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

Pola interaksi untuk dasar pengalaman pengguna.

## Patterns

| Pattern | When to use | Behavior contract |
| --- | --- | --- |
| Inline validation | Field-specific correctable errors | Keep value, associate text error, focus first error on submit |
| Confirmation dialog | Irreversible/high-risk action | State object, scope, consequence and reason; no vague “Are you sure?” |
| Destructive confirmation | Refund, write-off, permission removal | Require reason/evidence when policy needs; show final action label and audit implication |
| Multi-step form | Long setup with dependencies | Preserve safe draft, show progress, validate server at step/submit boundary |
| Batch action | Multiple records | Preview count/scope, authorize each action, report partial success explicitly |
| Filter/search | Large list | Debounced query, reset/clear affordance, maintain accessible filter labels |
| Drawer/detail panel | Contextual record review | Preserve list context; permission-check detail independently |
| Status timeline | Booking/payment/approval/clinical lifecycle | Show timestamp/actor where allowed; distinguish pending from completed |
| Conflict resolution | Concurrent edit/version change | Keep local draft, show current versus proposed values, require explicit resubmit |
| Pending external action | Payment/refund/notification not yet confirmed | Disable duplicate command and offer status/reconciliation path |

## Feedback

Every command provides immediate pending feedback and authoritative result. Toasts are brief for reversible success; warnings/critical pending state remain visible near the affected record. Do not show “success” on request dispatch before server/provider outcome is confirmed. Errors explain recovery without exposing internal details.

## Accessibility

Keyboard support, focus styles, labels, and screenreader-friendly descriptions are mandatory.

## Related Documents

- [Page Specifications](page-specifications.md)
- [Accessibility Guidelines](accessibility-guidelines.md)
- [Frontend Error Handling](../06-frontend/error-handling.md)

