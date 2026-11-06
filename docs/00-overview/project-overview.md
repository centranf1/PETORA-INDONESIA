---
title: Project Overview
document_id: PET-DOC-0001
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['../README.md']
---

# Project Overview

Dokumen overview mendefinisikan visi produk, ruang lingkup, istilah kunci, serta tata cara penggunaan dokumentasi PETORA.

## Purpose

PETORA adalah platform manajemen operasional untuk usaha petshop dan pet care yang menghubungkan retail, layanan, klinik, farmasi, workforce, dan pengendalian bisnis. Sistem ditujukan untuk organisasi dengan satu atau banyak cabang. Dokumen ini memberi gambaran konteks; requirement rinci dan keputusan teknis berada di dokumen domain terkait.

## Scope

Cakupan baseline utama mengikuti 33 fitur di [feature catalog](../01-product/feature-catalog.md): organisasi/akses, customer dan pet, catalog/inventory, sales/purchasing, service/clinical, workforce/finance, komunikasi, reporting, portal, settings, dan integrations. CRM lanjutan, e-commerce, tax, lab, surgery, dan modul tambahan lain yang di README disebut sebagai rekomendasi bukan otomatis bagian release pertama.

## Background

Satu customer dapat memiliki beberapa pet; satu pet dapat menerima banyak layanan sepanjang hidupnya. Penjualan produk, booking, grooming, boarding, transport, pemeriksaan, resep, farmasi, pembayaran, dan follow-up membuat hubungan antar-data penting. Multi-branch menambah kebutuhan scope, approval, konsolidasi, dan audit. PETORA mengurangi pencatatan terpisah dengan menjaga bahwa setiap domain tetap memiliki pemilik data dan workflow yang jelas.

## Key Modules

| Capability | Contoh tanggung jawab |
| --- | --- |
| Organization and access | Organization, branch, user, role, permission, assignment |
| Customer and catalog | Customer, pet, owner relationship, products, services, prices |
| Commerce | POS, payment, refund, purchase, supplier, stock ledger, consignment |
| Service and clinical | Booking, grooming, boarding, transport, clinic, medical records, prescription, pharmacy |
| Workforce and finance | Employee, attendance, commission, payroll, cash, accounting |
| Channels and governance | Portal, notification, reporting, settings, integration, audit |

Pembagian implementasi per domain dan dependency berada di [module architecture](../03-architecture/module-architecture.md).

## Assumptions

Arsitektur modular-monolith, React/TypeScript, dan Supabase/PostgreSQL adalah baseline dokumentasi yang masih Draft. Belum ada bukti di repository ini bahwa aplikasi, migration, pipeline, atau integrasi provider telah dibuat. Kebijakan cuti, payroll/tax, retention, provider, approval limits, data-access pelanggan, dan target layanan memerlukan keputusan pemilik bisnis/teknis sebelum menjadi kontrak production.

## Primary Users

Owner dan manajemen memantau konsolidasi; branch manager mengendalikan cabang; staff menjalankan proses domain; veterinarian/pharmacist menangani catatan klinis dan obat; finance/accounting mengelola pembayaran serta jurnal; customer menggunakan portal dan layanan; Super Admin mengelola governance sesuai scope.

## Design Guardrails

- Organization scope adalah batas tenancy; branch scope diterapkan pada data operasional yang memang terkait cabang.
- Data klinis, keuangan, payroll, dan audit tidak boleh dianggap sebagai data umum.
- Perintah domain memvalidasi permission dan lifecycle di server, bukan hanya menyembunyikan UI.
- Rekam final dan ledger dikoreksi melalui revision/reversal, bukan perubahan tersembunyi.
- Integrasi eksternal tidak ikut transaksi database; statusnya direkonsiliasi melalui workflow idempotent.

## Success Evidence

Keberhasilan tidak diukur hanya dari jumlah modul. Baseline penerimaan harus mencakup traceability requirement, data isolation tests, transaksi kritis yang dapat direkonsiliasi, workflow pengguna yang dapat diselesaikan, dan bukti backup/restore. Target numerik masih perlu ditetapkan melalui NFR dan open decisions.

