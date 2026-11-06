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

Contoh ini hanya mengilustrasikan predikat scope dan belum memeriksa action permission, ownership record, user status, atau role. Jangan deploy sebagai policy final tanpa melengkapi authorization model.

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

## Policy Matrix by Data Domain

| Data group | Direct client `SELECT` baseline | Direct client mutation baseline | Required additional predicate / owner |
| --- | --- | --- | --- |
| Organization / branch | Read only memberships and branches user is assigned to; inactive branch history may be read if permission allows | Deny generic insert/update/delete; organization admin commands use server handler | Same organization, branch assignment, active status, action permission |
| Users / roles / permissions | Self/profile plus admin view limited to organization and assigned scope | Deny generic role/assignment mutation; use audited admin command | Self vs admin distinction, no client-editable authorization metadata |
| Customers / pets / owner links | Staff access by customer permission + branch scope; customer role only verified own profile/pet relationship | Create/update through validated API; ownership transfer is a dedicated audited command | Same organization, ownership/assignment, sensitive-field projection |
| Products / prices | Catalog read within organization and permitted branch/effective date | Price changes use domain command and approval policy; no raw client update to active price history | Effective-date snapshot, approval, branch scope |
| Inventory locations / ledgers / batches | Read permitted location/branch data; no global totals leakage | Deny update/delete on ledger; movements created only via receipt/transfer/adjustment/sale/dispense command | Same tenant, location assignment, source ownership, reason and approval |
| Sales / payments / refunds | Staff permission and branch scope; customer sees only own permitted transaction projection | No generic update/delete; checkout/refund commands own state transitions | Cashier/approver separation, idempotency, provider reconciliation |
| Booking / service visits | Assigned staff and customer-owned booking view | Commands validate capacity and lifecycle; no arbitrary status update | Customer-pet ownership, branch/service assignment, capacity lock |
| Clinical / prescriptions / dispensing | Explicit clinical role + assigned patient/visit; customer reads only approved projection | Finalization/revision/dispense through clinical commands; direct delete/update denied | Veterinarian/pharmacy authority, consent, patient relation, record state |
| Payroll / finance / journals | HR/Finance/Accounting permission by organization/branch; customer access always denied | Posted journal/payroll/payment changes via approval, posting or reversal commands | Period state, separation of duties, amount limits, audit |
| System settings / proposals / versions | No direct client table access in current baseline; Settings API returns only allowlisted safe fields | Deny direct client writes; server-side settings service performs validated transaction | Key schema, scope, lock, expected version, approval, secret redaction |
| Audit logs / security events | Restricted compliance/Owner/Super Admin endpoint with scope and purpose | Append through trusted transaction/service only; no ordinary update/delete | Actor/target scope, redaction, export audit and retention policy |

This matrix is the minimum design contract; exact grants and whether safe read-only domains use Data API or server endpoints are implementation decisions. A role label alone is insufficient for any row.

## Policy Function Design

If policies call helper functions such as `can_access_branch` or `has_permission`, document the function owner, execution role, grants, `search_path`, volatility, error behavior, and whether it bypasses RLS. Any `SECURITY DEFINER` function must use a pinned safe `search_path`, narrow execute grants, fixed SQL (no unsafe dynamic SQL), and tests for recursion/privilege escalation. Do not query an RLS-protected assignment table in a way that recursively invokes the same policy; resolve that boundary explicitly.

For multi-organization/multi-branch users, an `active_branch_id` claim is a selected context, not a standing grant. Validate it against server-managed assignment and account status, or use a reviewed helper that performs this check. Claims can become stale after role revocation; define the revocation/refresh window before relying on them for privileged actions.

## Mutation Policy Requirements

- `INSERT` uses `WITH CHECK` to verify both row tenant scope and permitted creator/branch.
- `UPDATE` must validate existing row access with `USING` and validate resulting row scope with `WITH CHECK`; prevent changing `organization_id`, `branch_id`, owner, amount, status or other protected attributes unless the command explicitly allows it.
- `DELETE` is disabled for immutable history/ledger/finalized records; use the approved correction or retention workflow.
- If a table has no safe client mutation use case, do not create an `INSERT`/`UPDATE`/`DELETE` policy for it.
- Privileged service-role operations perform equivalent permission and relationship checks in application code because service role bypasses RLS.

## Branch Isolation

Branch scope is validated using the active organization, selected branch, and role assignment. Data from other branches is rejected by policy. Organization-level rows (`branch_id IS NULL`) harus diizinkan hanya jika use case dan permission memang mengizinkannya.

## Sensitive Policy

Medical records and payroll require stronger policies, sometimes restricting to specific roles only.

## Open Decision

Final policy matrix, signed-claim shape, multi-branch assignment resolver, and service-role access pattern must be aligned with the operational and legal policy of the client organization. SQL snippets are design examples, not migrations.

## Validation Requirements

For each RLS-protected table, test anonymous access, same-organization access, cross-organization denial, same-branch access, cross-branch denial, role/assignment revocation, and mutation policy. Include tests that omit or forge scope claims.

## Test Matrix and Evidence

| Test dimension | Positive case | Negative case |
| --- | --- | --- |
| Organization | User reads permitted row in Org A | User from Org A reads/writes Org B row |
| Branch | Assigned manager accesses Branch A data | Same manager accesses Branch B or inactive branch write |
| Record relation | Customer reads own pet projection | Customer reads another owner's pet/medical record |
| Action permission | Inventory role submits allowed receipt command | Inventory role edits ledger or approves own high-risk adjustment |
| Data transition | Service command changes allowed state | Direct update bypasses finalized/cancelled/posted state |
| Session lifecycle | Active assignment is honored | Revoked/disabled role or missing claim still accesses data |
| Search/count/export | Filtered results stay within permitted scope | Other-tenant existence leaks through count, error, pagination or export |
| Storage/realtime | Authorized object/event visible | Direct object URL/topic access from unauthorized identity |

Record migration/version, test identity role/scope, request ID, query/action, expected/actual result, audit event and cleanup evidence. Run against the actual migrated test schema, not only mocked policy helpers.

## Related Documents

- [Database Design](database-design.md)
- [Authentication and Authorization](../05-backend/authentication-authorization.md)
- [Security Testing](../09-testing/security-testing.md)
- [Permission Matrix](../02-business-analysis/permission-matrix.md)

