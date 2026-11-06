---
title: Module Architecture
document_id: PET-DOC-0306
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['component-diagram.md']
---

# Module Architecture

Arsitektur modul mengurutkan domain ke dalam boundary yang dapat dikelola secara mandiri.

## Core Modules

Master Data, Sales, Inventory, Service, Clinical, Finance, HR, Reports, and Utilities.

## Shared Domain

Tenant/org config, branch context, user permission, document management, and common types.

## Dependencies

All modules depend on shared auth and tenant context; module-to-module communication is done via events or controlled service calls, not direct edits across modules.

