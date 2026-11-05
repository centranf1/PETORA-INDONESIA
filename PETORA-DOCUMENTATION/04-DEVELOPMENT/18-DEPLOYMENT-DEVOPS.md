# 18 — Deployment dan DevOps Guide

**Status:** Prosedur target; tidak ada CI/CD atau environment aktual di repository.

## 1. Environment

| Environment | Tujuan | Data |
|---|---|---|
| Local development | Build dan unit tests | Data sintetis; secrets development terpisah |
| CI | Lint, test, build, dependency/migration checks | Ephemeral/sanitized |
| Staging | Integrasi, UAT, provider sandbox, rehearsal migration | Tidak memakai PII production tanpa approval/sanitization |
| Production | Operasional cabang | Akses least privilege, monitoring dan backup |

Jumlah environment/hosting/domain/data residency TBD.

## 2. Configuration dan secrets

Konfigurasi per environment menggunakan schema tervalidasi. Simpan secret pada secrets manager atau encrypted deployment store; berikan hanya ke service identity yang perlu. Jangan commit `.env`, private keys, provider token atau data customer. Rotasi credential, audit akses, dan prosedur revocation wajib. Frontend hanya menerima konfigurasi publik.

## 3. Build, CI/CD dan deployment

Pipeline target:

1. Install dependency dari lockfile yang ditinjau; lint/typecheck/unit test.
2. Integration/API/security tests; build artifact reproducible.
3. Scan dependency/image dan secret; reject finding sesuai policy.
4. Validate migration dan compatibility; generate release notes.
5. Deploy artifact immutable ke staging; smoke/UAT dan restore/migration rehearsal.
6. Approval release; backup checkpoint bila diperlukan; deploy bertahap.
7. Health check, business smoke test per role/cabang, monitor error/latency.
8. Rollback aplikasi atau forward-fix data mengikuti plan yang disetujui.

Tool/vendor belum dipilih. Migration destructive tidak dijalankan otomatis tanpa gate, backup, approval dan rollback/recovery path.

## 4. Database and file deployment

Versioned migration dengan backward-compatible expand/migrate/contract bila memungkinkan. Uji index/lock dan data volume. Backup sebelum perubahan berisiko; cek FK, row counts, ledger balance dan migration version setelah deployment. File storage privat, encryption, retention lifecycle dan restore drill harus aktif.

## 5. Network, domain dan SSL

Gunakan HTTPS end-to-end, sertifikat terkelola/rotated, DNS dan ingress yang membatasi port. Database dan queue tidak diekspos publik. Admin access dibatasi jaringan/identity policy. Domain, certificate owner dan provider TBD.

## 6. Observability dan operasi

Pantau availability, latency/error API, database connections/replication, job queue lag, webhook processing, stock reconciliation, login abuse, integration health, storage, backup freshness. Alert mempunyai owner, severity, runbook, silencing policy dan audit. Log terstruktur dengan correlation ID; secrets/PII/medical details diredaksi.

## 7. Release/rollback checklist

- [ ] Requirement, migration, test dan approval terhubung ke release.
- [ ] Security/dependency scan dan scope policy tests lulus.
- [ ] Backup dan restore point terverifikasi sesuai perubahan.
- [ ] Provider sandbox/credentials dan fallback diperiksa.
- [ ] Feature flag/rollout scope dan rollback owner ditentukan.
- [ ] Smoke test login, branch scope, POS/stock/booking sesuai release.
- [ ] Metrics, alert, support rota dan communication siap.
- [ ] Tidak ada secret pada artifact atau browser bundle.

RPO/RTO, SLA, support hours, deployment cadence dan rollback target perlu keputusan stakeholder.
