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

## Recommended Structure

src/app, src/features, src/shared, src/hooks, src/lib, src/services, src/types, src/utils, src/pages, src/routes, src/styles, src/tests.

### Suggested Feature Tree

```text
src/
  app/
    routes/
    providers/
  features/
    sales/
    inventory/
    clinic/
    finance/
    reports/
    settings/
      admin/
      branches/
      roles/
      policies/
      notifications/
  shared/
    components/
    layouts/
    hooks/
    utils/
  services/
    api/
    queryKeys.ts
    settings.ts
  types/
    auth.ts
    settings.ts
  hooks/
    useAuth.ts
    useTenantScope.ts
  lib/
    validators/
    formatters/
  tests/
    e2e/
    unit/
```

## Module Example

features/sales, features/inventory, features/clinic, features/finance, features/reports.

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
- Gunakan `TanStack Query` untuk membaca settings melalui server-side Settings API; frontend tidak mengakses tabel `system_settings`, `setting_change_requests`, atau audit secara langsung melalui Supabase Data API.
- Gunakan `useMutation` untuk submit perubahan, dengan status `draft`, `pending_approval`, atau `active`.
- Validasi field berdasarkan `value_type`: string, number, boolean, enum, object.
- Frontend harus menampilkan status terakhir dan current version secara jelas.

## Naming Rule

File names use kebab-case; components and hooks use PascalCase and camelCase respectively.

