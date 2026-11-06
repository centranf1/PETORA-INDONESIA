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

## Proposed P0 Domain Operations

Nama path di bawah adalah kontrak internal yang diusulkan, bukan route yang sudah dibuat. Semua command mengautentikasi user, memperoleh organization/branch dari server-verified context, memeriksa permission dan state, lalu mengembalikan trace ID. Client boleh memilih branch dari assignment yang valid melalui context mechanism yang akan ditetapkan, tetapi tidak mengirim branch/organization ID sebagai bukti akses.

### Customer, Pet, Catalog, and Inventory

| Proposed operation | Permission and request contract | Result / invariant |
| --- | --- | --- |
| `GET /customers` | `customer.view`; cursor, bounded limit, normalized search/filter allowlist | Hanya customer dalam scope; count tidak membocorkan tenant lain |
| `POST /customers` | `customer.create`; name/contact/consent fields; server normalizes contact | Created resource ID; duplicate policy enforced server-side |
| `POST /customers/:id/pets` | `pet.create` on customer relation; pet profile and identifiers | Pet-owner relation created; customer must belong to authorized organization |
| `GET /inventory/ledger` | `inventory.ledger.view`; product/location/date cursor filters | Append-oriented movements; no client-supplied balance |
| `POST /inventory/receipts` | `inventory.receiving.create`; PO lines, received quantities, batch/expiry evidence | Receipt and ledger commit once; partial receipt supported if policy permits |
| `POST /inventory/transfers` | `inventory.transfer.create`; source/destination locations and lines | Request follows proposed/approved/shipped/received lifecycle; cannot cross organization |
| `POST /inventory/adjustments` | `inventory.adjustment.request`; location/product/batch, delta, reason/evidence | Creates request or approved movement; direct balance update is not exposed |

### Sales, Payment, and Refund

| Proposed operation | Permission and request contract | Result / invariant |
| --- | --- | --- |
| `POST /sales/checkout` | `sales.checkout`; customer/pet references, product/service IDs + quantities, tender request, idempotency key | Server recalculates price/promo/tax; returns committed or pending status, never trusts client totals |
| `GET /sales/:id` | `sales.view` with organization/branch and record scope | Redacted sale/payment detail for permitted roles |
| `POST /sales/:id/refund-requests` | `sales.refund.request`; items/amount requested, reason and evidence reference | Linked request; approval and provider processing may remain pending |
| `POST /payment-attempts/:id/reconcile` | Restricted finance/service permission; internal/provider reference | Authorized server job reconciles ambiguous provider state; caller cannot force success |

Proposed sale lifecycle: `draft -> pending_payment -> completed`; `draft/pending_payment -> cancelled`; completed sale corrections use linked return/refund records. Payment attempt lifecycle: `created -> pending -> succeeded/failed/expired/unknown`. Actual enum names require schema approval.

### Booking, Clinical, and Pharmacy

| Proposed operation | Permission and request contract | Result / invariant |
| --- | --- | --- |
| `POST /bookings` | `booking.create`; pet/service/slot/request note | Capacity reserved atomically; conflict returns available next action, not duplicate booking |
| `POST /bookings/:id/cancel-requests` | `booking.cancel`; reason | Applies current cancellation policy; fee/refund result may require approval |
| `POST /visits` | `clinical.visit.create`; pet, booking/reference, triage reason | Server verifies assignment, organization, branch and visit state |
| `POST /medical-records/:id/finalize` | `clinical.record.finalize`; expected record version | Finalizes attributed snapshot; later correction creates revision, not overwrite |
| `POST /prescriptions` | `clinical.prescription.create`; finalized visit/record, medication and instructions | Prescriber authority and patient/record relation verified server-side |
| `POST /dispenses` | `pharmacy.dispense`; prescription ID, dispensed quantity/batch | Validates prescription, patient, allergy warning and available unexpired batch; dispense + ledger commit atomically |

Clinical response fields are limited by role; customer portal receives only an explicitly approved patient-visible projection.

### Finance, Accounting, and Reporting

| Proposed operation | Permission and request contract | Result / invariant |
| --- | --- | --- |
| `POST /journal-entries/:id/post` | `accounting.journal.post`; expected version/source reference | Server verifies open period, unique source posting and balanced lines; posted entry is immutable |
| `POST /reconciliations` | `finance.reconcile`; account/provider/period and match decisions | Differences remain explicit pending exceptions until reviewed |
| `GET /reports/:report_key` | `report.view`; allowlisted filters, cursor/async job for large output | Scope enforced before aggregation; export permission checked separately and audit generated |

## Example Checkout Command

`Idempotency-Key` below is a proposed header name; final convention is still open. Product price, discount, tax, organization, branch and cashier identity are deliberately omitted from client authority.

```http
POST /sales/checkout
Authorization: Bearer <user-session>
Idempotency-Key: 7e4f...opaque-client-generated-key
Content-Type: application/json
```

```json
{
  "customer_id": "customer_uuid",
  "pet_id": "pet_uuid",
  "items": [
    { "product_id": "product_uuid", "quantity": 2, "unit": "pcs" }
  ],
  "tender_requests": [
    { "method": "cash", "amount": "125000", "currency": "IDR" }
  ]
}
```

The server validates `customer_id`/`pet_id` relationship, current price, branch availability, discount eligibility, stock and tender sum. Use a documented decimal/minor-unit contract after currency precision is approved; the string representation above avoids implying floating-point money.

```json
{
  "data": {
    "sale_id": "sale_uuid",
    "status": "pending_payment",
    "total": { "amount": "125000", "currency": "IDR" },
    "payment_status": "pending",
    "version_no": 1
  },
  "meta": { "trace_id": "req_opaque_id" }
}
```

Provider timeout returns pending/unknown and the same idempotency key resolves the prior attempt. It must not create another sale/payment/stock effect.

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

