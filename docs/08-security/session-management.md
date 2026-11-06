---
title: Session Management
document_id: PET-DOC-0805
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-protection.md']
---

# Session Management

Pengelolaan sesi pengguna dan hak akses.

## Controls

Use the platform-supported auth session lifecycle, secure same-site/HttpOnly cookies where the deployment architecture supports them, and protect refresh tokens from script-readable storage when possible. Access tokens must not appear in URLs, analytics, console logs, or crash reports.

| Event | Required behavior |
| --- | --- |
| Login | Verify identity and active account; apply rate limiting and MFA policy where approved |
| Token refresh | Rotate/use provider-supported refresh flow; handle refresh failure by clearing protected state and requiring reauth |
| Logout | Revoke/invalidate server session as supported and clear frontend query/cache/local sensitive drafts |
| Password/role/assignment change | Define session invalidation or claim refresh window; stale privilege must not persist beyond approved bound |
| Inactive account | Deny protected API actions even if an old browser session remains |
| Suspicious login | Rate-limit, alert, and provide recovery without user enumeration |

Idle timeout, absolute lifetime, concurrent session cap, MFA enforcement, lockout threshold, and recovery verification are open security/product decisions. Do not set arbitrary numeric values in this baseline.

## Critical Rule

No browser operation may assume a valid session without server verification of token, account status, tenant membership and branch assignment. Route state is not authorization. Session expiration during a pending mutation must reconcile the operation by idempotency/trace reference after reauthentication instead of silently resubmitting.

## Related Documents

- [Authentication and Authorization](../05-backend/authentication-authorization.md)
- [Secrets Management](secrets-management.md)
- [Security Testing](../09-testing/security-testing.md)

