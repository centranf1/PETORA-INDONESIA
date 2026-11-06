---
title: Accessibility Guidelines
document_id: PET-DOC-0707
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['design-guidelines.md']
---

# Accessibility Guidelines

Dokumen ini mengatur aksesibilitas UI.

## Requirements

Target WCAG 2.1 AA for critical workflows, subject to formal product/legal confirmation. Minimum implementation checks:

- All actions are keyboard accessible with visible, unobscured focus; focus order follows task order.
- Controls have persistent programmatic labels; errors and required state are associated with fields.
- Contrast is measured for text, controls, focus and status in every theme; color is never the sole signal.
- Headings/landmarks/table headers are semantic; icon-only buttons have accessible names/tooltips.
- Dialogs move focus in, contain it while open, close predictably, and restore focus to the trigger.
- Images have purpose-based alt text; decorative images are ignored by assistive technology.
- Dynamic updates (save result, queue changes, pending payment) use restrained live-region announcements.
- Zoom/reflow and narrow viewport do not hide critical actions or create unintended two-dimensional scrolling outside complex data grids.

## Operational Considerations

Forms show inline and summary errors without relying on color. Tables have caption/headers, predictable keyboard navigation, and accessible sort state. Modal dialogs have title/description and focus management. Timeouts and auto-updating state must not unexpectedly remove user input.

## Compliance

Run automated accessibility scans plus manual keyboard and screen-reader checks on checkout/payment, booking, clinical record, settings approval, and customer portal. Automated tools do not prove conformance; record exceptions and remediation owner.

## Acceptance Evidence

Every user-facing PR records at least one relevant keyboard/focus/error-state check. Before release, test the critical journeys at desktop and mobile widths and with reduced-motion preference where motion exists.

## Related Documents

- [Design System](design-system.md)
- [Interaction Patterns](interaction-patterns.md)
- [Page Specifications](page-specifications.md)

