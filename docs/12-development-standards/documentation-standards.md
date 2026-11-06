---
title: Documentation Standards
document_id: PET-DOC-1206
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['engineering-handbook.md']
---

# Documentation Standards

Standar dokumentasi teknik dan bisnis.

## Format

Use Markdown, one H1 per document, semantic heading hierarchy, tables for compact comparison, numbered steps for procedures, diagrams only when they clarify behavior, and frontmatter for all maintained docs. Maintain stable `document_id`; do not copy IDs. Relative links must resolve.

## Language

Use Bahasa Indonesia for explanatory prose and consistent English technical identifiers where standard. Define abbreviations in the glossary, use one term per concept, and avoid mixing status/role names. Prefer precise actors and outcomes over broad “system handles” wording.

## Quality

Each document states purpose, scope, status/authority, assumptions, detailed contract/procedure, failure/exception paths, security/privacy, dependencies, verification/acceptance evidence, and related docs where applicable. Mark examples as illustrative, TBD items as open, and facts vs proposals explicitly. Do not duplicate long policy text; link to the owning document and state local impact.

## Lifecycle and Review

- Update version/date and related documents when the content changes materially.
- Keep Draft until approval evidence and owner are recorded.
- Deprecate replaced content with a link to its successor; do not silently delete historical requirements/ADRs.
- Review docs alongside source code, migrations and test changes in the same PR.

## Validation

Check Markdown links, metadata/IDs, code fences/JSON examples, diagram consistency, traceability, spelling of domain terms, and that no unsupported target or legal statement is presented as fact. The completeness report states what was actually checked and what remains unreviewed.

## Related Documents

- [Documentation Guide](../00-overview/documentation-guide.md)
- [Change Management](change-management.md)
- [Requirements Traceability Matrix](../13-traceability/requirements-traceability-matrix.md)

