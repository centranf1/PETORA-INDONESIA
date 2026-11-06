---
title: Realtime Architecture
document_id: PET-DOC-0507
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['storage-management.md']
---

# Realtime Architecture

Realtime digunakan untuk memantau update operasional penting.

## Use Cases

Booking status, stock alerts, payment success, queue updates, and critical operational notifications.

## Design

Subscribe per organization and branch context. Limit payload size and include only necessary fields.

## Security

Do not broadcast sensitive financial or medical data without permission; use dedicated channels with RLS-aware filtering.

