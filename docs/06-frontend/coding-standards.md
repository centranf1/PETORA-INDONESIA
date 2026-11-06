---
title: Coding Standards
document_id: PET-DOC-0609
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['frontend-architecture.md']
---

# Coding Standards

Standar ini adalah baseline TypeScript/React untuk menjaga modul dapat diuji dan tidak mencampur presentation dengan authority bisnis. Konfigurasi lint/format belum ditemukan dan perlu di-bootstrap bersama repository implementasi.

## TypeScript

Aktifkan strict TypeScript; gunakan `unknown` lalu narrow untuk data eksternal; hindari `any`, unsafe cast, non-null assertion, dan duplikasi generated API types. Parse response boundary dengan schema bila contract tidak dapat dipercaya statically. Props, return values, query/mutation payload, permission action, dan status lifecycle harus bertipe eksplisit.

## Naming

Komponen/type/interface React `PascalCase`; function, variable, property `camelCase`; hook `useX`; file kebab-case kecuali konvensi tool/generator menentukan lain; constant hanya UPPER_SNAKE_CASE bila benar-benar immutable domain-level. Nama harus menjelaskan intent, hindari `data`, `handle`, atau singkatan kabur.

## Linting

Ikuti lint/format config repository setelah dibuat. Pisahkan API adapter, schema, hook, UI, dan domain formatting; hindari effect yang hanya menyalin derived state. Component tidak menjalankan SQL/business authority. Jangan menambah abstraction/memoization tanpa alasan performa atau pola lokal.

## Review

PR memeriksa type/lint/build/test, permission/loading/error/empty behavior, accessibility, responsive layout, query-key scope, invalidation, dan redaction. Untuk mutation kritis, review server contract, idempotency, confirmation, audit behavior, serta failure/retry path.

## Related Documents

- [Frontend architecture](frontend-architecture.md)
- [Definition of Done](../12-development-standards/definition-of-done.md)
- [Accessibility guidelines](../07-ui-ux/accessibility-guidelines.md)

