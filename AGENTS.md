# PETORA AI Development Rules

## Purpose

This file governs AI assistants, coding agents, and automated contributors working in this repository. Implementations must follow PETORA's approved business requirements and engineering documentation. Do not treat a successful code change as correct when it conflicts with the documented product behavior, security boundary, or operating workflow.

## Mandatory Start-of-Task Reading

At the beginning of **every task**, before proposing or editing implementation:

1. Read this `AGENTS.md` and the complete root `README.md`. `README.md` is the primary product-scope source.
2. Read `docs/README.md` and `docs/00-overview/documentation-guide.md` to understand the documentation map, status rules, and change requirements.
3. Read `docs/13-traceability/open-decisions.md` and the latest `docs/13-traceability/documentation-completeness-report.md` so unresolved or incomplete items are not mistaken for approved requirements.
4. Identify the requirement, feature, workflow, roles, and acceptance criteria related to the task. Read their source documents and all directly relevant architecture, database, API, frontend/UI, security, testing, and operations documents linked by them. Follow relevant cross-references until the implementation boundary is clear.
5. For broad or cross-cutting work, read the full relevant document set before editing and use the documentation index to identify dependencies. Do not claim to have reviewed every document unless you actually inspected every document.

If a required source is missing, record that fact and create or update the appropriate documentation before implementing dependent behavior. Never infer that a missing document means a feature is optional.

## Source of Truth and Conflicts

- Follow the user's latest explicit direction, subject to security and repository constraints.
- `README.md` defines PETORA's product scope and baseline requirements. The detailed documents in `docs/` refine these requirements and define implementation contracts.
- A document marked `Draft`, an item in `open-decisions.md`, a recommendation, or an example is not an approved business policy. Do not silently promote it to a production rule.
- If sources conflict or a decision is unresolved, do not choose a behavior that changes finance, inventory, clinical access, privacy, permissions, tax, retention, or other material business outcomes. Record the conflict in `open-decisions.md`, document a safe interim behavior if needed, and ask the product/business owner when the decision blocks implementation.
- Never describe a proposed architecture, schema, API, policy, or integration as already implemented unless code and configuration verify it.

## Before Implementation

For each task, establish a small trace from the request to:

- requirement and feature IDs;
- business workflow, actors, roles, permissions, and exception paths;
- affected modules, data entities, and tenant/branch scope;
- API or edge-function contract and validation boundary;
- UI pages, states, accessibility, and user feedback where applicable;
- security, audit, privacy, and operational impact;
- acceptance criteria and tests.

State the local behavior hypothesis and the narrowest check that could disprove it before the first edit. Prefer the owning module and the smallest complete change. Avoid unrelated refactors.

## Implementation Rules

- Preserve the modular boundaries and conventions documented in `docs/`; do not introduce a new stack, provider, domain rule, or data model without documenting and approving the decision.
- Enforce authorization and business invariants on the server/database. Frontend visibility is not an authorization control. Derive organization and branch scope from trusted authenticated context; never trust client-supplied scope without server validation.
- Keep secrets out of source control, browser bundles, logs, and ordinary configuration responses. Use the documented secret-management mechanism.
- Treat financial, inventory, clinical, payroll, identity, and settings changes as auditable operations. Preserve transaction integrity, idempotency, history, and approval requirements defined by the relevant documents.
- Dynamic settings must use an allowlisted key/schema, validated scope, version history, audit trail, and approval workflow when required. Never add arbitrary executable expressions or secrets as runtime settings.
- Respect data retention, correction, and deletion rules. Do not hard-delete historical financial or clinical records unless an approved policy explicitly requires it.
- Follow `docs/12-development-standards/definition-of-ready.md`, `definition-of-done.md`, code-review, testing, and documentation standards. Add or update tests with behavior changes.
- Do not claim verification that was not run. Report commands and remaining gaps accurately.

## Documentation Is Part of the Change

When implementation changes or clarifies behavior, update all affected artifacts in the same change where practical:

- product requirements, acceptance criteria, feature backlog/catalog;
- business rules, use cases, processes, role/permission matrix;
- architecture overview or ADR for material decisions;
- database design, dictionary, RLS, retention, and migration guidance;
- API, backend, and integration contracts;
- frontend structure, page specifications, interaction/accessibility rules;
- security, audit, and privacy documents;
- test scenarios, test-to-requirement mappings, and traceability matrix;
- user/admin manuals, operations, deployment, backup, and rollback procedures.

Update `docs/README.md` when the document map changes, `open-decisions.md` when a decision remains unresolved, and the completeness report when validation status changes. Keep IDs stable; do not reuse requirement, feature, test, or document IDs.

## Verification and Completion Gate

Before declaring a task complete:

1. Run the narrowest relevant tests first, then the required broader checks for the changed surface.
2. Validate local Markdown links and document IDs when documentation changes; validate migrations, RLS, API contracts, and security-sensitive behavior when those areas change.
3. Check requirement-to-feature-to-workflow-to-data/API/UI-to-test traceability for changed behavior.
4. Confirm documentation status is honest: Draft remains Draft until an authorized stakeholder approves it; unresolved decisions remain visible.
5. Summarize changed files, behavior, validation evidence, and unresolved decisions. Clearly distinguish implemented code from documentation-only proposals.

## Documentation-Only Repository State

The presence of detailed specifications does not prove that the application exists or that the specifications have been implemented. If source code, migrations, tests, or deployment configuration are absent, do not invent them or claim a production-ready application. First complete the requested documentation baseline and make implementation readiness and remaining decisions explicit.
