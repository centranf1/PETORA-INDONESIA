# 24 — Change Management

## 1. Tujuan

Mengendalikan perubahan pada requirement, process, schema, API, permission, UI, test, deployment dan SOP agar keputusan dapat ditelusuri serta dokumen tidak saling bertentangan.

## 2. Alur perubahan

1. Pemohon membuat change request (CR) dengan ID, alasan, urgency, pihak terdampak dan acceptance outcome.
2. Product owner mengklarifikasi apakah perubahan kebutuhan, defect, security issue atau implementation detail.
3. Analyst memetakan requirement, proses, actor, data, API, UI, permission, migration, test dan dokumentasi terdampak.
4. Domain owner meninjau dampak bisnis; security/privacy/finance/clinical owner dilibatkan bila domain mereka berubah.
5. Approver yang berwenang menerima, menolak atau meminta informasi; keputusan dicatat bersama tanggal dan versi.
6. Implementasi memakai backward-compatible change atau migration/versioning plan; QA memvalidasi acceptance dan regression.
7. Release notes dan dokumen terkait diperbarui; RTM serta document version history ditautkan ke CR.

## 3. Impact analysis checklist

- [ ] PRD/SRS requirement IDs dan priority
- [ ] FRD flow, fields, validations, status, error, notification, acceptance
- [ ] Business SOP / operational roles / approval segregation
- [ ] Database entities, constraints, branch strategy, retention, migration and rollback
- [ ] API request/response, versioning, idempotency, webhook and compatibility
- [ ] Permission/action/scope, data sensitivity, audit
- [ ] Sitemap, page, responsive/accessibility state
- [ ] Test case, test data, traceability, performance/security impact
- [ ] Integration/provider/secret handling
- [ ] Deployment, monitoring, backup/recovery, support and user manual

## 4. Approval and emergency changes

Approval matrix final TBD. Minimal proposal:

| Change | Required reviewer |
|---|---|
| Business workflow/pricing/promotion | Product owner and affected operations/finance |
| Medical record, consent, clinical access | Veterinary owner and privacy/security |
| Role, branch isolation or secret handling | Security/engineering owner |
| Database/migration/payment/accounting | Engineering plus data/finance owner |
| Visual/navigation only | Product/UX and accessibility review |

Emergency security changes may use an expedited process, but must have incident/change ID, risk owner, test evidence, rollback plan and post-implementation review. Emergency does not authorize undocumented permanent behavior.

## 5. Versioning and backward compatibility

Use semantic document version or dated release entry. Requirement IDs remain stable; retired requirements are marked superseded and linked to replacement, not silently reused. API breaking changes require version strategy and migration window. Database destructive changes require backup, data reconciliation and approved rollback/forward recovery.

## 6. Document update rules

Update the source-of-truth document and all impacted cross-references in the same change. Update RTM whenever requirement, feature, table, endpoint, page or test changes. Keep assumptions and unapproved proposals labeled. Treat `00-DOCUMENT-CONTROL/SOURCES/SRS-ORIGINAL.md` as a preserved source snapshot; do not silently edit or replace it. If source history must change, create a new versioned source and record rationale/history.

## 7. Change record template

```text
CR-ID:
Requester / date:
Problem or opportunity:
Requested outcome:
Affected requirement IDs:
Business/security/privacy impact:
Alternatives considered:
Decision / approvers / date:
Implementation and migration:
Tests and acceptance:
Release / rollback:
Documents and RTM updated:
```
