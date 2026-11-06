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

Authentication membuktikan identitas; authorization memutuskan tindakan dan data yang boleh diakses. Kedua pemeriksaan dilakukan di server/database, meskipun frontend juga menyembunyikan navigasi yang tidak relevan.

## Authentication

Gunakan Supabase Auth sesuai metode yang disepakati (email/password, OTP, atau SSO). Terapkan redirect allowlist, email/identity verification sesuai policy, recovery flow aman, session expiry/revocation, dan token storage sesuai platform. Jangan simpan access token atau secret di localStorage tanpa threat review; pilihan cookie/session portal web harus diselaraskan dengan deployment. 2FA wajib/recommended per role masih keputusan kebijakan.

## Authorization

Gunakan action-based permission (`view`, `create`, `update`, `approve`, `refund`, `export`, `reconcile`) dan scope (`own`, `branch`, `all within organization`, `assigned_records`). Role adalah kumpulan permission, bukan satu-satunya sumber keputusan. Server menurunkan actor dari `auth.uid()`, mengambil membership/assignment aktif, memvalidasi tenant dan branch, lalu menegakkan RLS. Client tidak boleh menentukan role, organization ID, permission, owner relationship, atau target scope sebagai claim tepercaya.

Role/permission claims dalam JWT, jika digunakan untuk cache, harus berasal dari trusted app metadata/custom access token hook; user-editable metadata tidak otoritatif. Perubahan akses harus memiliki revocation strategy agar token lama tidak mempertahankan privilege lebih lama dari policy yang disetujui.

## Sensitive Rule

Authorization failure tidak mengembalikan apakah record tenant/cabang lain ada. Response memakai error stabil (`UNAUTHENTICATED`, `FORBIDDEN`, `NOT_FOUND_OR_FORBIDDEN`, `VALIDATION_FAILED`, `CONFLICT`) sesuai endpoint; audit denial untuk akses sensitif tanpa mencatat secret/request payload.

## Two-Factor

2FA atau step-up authentication direkomendasikan untuk Owner, Super Admin, Finance, payroll approver, perubahan permission, refund besar, integration secret rotation, dan akses export sensitif. Coverage, recovery factor, dan threshold harus diputuskan dengan Security Owner sebelum production.

## Customer and Staff Context

- Staff identity terhubung ke employee profile namun penonaktifan akun tidak menghapus transaksi historis.
- Customer dapat melihat data pet hanya melalui ownership/authorized guardian relation dan field visibility yang disetujui.
- Clinical access memakai assignment/permission dan audit; portal customer tidak membaca tabel clinical secara bebas.
- Multi-organization users (bila dibutuhkan) harus memilih organization context yang sudah menjadi membership aktif; switching context tidak memberikan hak lintas tenant.

## Related Documents

- [RLS policies](../04-database/rls-security-policies.md)
- [Permission matrix](../02-business-analysis/permission-matrix.md)
- [Session management](../08-security/session-management.md)

