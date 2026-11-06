---
title: Module to Database Mapping
document_id: PET-DOC-1303
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['feature-to-module-mapping.md']
---

# Module to Database Mapping

Pemetaan modul ke tabel tertentu.

## Critical Mappings

Sales -> sales, sale_items, payments; Inventory -> products, stock_movements, batches; Clinical -> visits, medical_records, prescriptions; Finance -> cash_flows, journals, accounts; HR -> employees, attendance, payroll_records; Reporting -> report_views, report_requests, dashboard_metrics.

## Design Note

Exact table names are subject to final design and must be validated against schema implementation.

