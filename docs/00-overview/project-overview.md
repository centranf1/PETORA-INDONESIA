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

PETORA adalah sistem pengelolaan petshop, veterinary, grooming, boarding, dan keuangan yang terintegrasi. Dokumentasi ini berfungsi sebagai satu sumber kebenaran untuk pengembangan dan operasional.

## Scope

Core scope adalah 33 fitur README bagian 4: dashboard/organization/access; customer/pet/catalog/inventory; POS/purchasing; grooming/booking/boarding/transport/home grooming; veterinary/medical/pharmacy; membership/loyalty/promotion; HR/attendance/commission/payroll; finance/accounting/consignment/reporting; notifications/portal/settings/integrations. 13 modul README bagian 5 adalah **recommended extensions**, bukan komitmen release sampai Product Owner menyetujui.

## Background

Bisnis pet care memiliki kompleksitas multi-layanan. PETORA menggantikan operasi terfragmentasi dengan kebutuhan integrasi data, audit, dan konsolidasi cabang.

## Key Modules

Gunakan [Feature Catalog](../01-product/feature-catalog.md) untuk daftar feature ID lengkap dan pemisahan scope core/recommended; [PRD](../01-product/product-requirements-document.md) untuk requirement canonical PET-REQ-001..031.

## Assumptions

Supabase/React baseline berasal dari AGENTS.md yang disertakan sebagai instruksi sesi; belum ada source application, migrations, CI, package manifest, atau test runner dalam working tree. Karena itu arsitektur/schema dalam docs adalah target design. Detail pajak, cuti/payroll, customer medical visibility, role/branch permission, providers, dan release phases memerlukan konfirmasi.

## Related Documents

- [Product vision](product-vision.md)
- [Project scope](project-scope.md)
- [Documentation guide](documentation-guide.md)

