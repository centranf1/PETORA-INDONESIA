---
title: Business Overview
document_id: PET-DOC-0201
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['business-processes.md', 'permission-matrix.md']
---

# Business Overview

PETORA mendukung satu organisasi yang menjalankan retail petshop, services, veterinary care, boarding, field service, dan business administration pada satu atau beberapa branch. Tujuan operasional adalah menghubungkan pelanggan/pet, transaksi, inventory, layanan, staff, finance, dan laporan tanpa menghilangkan ownership data per domain.

## Business Model

Pendapatan berasal dari penjualan produk dan layanan, dengan alur pendukung procurement, inventory, appointment, care delivery, payment, HR, accounting, dan customer engagement. Payment/shipping/message providers merupakan external dependencies; provider selection dan aturan komersial belum disepakati.

## Customer Segments

Primary external actor adalah pet owner/customer dan supplier/consignment partner. Internal actors mencakup Owner, Branch Manager, Administrator, Cashier, Inventory/Purchasing, Groomer, Veterinarian, Pharmacist, Customer Service, HR/Payroll, Finance/Accounting, dan Super Admin. Role dapat dikonfigurasi, tetapi tenant boundary dan hard security invariants tidak dapat dihapus oleh konfigurasi bisnis.

## Value Streams

Acquire/register customer/pet -> catalog and book -> service/sale/purchase/clinical execution -> payment/stock/medical/finance event -> follow-up, loyalty/notification -> reporting and controls. Setiap stream harus punya owner, actor, input/output, exception path, data scope, and reconciliation.

## Business Drivers

Operational efficiency, service safety, accurate stock/expiry, traceable financial outcomes, continuity of clinical history, predictable branch operations, and customer confidence. KPI baselines and targets belum ditetapkan.

## Key Risks

Duplicate/unknown payment, stock race/mismatch, unauthorized medical/payroll/export access, cross-tenant/branch leakage, approval conflict, invalid policy change, incomplete handoff, provider outage, and inconsistent reports. Mitigations and tests map to [threat model](../08-security/threat-model.md) and [exception handling](exception-handling.md).

## Business Ownership

Business/Product Owner owns scope and acceptance; each domain owner (Finance, Clinical, Inventory, HR, Operations) owns policy decisions in their area; Security/Engineering own technical enforcement; Operations owns release/runbooks. Role names do not substitute for accountable decision owner.

