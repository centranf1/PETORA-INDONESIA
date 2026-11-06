---
title: Data Retention Policy
document_id: PET-DOC-0409
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['transaction-integrity.md']
---

# Data Retention Policy

Kebijakan retensi data untuk transaksi, finansial, dan rekam medis.

## Retention

Retensi ditentukan per data class, tujuan pemrosesan, consent/legal basis, kontrak provider, dan ketentuan hukum yang berlaku pada jurisdiction organisasi. Belum ada durasi yang disetujui; jangan menetapkan jumlah tahun dari contoh atau asumsi.

| Data class | Examples | Required policy decision |
| --- | --- | --- |
| Identity and customer | customer profile, contact, consent | purpose, correction, erasure/anonymization, and legal hold |
| Clinical | medical records, prescriptions, care consent | legal retention, access, correction, export, and patient/owner rights |
| Financial | payments, refund, cash, journals, payroll | statutory retention, close-period handling, and audit requirements |
| Operational | bookings, service visits, stock ledger, notifications | business purpose, dispute window, archive and deletion criteria |
| Security/audit | authentication, access, setting changes | investigation needs, legal hold, access restriction, and disposal evidence |
| Attachments | consent forms, invoices, clinical images | category inherits source record policy plus storage/provider requirements |

Every approved policy must name owner, trigger date, duration, archive method, legal hold behavior, disposal/anonymization action, and evidence. Keep only the minimum fields needed for audit after deletion/anonymization where law permits.

## Archiving

Inactive or closed data can be moved to archive tables or storage, but references must remain consistent.

## Deletion

Deletion requests require identity/ownership verification and legal/business review. Apply correction, anonymization, or deletion only when approved by the applicable policy. Never use soft delete as a substitute for statutory disposal, and never hard-delete payment, stock movement, journal, or finalized medical history outside an approved, auditable retention process.

## Open Decisions

Jurisdiction, legal basis, exact periods, legal-hold owner, and disposal approval workflow are unresolved. Track them in [open decisions](../13-traceability/open-decisions.md) and obtain qualified legal/compliance review before production data is collected.

## Related Documents

- [Data Protection](../08-security/data-protection.md)
- [Audit Logging](../08-security/audit-logging.md)
- [Open Decisions](../13-traceability/open-decisions.md)

