# 12 — UI/UX Design Specification

**Status:** Spesifikasi perilaku; visual final perlu validasi brand dan usability.

## 1. Prinsip UX

- Alur operasional cepat, terutama POS, booking, penerimaan barang dan antrean klinik.
- Selalu tunjukkan konteks cabang, user, status dan konsekuensi finansial.
- Form memvalidasi sedini mungkin namun server tetap otoritatif.
- Data sensitif tidak muncul pada halaman/dashboard tanpa kebutuhan kerja.
- Destructive action memerlukan konfirmasi dan penjelasan; gunakan cancel/refund/archive daripada delete bila ada jejak historis.
- Tidak ada success state sebelum server mengonfirmasi commit.

## 2. Layout dan breakpoints

Target breakpoint adalah proposal, bukan implementasi:

| Viewport | Layout usulan |
|---|---|
| Mobile `< 640px` | Satu kolom, drawer, action bar yang mudah dijangkau, tabel menjadi list/card |
| Tablet `640–1023px` | Drawer/compact navigation, form dua kolom bila ruang cukup |
| Desktop `>= 1024px` | Sidebar, header dan area kerja; data table dengan filter |

Breakpoint akhir diuji pada perangkat/browser yang disepakati. Halaman harus mengalir tanpa horizontal overflow yang tidak dibutuhkan.

## 3. Pattern halaman

- **Dashboard:** kartu metrik dengan periode/cabang jelas, definisi agregat dan tautan ke sumber berizin.
- **Tabel:** search, filter, sort allowlist, pagination, status, loading/empty/error; bulk actions permission-gated.
- **Form:** label permanen, required indicator, helper text, field error dekat input, summary server error.
- **POS:** scan/search, line item, jumlah, discount/price transparency, total, payment status, idempotent submit.
- **Booking/calendar:** tampilan agenda/list di layar kecil, timezone jelas, kapasitas dan konflik slot terlihat.
- **Modal/drawer:** hanya untuk tugas ringkas; alur panjang jadi halaman penuh; fokus keyboard dipertahankan.
- **Medical record:** section klinis jelas, autosave hanya bila aman dan eksplisit; status draft/signed tampak.
- **Export:** tampilkan scope, filter dan estimasi isi; minta konfirmasi saat data sensitif/besar.

## 4. Loading, empty, error dan offline

- Loading state menjaga layout dan menghindari double-submit.
- Empty state menjelaskan apa yang belum ada dan aksi create hanya bila authorized.
- Error menyebut langkah perbaikan serta request ID bila perlu; jangan tampilkan stack trace.
- Retry hanya untuk operasi idempotent atau setelah status diperiksa.
- Jika network terputus, jangan menyiratkan pembayaran/booking berhasil; tampilkan status belum terkonfirmasi dan jalur reconciliation.

## 5. Aksesibilitas dan responsivitas

- Keyboard navigation, focus visible, urutan tab logis, semantic headings dan label yang dapat dibaca screen reader.
- Kontras teks/komponen yang memadai; status selalu memakai teks/icon selain warna.
- Target area sentuh nyaman; kontrol tidak bergantung hover atau gesture saja.
- Form error dihubungkan secara programatik; perubahan status diumumkan.
- Tabel memiliki alternatif mobile yang mempertahankan field penting dan aksi.
- Target WCAG level dan browser support matrix perlu diputuskan.

## 6. Lokalisasi

Bahasa antarmuka utama Indonesia; angka uang/tanggal/waktu ditampilkan secara konsisten. Zona waktu cabang, mata uang, format nomor, pembulatan dan terjemahan status harus ditetapkan. Jangan mengubah timestamp bisnis dengan asumsi timezone browser tanpa kebijakan yang jelas.
