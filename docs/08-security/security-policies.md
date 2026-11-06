---
title: Security Policies
document_id: PET-DOC-0803
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-protection.md']
---

# Security Policies

Panduan regulasi keamanan operasional.

## Policy Set

PETORA menerapkan kebijakan keamanan berikut:

- strong password dan minimum password complexity
- session expiry sesuai policy organisasi
- 2FA untuk role dengan akses kritikal seperti owner, super admin, finance, dan administrator
- branch validation berdasarkan scope dan assignment
- approval workflow untuk konfigurasi bisnis yang memengaruhi stok, refund, pricing, dan klinik
- mandatory audit logs untuk setiap perubahan sistem penting

## Dynamic Configuration Policy

Kebijakan operasional yang bersifat dinamis harus disimpan sebagai data, bukan hardcoded di frontend atau edge function. Setiap perubahan harus mengikuti langkah berikut:

1. user masuk dengan session valid;
2. role diperiksa melalui auth claims;
3. scope dan branch diperiksa dari tenant context;
4. perubahan dibuat sebagai draft ketika `requires_approval=true`;
5. approval ditandatangani oleh Owner atau Super Admin;
6. record disimpan ke `setting_versions` dan `setting_audit_log`;
7. runtime policy membaca versi aktif terbaru untuk validasi bisnis.

### Policy Classifications

| Category | Example Keys | Risk | Approval |
| --- | --- | --- | --- |
| Finance | refund_policy, pricing_policy, payment_policy | high | required |
| Inventory | stock_policy, opname_policy | high | required |
| Clinical | service_policy, prescription_policy | high | required |
| Communication | notification_policy | medium | recommended |
| System | session_policy, security_policy | high | required |

## Branch Isolation Policy

Users cannot access records outside assigned branch unless explicit permission granted. PETORA harus memeriksa `branch_id` dari session context dan mengesampingkan nilai dari browser jika tidak sesuai dengan organisasi atau branch aktif.

## Organization Isolation Policy

Data organisasi tidak dapat dibaca, diubah, atau dihapus oleh entitas lain. Semua table yang memiliki `organization_id` harus dipaksakan melalui RLS: hanya organisasi yang sama yang dapat mengakses data tersebut.

## Sensitive Data Protection

Clinical records, payment metadata, prescription data, and integration secrets must be restricted by role and not exposed via generic listing APIs. Access to these records may only occur via authorized workflows and policy-based filters.

## Settings Approval Policy

Perubahan yang memengaruhi kebijakan berikut memerlukan review dan approval tambahan:

- allow_negative_stock
- max_refund_hours
- max_discount_percent
- cancellation_fee_rate
- patient_data_visibility
- branch_manual_override

### Rule

Jika `requires_approval=true`, perubahan yang dibuat tidak boleh langsung aktif. Nilai baru harus disimpan sebagai draft dan hanya menjadi aktif setelah approval ditandai dengan `approved_by`, `approved_at`, dan `approval_reason`.

## Secret Handling Policy

- Secret dan token hanya disimpan di environment variable server-side atau secret manager.
- Akses ke secret hendaknya dibatasi pada edge function atau backend privileged service.
- Frontend tidak menerima secret atau private credential.

## Security Exceptions

Pengecualian keamanan hanya dapat disetujui oleh Super Admin dan didokumentasikan dalam `audit_log` beserta alasan, scope, expiry, dan pemangku jawab. Pengecualian tidak boleh dilakukan secara implisit atau berdasarkan permintaan user yang belum diverifikasi.

## Related Documents

- [security-architecture.md](security-architecture.md)
- [data-protection.md](data-protection.md)
- [session-management.md](session-management.md)


