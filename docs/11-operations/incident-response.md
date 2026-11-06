---
title: Incident Response
document_id: PET-DOC-1102
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['troubleshooting.md']
---

# Incident Response

Respons insiden melindungi pelanggan, hewan, data, transaksi, dan layanan cabang sambil menjaga bukti. Penanggung jawab dan kontak aktual belum ditetapkan; isi roster operasional sebelum go-live.

## Service Impact

Klasifikasikan severity berdasar confidentiality/integrity/availability, jumlah tenant/cabang, clinical safety, financial impact, dan duration. P0 mencakup cross-tenant/medical exposure, credential compromise, payment/journal corruption, atau clinical workflow unsafe; P1 layanan kritis satu/multiple branch degraded; P2 non-critical feature/isolated defect. Threshold final harus disepakati.

## Response Steps

1. Detect/declare, tetapkan Incident Commander, recorder, technical/security/domain owners.
2. Triage scope/severity, preserve trace/logs, assess data classes and external effects.
3. Contain: freeze deployment, revoke/rotate secret, disable affected endpoint/config, restrict export, or isolate provider path.
4. Investigate with least privilege; no broad production query/update without approval and logged ticket.
5. Recover via tested rollback/forward fix/restore; reconcile payment, stock, journal, and affected records.
6. Validate security and business invariants, monitor, and authorize service reopening.
7. Notify owner/users/regulator/provider as required by approved legal policy; avoid unsupported compliance claims.
8. Conduct blameless post-incident review and track corrective actions.

## Escalation

Escalate to Owner/Product, Engineering/DB, Security/Privacy, Finance, or Clinical Owner based on affected domain. Roster, contact channels, vendor support path, and statutory notification deadlines are open decisions and must be completed before production. Related runbooks: [rollback](../10-devops/rollback-procedure.md), [troubleshooting](troubleshooting.md).

