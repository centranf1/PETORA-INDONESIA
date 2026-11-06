---
title: User Roles
document_id: PET-DOC-0204
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['permission-matrix.md']
---

# User Roles

Dokumen ini menguraikan peran yang digunakan pada sistem dan tanggung jawabnya.

## Default Roles

Super Admin, Owner, Branch Manager, Administrator, Cashier, Inventory Staff, Purchasing Staff, Groomer, Veterinarian, Pharmacist, Customer Service, HR/Payroll Staff, Finance/Accounting Staff, Customer.

## Role Design

Role dibuat dinamis dan harus dijamin permission tidak lebih luas dari kebutuhan kerja. Role dapat diberi otorisasi own, branch, all, assigned_records.

## Separation of duties

Kasir tidak seharusnya mengubah kebijakan harga atau menyetujui refund tanpa kewenangan. Dokter tidak diberikan akses ke payroll kecuali ada kebutuhan khusus.

## Customer Access

Pelanggan hanya dapat melihat data pribadi, hewan miliknya, layanan yang telah dibayar, dan rekam medis yang diizinkan oleh dokter.

