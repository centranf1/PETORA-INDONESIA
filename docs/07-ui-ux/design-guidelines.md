---
title: Design Guidelines
document_id: PET-DOC-0701
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['design-system.md', 'accessibility-guidelines.md']
---

# Design Guidelines

Panduan desain PETORA fokus pada konsistensi, aksesibilitas, dan operasional.

## Style Foundation

Prioritize fast scanning, data comparison, short repeated actions, exception review and handoff. Keep pages organized by task and domain, with clear page title, scope indicator, primary action, filters, content, and status. Use stable layout and compact but readable density; avoid decorative cards that obscure work or marketing-style hero layouts in operational screens.

## Color

Use semantic color tokens; exact brand palette requires approval. Success/warning/danger/info must also include text or icon labels. Test contrast on text, outlines, focus, badges, disabled states and charts. Avoid using the same color for unrelated semantic states.

## Spacing

Use a 4px base spacing scale with documented increments, consistent page gutters, and responsive constraints. Maintain stable widths/heights for repeated controls; long labels and validation messages must wrap without overlapping adjacent actions. Do not scale font size directly with viewport width.

## Responsive and Data-Dense Layout

Desktop may use side navigation and multi-column tables. Tablet/mobile should prioritize the current task, stack filters and details, preserve primary actions, and convert complex rows into labeled summaries when horizontal scrolling would hide meaning. Do not simply shrink desktop tables to unreadable text.

## Motion and Feedback

Use motion only to explain transitions (drawer/dialog, progress, state change); honor reduced-motion preferences. Async actions keep their layout stable and distinguish loading, pending, success, and failure.

## Related Documents

- [Design System](design-system.md)
- [Accessibility Guidelines](accessibility-guidelines.md)
- [Information Architecture](information-architecture.md)

