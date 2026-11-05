# 11 — Sitemap dan Navigasi

**Status:** Struktur navigasi usulan. Menu akhir ditampilkan sesuai permission dan scope hasil backend.

## 1. Public dan authentication

- Public: Beranda/layanan, katalog publik bila diputuskan, kontak/lokasi, kebijakan privasi.
- Authentication: Login, registrasi customer (bila dibuka), lupa/reset password, verifikasi kontak, session-expired.
- Portal customer terpisah secara navigasi dari console staf, tetapi tetap satu sistem identity dan API.

## 2. Super Admin

1. Dashboard lintas cabang
2. Organisasi
   - Cabang, jam operasional, hari libur, layanan/harga cabang
3. Pengguna & Akses
   - Users, employee assignments, protected/custom roles, permissions, branch/data scope
4. Operasional
   - Customers, Pets, POS/Sales, Products, Inventory/Warehouses, Purchasing/Suppliers, Services/Bookings, Veterinary/Pharmacy
5. Manajemen
   - HR/Attendance/Commission, Finance/Accounting, Reports
6. Engagement
   - Membership/Loyalty, Promotions, Notifications
7. System
   - Business/Branch Settings, Integrations, Audit Logs, Import/Export, Backup status (jika didukung)

## 3. Admin / staf cabang

Dashboard cabang → Customers/Pets → POS/Sales → Products/Stock → Purchasing/Receiving → Booking Calendar → Grooming/Hotel/Daycare/Transport boards → Veterinary queue (bila diizinkan) → Finance/Reports → Staff/Attendance → Notifications.

Item menu tidak tersedia bila tidak ada permission; pemilihan cabang dibatasi pada akses yang diberikan.

## 4. Dokter

Dashboard klinik → Appointment/Queue → Patient/Pet search terbatas → Medical encounter → Medical history → Prescription/Procedure/Vaccination → Follow-up → Profile/notifications.

Finance, HR dan konfigurasi sistem tidak muncul secara default; akses yang diberikan secara eksplisit tetap tunduk pada kebijakan sensitif.

## 5. Customer portal

Home → Profile/Addresses → My Pets → Book Services → My Bookings → Product Catalog/Cart/Orders → Payments → Medical information (allowed records only) → Membership/Loyalty/Vouchers → Notifications → Reviews/Complaints.

## 6. Responsive navigation dan struktur halaman

- Desktop: sidebar bertingkat, header dengan konteks cabang, search, notifikasi dan profil.
- Tablet/mobile: navigation drawer; akses aksi utama tetap terlihat dan tidak bergantung hover.
- Breadcrumb: `Domain > List > Record`; tidak memasukkan PII ke URL bila dapat dihindari.
- Context switcher cabang hanya menampilkan cabang yang diizinkan dan menegaskan konteks aktif pada transaksi.
- Deep link memeriksa authorization server-side; hidden menu bukan security control.

## 7. Page-to-permission examples

| Page | Permission minimum | Scope |
|---|---|---|
| POS checkout | `sales.create` | Cabang kasir aktif |
| Refund detail/action | `sales.view`, `sales.refund` dan approval jika disyaratkan | Order/payment cabang |
| Medical encounter | `medical_records.view/create/sign` | Assignment, cabang dan policy klinis |
| Customer pet detail | `pets.view` atau customer-owned policy | Owner/consent |
| Stock transfer | `inventory.transfer.create` / `approve` | Cabang asal dan tujuan |
| Reports/export | `reports.view` / `reports.export` | Dataset dan branch scope sama |
| Integration settings | `integrations.configure` | Super Admin policy |
