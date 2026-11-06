---
title: Form Validation
document_id: PET-DOC-0607
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-fetching.md']
---

# Form Validation

Form memberikan umpan balik cepat, tetapi validasi browser tidak menjadi kontrol bisnis atau security boundary. Server/database mengulang validasi yang menentukan persistensi, permission, dan transaksi.

## Schema Rules

Gunakan React Hook Form dengan Zod schema per feature dan share contract/validation source secara terkendali bila backend runtime mendukungnya. Jangan menganggap satu client schema cukup untuk memastikan data aman. Normalisasi input sebelum submit dan pertahankan decimal/currency precision; hindari floating-point arithmetic untuk total finansial.

## Examples

Customer phone format (server memeriksa uniqueness), quantity > 0, harga minimum dan branch assignment, appointment interval/operational hours, consent required, prescription dose/unit, payroll period, promo date/quota, dan system setting typed value/range.

## UX Rule

Tampilkan label, format, batas yang dapat diketahui, field-level error, dan ringkasan error. Server conflict/duplicate/permission error dipetakan ke form tanpa mengungkap data tenant lain. Preserve input aman ketika submit gagal; jangan preserve credential/secret atau field sensitif lintas session.

## Settings Form Contract

Field renderer dipilih dari definisi key yang trusted; `value_type` dan validation schema tidak berasal dari request user. Tampilkan active value terpisah dari draft, base version, approval state, scope, alasan, dan peringatan dampak. Sebelum submit, kirim `base_version_no` agar stale edit ditolak sebagai conflict.

