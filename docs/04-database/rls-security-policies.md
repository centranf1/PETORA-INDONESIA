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

Dokumen ini menetapkan baseline kebijakan Row Level Security (RLS) untuk mencegah akses lintas organisasi, cabang, dan role. Contoh SQL di bawah adalah rancangan untuk diverifikasi terhadap schema final, bukan migration siap production.

## Security Invariants

- Aktifkan RLS pada setiap tabel di schema yang terekspos melalui Supabase Data API.
- Jangan gunakan `organization_id`, `branch_id`, role, atau permission dari request body sebagai bukti otorisasi.
- Identitas aktor diambil dari `auth.uid()`; organisasi dan scope cabang ditentukan melalui relasi ke data keanggotaan yang dikelola server.
- Semua operasi sensitif memvalidasi permission aksi di database atau Edge Function dan tetap dibatasi oleh RLS.
- Service role men-bypass RLS; karena itu key tersebut hanya boleh berada di server dan pemakaiannya harus sempit serta diaudit.
- View, RPC, Storage object, dan Realtime subscription harus ditinjau sebagai jalur akses data, bukan hanya tabel dasar.

## Tenant and Branch Context

```sql
-- Rancangan ilustratif. Periksa nama kolom, schema, dan role code pada schema final.
-- users.id harus dipetakan ke auth.uid(); user_role_assignments dan roles
-- merupakan sumber assignment yang dikelola backend, bukan user-editable metadata.
CREATE SCHEMA IF NOT EXISTS authz;

CREATE OR REPLACE FUNCTION authz.can_access_org(target_org uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
	SELECT EXISTS (
		SELECT 1
		FROM public.users u
		WHERE u.id = (SELECT auth.uid())
			AND u.organization_id = target_org
			AND u.status = 'active'
	);
$$;

CREATE OR REPLACE FUNCTION authz.can_access_branch(target_org uuid, target_branch uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
	SELECT EXISTS (
		SELECT 1
		FROM public.users u
		JOIN public.user_role_assignments ura ON ura.user_id = u.id
		JOIN public.roles r ON r.id = ura.role_id
		WHERE u.id = (SELECT auth.uid())
			AND u.organization_id = target_org
			AND u.status = 'active'
			AND (
				ura.branch_id = target_branch
				OR (ura.branch_id IS NULL AND r.code IN ('owner', 'super_admin'))
			)
	);
$$;

REVOKE ALL ON FUNCTION authz.can_access_org(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION authz.can_access_branch(uuid, uuid) FROM PUBLIC;
GRANT USAGE ON SCHEMA authz TO authenticated;
GRANT EXECUTE ON FUNCTION authz.can_access_org(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION authz.can_access_branch(uuid, uuid) TO authenticated;

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers FORCE ROW LEVEL SECURITY;

CREATE POLICY customers_select_scope
ON public.customers
FOR SELECT TO authenticated
USING (
	authz.can_access_org(organization_id)
	AND (branch_id IS NULL OR authz.can_access_branch(organization_id, branch_id))
);

CREATE POLICY customers_insert_scope
ON public.customers
FOR INSERT TO authenticated
WITH CHECK (
	authz.can_access_org(organization_id)
	AND (branch_id IS NULL OR authz.can_access_branch(organization_id, branch_id))
	AND created_by = (SELECT auth.uid())
);

CREATE POLICY customers_update_scope
ON public.customers
FOR UPDATE TO authenticated
USING (
	authz.can_access_org(organization_id)
	AND (branch_id IS NULL OR authz.can_access_branch(organization_id, branch_id))
)
WITH CHECK (
	authz.can_access_org(organization_id)
	AND (branch_id IS NULL OR authz.can_access_branch(organization_id, branch_id))
);
```

### Function Hardening Requirements

- Function owner harus role database yang terkontrol; jangan memberi ownership kepada role aplikasi biasa.
- Schema `authz` tidak boleh dimasukkan ke daftar schema yang diekspos sebagai API publik.
- `SECURITY DEFINER` harus memakai `search_path` kosong dan nama objek fully-qualified.
- Review akses `EXECUTE`, ownership, SQL body, dan dampak membership revocation sebelum deploy.
- Function contoh mengasumsikan user hanya berada pada satu organization melalui `users`; jika model final mendukung multi-organization membership, ganti lookup tersebut dengan tabel membership eksplisit.

## Policy Matrix Requirements

Setiap tabel harus memiliki keputusan terpisah untuk SELECT, INSERT, UPDATE, dan DELETE. Secara default, DELETE ditolak; data transaksi, medis, dan audit dikoreksi melalui revisi, reversal, atau archive workflow.

| Data group | Organization boundary | Branch boundary | Additional restriction |
| --- | --- | --- | --- |
| Master operasional | Wajib | Jika branch-scoped | Action permission untuk mutasi |
| Sales, payment, stock, finance | Wajib | Wajib | Mutasi melalui server-side workflow dan audit |
| Clinical / medical | Wajib | Wajib | Assigned clinician / clinical permission; customer view hanya data yang diizinkan |
| Payroll / HR | Wajib | Wajib | HR/Finance permission; employee hanya self-service field yang diizinkan |
| Settings / integrations | Wajib | Sesuai scope | Super Admin/Owner permission, approval dan audit; secret tidak pernah dikembalikan ke browser |
| Audit logs | Wajib | Sesuai event | Append-only; read dibatasi |

## Storage, Views, RPC, and Realtime

- Storage policy harus memeriksa metadata organization/branch dan relasi file ke record yang diotorisasi; nama bucket atau path saja bukan kontrol akses.
- View harus menggunakan semantics invoker yang sesuai dan tidak boleh melewati RLS secara tidak sengaja.
- RPC harus memvalidasi `auth.uid()`, tenant, permission, parameter, dan state transition; fungsi privileged tidak boleh menjadi generic SQL gateway.
- Realtime publication hanya mencakup data yang memang boleh diterima client; uji subscription lintas tenant/cabang.

## Required RLS Tests

Setiap policy memiliki test allow dan deny untuk SELECT, INSERT, UPDATE, DELETE; minimal uji tenant lain, branch lain, user nonaktif, role tanpa permission, `branch_id` manipulatif, dan revoked assignment. Uji menggunakan authenticated role nyata di database test, bukan hanya mock frontend.

## Open Decisions

Kode role final, dukungan multi-organization per user, role lintas seluruh tenant untuk Super Admin, serta permission spesifik per aksi harus disepakati sebelum policy production dibuat. Super Admin tenant tidak boleh otomatis berarti akses lintas tenant.

## Related Documents

- [Database design](database-design.md)
- [Data dictionary](data-dictionary.md)
- [Security architecture](../08-security/security-architecture.md)
- [Security testing](../09-testing/security-testing.md)

