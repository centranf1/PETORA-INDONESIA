---
title: System Context
document_id: PET-DOC-0303
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['container-diagram.md']
---

# System Context

Konteks sistem menggambarkan PETORA sebagai solusi bagi organisasi, cabang, pegawai, pelanggan, supplier, dan layanan eksternal.

## Actors

Owner, Branch Staff, Customer, Supplier, External Payment Gateway, Notification providers, and Admin.

## Context Flow

User interacts with frontend; frontend calls Supabase API; database stores critical data; edge functions mediate high-risk workflows.

## External Systems

Payment gateway, SMS/WhatsApp/email platform, file storage, and monitoring such as Sentry.

## Mermaid

```mermaid
flowchart LR
A[Users] --> B[PETORA Frontend]
B --> C[Supabase Auth & API]
C --> D[(PostgreSQL)]
C --> E[Storage]
C --> F[Edge Functions]
F --> G[Payment/Email/SMS]
```

