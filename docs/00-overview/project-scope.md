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

Semua core feature README bagian 4.1-4.33 meliputi organisasi/cabang, customer/pet, product/catalog, inventory, POS/payment, supplier/procurement, grooming/booking/boarding, transport/home grooming, veterinary/medical/pharmacy, membership/loyalty/promotion, HR/payroll, finance/accounting/consignment, reports, notifications, customer portal, system settings, integrations, security, dan audit.

README bagian 5.1-5.13 (CRM, complaints, care monitoring, laboratory, surgery/hospitalization, assets, SOP/checklists, document management, parcel shipping, budget, tax, backup/DR enhancements, e-commerce) tercatat sebagai recommended extensions dan belum release commitment.

## Out of Scope

Pembuatan/ownership payment network, messaging, shipping, or mapping provider sendiri tidak termasuk baseline; integrasi provider adalah bagian feature yang memerlukan pemilihan vendor dan contract. Implementasi source, deployment, provider, compliance, and business policy belum tersedia/approved di repository. Additional third-party APIs di luar README memerlukan scope change.

## External Dependencies

Supabase Auth, Postgres, storage, edge functions, payment gateway, email/SMS/WhatsApp providers, and analytics tools.

## Constraints

Tenant/branch isolation, least privilege, data integrity, auditability, dan safe recovery adalah cross-cutting constraints. Semua data sensitif memiliki role/scope policy; transaksi lokal kritis atomik pada PostgreSQL, sementara external effects direkonsiliasi.

## Related Areas

Detail: [Business overview](../02-business-analysis/business-overview.md), [PRD](../01-product/product-requirements-document.md), [Architecture](../03-architecture/software-architecture-document.md), [Data dictionary](../04-database/data-dictionary.md), [Open decisions](../13-traceability/open-decisions.md).

