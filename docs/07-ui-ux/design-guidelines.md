---
title: Design Guidelines
document_id: PET-DOC-0701
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['design-system.md', 'accessibility-guidelines.md']
---

# Design Guidelines

PETORA adalah workspace operasional yang digunakan berulang kali oleh kasir, klinik, inventory, dan manajemen. UI mengutamakan scanning cepat, informasi terstruktur, status yang dapat dibandingkan, dan feedback yang jelas; dekorasi tidak boleh mengurangi kepadatan informasi atau membuat pekerjaan kritis lambat.

## Style Foundation

Gunakan hierarchy konsisten: page title + scope/context, primary action, filters, data/work area, secondary metadata. Tabel/list padat diperbolehkan selama spacing dan typography tetap terbaca. Gunakan hierarchy, label, icon, dan status text; jangan mengandalkan color saja. Card hanya untuk item/repeated summary atau tools yang benar-benar perlu framing, radius maksimal 8px.

## Color

Gunakan semantic tokens `surface`, `text`, `border`, `accent`, `success`, `warning`, `danger`, `info`, `focus`, dan `disabled`. Nilai hex/brand palette belum ditetapkan dan tidak boleh diklaim sebagai identitas brand. Pastikan contrast minimal target WCAG yang dipilih; status selalu memiliki text/shape cue selain warna.

## Spacing

Gunakan skala 4px (4/8/12/16/24/32/40) sebagai unit dasar; page content memakai grid fleksibel, tabel/list tidak menyebabkan content overflow, dan actions penting tidak bergeser saat loading/error. Font size berasal dari type scale yang tetap, bukan viewport scaling.

## Operational Layout

- Desktop: persistent navigation, context/scope di topbar, content area cukup lebar untuk table comparison.
- Tablet/mobile: navigation dapat collapse menjadi drawer; form dan detail menjadi single-column, table dapat berubah menjadi stacked rows atau controlled horizontal scrolling.
- POS: input/search/cart/payment action tetap jelas dan tidak tertutup keyboard virtual; checkout confirmation menampilkan total dan metode bayar.
- Clinic/boarding: status pasien/tugas dan timestamp terlihat tanpa membuka banyak dialog; data medis tetap dibatasi role.
- Responsive state wajib diuji untuk viewport sempit dan zoom 200%.

## Feedback and Trust

Save draft, submit approval, activate, cancel, refund, and rollback harus memiliki state/label berbeda. Tampilkan pending/unknown payment atau provider state sebagai belum dipastikan; jangan menampilkan success sebelum server mengonfirmasi.

