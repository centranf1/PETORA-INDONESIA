---
title: Project Scope
document_id: PET-DOC-0003
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['project-overview.md', 'product-vision.md']
---

# Project Scope

Ruang lingkup mencakup kebutuhan bisnis, sistem, dan operasional dari PETORA.

## In Scope

Multi-branch petshop operations, customer & pet data, POS sales, inventory, purchasing, appointments, clinic, pharmacy, HR, finance, portal, notifications, reporting, and security.

## Out of Scope

Pembayaran gateway bersifat integrasi, bukan implementasi gateway khusus. Penyediaan API eksternal untuk semua mitra non-utama harus direncanakan pada fase berikutnya.

## External Dependencies

Supabase Auth, Postgres, storage, edge functions, payment gateway, email/SMS/WhatsApp providers, and analytics tools.

## Constraints

Harus menjaga data organisasi dan cabang terisolasi, dan transaksi kritis harus atomik.

## Related Areas

Silakan lihat business overview, architecture, and database documents for implementation detail.

