---
title: Authentication and Authorization
document_id: PET-DOC-0505
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['backend-architecture.md']
---

# Authentication and Authorization

Panduan ini menjelaskan bagaimana autentikasi dan otorisasi dikelola. Detail role dan scope masih Draft sampai permission matrix disetujui.

## Authentication

Use Supabase Auth for identity and session lifecycle. Enabled login factors and SSO providers require deployment/product approval. Sessions must use the platform's supported secure storage and expiry/refresh behavior; credentials and access tokens must never be logged or placed in URLs.

## Authorization

Authorization is enforced at the server/API or Edge Function boundary and again with RLS for database access. A user identity is not itself a business permission. Resolve role, action, organization, active branch, ownership, and assigned-record scope from server-verified assignments.

If JWT custom claims are used, place authorization claims only in server-managed `app_metadata`, never user-editable `user_metadata`. Define claim schema, issuer/update path, maximum staleness, and revocation behavior before relying on claims for access. Missing or malformed tenant context must fail closed. Do not accept `organization_id`, `branch_id`, `role`, or `user_id` from a request body as proof of authorization.

For multi-branch users, branch selection is a requested context, not a grant. The server verifies that the authenticated user has an active assignment to the requested organization and branch before issuing/using that context. Role/permission changes must take effect within the documented session refresh/revocation window.

## Authorization Decision Inputs

Every protected operation evaluates:

- authenticated subject and active account status;
- organization membership and status;
- action permission (`view`, `create`, `update`, `approve`, `export`, etc.);
- branch, owner, or assigned-record scope;
- record sensitivity and workflow state;
- additional approval or separation-of-duties requirements.

Apply the least privilege needed for the action. UI hiding is a usability feature only; direct API calls receive the same authorization checks.

## Sensitive Rule

If authorization fails, return a stable, safe denial response without revealing protected record existence or internal policy details. Record the security event with minimal metadata and no secret payload.

## Two-Factor

Require or recommend 2FA for privileged roles according to the final security policy. The role list and enforcement point are open decisions; do not imply that recommendation means enforcement exists.

## Repository Implementation Status

- `auth-signin` authenticates email/password through Supabase Auth.
- `auth-me` verifies the bearer token server-side, rejects inactive application users or organizations, and returns only active role assignments belonging to the user's organization.
- The frontend loads its protected user/organization/role context through `auth-me`; it no longer reads identity and role tables directly from the browser.
- `auth-signup` remains unavailable with `503 POLICY_NOT_APPROVED` until organization provisioning, initial branch assignment, role grant, and atomicity are approved and implemented.
- Database RLS is enabled with no policies at this interim stage, so direct Data API access is deny-by-default. The service-role auth context endpoint still performs explicit status and assignment validation; this is not a substitute for final permission, branch-selection, and revocation policy.

## Related Documents

- [Permission Matrix](../02-business-analysis/permission-matrix.md)
- [RLS Security Policies](../04-database/rls-security-policies.md)
- [Security Architecture](../08-security/security-architecture.md)
- [Session Management](../08-security/session-management.md)

