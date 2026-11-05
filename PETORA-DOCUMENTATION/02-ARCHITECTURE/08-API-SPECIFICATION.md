# 08 — API Specification

**Status:** Kontrak REST usulan, belum ada API aplikasi yang ditemukan. Endpoint memakai `/api/v1` sebagai proposal (ASM-003).

## 1. Konvensi

- JSON UTF-8; HTTPS; plural resource dan UUID/ULID ID.
- API menerapkan auth, permission action, branch scope, ownership dan data sensitivity di server.
- Timestamp ISO-8601; waktu penyimpanan UTC direkomendasikan.
- Mutasi sensitif menerima `Idempotency-Key`; gunakan optimistic version/ETag untuk konflik edit.
- `POST` membuat command/resource; `PATCH` mengubah field; delete untuk hard delete hanya pada data disposable yang disetujui.
- Pencarian/filter dibatasi allowlist; jangan meneruskan raw SQL/order dari client.
- Paginated list: `page`, `page_size` dengan batas maksimum TBD; sorting allowlist.

## 2. Response dan error

Success:

```json
{
  "data": {
    "id": "01JEXAMPLE",
    "status": "pending_payment"
  },
  "meta": {
    "request_id": "req-example"
  }
}
```

Paginated:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "page_size": 25,
    "total": 0,
    "request_id": "req-example"
  }
}
```

Error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Periksa kembali data yang dikirim.",
    "fields": {
      "items[0].quantity": "Jumlah harus lebih besar dari nol."
    },
    "request_id": "req-example"
  }
}
```

HTTP map usulan: 400 malformed input, 401 unauthenticated, 403 forbidden, 404 not found (termasuk resource di luar scope bila perlu menghindari enumeration), 409 state/idempotency conflict, 422 validation/domain rule, 429 rate limited, 5xx server/provider error. Response tidak membocorkan keberadaan data sensitif atau credential.

## 3. Authentication dan authorization

- `POST /api/v1/auth/login`, `POST /auth/logout`, `POST /auth/password-reset`, `GET /auth/me`.
- Session/cookie policy, CSRF, MFA dan password recovery perlu dirinci saat pemilihan stack.
- Client tidak mengirim permission yang dianggap otoritatif. Backend membangun principal, role, permission dan accessible branches dari data server.
- Customer endpoint selalu mengecek customer ownership/consent.
- Admin memilih branch hanya dari branch yang tersedia untuk principal.

## 4. Endpoint katalog per modul

Semua endpoint memerlukan permission terkait dan menerapkan branch/data scope. Endpoint mutasi mencatat audit.

| API ID | Method dan path | Fungsi / permission |
|---|---|---|
| API-IAM-001 | `GET/POST /users`; `GET/PATCH /users/{id}` | Daftar/buat/ubah akun; `users.view/create/edit`. |
| API-IAM-002 | `GET/POST /roles`; `PATCH/DELETE /roles/{id}`; `PUT /roles/{id}/permissions` | Custom role; protected role deletion ditolak. |
| API-IAM-003 | `GET/POST /branches`; `PATCH /branches/{id}` | Branch management dan status. |
| API-CUST-001 | `GET/POST /customers`; `GET/PATCH /customers/{id}` | Customer profile dan search. |
| API-PET-001 | `GET/POST /pets`; `PATCH /pets/{id}`; `PUT /pets/{id}/owners` | Pet profile dan owner/consent. |
| API-CAT-001 | `GET/POST /products`; `GET/PATCH /products/{id}`; `/product-categories`, `/product-prices` | Catalog, price, import/export. |
| API-STOCK-001 | `GET /inventory/stock`; `GET /inventory/movements`; `POST /stock-adjustments`; `POST /stock-transfers` | Ledger-based inventory operations. |
| API-PO-001 | `GET/POST /purchase-orders`; `POST /purchase-orders/{id}/submit`, `/approve`; `POST /goods-receipts` | PO lifecycle, receiving and partial receipts. |
| API-SALES-001 | `GET/POST /orders`; `GET /orders/{id}`; `POST /orders/{id}/payments`; `/orders/{id}/refunds` | POS/order/payment/refund. |
| API-SERVICE-001 | `GET /availability`; `GET/POST /bookings`; `PATCH /bookings/{id}` | Availability and service booking. |
| API-GROOM-001 | `POST /grooming/sessions`; `PATCH /grooming/sessions/{id}` | Check-in, assignment, checklist, QC. |
| API-HOTEL-001 | `GET/POST /hotel/bookings`; `POST /hotel/stays/{id}/check-in`, `/check-out`; `POST /hotel/stays/{id}/care-logs` | Capacity-aware stays/care. |
| API-VET-001 | `GET/POST /veterinary/appointments`; `POST /medical-visits`; `POST /prescriptions` | Clinical encounter, signed by doctor. |
| API-PHARM-001 | `POST /prescriptions/{id}/dispensings`; `GET /pharmacy/batches` | Dispense and medicine stock. |
| API-HR-001 | `/employees`, `/attendance`, `/leave-requests`, `/commissions` | HR data and approval. |
| API-FIN-001 | `/finance/expenses`, `/accounts-receivable`, `/accounts-payable`, `/journal-entries` | Finance/accounting; posted journal protection. |
| API-REPORT-001 | `GET /reports/{report_code}`; `POST /reports/{report_code}/exports` | Allowed report/query and export. |
| API-MSG-001 | `GET /notifications`; `PATCH /notifications/{id}` | In-app notification state. |
| API-INT-001 | `GET/POST /integrations`; `POST /integrations/{id}/test`; `PATCH /integrations/{id}` | Connector config; secrets write-only. |
| API-AUDIT-001 | `GET /audit-logs`; `/settings`; `/files` | Audited settings, audit view, scoped upload/download. |

## 5. Request/response examples

### Create order (example fields; tax/promotion rules TBD)

```json
{
  "branch_id": "br-01",
  "customer_id": "cus-01",
  "items": [
    {"item_type": "product", "item_id": "var-01", "quantity": "2"},
    {"item_type": "service", "item_id": "svc-01", "quantity": "1"}
  ],
  "promotion_code": null
}
```

Server resolves current authorized branch, prices, eligibility, tax, inventory and totals. Client-provided calculated totals are ignored. Response includes order ID, immutable price snapshots, total and current payment status.

### Create payment allocation

```json
{
  "amount": "50000.00",
  "method": "cash",
  "idempotency_key": "client-generated-unique-key"
}
```

Response returns payment/allocation IDs, resulting balance and status. For provider methods, client never supplies provider secret; backend returns only safe checkout instructions.

### Integration configuration

```json
{
  "provider_code": "provider-registered-server-side",
  "enabled": false,
  "branch_id": null,
  "config": {
    "merchant_reference": "example"
  },
  "secrets": {
    "api_key": "write-only input"
  }
}
```

GET response must omit `secrets`; it may return `secret_configured: true` and masked metadata. Logs remove secrets and sensitive payloads.

## 6. Idempotency, pagination, filtering, uploads

- Require idempotency key for payment, order submission, webhook, stock posting and import finalization; persist result by key and actor/resource scope.
- Cursor pagination is proposed for large/volatile timelines; page-based pagination may be used for bounded lists. Maximum page and export limits TBD.
- Filtering uses domain allowlist (`branch_id`, status, date range, customer/pet IDs within scope); server validates all values.
- Sorting only by approved fields and stable tie-breaker.
- Upload uses signed/private backend workflow, type/size limits, malware scanning policy TBD, and download authorization. Filenames are not trusted paths.

## 7. Webhooks dan integrations

- `POST /api/v1/webhooks/{provider_code}` resolves a server-registered adapter, validates timestamp/signature and replay window, deduplicates provider event ID, then enqueues processing.
- Return provider-compatible response only after safe event acceptance; business state transition remains idempotent.
- Timeout/retry/dead-letter behavior and provider-specific SLA TBD; no unbounded retries.

## 8. Rate limiting, versioning dan backward compatibility

Rate limit per identity/IP/provider with stricter limits on auth, search, exports and webhook intake; exact thresholds TBD. Breaking changes require `/v2` or explicit version migration; additive response fields are preferred. Deprecated fields/endpoints get a published sunset and telemetry window. Audit export and permission changes.

## 9. Related requirements

FRD: [03-FRD.md](../01-REQUIREMENTS/03-FRD.md). Entity model: [06-DATABASE-DESIGN.md](./06-DATABASE-DESIGN.md). Security: [17-SECURITY-SPECIFICATION.md](./17-SECURITY-SPECIFICATION.md).
