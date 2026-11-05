# 20 — Maintenance, Backup dan Recovery SOP

**Status:** Rancangan operasi; belum ada deployment, backup job, target RPO/RTO, atau runbook aktual di repository.

## 1. Tata kelola dan target

Tetapkan service owner, on-call, approver, incident commander dan data owner sebelum production. RPO, RTO, availability target, lokasi backup, retensi, legal hold, data residency serta jam maintenance adalah **TBD** dan harus disetujui bisnis/engineering. Jangan menyatakan recovery siap sebelum restore drill berhasil.

## 2. Rutinitas maintenance

| Frekuensi | Pemeriksaan usulan |
|---|---|
| Harian | Health API/database/queue, error/provider status, backup freshness, disk/storage, failed jobs, security alerts |
| Mingguan | Rekonsiliasi stock ledger vs projection, webhook/payment exceptions, kapasitas, privileged access review |
| Bulanan | Patch review, restore sample, access/secret rotation review, retention, capacity/trend, incident actions |
| Sebelum release | Backup, migration rehearsal, dependency scan, smoke test, rollback owner dan communication |

Frekuensi final disesuaikan dengan SLA dan risk assessment.

## 3. Backup

- Backup konsisten untuk database dan file/object storage; dokumentasikan keterkaitan waktu keduanya.
- Enkripsi saat transfer dan at rest; akses backup terpisah dari runtime.
- Jadwalkan full/incremental/log backup sesuai target RPO; nilai target belum ditetapkan.
- Simpan salinan terisolasi/offsite sesuai kebijakan, retention dan legal hold.
- Catat backup time, scope, size, checksum/verification, owner dan hasil.
- Alert bila job gagal/terlambat; backup failure bukan warning yang boleh diabaikan.
- Backup provider credentials/secrets hanya mengikuti kebijakan secrets manager, bukan sebagai file export plaintext.

## 4. Restore dan pemulihan

1. Deklarasikan incident dan tetapkan incident commander; tentukan RPO/RTO target applicable.
2. Isolasi sistem atau writer bila terjadi korupsi/compromise; simpan evidence dan timeline.
3. Pilih restore point yang bersih dan verified; validasi backup checksum dan source.
4. Pulihkan database/file ke lingkungan terisolasi dengan versi schema kompatibel.
5. Jalankan integritas: migration state, FK, order/payment reconciliation, stock ledger balance, medical attachment references, audit availability.
6. Tentukan replay event/transaction sejak snapshot secara idempotent; cegah double-payment/double-stock.
7. Security/business owner sign-off; route traffic secara terkontrol dan monitor.
8. Komunikasikan pemulihan, batas kehilangan data dan backlog; dokumentasikan lessons learned.

Tidak menjalankan overwrite backup asli atau restore production tanpa approval dan snapshot keadaan saat ini.

## 5. Disaster recovery dan incident

Skenario: kehilangan DB, storage/file corruption, credential compromise, ransomware, provider outage, deployment regression, data exposure, regional/network outage. Runbook harus menetapkan deteksi, severity, containment, backup selection, recovery owner, komunikasi, privacy/legal escalation, evidence preservation dan post-incident review. Provider outage tidak boleh membuat sistem mengklaim payment sukses.

## 6. Data integrity checks

- Saldo warehouse projection = jumlah movement menurut ledger/batch.
- Alokasi payment/refund cocok terhadap order dan provider settlement.
- Posted journal balance debit/kredit dan link ke sumber.
- Appointment/stay capacity tidak melebihi configured resource.
- Referential integrity customer/pet, consent, prescription/dispensing dan attachments.
- Transaction numbers unik sesuai scope.
- Audit event memiliki actor/system identity serta correlation ID.

Exception masuk antrean investigasi; jangan memperbaiki dengan update langsung tanpa entry koreksi/audit.

## 7. Checklist berkala

- [ ] Backup database/file berhasil dan dapat dibaca.
- [ ] Restore test memenuhi target yang disetujui.
- [ ] Credential, key rotation dan akses privileged ditinjau.
- [ ] Alert, on-call dan escalation contact aktif.
- [ ] Ledger/reconciliation exceptions ditindaklanjuti.
- [ ] Retention, privacy requests dan legal holds berjalan.
- [ ] Recovery steps dan deployment rollback tetap sesuai versi saat ini.
- [ ] Bukti uji, waktu, pelaksana dan temuan dicatat.
