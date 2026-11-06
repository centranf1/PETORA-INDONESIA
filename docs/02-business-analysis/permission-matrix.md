---
title: Permission Matrix
document_id: PET-DOC-0205
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['user-roles.md']
---

# Permission Matrix

Matriks akses menghubungkan peran dengan modul dan tingkat izin.

## Matrix Summary

Super Admin: all modules. Owner: consolidated reporting and approval. Branch Manager: branch operations, stock, employees. Cashier: POS, payment, close shift. Inventory: stock movement and receiving. Veterinarian: clinical records and prescriptions. Pharmacist: dispensing medicine. Finance: payment and journal. Customer: portal self-service.

## Access Model

Permission diwujudkan dengan action-based permission: view, create, update, delete, approve, authorize, export, reconcile. Scope model: own, branch, all, assigned_records.

## Approval Controls

Refund, void, price change, stock adjustment, and supplier payment need higher permission set.

## Security Note

Scope harus divalidasi di server dan database. Tidak menerima organization_id atau branch_id dari browser tanpa verifikasi.

