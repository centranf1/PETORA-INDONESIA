---
title: Coding Standards
document_id: PET-DOC-0609
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['frontend-architecture.md']
---

# Coding Standards

Standar coding frontend mengikat gaya penulisan dan struktur.

## TypeScript

Enable strict TypeScript checks. Type API DTOs and domain IDs explicitly; treat network data as untrusted until parsed/validated. Prefer discriminated unions for lifecycle states and exhaustive `switch` handling. Avoid `any`; if unavoidable, isolate it at an adapter, explain why, and narrow immediately. Never use a frontend type assertion as runtime validation.

## Naming

Use PascalCase for component names and types, camelCase for functions/variables, and descriptive hook names starting with `use`. Follow the existing repository's file naming before adding new conventions. Name booleans by meaning (`isPending`, `canApprove`) and avoid generic `data`, `item`, or `value` when domain context matters.

## Linting

Follow repository ESLint/formatter/tsconfig, do not disable rules globally to satisfy one file, and keep components focused on rendering/interaction. Put API mapping, query keys, form schema and domain orchestration in the owning feature layer. Avoid hidden side effects during render and stale async state after scope change.

## Security and Data Handling

- Never store secrets or authorization decisions in client code.
- Do not log full API payloads containing customer, clinical, financial, or employee data.
- Do not use client-calculated totals as authoritative transaction data.
- Render user-supplied content as text; sanitize/allowlist any rich content.
- Clear sensitive caches on logout, account change, and organization/branch scope change.

## Component Rules

Use semantic HTML, associated labels, keyboard interaction, stable keys, and explicit loading/disabled states. Keep component props small and typed. Reuse shared primitives; domain-specific variations remain in feature components rather than boolean prop explosions.

## Review

PRs require review for correctness, data scope, error/empty/loading behavior, responsive layout and accessibility. Run the repository's lint/typecheck/test/build scripts and record any unavailable gate.

## Related Documents

- [Frontend Architecture](frontend-architecture.md)
- [Component Architecture](component-architecture.md)
- [Accessibility Guidelines](../07-ui-ux/accessibility-guidelines.md)

