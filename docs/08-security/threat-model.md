---
title: Threat Model
document_id: PET-DOC-0802
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['security-architecture.md']
---

# Threat Model

Analisis ancaman menetapkan resiko umum dan mitigasinya.

## Threats

Unauthorized access, cross-branch data leakage, stock manipulation, double invalid payment, session hijacking, phishing, injection, and data exfiltration.

## Mitigations

RLS, RBAC, 2FA, signed URLs, validation, rate limit, logging, and role separation.

## Priorities

Priority 1: data isolation and financial integrity; Priority 2: patient privacy and external integrations; Priority 3: user phishing and UI tampering.

