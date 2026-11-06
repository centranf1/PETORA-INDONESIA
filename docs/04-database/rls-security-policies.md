---
title: RLS Security Policies
document_id: PET-DOC-0406
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['database-design.md']
---

# RLS Security Policies

Dokumen ini menguraikan rancangan kebijakan RLS.

## Baseline Requirements

- RLS aktif pada setiap tabel yang dapat diakses melalui Supabase Data API.
- Tenant context harus berasal dari claim yang ditandatangani server atau membership/assignment yang diverifikasi server; client body dan user-editable metadata bukan sumber otorisasi.
- Nilai claim berbentuk text harus di-cast dengan aman ke tipe kolom. Claim hilang atau tidak valid harus menghasilkan deny-by-default.
- SELECT, INSERT, UPDATE, dan DELETE memerlukan policy terpisah sesuai aksi; policy contoh tidak memberi hak tulis.
- Policy harus menguji organization, branch, role/permission, status assignment, dan relasi record sesuai kebutuhan tabel.
- Service role bypasses RLS; pemakaiannya hanya server-side dan harus memiliki authorization check, audit, serta scope eksplisit.

## Illustrative Select Policy

Contoh berikut hanya berlaku untuk tabel tenant-scoped dengan kolom `organization_id` dan opsional `branch_id`, serta claim aktif yang dikelola server di `app_metadata`. Ini bukan policy final sebelum struktur claim dan assignment PETORA disahkan.

```sql
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY customers_read_active_scope
ON public.customers
FOR SELECT
USING (
	organization_id = nullif(auth.jwt() -> 'app_metadata' ->> 'organization_id', '')::uuid
	AND (
		branch_id IS NULL
		OR branch_id = nullif(auth.jwt() -> 'app_metadata' ->> 'active_branch_id', '')::uuid
	)
);
```

Jika role dapat mengakses banyak branch, jangan memperluas `active_branch_id` menjadi wildcard. Gunakan assignment/permission resolver yang diverifikasi server dan uji seluruh jalur; desain helper/fungsi tersebut harus ditinjau sebelum implementasi.

## Branch Isolation

Branch scope is validated using the active organization, selected branch, and role assignment. Data from other branches is rejected by policy. Organization-level rows (`branch_id IS NULL`) harus diizinkan hanya jika use case dan permission memang mengizinkannya.

## Sensitive Policy

Medical records and payroll require stronger policies, sometimes restricting to specific roles only.

## Open Decision

Final policy matrix, signed-claim shape, multi-branch assignment resolver, and service-role access pattern must be aligned with the operational and legal policy of the client organization. SQL snippets are design examples, not migrations.

## Validation Requirements

For each RLS-protected table, test anonymous access, same-organization access, cross-organization denial, same-branch access, cross-branch denial, role/assignment revocation, and mutation policy. Include tests that omit or forge scope claims.

## Related Documents

- [Database Design](database-design.md)
- [Authentication and Authorization](../05-backend/authentication-authorization.md)
- [Security Testing](../09-testing/security-testing.md)
- [Permission Matrix](../02-business-analysis/permission-matrix.md)

