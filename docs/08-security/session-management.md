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

Session policy mengelola autentikasi dan masa hidup token, bukan menetapkan data scope. Parameter numerik dan 2FA role coverage belum diputuskan; jangan menuliskan durasi sebagai policy sampai Security/Product Owner menyetujui.

## Controls

Gunakan Supabase Auth token lifecycle/refresh sesuai platform, secure transport, logout yang menghapus state/cache client, account disable/recovery, rate limiting dan alert login failure, serta secure callback/redirect allowlist. Bila cookie dipakai, tetapkan HttpOnly/Secure/SameSite dan CSRF strategy sesuai deployment. Jangan menyimpan session secrets di URL atau log.

Perubahan password, reset, role/branch removal, suspected compromise, dan employee offboarding harus memiliki jalur revocation yang teruji. Authorization query harus menggunakan membership terkini atau TTL/re-auth behavior yang disetujui; stale JWT role claim tidak boleh mempertahankan privilege secara tidak terbatas.

Aturan concurrent sessions, idle/absolute timeout, 2FA enforcement/recovery, trusted device, dan login lockout threshold merupakan open decision. Hindari lockout yang dapat dipakai attacker untuk denial of service; recovery harus diaudit.

## Critical Rule

No browser operation may assume a valid session without server verification of token, actor status, organization membership, branch permission, and action authorization. Session expiry during a non-idempotent command must not trigger automatic resubmission.

## Related Documents

- [Authentication and authorization](../05-backend/authentication-authorization.md)
- [Data protection](data-protection.md)
- [Security policies](security-policies.md)

