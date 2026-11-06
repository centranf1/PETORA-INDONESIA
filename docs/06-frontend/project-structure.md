---
title: Project Structure
document_id: PET-DOC-0602
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['frontend-architecture.md']
---

# Project Structure

Struktur folder yang direkomendasikan untuk frontend PETORA.

## Recommended Structure (Target)

src/app, src/features, src/shared, src/hooks, src/lib, src/services, src/types, src/utils, src/pages, src/routes, src/styles, src/tests.

### Suggested Feature Tree

```text
src/
  app/
    routes/
    providers/
  features/
    organization/
    customers/
    pets/
    catalog/
    sales/
    inventory/
    procurement/
    booking/
    grooming/
    boarding/
    transport/
    clinic/
    pharmacy/
    membership/
    promotions/
    workforce/
    finance/
    reports/
    settings/
    integrations/
    customer-portal/
  shared/
    components/
    layouts/
    hooks/
    utils/
  lib/
    supabase/
    query-client.ts
    api-error.ts
    validators/
    formatters/
  routes/
  styles/
  tests/
    fixtures/
    integration/
    e2e/
    unit/
```

## Feature Ownership

Setiap `features/<domain>` menyimpan file yang berubah bersama: `api/`, `components/`, `hooks/`, `pages/`, `schemas/`, `types/`, dan test terkait. Jangan membuat folder untuk modul yang belum punya implementasi; tree ini adalah target, bukan kondisi repository saat ini. Hindari top-level `services/` atau `types/` yang menjadi dumping ground; letakkan contract spesifik di domain dan hanya pindahkan tipe yang benar-benar lintas domain ke `shared`.

## Settings Module Design

Modul `features/settings` berfungsi sebagai dashboard konfigurasi sistem yang dapat digunakan oleh Super Admin. Struktur module ini harus membatasi akses sesuai role dan mengelola policy yang bersifat dinamis.

### Submodule idea

- admin/system-settings
- branch-settings
- role-permission-settings
- refund-policy
- stock-policy
- promotion-policy
- notification-template
- audit-log-viewer

### UI behavior

- form edit policy harus membedakan `draft` dan `approved` state
- setting kritis wajib menampilkan warning visual dan approval flow
- perubahan konfigurasi harus memicu cache invalidation dan refresh halaman yang relevan
- tombol save harus diarahkan ke endpoint validasi + approval jika config membutuhkan persetujuan

### Example structure for settings module

```text
src/features/settings/
  api/
    settings.ts
    settingsAudit.ts
  components/
    SettingForm.tsx
    SettingGroupCard.tsx
    PolicyApprovalDialog.tsx
  hooks/
    useSettings.ts
    useSettingAudit.ts
  pages/
    SystemSettingsPage.tsx
    BranchSettingsPage.tsx
    PolicyAuditPage.tsx
  schemas/
    settings.schema.ts
    refundPolicy.schema.ts
  types/
    settings.ts
```

### State and validation pattern

- Gunakan `react-hook-form` + `zod` untuk form setting.
- Gunakan `TanStack Query` untuk membaca system settings, versions, dan history melalui authorized API, bukan direct table access bila workflow memerlukan server validation.
- Gunakan `useMutation` untuk proposal/approval/rollback dengan idempotency key dan expected version; tampilkan status draft/pending/active secara berbeda.
- Validasi field berdasarkan `value_type`: string, number, boolean, enum, object.
- Frontend harus menampilkan status terakhir dan current version secara jelas.

Frontend tidak mengirim `organization_id`, role, `requires_approval`, active version, maupun keputusan permission sebagai nilai tepercaya. Form scope harus mengambil context yang diizinkan dan tetap divalidasi server.

## Naming Rule

File names use kebab-case; components and hooks use PascalCase and camelCase respectively.

## Related Documents

- [Frontend architecture](frontend-architecture.md)
- [API specification](../05-backend/api-specification.md)
- [Settings page specification](../07-ui-ux/page-specifications.md)

