# 14 — Design System

**Status: PROPOSED.** Identitas visual PETORA belum disahkan. Token di bawah adalah titik awal untuk prototype, bukan brand final.

## 1. Token awal

| Token | Nilai awal | Status |
|---|---|---|
| `color.brand.primary` | Teal/hijau tua `#176B63` | PROPOSED |
| `color.brand.primary-strong` | `#0E4F49` | PROPOSED |
| `color.surface` | `#FFFFFF` | PROPOSED |
| `color.canvas` | `#F5F7F6` | PROPOSED |
| `color.text.primary` | `#1D2927` | PROPOSED |
| `color.text.muted` | `#586663` | PROPOSED |
| `color.border` | `#D8E1DE` | PROPOSED |
| `color.success` | `#237A4B` | PROPOSED |
| `color.warning` | `#9A6200` | PROPOSED |
| `color.danger` | `#B42318` | PROPOSED |
| Spacing | 4px base: 4/8/12/16/24/32/48 | PROPOSED |
| Radius | 4/8/12px; pill only for status/badges | PROPOSED |
| Shadow | Minimal elevation for menu/dialog | PROPOSED |
| Typography | System sans-serif stack; size/line-height scale to validate | PROPOSED |

Token final harus diuji untuk contrast, brand approval dan penggunaan konsisten; jangan mengasumsikan logo, font berlisensi atau dark mode telah ditentukan.

## 2. Grid dan layout

Desktop menggunakan sidebar dan content max-width yang sesuai tabel; tablet memakai sidebar compact/drawer; mobile single-column. Spacing menggunakan kelipatan skala; konten POS dan kalender dapat memakai layout khusus tetapi tetap responsif.

## 3. Komponen

| Komponen | Variants / behavior |
|---|---|
| Button | Primary, secondary, tertiary, danger; loading/disabled; label aksi jelas |
| Input/Textarea | Label, hint, required, error, disabled; format uang/unit eksplisit |
| Select/Combobox | Search untuk dataset besar; opsi memuat konteks yang cukup |
| Checkbox/Radio | Pilihan yang dapat dibaca screen reader; group punya legend |
| Date/Time picker | Locale dan timezone jelas; keyboard operation |
| Table/Data grid | Sort/filter/pagination, row action permission-aware, responsive alternative |
| Badge/Status | Teks status plus warna/icon; tidak mengandalkan warna saja |
| Card/Stat card | Nilai, label, periode dan scope/context |
| Modal/Drawer | Focus trap, escape behavior, confirm destructive action |
| Toast/Alert | Success/error/warning; error penting juga tersimpan di halaman |
| Calendar | Agenda/list di mobile, slot/capacity state dapat dibedakan |
| File upload | Allowed types/size jelas; progress/error; preview aman |
| Confirmation dialog | Menyebut dampak dan objek yang terkena; tidak untuk menutupi policy |

## 4. Form dan status

Gunakan label persist, inline field errors, server error summary, disabled/processing state, autosave hanya jika transparan dan aman. Status memisahkan state transaksi, payment dan fulfillment; hindari satu badge yang mengaburkan partial payment atau refund.

## 5. Aksesibilitas

Target standar kontras dan WCAG perlu disetujui. Semua komponen fokus keyboard, semantic markup, accessible name, error association dan reduced-motion preference. Jangan menyampaikan state hanya lewat warna, posisi atau animasi.

## 6. Responsive rules

Breakpoint awal sebagaimana [UI/UX specification](./12-UI-UX-SPECIFICATION.md); tabel menjadi card/list dengan informasi penting tetap terbaca; form satu kolom; drawer tidak memotong konten; dialog tetap dalam viewport; tombol utama mudah dijangkau. Uji portrait/landscape smartphone dan zoom browser.
