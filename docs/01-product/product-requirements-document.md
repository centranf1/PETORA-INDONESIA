---
title: Product Requirements Document
document_id: PET-DOC-0101
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['feature-catalog.md', 'software-requirements-specification.md']
---

# Product Requirements Document

Dokumen produk mendefinisikan requirement business dan teknis PETORA serta fitur yang harus dipenuhi untuk satu organisasi multi-cabang.

## Requirement Overview

ID pada tabel berikut adalah baseline requirement canonical dan harus dipakai sama di PRD, traceability, acceptance criteria, serta test mapping. Requirement inti berasal dari modul 4.1-4.33 README.md; modul tambahan pada bagian rekomendasi README ditandai terpisah sampai prioritas disetujui.

| Requirement ID | Kebutuhan | Feature IDs | Sumber / status |
| --- | --- | --- | --- |
| PET-REQ-001 | Mengelola cabang, akses user, role, permission, dan assignment scope | PET-FTR-002, PET-FTR-003, PET-FTR-004 | README 4.2-4.4; baseline inti |
| PET-REQ-002 | Mengelola pelanggan, hewan, pemilik, kontak, dan histori terkait | PET-FTR-005, PET-FTR-006 | README 4.5-4.6; baseline inti |
| PET-REQ-003 | Mengelola katalog produk/layanan, varian, satuan, harga, dan pemasok | PET-FTR-007 | README 4.7; baseline inti |
| PET-REQ-004 | Melacak stok, batch, expiry, lokasi, movement, transfer, opname, dan valuasi | PET-FTR-008 | README 4.8; baseline inti |
| PET-REQ-005 | Menjalankan POS, checkout, payment, receipt, refund, void, shift, dan rekonsiliasi | PET-FTR-009 | README 4.9; baseline inti |
| PET-REQ-006 | Mengelola supplier, purchase request/order, receiving, invoice, payable, dan retur | PET-FTR-010 | README 4.10; baseline inti |
| PET-REQ-007 | Mengelola booking, kapasitas, grooming, dan penyelesaian layanan | PET-FTR-011, PET-FTR-012 | README 4.11-4.12; baseline inti |
| PET-REQ-008 | Mengelola reservasi, kamar, check-in/out, monitoring, dan daycare | PET-FTR-013 | README 4.13; baseline inti |
| PET-REQ-009 | Mengelola transportasi hewan dan home grooming | PET-FTR-014, PET-FTR-015 | README 4.14-4.15; baseline inti |
| PET-REQ-010 | Mengelola jadwal klinik, antrean, pemeriksaan, triage, tindakan, dan consent | PET-FTR-016 | README 4.16; baseline inti |
| PET-REQ-011 | Menyimpan rekam medis, revisi, diagnosis, tindakan, vaksinasi, dan informasi yang boleh dilihat pemilik | PET-FTR-017 | README 4.17; baseline inti |
| PET-REQ-012 | Mengelola obat, batch, resep, dispensing, FEFO, dan penggunaan farmasi | PET-FTR-018 | README 4.18; baseline inti |
| PET-REQ-013 | Mengelola membership, benefit, loyalty, poin, reward, dan koreksi | PET-FTR-019, PET-FTR-020 | README 4.19-4.20; baseline inti |
| PET-REQ-014 | Mengelola promo, voucher, bundling, periode, audience, dan batas penggunaan | PET-FTR-021 | README 4.21; baseline inti |
| PET-REQ-015 | Mengelola karyawan, kehadiran, komisi, payroll, approval, dan histori | PET-FTR-022, PET-FTR-023, PET-FTR-024, PET-FTR-025 | README 4.22-4.25; baseline inti |
| PET-REQ-016 | Mengelola kas, finance, accounting, konsinyasi, jurnal, dan konsolidasi | PET-FTR-026, PET-FTR-027, PET-FTR-028 | README 4.26-4.28; baseline inti |
| PET-REQ-017 | Menyediakan laporan/analytics, notifikasi, dan customer portal sesuai scope akses | PET-FTR-029, PET-FTR-030, PET-FTR-031 | README 4.29-4.31; baseline inti |
| PET-REQ-018 | Mengelola system/integration settings serta security, audit, dan integrasi eksternal | PET-FTR-032, PET-FTR-033 | README 4.32-4.33 dan bagian 7-8; baseline inti |

## Recommended Extension Requirements

Requirement PET-REQ-019 sampai PET-REQ-031 dipetakan ke feature PET-FTR-034 sampai PET-FTR-046 di [feature catalog](feature-catalog.md). Semua berstatus **Recommended** dari README bagian 5, bukan komitmen release; requirement detail dan sequencing memerlukan persetujuan Product Owner.

## Functional Requirements

Sistem harus memenuhi 18 kebutuhan pada tabel canonical di atas dan semua subfitur yang dicantumkan README pada masing-masing modul. Sistem harus mempertahankan relasi lintas modul sehingga satu event operasional menghasilkan pembaruan yang konsisten pada domain terkait. Detail workflow, validasi, error, role, data, dan acceptance criteria dirinci di feature catalog, business processes, SRS, dan mapping.

## Non Functional Requirements

| NFR ID | Area | Baseline |
| --- | --- | --- |
| PET-NFR-001 | Security and privacy | Tenant/branch isolation, least privilege, RLS, secret protection, audit, and sensitive-data minimization are mandatory. |
| PET-NFR-002 | Integrity | Financial, inventory, clinical, and booking invariants must be enforced server-side and transactionally where state is local to PostgreSQL. |
| PET-NFR-003 | Availability / recovery | Availability target, RPO, RTO, backup frequency, and retention are open decisions; release cannot claim an SLA until approved. |
| PET-NFR-004 | Performance | Search, dashboard, and reports must be measured against agreed datasets and workload; numeric latency/throughput targets require product and operations approval. |
| PET-NFR-005 | Accessibility / usability | User-facing workflows should be keyboard operable, responsive, and expose loading, empty, validation, denial, and recovery states. |
| PET-NFR-006 | Maintainability | Modular monolith, documented contracts, migrations, tests, and traceability are required; do not introduce microservices without an ADR. |
| PET-NFR-007 | Observability | Critical operations carry a correlation ID and structured, redacted logs; secrets and unnecessary medical/personal data are excluded. |
| PET-NFR-008 | Compatibility | Browser support, localization, currency, timezone, tax, and document-number requirements need deployment/business decisions before release. |

## Priority Class

P0/P1/P2 labels in supporting documents are proposed delivery sequencing, not signed business commitments. Security, data isolation, audit, and consistency are release gates across every phase, not optional later features. README sections 4.1-4.33 define core scope; README section 5 lists recommended extensions whose implementation phase requires prioritization.

## Acceptance Summary

Setiap `PET-REQ` harus memiliki workflow, permission, database mapping, API/UI surface, per-feature acceptance criteria, serta test case. Tidak ada requirement yang boleh dianggap selesai hanya karena UI tersedia; hasil harus diverifikasi pada server/database dan audit trail sesuai risikonya.

## Dynamic Configuration Requirement

Beberapa kebijakan bisnis yang masih belum final atau berpotensi berubah sesuai kebutuhan operasional harus dibuat sebagai konfigurasi yang dapat diatur dari dashboard frontend oleh Super Admin, bukan diperlakukan sebagai hardcode di aplikasi.

### Kelompok konfigurasi yang harus dinamis

- Kebijakan tingkat akses branch dan role per cabang
- Pengaturan stok negatif, pembulatan harga, dan batas toleransi selisih stok
- Aturan promo stacking, voucher, dan loyalitas pelanggan
- Kebijakan refund, void, pembatalan booking, dan biaya pembatalan
- Kebijakan jadwal operasional, jam buka, kapasitas layanan, dan daftar tunggu
- Konfigurasi membership, benefit, masa berlaku, dan prioritas reward
- Pengaturan notifikasi, template pesan, dan preferensi komunikasi pelanggan
- Pengaturan pajak, fiscal policy, dan format dokumen
- Retention policy untuk dokumen, rekam medis, dan arsip akuntansi

### Requirement Teknis

- Konfigurasi disimpan di tabel sistem atau setting master yang terikat organisasi.
- Super Admin dapat mengelola seluruh pengaturan dari frontend, tetapi perubahan harus melewati validasi server.
- Setiap perubahan konfigurasi harus terekam di audit log dengan actor, timestamp, old value, dan new value.
- Konfigurasi yang berpengaruh pada transaksi kritis harus di-approve atau di-lock sesuai kebijakan.
- Jika konfigurasi mengalami perubahan, sistem harus men-trigger invalidation cache dan re-evaluasi policy di request berikutnya.

### Acceptance Criteria untuk Dynamic Policy

- Super Admin dapat menyimpan perubahan konfigurasi tanpa harus mengubah kode sumber.
- Sistem menolak konfigurasi yang tidak valid atau bertentangan dengan policy fundamental.
- Pengaturan aktif berlaku untuk cabang/organisasi yang relevan saja.
- Perubahan konfigurasi memengaruhi runtime policy secara real-time atau pada next request sesuai arsitektur.
- Semua perubahan selalu tercatat secara audit dan dapat ditelusuri oleh admin/pemilik bisnis.

