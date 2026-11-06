---
title: Feature Catalog
document_id: PET-DOC-0103
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['product-requirements-document.md']
---

# Feature Catalog

Katalog fitur PETORA mencatat fitur utama sesuai README.md dengan ID, tujuan, pengguna utama, serta aturan bisnis yang mengikat.

## Feature List

| Feature ID | Nama Fitur | Tujuan | Pengguna Utama | Kondisi Prasyarat | Aturan Bisnis Utama |
| --- | --- | --- | --- | --- | --- |
| PET-FTR-001 | Dashboard Management | Menyediakan ringkasan operasional perusahaan dan cabang | Owner, Manager, Supervisor | User login dan data branch valid | Dashboard harus mengikuti scope organisasi/branch dan membatasi data sensitif |
| PET-FTR-002 | User Management | Mengelola akun pengguna dan profil | Admin, Super Admin | User memiliki organisasi | Akun nonaktif tetap punya riwayat; pengguna baru harus terikat ke branch dan role |
| PET-FTR-003 | Role & Permission | Mengatur hak akses per modul dan aksi | Super Admin, Owner | Role kebijakan ditetapkan | Scope harus bersifat own, branch, all, atau assigned_records |
| PET-FTR-004 | Branch Management | Mengelola cabang, gudang, kas, dan operasional cabang | Super Admin, Owner | Perusahaan memiliki cabang | Cabang nonaktif tidak menerima transaksi baru, tetapi riwayat tetap tersimpan |
| PET-FTR-005 | Customer Management | Mengelola pelanggan dan hubungan dengan perusahaan | Admin, CS, Kasir | Identitas pelanggan valid | Nomor telepon unik dalam organisasi; data pelanggan tidak dihapus jika ada riwayat transaksi |
| PET-FTR-006 | Pet Management | Mengelola data hewan dan kesehatannya | Admin, Vet, CS | Pelanggan atau staf terdaftar | Satu hewan hanya punya satu pemilik utama; perubahan pemilik dibatasi otorisasi |
| PET-FTR-007 | Product Management | Mengelola produk, varian, harga, dan katalog | Admin, Inventory, Purchasing | Produk memiliki kategori dan unit | Harga jual, harga minimum, dan harga cabang harus diverifikasi |
| PET-FTR-008 | Inventory & Warehouse | Mengelola stok, penerimaan, transfer, opname, dan kardeks stok | Inventory Staff, Manager | Gudang dan branch tersedia | Semua pergerakan stok harus terdokumentasi dan tidak bisa diubah tanpa transaksi yang valid |
| PET-FTR-009 | POS & Sales Management | Mengolah penjualan produk dan layanan | Kasir, Supervisor | Produk, pelanggan, dan metode pembayaran valid | Checkout harus idempotent; refund/void memerlukan otorisasi dan alasan |
| PET-FTR-010 | Purchasing & Supplier | Mengelola PO, penerimaan, hutang, dan pembelian | Purchasing Staff, Manager | Supplier dan akun vendor dibuat | PO harus sesuai receivable dan barang yang diterima cocok dengan dokumen pembelian |
| PET-FTR-011 | Grooming Management | Menjalankan layanan grooming dan dokumentasi hasil | Groomer, Supervisor | Booking dan customer profile ada | Setiap layanan harus ada status, catatan kondisi, dan riwayat tindakan |
| PET-FTR-012 | Booking & Reservation | Mengelola jadwal layanan, reservasi, dan kapasitas | Staff, Customer Portal | Layanan dan cabang dipilih | Kapasitas harus dicek untuk mencegah overbooking |
| PET-FTR-013 | Pet Hotel & Daycare | Mengelola kamar, check-in, monitoring, dan check-out | Staff hotel, Manager | Kamar dan kapasitas tersedia | Monitoring harian dan catatan kesehatan wajib tersedia selama penitipan |
| PET-FTR-014 | Transport Management | Mengelola penjemputan dan pengiriman hewan | Driver, Staff Operasional | Lokasi dan jadwal valid | Checklist kondisi hewan wajib dipenuhi sebelum dan sesudah perjalanan |
| PET-FTR-015 | Home Grooming Management | Menangani layanan grooming di rumah pelanggan | Groomer, CS | Area service dan jadwal valid | Perjalanan petugas, perlengkapan, dan konfirmasi pelanggan harus terdokumentasi |
| PET-FTR-016 | Veterinary Management | Mengelola pemeriksaan klinik dan penugasan dokter | Veterinarian, Staff Klinik | Booking dan data hewan ada | Triage, diagnosis, dan tindakan medis harus terdokumentasi |
| PET-FTR-017 | Medical Records Management | Menyimpan histori medis hewan dan revisi rekam | Veterinarian, Admin | Pasien dan dokter valid | Rekam final tidak boleh diubah langsung; revisi harus menyimpan snapshot sebelumnya |
| PET-FTR-018 | Pharmacy & Medicine | Mengelola obat, resep, pengeluaran, dan persediaan farmasi | Pharmacist, Vet | Obat dan resep valid | Obat resep hanya bisa dikeluarkan dengan resep yang sah |
| PET-FTR-019 | Membership Management | Menjalankan program keanggotaan pelanggan | Admin, CS | Paket membership dibuat | Benefit harus diatur per level dan cabang |
| PET-FTR-020 | Loyalty Management | Mengelola poin pelanggan dan reward | Kasir, Admin, CS | Program loyalty aktif | Poin dapat dibatalkan pada refund dan harus tercatat dalam riwayat |
| PET-FTR-021 | Promotion Management | Menyusun promo dan bundling | Marketing, Admin | Produk/layanan target dibuat | Promo harus validated berdasarkan cabang, periode, dan segment pelanggan |
| PET-FTR-022 | Staff Management | Mengelola data karyawan dan penugasan | HR, Manager | Struktur organisasi ada | Data karyawan harus terhubung ke user dan cabang |
| PET-FTR-023 | Attendance Management | Mengelola clock-in dan presensi | HR, Staff | Jadwal dan shift dibuat | Kehadiran harus dapat disesuaikan melalui proses persetujuan dan koreksi |
| PET-FTR-024 | Commission Management | Menghitung komisi pegawai atas penjualan dan layanan | HR, Manager | Aturan komisi ditentukan | Snapshot aturan komisi harus ikut disimpan saat transaksi terjadi |
| PET-FTR-025 | Payroll Management | Mengelola gaji, lembur, dan pembayaran SDM | HR, Finance | Absensi dan komisi tersedia | Gaji harus diperiksa sebelum pembayaran dan dicatat di keuangan |
| PET-FTR-026 | Finance Management | Mengelola kas, pengeluaran, dan paiutang | Finance, Manager | Rekening dan akun tersedia | Setiap cash movement harus ada bukti, kode, dan jurnal pendukung |
| PET-FTR-027 | Accounting Management | Menyusun jurnal, buku besar, neraca, dan laporan finansial | Accounting, Finance | Chart of account aktif | Jurnal yang diposting tidak boleh dihapus tanpa koreksi yang terdokumentasi |
| PET-FTR-028 | Consignment Management | Mengelola stok titipan supplier/mitra | Inventory, Finance | Mitra konsinyasi dibuat | Pembagian keuntungan dan settlement perlu riwayat terstruktur |
| PET-FTR-029 | Reports & Business Analytics | Menyajikan laporan operasional dan bisnis | Owner, Manager, Staff | Data transaksi tersedia | Export dan laporan harus mengikuti scope organisasi dan cabang |
| PET-FTR-030 | Notification Management | Mengirimkan reminder dan notifikasi operasional | Admin, CS, System | Template notifikasi dibuat | Konten notifikasi harus sesuai preferensi dan frekuensi yang diizinkan |
| PET-FTR-031 | Customer Portal | Menyediakan akses pelanggan ke layanan sendiri | Customer | akun pelanggan aktif | Pelanggan hanya mengakses data yang diizinkan, bukan seluruh data organisasi |
| PET-FTR-032 | System Settings | Mengatur konfigurasi operasional dan organisasi | Super Admin | Setup perusahaan ada | Pengaturan harus disimpan dengan versi dan audit |
| PET-FTR-033 | Integration Settings | Mengelola koneksi eksternal dan API | Super Admin, Developer | Provider eksternal siap | Secret dan token tidak boleh disimpan di frontend atau repo |

## Core Feature Contracts

Katalog di atas mencakup feature inti README 4.1-4.33. Tabel berikut menambah alur minimal, validasi/error utama, kontrol akses, dependensi, dan hasil penerimaan. Detail UI/API/data tetap berada pada dokumen domain terkait. Semua role adalah kelompok aktor; permission action/scope final ditentukan oleh matriks akses dan policy, bukan nama role saja.

| Feature ID | Input -> process -> output | Validasi / error | Access / dependencies | Acceptance baseline |
| --- | --- | --- | --- | --- |
| PET-FTR-001 | Periode, scope cabang, metrik -> agregasi -> dashboard dan alerts | Tolak scope ilegal; tampilkan sumber data kosong/gagal secara berbeda | Owner: konsolidasi; operasional: assigned scope; bergantung pada transaksi, booking, inventory, finance | Angka dan cabang mengikuti scope; total dapat ditelusuri ke laporan sumber |
| PET-FTR-002 | Identitas, status, role/branch assignment -> provisioning/update -> akun dan histori | Email/identity unik sesuai aturan; akun nonaktif ditolak login tetapi histori bertahan | Admin/Super Admin berpermission; bergantung Auth, organization, branches | Perubahan akses tercatat; user tidak dapat menaikkan haknya sendiri |
| PET-FTR-003 | Role, action, scope -> validasi assignment -> effective permissions | Tolak permission tidak dikenal, scope invalid, atau konflik privilege | Owner/Super Admin; bergantung users, roles, permissions, assignments | Semua aksi diperiksa server-side dan perubahan role dapat diaudit |
| PET-FTR-004 | Identitas cabang, lokasi, layanan, jam -> setup -> branch context | Cabang nonaktif tidak menerima operasi baru; referensi tidak valid ditolak | Owner/Super Admin; bergantung organization, users, warehouses, cash | Aktivitas baru terikat branch valid; histori branch tetap dapat dibaca sesuai izin |
| PET-FTR-005 | Nama/kontak/status -> dedup dan simpan -> profil customer dan histori | Validasi nomor telepon dan duplicate; jangan menghapus histori transaksi | CS/Admin/Kasir sesuai permission; bergantung organization dan pet ownership | Pencarian mengembalikan record scoped; duplicate ditolak/ditangani sesuai aturan |
| PET-FTR-006 | Identitas hewan dan owner -> create/update owner link -> pet profile/history | Satu primary owner; validasi multi-owner dan perubahan kepemilikan | CS/Vet sesuai field access; bergantung customer dan medical | Perubahan owner menyimpan history dan tidak merusak visit lama |
| PET-FTR-007 | SKU, unit, harga, batch policy -> kelola catalog -> product/service price snapshot | SKU unik scope organisasi; harga/unit/konversi valid; perubahan harga berizin | Product Admin/Inventory; bergantung category, supplier, branch pricing | POS menggunakan harga server-side dan histori harga tidak menimpa transaksi lama |
| PET-FTR-008 | Receipt, movement, count, transfer -> ledger posting -> saldo/kartu stok | Cegah negative stock kecuali policy aktif; tolak duplicate, invalid batch/location | Inventory + approver sesuai aturan; bergantung product, warehouse, transaction integrity | Semua saldo dapat direkonsiliasi ke movement ledger |
| PET-FTR-009 | Item, qty, customer/pet, promo, payment intent -> checkout -> sale/receipt | Server hitung harga; validasi stok, discount, tax, payment; duplicate idempotent | Kasir; refund/void memerlukan higher permission; bergantung product, stock, loyalty, finance | Satu request menghasilkan paling banyak satu sale; payment/stock/journal konsisten |
| PET-FTR-010 | Supplier, request, PO, receipt, invoice -> match/approve -> stock and payable | Tolak duplicate invoice dan mismatch tanpa review; receiving parsial didukung | Purchasing/Inventory/Finance dengan approval; bergantung supplier, product, stock, accounting | Quantity accepted, payable, dan audit sesuai dokumen sumber |
| PET-FTR-011 | Booking/pet/service/condition -> grooming workflow -> service record and charge | Validasi slot, pet status, checklist, additional consent | Groomer/CS/Supervisor; bergantung booking, pet, inventory, POS | Status, kondisi awal/akhir, assigned staff, hasil dan biaya tercatat |
| PET-FTR-012 | Branch/service/time/staff/pet -> capacity reservation -> confirmed booking | Cegah overlap/overbooking dengan concurrency control; no-show/cancel state terpisah | Staff/customer portal; bergantung calendar, service capacity, branch | Permintaan bersamaan tidak melebihi kapasitas yang dikonfigurasi |
| PET-FTR-013 | Reservation, room, care instructions -> check-in/monitor/check-out -> stay record and invoice | Validasi occupancy, pet compatibility, medication checklist, late checkout | Hotel staff; clinical details dibatasi; bergantung booking, room, pet, payment | Monitoring dan serah terima lengkap sebelum stay diselesaikan |
| PET-FTR-014 | Pickup/destination, pet, vehicle, driver -> trip lifecycle -> handoff and charges | Validasi schedule, service area, vehicle/driver availability, checklist | Dispatch/Driver; customer sees permitted trip status; bergantung booking/customer | Pickup and delivery state plus handoff evidence are auditable |
| PET-FTR-015 | Address, service, equipment, pet -> dispatch and home service -> service record | Validasi coverage, travel time, equipment, consent, schedule conflicts | CS/Groomer; bergantung booking, maps/provider if approved, inventory | Visit starts/completes only for valid assignment and service area |
| PET-FTR-016 | Appointment, triage, observations -> clinical visit -> diagnosis/action/charge | Validasi clinician assignment, consent, status transition, required clinical fields | Veterinarian/clinical staff; bergantung pet, booking, medical records | Final visit links clinician, patient, actions, and consent where required |
| PET-FTR-017 | Visit findings, diagnosis, attachments -> finalize/revise -> versioned medical record | Final record immutable; revision requires reason; validate patient and clinician | Authorized Vet; customer only approved fields; bergantung clinical visit, storage | Previous snapshot, actor, time, reason, and visibility flags preserved |
| PET-FTR-018 | Final prescription, lot, dosage -> dispense/use -> medication history and stock movement | Reject unauthorized/non-final prescription, expired batch, allergy conflict where data exists | Pharmacist/Vet according to action; bergantung records, stock, products | Dispense matches valid prescription and decrements correct batch ledger |
| PET-FTR-019 | Plan, term, customer -> enroll/renew/use benefit -> membership ledger | Validate dates, eligibility, branch, quota, payment status | Admin/CS; customer self-service limited; bergantung customer, POS, services | Benefit usage is deduplicated and historical plan terms remain visible |
| PET-FTR-020 | Eligible transaction/reward -> earn/redeem/reverse -> point ledger/balance | Validate active policy, balance, expiry, duplicate event; reverse on eligible refund | Kasir/Admin; correction needs permission; bergantung sales, customer, settings | Balance equals immutable earn/redeem/reversal events |
| PET-FTR-021 | Campaign, audience, scope, window, limits -> evaluate -> applied promotion and discount snapshot | Validate stacking, quota, eligibility, date, branch; reject manipulated client amount | Marketing/Admin; checkout is evaluator; bergantung catalog, customer, settings | Only eligible promo applies; decision and discount amount are reproducible |
| PET-FTR-022 | Employee profile, role/job, branch -> lifecycle -> employee record | Validate unique identifier and employment status; preserve payroll history | HR/Manager; sensitive fields restricted; bergantung users, organization | Assignment changes and offboarding are audited and affect access as specified |
| PET-FTR-023 | Shift, clock event, leave request -> evaluate/approve -> attendance record | Detect duplicate/missing clock events; correction requires reason and approval | Staff self-service + HR approver; bergantung employee, schedule | Approved correction retains original event and audit trail |
| PET-FTR-024 | Commission rule and eligible event -> calculate/snapshot -> payable commission | Validate rule dates, eligible base, split totals, reversal for refund | HR/Manager/Finance split duties; bergantung sales/service and payroll | Transaction retains applied rule/version and recalculation is reproducible |
| PET-FTR-025 | Period, attendance, commission, earning/deduction -> review/approve/pay -> payroll records | Validate period, duplicate payroll, totals and approval; tax rules remain open decision | HR prepares, authorized Finance approves/pays; bergantung attendance, commission, finance | Approved payslip reconciles to disbursement and cannot be silently edited |
| PET-FTR-026 | Cash/bank source, amount, evidence -> approve/post/reconcile -> cash movement | Validate balance, currency, duplicate reference, approval threshold | Finance; branch/Owner scope; bergantung payments, supplier, accounting | Cash movement has source, evidence, reconciliation state and journal reference |
| PET-FTR-027 | Source event, accounts, period -> map/post/reverse -> balanced journal/reports | Debit equals credit; closed period blocks posting; no deletion after posting | Accounting/Finance separation; bergantung chart of accounts, source modules | Posted entries balance per currency and correction is an explicit reversal |
| PET-FTR-028 | Consignment receipt, sales, return, contract -> calculate settlement -> partner payable | Validate agreement, sold/returned quantity, damaged/lost disposition | Inventory/Finance; bergantung supplier/partner, stock, accounting | Partner share and remaining consigned inventory reconcile by settlement period |
| PET-FTR-029 | Query, time range, scope, filters -> server aggregation -> report/export | Validate permission, range, data volume; reject cross-scope export | Owner/Manager/authorized staff; depends on source modules | Totals reconcile to source and export is scoped/audited |
| PET-FTR-030 | Event, template, preference -> queue/send/retry -> delivery status | Consent/preference, rate limit, secret/provider failure, duplicate idempotency | System/CS; secret server-side; depends on event sources and provider | Attempt and final delivery status are observable; retries do not duplicate intent |
| PET-FTR-031 | Customer session, ownership, request -> self-service -> allowed profile/booking/records | Verify owner relationship and approved medical visibility; reject IDOR-style lookup | Customer self only; depends on Auth, pet, booking, payment, medical | Customer cannot view or mutate another customer’s data by changing identifiers |
| PET-FTR-032 | Registered key, scope, typed value, reason -> validate/approve/apply -> versioned policy | Validate schema/range, lock, scope, approval, concurrent version; no unregistered key | Super Admin/Owner per approval; depends on server policy evaluator and audit | Active version changes only after valid commit/approval; rollback is traceable |
| PET-FTR-033 | Provider, secret reference, endpoint -> test/enable/disable -> integration status | Validate server-side connection, secret masking, rotation, webhook signature | Super Admin/Developer permission; depends on secret manager and provider | Secrets never returned to client; health and failures are logged without secret leakage |

## Recommended Extension Catalog

Fitur berikut berasal dari README bagian 5. Statusnya **Recommended / Not committed to release scope**. ID disediakan untuk traceability, tetapi sequencing dan acceptance release harus disetujui Product Owner.

| Feature ID | Requirement ID | Fitur | Input -> output / acceptance baseline | Akses dan dependensi |
| --- | --- | --- | --- | --- |
| PET-FTR-034 | PET-REQ-019 | CRM | Segmen, interaksi, aktivitas -> segment/campaign follow-up; consent dan opt-out dihormati, hasil campaign dapat diukur | CS/Marketing; customer, communication, consent |
| PET-FTR-035 | PET-REQ-020 | Customer Service & Complaint | Ticket, kategori, bukti -> assignment/SLA/resolution; status dan komunikasi dapat ditelusuri | CS/Supervisor; customer, storage, notifications |
| PET-FTR-036 | PET-REQ-021 | Pet Care Monitoring | Jadwal makan/obat, observasi, media -> timeline care report; checklist tidak dapat ditandai selesai tanpa actor/time | Hotel/clinical authorized staff; boarding, pet, storage |
| PET-FTR-037 | PET-REQ-022 | Veterinary Laboratory | Order test, sample, result -> validated lab result linked to visit; result correction keeps history | Veterinarian/Lab; clinical, medical records, storage |
| PET-FTR-038 | PET-REQ-023 | Surgery & Hospitalization | Consent, schedule, care plan -> procedure/stay record and charges; admission/discharge handoff verified | Clinical roles; visits, inventory, finance, care monitoring |
| PET-FTR-039 | PET-REQ-024 | Asset & Maintenance | Asset, location, service event -> lifecycle/maintenance history; retired asset cannot be assigned | Operations/Finance; branches, documents, accounting |
| PET-FTR-040 | PET-REQ-025 | Operational Checklist & SOP | SOP version, checklist assignment, result -> attested execution; version and overdue state visible | Supervisor/assigned staff; branch ops, storage, audit |
| PET-FTR-041 | PET-REQ-026 | Document Management | File, classification, owner, expiry -> scoped document record; access and download audited | Authorized staff only; Storage, users, records, retention policy |
| PET-FTR-042 | PET-REQ-027 | Delivery & Shipping | Order, address, carrier, tracking -> shipment status/proof; shipment reconciles to order and cancellation | Fulfillment/CS; POS, inventory, provider integration |
| PET-FTR-043 | PET-REQ-028 | Budget & Expense Control | Budget, request, cost center -> approval/actual variance; over-budget policy enforced | Finance/Owner; branch, finance, approvals |
| PET-FTR-044 | PET-REQ-029 | Tax Management | Tax rule, effective period, item mapping -> tax calculation/report; jurisdiction/legal rules require approval | Finance/Accounting; catalog, sales, purchasing, open legal decisions |
| PET-FTR-045 | PET-REQ-030 | Backup & Disaster Recovery | Backup job, retention, restore request -> verified recovery point; restore test records RPO/RTO evidence | Platform/Operations restricted roles; Supabase, storage, monitoring |
| PET-FTR-046 | PET-REQ-031 | Online Store & E-commerce | Catalog, cart, order, payment/shipping -> online order synchronized with stock; duplicate order/payment is idempotent | Customer/commerce operators; catalog, inventory, payment, shipping |

## Feature Priority

Priority release sequencing must be approved and is not inferred from feature ID. The 33 core modules are committed product scope from README section 4; the 13 extension modules above are recommendations from section 5 and are not assumed as release commitments. Security, audit, data isolation, and integrity are gates for all features.

## Critical Acceptance Themes

- Semua fitur utama harus memiliki workflow spesifik dan permission check.
- Semua transaksi kritis harus terdokumentasi dengan audit trail.
- Setiap fitur harus terhubung dengan data master dan modul terkait.
- Fitur customer-facing harus membatasi akses data sesuai hubungan pemilik dan cabang.

## Traceability Notes

Setiap fitur utama memiliki workflow, database mapping, acceptance criteria, dan test scenario yang harus diperbarui jika terjadi perubahan.

## Open Decisions

Feature roadmap sequencing, delivery wave, and whether recommended extensions enter the product commitment require stakeholder approval. Tax, data retention, booking cancellation/fees, loyalty expiry, promo stacking, and external provider details remain open where noted in the relevant documents.

