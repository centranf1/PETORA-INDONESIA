---
title: Definition of Ready
document_id: PET-DOC-1202
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['definition-of-done.md']
---

# Definition of Ready

DoR memastikan item tidak mendorong tim menebak policy atau contract penting saat implementasi.

## Ready Criteria

Requirement/Feature ID dan status source (core/recommended) jelas; problem/persona/trigger, preconditions, main/alternative/failure flow, final state, actor dan business rules dijabarkan; acceptance criteria teruji dan mengacu test ID; data/API/UI/domain dependency serta migration impact dipetakan; permission/tenant/branch/privacy/audit dinilai; errors, concurrency, retry, and recovery dipertimbangkan; ukuran keberhasilan dan out-of-scope diketahui.

## Engineering Ready

Desain/API/schema owner diketahui, compatibility strategy dan observability disepakati, environment/test fixture tersedia, test layer dipilih, acceptance owner tersedia, estimasi dibuat tim, dan rollout/rollback impact dipahami. Rancangan yang belum diverifikasi diberi label sebagai proposal.

## Security Ready

Permission action/scope dan data class jelas; threat/RLS/Storage/Realtime/export surface dipertimbangkan; secret handling, idempotency, transaction, audit, retention, and negative tests ditentukan. P0 open decision memiliki owner dan blocker status; tidak dipaksa menjadi asumsi.

## Not Ready Conditions

Tax/legal/clinical rule belum memiliki decision owner, release scope recommended belum disetujui, role scope tidak jelas, provider/payment behavior tidak diketahui untuk workflow yang bergantung padanya, atau acceptance criteria tidak dapat diuji.

## Related Documents

- [Feature backlog](../01-product/feature-backlog.md)
- [Definition of Done](definition-of-done.md)

