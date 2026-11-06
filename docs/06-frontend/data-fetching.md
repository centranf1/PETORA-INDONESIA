---
title: Data Fetching
document_id: PET-DOC-0606
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['state-management.md']
---

# Data Fetching

Strategi fetching data hendaknya aman, efisien, dan kompatibel dengan Supabase.

## Patterns

Fetch by feature, use query keys per organization and branch, and invalidate related queries after writes.

## Error States

Show retry, empty, and permission denial states. Do not swallow API errors.

## Performance

Prefer pagination, server-side sorting, and query parameter filtering for tables with many records.

