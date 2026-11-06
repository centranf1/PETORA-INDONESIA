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
  "value_type": "boolean",
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

Actual path naming and versioning still need confirmation by frontend/backend team.

