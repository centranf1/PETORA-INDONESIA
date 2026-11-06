---
title: Component Diagram
document_id: PET-DOC-0305
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['module-architecture.md']
---

# Component Diagram

Component view menunjukkan pembagian antara UI feature modules, API adapters, authorization boundary, dan domain services.

## Main Components

App shell/session/scope provider; feature modules for organization/customer/pet/catalog/sales/inventory/procurement/booking/services/clinical/pharmacy/workforce/finance/reporting/settings/portal; shared design primitives; feature API adapters and TanStack Query client.

## Cross-cutting Components

Supabase Auth identity, DB-backed authorization/RLS, Edge Function command handlers, domain validators, PostgreSQL transaction/ledger constraints, audit/outbox, Storage authorization, provider adapters, and monitoring. Frontend permission helpers only control presentation.

## Mermaid

```mermaid
flowchart LR
	subgraph Frontend
		APP[App Shell + Scope Provider]
		QUERY[TanStack Query + API Adapters]
		SALES[Sales / POS Feature]
		STOCK[Inventory Feature]
		CLIN[Clinical / Pharmacy Features]
		SETTINGS[Settings / Integrations Features]
		UI[Shared UI + Form Schemas]
		APP --> SALES
		APP --> STOCK
		APP --> CLIN
		APP --> SETTINGS
		SALES --> QUERY
		STOCK --> QUERY
		CLIN --> QUERY
		SETTINGS --> QUERY
		APP --> UI
	end
	QUERY -->|RLS reads / commands| AUTHZ[Supabase Auth + API Boundary]
	AUTHZ --> RLS[PostgreSQL RLS + Constraints]
	AUTHZ --> EDGE[Edge Function Commands]
	EDGE --> DOMAIN[Domain Validation / Authorization]
	DOMAIN --> TX[PostgreSQL Transactions]
	TX --> AUDIT[Audit + Outbox]
	EDGE --> PROVIDER[External Provider Adapters]
```

## Boundary Rules

Feature UI does not directly write cross-domain transaction state. Shared UI contains no business permission. RLS protects direct reads; command handler rechecks actor/scope/action. Audit/outbox is committed with relevant state. See [module architecture](module-architecture.md) for ownership and dependency rules.

