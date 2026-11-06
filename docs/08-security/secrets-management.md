---
title: Secrets Management
document_id: PET-DOC-0806
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['session-management.md']
---

# Secrets Management

Dokumen ini menetapkan lifecycle credential server-side untuk environment PETORA. Semua nama variable di contoh bersifat placeholder; credential asli tidak boleh berada dalam source, docs, frontend bundle, issue, atau command log.

## Principles

- Pisahkan project/credential dev, staging, dan production.
- Gunakan secret manager platform (Supabase/Vercel/Cloudflare sesuai deployment yang dipilih) dengan role minimum dan audit akses.
- Frontend hanya boleh menerima Supabase public/anon key yang memang dirancang public dan tetap dilindungi RLS; service role, database password, signing secret, payment credential, dan provider token hanya server-side.
- Config DB menyimpan `secret_ref`/status/masked state, bukan material credential.
- Jangan log secret, full authorization header, webhook signature, atau request body yang mengandung credential.

## Examples

Placeholder names: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (client-safe subject to RLS), `SUPABASE_SERVICE_ROLE_KEY` (server only), `PAYMENT_PROVIDER_SECRET`, `PAYMENT_WEBHOOK_SECRET`, `NOTIFICATION_PROVIDER_TOKEN`, `SMTP_PASSWORD`. Nilai nyata diinput langsung ke secret store/operator interface yang disetujui, bukan repository.

## Rotation

Rotation mengikuti incident, provider policy, staff/permission change, dan schedule yang disetujui. Prosedur: create replacement, deploy dual-key overlap bila provider mendukung, verify health/webhooks, revoke old key, confirm no old-key usage, audit completion. Emergency rotation mengikut incident response. Hindari menyalin key ke ticket/chat.

## Local Development and CI

Sediakan `.env.example` berisi nama variable dan dummy placeholder saja; `.env*` dengan nilai nyata di-ignore. CI menggunakan protected environment secrets dan masked logs; fork PR tidak menerima deployment secrets. Secret scanning dijalankan pada PR/repository. Credential terdeteksi harus dicabut/dirotasi, bukan hanya dihapus dari commit terbaru.

## Related Documents

- [Integration guide](../05-backend/integration-guide.md)
- [Environment configuration](../10-devops/environment-configuration.md)
- [Incident response](../11-operations/incident-response.md)

