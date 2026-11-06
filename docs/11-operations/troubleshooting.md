---
title: Troubleshooting
document_id: PET-DOC-1103
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['maintenance-procedures.md']
---

# Troubleshooting

Panduan troubleshooting untuk permasalahan umum.

## Common Issues

Login failure, slow dashboard, duplicate transaction, failed payment reconciliation, stock mismatch, and missing permissions.

## Diagnostic Playbooks

| Symptom | Safe checks | Do not do | Escalation |
| --- | --- | --- | --- |
| Login/session failure | Confirm environment, service health, account active state, trace ID | Request password/token in chat or bypass MFA | Identity/security owner |
| Slow dashboard | Capture time/branch/filter/trace; inspect monitoring/query plan | Export broad production tables or disable RLS | Engineering/data owner |
| Duplicate/unknown payment | Check idempotency key, sale/payment state and provider reference; reconcile | Submit another payment/refund with new key before status known | Finance + integration owner |
| Stock mismatch | Compare ledger/source documents/batch and location; freeze affected adjustment if needed | Directly edit balance or delete ledger row | Inventory manager + engineering |
| Booking conflict | Check slot capacity, competing request and authoritative status | Force client-side schedule override | Service/operations owner |
| Missing permission | Verify identity, org/branch assignment, permission grant and latest session | Add broad role or change JWT manually | Access administrator/security |
| Clinical record issue | Verify patient identity, assigned clinician and revision history | Overwrite finalized record or expose record to support staff | Veterinarian/privacy owner |
| Settings value unexpected | Check active version, pending proposal, scope and audit trail | Edit production table directly | Super Admin + owner/engineering |

Collect only minimum necessary evidence; redact personal/medical/payment details before attaching logs.

## Method

Verify scope and time, trace request ID through monitoring/audit, inspect the authorized support view, reproduce in isolated environment, confirm authoritative state, and check recent releases/settings/provider health. Database inspection requires approved role and read-only access where possible; any repair is a reviewed transaction with audit, backup and owner approval.

## Escalation

If issue affects finance, clinical history, identity, cross-tenant access, or secrets, stop risky writes, preserve evidence, and use [incident response](incident-response.md) before broad changes. Never ask a user to send secrets.

## Related Documents

- [Incident Response](incident-response.md)
- [Error Handling](../05-backend/error-handling.md)
- [Operational Guidelines](operational-guidelines.md)

