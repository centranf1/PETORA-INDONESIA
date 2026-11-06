---
title: Accessibility Guidelines
document_id: PET-DOC-0707
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['design-guidelines.md']
---

# Accessibility Guidelines

Accessibility diterapkan pada seluruh alur operasional dan customer-facing, terutama POS, appointment, clinical, approval, dan portal. Target WCAG harus diverifikasi pada aplikasi saat tersedia; dokumen ini tidak mengklaim conformity sebelum audit.

## Requirements

Gunakan semantic HTML, logical heading order, visible focus, keyboard access untuk semua action, accessible name/label untuk control, descriptive link text, text alternative untuk visual status, contrast yang diuji, zoom/reflow, error identification, and reduced-motion behavior. ARIA hanya jika native semantics tidak cukup. Bahasa label/error ditentukan per localization decision.

## Operational Considerations

Forms mempunyai label terlihat, helper/error association, focus ke error summary, dan status pending yang announcement-friendly. Data tables menyediakan caption/name, header associations, sort/filter announcements, pagination, dan responsive alternative. Dialog/drawer mengelola focus/escape appropriately dan tidak menjebak user tanpa exit yang dapat diakses.

POS numeric flow harus beroperasi dengan keyboard saja; clinic status dan urgency tidak boleh hanya warna; charts memiliki summary/table alternative; pet photo memiliki alt text sesuai fungsi; drag-and-drop menyediakan tombol alternatif.

## Compliance

WCAG 2.1 AA adalah minimum target yang tercantum dalam draft baseline; tim dapat mengadopsi versi terbaru setelah keputusan produk. Uji automated lint/accessibility dilengkapi manual keyboard/screen-reader review untuk workflow kritis sebelum release. Tidak ada conformity claim tanpa hasil audit dan cakupan browser/assistive technology yang dicatat.

## Related Documents

- [Design guidelines](design-guidelines.md)
- [Design system](design-system.md)
- [Frontend error handling](../06-frontend/error-handling.md)

