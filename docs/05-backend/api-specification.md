---
title: API Specification
document_id: PET-DOC-0503
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['edge-functions-specification.md']
---

# API Specification

Dokumen ini mendefinisikan logical API contract. Route dan transport akhir perlu diselaraskan dengan Edge Functions/Supabase API saat implementasi; contoh tidak membuktikan endpoint sudah tersedia.

## REST Conventions

Gunakan resource-based operations untuk `/customers`, `/pets`, `/products`, `/inventory`, `/sales`, `/payments`, `/bookings`, `/medical-records`, `/payroll`, `/reports`, dan `/settings`. Setiap request terproteksi memerlukan session JWT valid; server menentukan actor dari token, tidak menerima identitas actor dari body.

- Paginate list dengan cursor/limit dan filter yang di-allowlist; jangan expose arbitrary SQL/filter expression.
- Mutasi kritis menerima `Idempotency-Key` atau request ID stabil; response retry untuk key yang sama harus merujuk hasil operasi pertama.
- Nilai transaksi seperti total, tax, discount, stock, approval state, dan effective permission dihitung/divalidasi server-side.
- Error mengikuti envelope konsisten `{ code, message, trace_id, details? }`; detail tidak boleh membocorkan tenant lain, secret, atau medical data.
- Gunakan conditional version (`expected_version_no`) untuk optimistic concurrency pada settings dan master data yang memiliki revision.

## Settings API (Logical Contract)

Organization context diturunkan dari Auth membership. Branch context boleh menjadi target input bila action mendukung scope branch, tetapi server wajib memvalidasi assignment dan kepemilikan branch. Client tidak dapat memilih atau menimpa tenant bebas.

| Operation | Purpose | Authorization |
| --- | --- | --- |
| `GET /settings?group=&branch_id=` | Baca effective settings yang boleh dilihat; sensitive value dimask | Per-setting read permission |
| `GET /settings/:id/versions` | Baca versi dan status tanpa secret payload | Settings audit/read permission |
| `POST /settings/:id/versions` | Buat draft proposal berdasarkan active version | Super Admin write permission |
| `POST /settings/:id/versions/:version/validate` | Validasi schema, range, dependency, dan impact | Super Admin write permission |
| `POST /settings/:id/versions/:version/submit` | Ajukan perubahan untuk approval atau aktivasi | Super Admin write permission |
| `POST /settings/:id/versions/:version/approve` | Setujui usulan sesuai kategori dan scope | Owner/approver permission; self-approval policy open |
| `POST /settings/:id/versions/:version/reject` | Tolak usulan dengan alasan | Owner/approver permission |
| `POST /settings/:id/rollback` | Buat versi baru dari versi lama yang dipilih | Elevated permission; reason dan audit wajib |

### Aturan API setting

- `organization_id`, actor, `requires_approval`, lock flag, permission, dan current effective value tidak dapat ditentukan oleh client.
- Request proposal mengirim `value`, optional `branch_id`, `base_version_no`, `reason`, serta `Idempotency-Key`; value divalidasi terhadap `setting_definitions` di server.
- Update menolak stale `base_version_no` (HTTP 409) agar perubahan lain tidak tertimpa.
- Version + audit + setting active pointer ditulis dalam satu transaksi DB ketika aktivasi terjadi; draft/reject juga memiliki event audit.
- Untuk approval-required, create/submit hanya menghasilkan `pending_approval`; `effective_value` tetap versi lama sampai decision berhasil dan policy runtime diperbarui.
- Response mengembalikan `status`, `version_no`, `effective_version_no`, dan `trace_id`. Sensitive settings mengembalikan `is_configured`/masked state, bukan secret value.
- Rollback bukan overwrite; sistem membuat versi baru yang membawa value dari versi lama dan melewati validation/approval sesuai risk policy.

### Request / Response DTO example

```json
{
  "branch_id": "branch_456",
  "value": false,
  "base_version_no": 3,
  "reason": "Mencegah oversell sesuai kebijakan stok yang disepakati"
}
```

```json
{
  "setting_id": "setting_uuid",
  "status": "pending_approval",
  "version_no": 4,
  "effective_version_no": 3,
  "trace_id": "request_trace_id"
}
```

### Business validation rules

- `allow_negative_stock` adalah policy risiko tinggi; perubahan hanya aktif setelah rule, approver, dan alasan yang disepakati tervalidasi. Nilai/approval threshold final masih open decision.
- `refund_policy` dan `notification_policy` harus sesuai schema dan parent organization policy; branch override tidak boleh melemahkan constraint fundamental.
- `branch_id` ditolak jika setting definition tidak mendukung branch scope atau branch tidak termasuk organization/assignment aktor.
- Semua perubahan policy harus atomic antara version/audit/active pointer dan harus aman diulang.

## Auth

Every endpoint requires valid JWT and permission check. Entity access follows RLS; sensitive write uses server-verified organization/branch and action permissions. User-provided `organization_id`, `role`, or `is_super_admin` claim is not authoritative. Use `auth.uid()`/trusted membership and invalidate sessions or refresh authorization promptly after role revocation.

## Response Pattern

Success response contains `data`, optional pagination, and `trace_id`. Validation returns field-level safe errors; unauthorized and not-found semantics must not disclose whether a cross-tenant record exists. Provider errors are mapped to stable internal codes and include sanitized retryability metadata.

## Related Documents

- [Edge Functions specification](edge-functions-specification.md)
- [Authentication and authorization](authentication-authorization.md)
- [Transaction integrity](../04-database/transaction-integrity.md)
- [Settings database model](../04-database/database-design.md)

## Open Decisions

Final route prefix/versioning, role/approval mapping, global setting model, payload size limit, and provider idempotency behavior require implementation and product/security review.

