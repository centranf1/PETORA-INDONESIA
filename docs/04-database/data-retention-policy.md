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

Baseline ini membedakan kebutuhan teknis dari keputusan hukum/bisnis. Tidak ada angka masa simpan yang dianggap berlaku sebelum Legal/Compliance dan pemilik bisnis menyetujui yurisdiksi serta kategori record.

## Data Classes and Controls

| Data class | Examples | Required treatment | Period |
| --- | --- | --- | --- |
| Financial/accounting | Payment, refund, journal, tax evidence | Preserve posted history, access control, legal hold, auditable export | Open decision: jurisdiction/legal schedule |
| Clinical/medical | Visits, prescriptions, revisions, consents, lab/media | Restricted access, immutable revisions, patient/customer relationship controls | Open decision: clinical/legal schedule |
| Customer identity/communication | Contact, consent, notification preferences, complaint | Minimize and correct; consider deletion/anonymization requests where lawful | Open decision: purpose and applicable law |
| Operational | Booking, inventory, shift, transport and service records | Retain needed references; archive without breaking transaction relationships | Owner-approved schedule required |
| Security/audit | Access, settings approval, role changes, incidents | Append-only, restricted read, preserve legal hold and evidence chain | Open decision: compliance schedule |
| Secrets/session artifacts | Provider credentials, tokens, sessions | Never archive as plaintext application data; rotate/revoke and expire by security policy | Defined by secret/session policy |

## Retention Lifecycle

Untuk setiap kelas data, owner harus mendokumentasikan tujuan, yurisdiksi, start event, period, legal hold, format/akses archive, deletion/anonymization process, backup expiry, dan evidence verifikasi. Retention period hanya dapat dikonfigurasi bila policy mengizinkan; tidak boleh menyebabkan penghapusan dini data yang dibutuhkan untuk integritas legal/klinis.

## Archiving

Archiving adalah strategi penyimpanan/availability, bukan deletion. Pertahankan identifiers, foreign-key/reference resolution, audit metadata, dan akses yang setara dengan RLS. Uji jalur baca/restore archive sebelum pemindahan. Backup memiliki retensi dan expiry tersendiri; penghapusan dari primary tidak berarti data langsung hilang dari backup immutable.

## Deletion

Utamakan correction, anonymization, tombstone, atau access restriction bila diizinkan. Physical delete memerlukan dasar legal, approval owner, dependency check, backup treatment, audit event, dan bukti invariant financial/stock/medical tetap utuh. Jangan hapus ledger atau posted journal untuk menyamakan saldo; gunakan reversal record.

## Open Decisions and Prohibited Assumptions

Angka masa simpan yang pernah menjadi rekomendasi tidak boleh dipakai sebagai policy. Yurisdiksi dan aturan industri belum ditetapkan di repository ini. Dapatkan keputusan Legal/Compliance untuk financial, clinical, customer, employee, audit, media, dan backup; sampai itu terjadi, jangan klaim regulatory compliance atau jalankan automated purge untuk kategori tersebut.

## Related Documents

- [Security architecture](../08-security/security-architecture.md)
- [Audit logging](../08-security/audit-logging.md)
- [Backup and recovery](../10-devops/backup-recovery.md)
- [Open decisions](../13-traceability/open-decisions.md)

