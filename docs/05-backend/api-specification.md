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

### System Settings Endpoint Group

| Endpoint | Tujuan | Kewenangan |
| --- | --- | --- |
| GET /settings | Menampilkan semua config aktif untuk org/branch | Super Admin, Owner, Manager |
| GET /settings/:group | Menampilkan config per kelompok | Super Admin, Owner |
| POST /settings | Membuat usulan perubahan konfigurasi | Super Admin |
| PATCH /settings/:id | Update setting aktif atau draft | Super Admin |
| POST /settings/:id/approve | Menyetujui perubahan kritis | Owner / Super Admin |
| GET /settings/:id/history | Mencari riwayat perubahan | Super Admin, Owner |
| POST /settings/validate | Validasi konfigurasi sebelum diterapkan | Super Admin |

### Aturan API setting

- Semua request setting harus mengirim `organization_id` dan `branch_id` yang valid dari auth context, bukan dari browser body.
- perubahan setting dengan `requires_approval=true` wajib disetujui sebelum berlaku.
- response harus menyertakan `effective_value`, `status`, `version_no`, dan audit metadata.
- method update harus menulis ke `setting_versions` dan `setting_audit_log` sebelum final commit.

### Request / Response DTO example

```json
{
  "organization_id": "org_123",
  "branch_id": "branch_456",
  "setting_group": "stock_policy",
  "key": "allow_negative_stock",
  "value_type": "boolean",
  "value": false,
  "reason": "Menjaga kontrol stok dan mencegah oversell",
  "requires_approval": true
}
```

```json
{
  "id": "set_789",
  "status": "pending_approval",
  "effective_value": false,
  "version_no": 3,
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

## Auth

Every endpoint requires valid JWT and branch/organization mapping. Admin functions require elevated role.

## Response Pattern

Status, message, data, pagination, and trace_id. Error responses include code, message, and request context when safe.

## Open Decision

Actual path naming and versioning still need confirmation by frontend/backend team.

