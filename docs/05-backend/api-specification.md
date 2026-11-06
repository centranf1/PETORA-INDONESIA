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

Spesifikasi API mendefinisikan pola akses dan sumber data.

## REST Conventions

Use resource-based endpoints: /customers, /pets, /products, /inventory, /sales, /payments, /bookings, /medical-records, /payroll, /reports.

### Request and Query Contract

- Use JSON for commands and standard HTTP semantics; versioning strategy remains a team decision before external consumers exist.
- Use opaque UUID-like resource IDs, never client-chosen tenant ownership as proof of access.
- List endpoints support bounded `limit`, cursor/keyset pagination for large data, stable sort order, and documented filter allowlists. Do not accept arbitrary SQL/order expressions.
- Commands return authoritative state/version and a `trace_id`; clients do not infer success from a network timeout.
- Mutation endpoints accept an idempotency key when retries could create a second business effect. Same key/same payload returns prior result; same key/different payload conflicts.
- Amounts, permissions, policy flags, status transitions, and tenant scope are recalculated/validated server-side.

### Common Response Shapes

Successful response: `{ "data": ..., "meta": { "trace_id": "...", "next_cursor": null } }`. Error response follows [error-handling.md](error-handling.md), with stable `code`, safe `message`, `retryable`, and `trace_id`.

Do not include fields the caller cannot read; list and export endpoints must enforce row-level scope before pagination/count aggregation to avoid leaking other-tenant totals.

### System Settings Endpoint Group

| Endpoint | Tujuan | Kewenangan |
| --- | --- | --- |
| GET /settings | Menampilkan setting aktif yang diizinkan pada verified scope | Super Admin, Owner, Manager (read-only sesuai permission) |
| GET /settings/:group | Menampilkan config per kelompok | Super Admin, Owner |
| POST /settings | Membuat usulan perubahan konfigurasi | Super Admin |
| PATCH /settings/:id | Mengubah proposal/draft; tidak mengaktifkan policy kritis langsung | Super Admin |
| POST /settings/:id/approve | Menyetujui perubahan kritis | Owner / Super Admin |
| POST /settings/:id/reject | Menolak proposal dengan alasan | Owner / Super Admin |
| GET /settings/:id/history | Mencari riwayat perubahan | Super Admin, Owner |
| POST /settings/validate | Validasi konfigurasi sebelum diterapkan | Super Admin |

### Aturan API setting

- Organization dan branch scope diturunkan dari authenticated context yang diverifikasi server. Client boleh meminta branch context, tetapi tidak dapat mengklaim membership dengan mengirim ID pada body.
- perubahan setting dengan `requires_approval=true` wajib disetujui sebelum berlaku.
- response membedakan nilai aktif dan nilai proposal; proposal pending tidak mengubah `effective_value`.
- response harus menyertakan `status`, `active_version_no`, `proposed_version_no` bila ada, dan audit metadata yang aman.
- secret/provider credential tidak boleh dikembalikan dalam nilai setting; gunakan masked state dan server-side secret manager.
- method update harus menulis ke `setting_versions` dan `setting_audit_log` sebelum final commit.

### Request / Response DTO example

```json
{
  "setting_group": "stock_policy",
  "key": "allow_negative_stock",
  "value": false,
  "reason": "Menjaga kontrol stok dan mencegah oversell",
  "expected_version_no": 2
}
```

```json
{
  "id": "set_789",
  "status": "pending_approval",
  "effective_value": true,
  "proposed_value": false,
  "active_version_no": 2,
  "proposed_version_no": 3,
  "approved_by": null,
  "updated_at": "2026-11-06T09:00:00Z",
  "audit": {
    "changed_by": "user_001",
    "reason": "Menjaga kontrol stok dan mencegah oversell",
    "change_type": "update"
  }
}
```

### Business validation rules

- Setting `allow_negative_stock` hanya dapat diubah ke `true` jika owner atau super admin menyetujui dan ada kebutuhan operasional khusus.
- `refund_policy` dan `notification_policy` tidak boleh dibuat dengan nilai yang melanggar batas yang diatur di level organisasi.
- `branch_id` tidak boleh dipakai untuk mengubah global config yang tidak mengizinkan scope branch.
- Semua perubahan policy harus di-commit dalam satu transaksi database yang mencakup audit log dan version record.
- Server mengambil `requires_approval`, lock state, key type, dan scope rules dari katalog/config aktif; client tidak boleh menentukan sendiri flag approval tersebut.
- `expected_version_no` wajib dipakai untuk mencegah overwrite perubahan yang terjadi sejak form dibuka; konflik dikembalikan sebagai conflict response, bukan last-write-wins.

## Auth

Every endpoint requires valid JWT and branch/organization mapping. Admin functions require elevated role.

## Response Pattern

Status, message, data, pagination, and trace_id. Error responses include code, message, and request context when safe.

## Open Decision

Endpoint path/version, pagination convention and idempotency header name must be agreed before external API commitment. This document's settings endpoints are proposed internal contracts; they are not implemented endpoints.

## Related Documents

- [Authentication and Authorization](authentication-authorization.md)
- [Business Logic Specification](business-logic-specification.md)
- [Edge Functions Specification](edge-functions-specification.md)
- [Error Handling](error-handling.md)
- [Integration Guide](integration-guide.md)

