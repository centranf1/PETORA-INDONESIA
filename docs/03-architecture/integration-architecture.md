---
title: Integration Architecture
document_id: PET-DOC-0308
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-flow-diagram.md']
---

# Integration Architecture

Arsitektur integrasi menjelaskan berbagai koneksi eksternal serta kebutuhan proteksi.

## Integrations

Payment gateway, email/SMS/WhatsApp, shipping provider, storage, and monitoring.

## Pattern

Use secure config in Supabase Secrets or environment variables; use server-side edge functions for sensitive external calls; never reveal secret from client-side.

## Data Contracts

All external messages define ID, status, amount, branch, organization, and trace_id to allow reconciliation.

