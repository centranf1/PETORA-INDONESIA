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

Realtime is a freshness hint for dashboards/queues, not the authoritative record or command response. Clients must refetch the resource through its authorized API after receiving an event and handle disconnect/reconnect by resubscribing and reconciling current state.

## Design

Use channels/topics scoped to authenticated user, organization and active branch as supported by the platform. Subscribe only after scope validation; never let a client choose a topic that grants access. Emit minimal payloads such as entity ID, event type, version, and timestamp instead of full customer, medical, payment or payroll records.

Define event identity, ordering/version behavior, duplicate tolerance, retention, and subscriber authorization. Realtime delivery may be delayed or dropped; do not use it to settle payment, decrement stock, approve settings, or finalize clinical records.

## Security

Do not broadcast sensitive financial, medical, payroll or customer data. Test cross-tenant/branch subscription denial, role changes, revoked access, reconnect and replay. If an event contains a secret or excessive data, treat it as a security incident and rotate/remove affected material.

## Related Documents

- [Authentication and Authorization](authentication-authorization.md)
- [RLS Security Policies](../04-database/rls-security-policies.md)
- [Data Flow Diagram](../03-architecture/data-flow-diagram.md)

