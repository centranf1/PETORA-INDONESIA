---
title: Exception Handling
document_id: PET-DOC-0207
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['business-rules.md']
---

# Exception Handling

Pengecualian adalah state bisnis yang perlu recovery atau keputusan berotorisasi; bukan alasan untuk mengedit data langsung. UI/API harus menyampaikan safe error dan trace ID, sementara operational action mempertahankan histori.

## Common Exceptions

| Exception | Safe behavior | Recovery owner / evidence |
| --- | --- | --- |
| Session expired / permission denied | Stop request; no partial mutation; do not reveal cross-scope record | User/Admin; auth and audit trace |
| Duplicate checkout/payment/webhook | Return prior idempotent result or reconcile pending state; never charge blindly again | Cashier/Finance; provider ref, idempotency key, trace ID |
| Payment unknown/provider outage | Mark pending/unknown; retry/reconcile with same idempotency reference | Finance/Operations; webhook/provider statement |
| Stock shortage or mismatch | Reject/reserve conflict; count/adjust only via approved movement | Inventory/Manager; ledger, physical count, reason |
| Capacity/booking conflict | Reject or offer approved waitlist/reschedule; no overbook by UI override | Service Manager; capacity version and booking trace |
| No-show/cancellation/late checkout | Apply only approved effective policy; keep status/history | Operations/Owner; booking agreement and decision |
| Expired medicine / allergy conflict | Block dispensing and show safe reason to clinical staff | Veterinarian/Pharmacist; batch/prescription/record |
| Medical record correction | Create revision with reason/snapshot; no overwrite | Authorized Veterinarian; audit/version evidence |
| Journal imbalance/closed period | Reject posting; do not delete/rewrite source event | Finance/Accounting; source reference and reconciliation |
| Settings approval/version conflict | Keep old effective value; reject stale base version and preserve draft | Super Admin/Owner; version/audit/change reason |
| Storage/provider failure | Keep external state pending; bounded retry and alert | Operations/domain owner; trace and provider reference |
| Branch inactive/user disabled | Reject new operations; retain permitted historical access | Owner/Admin; branch/account lifecycle audit |

## Operational Policies

Void/refund require reason, actor, authorization, idempotency, and linked reversal. Failed stock adjustment leaves balance unchanged. Checkout retry uses the same idempotency key; never generate a new key just to retry an unknown payment.

## Medical Exceptions

Emergency treatment, surgery, unavailable owner consent, allergy, or controlled medicine require clinical escalation path and owner-approved policy. Exact rules and legal requirements remain open decisions; no workflow may fabricate consent.

## Customer Exceptions

Complaint/dispute is logged with classification, assigned owner, communication history, and target follow-up only after CRM/complaint scope and SLA are approved. In core scope, route via customer service records/manual case tracking if no complaint feature has been approved.

## Recommendation

Sistem menampilkan action/recovery yang aman dan tidak membocorkan internal stack, secret, medical details, or record existence outside user scope. Operator must not perform broad production edits to “repair” a failed workflow.

## Related Documents

- [Business processes](business-processes.md)
- [Transaction integrity](../04-database/transaction-integrity.md)
- [Incident response](../11-operations/incident-response.md)

