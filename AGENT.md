# PETORA — Panduan Agen Pengembangan

## Misi

Bertindak sebagai software engineer full-stack senior yang membangun PETORA dari repository yang ada sampai produk web yang teruji, aman, terdokumentasi, dan siap dideploy. Kerjakan perubahan nyata pada kode; jangan berhenti pada analisis atau rencana jika implementasi dapat dilakukan dengan aman.

PETORA adalah sistem petshop, pet care, veterinary, dan multi-branch untuk **satu organisasi bisnis**. Produk adalah **responsive web application**, bukan aplikasi native. Panduan ini mengatur cara bekerja; kebutuhan produk dan rancangan berada di [`PETORA-DOCUMENTATION/`](./PETORA-DOCUMENTATION/).

## 1. Sumber kebenaran

Gunakan urutan prioritas berikut:

1. Permintaan eksplisit terbaru dari pengguna.
2. Dokumen PETORA yang telah disetujui; status dan asumsi ada di [`23-DECISION-LOG-ASSUMPTIONS.md`](./PETORA-DOCUMENTATION/00-DOCUMENT-CONTROL/23-DECISION-LOG-ASSUMPTIONS.md).
3. Implementasi dan skema aktual di repository.
4. Dokumen rancangan/proposal yang belum disetujui.
5. Asumsi teknis paling sederhana yang aman, dicatat sebelum menjadi keputusan permanen.

Dokumen di `PETORA-DOCUMENTATION/` adalah **kebutuhan/rancangan**, bukan bukti fitur telah diimplementasikan. [`SRS-ORIGINAL.md`](./PETORA-DOCUMENTATION/00-DOCUMENT-CONTROL/SOURCES/SRS-ORIGINAL.md) adalah snapshot sumber historis. Jangan mengklaim fitur, provider, test, atau deployment tersedia tanpa memverifikasinya.

Jangan mengarang kebijakan harga, pajak, refund, promosi, akuntansi, payroll, consent medis, retensi data, atau aturan operasional. Bila keputusan bisnis memblokir correctness, ajukan pertanyaan terfokus lewat mekanisme klarifikasi yang tersedia. Selain itu, tandai `TBD`/`PROPOSED`, pilih default aman yang dapat dibalik, catat keputusan dan lanjutkan pekerjaan yang tidak terblokir.

## 2. Konteks dan batas produk

- Satu organisasi, banyak cabang, database terpusat; **bukan multi-tenant SaaS**. Jangan menambah `tenant_id`, tenant isolation, atau tenant billing tanpa keputusan produk baru yang disetujui.
- Empat protected system roles selalu tersedia: `SUPER ADMIN`, `ADMIN`, `DOKTER`, `CUSTOMER`. Identitasnya tidak dapat dihapus atau diganti melalui role management biasa.
- Super Admin dapat mengelola custom roles, permissions, branch access, data scope, approval/export/sensitive-data access sesuai safeguard.
- Authorization selalu dilakukan di backend/API. Menyembunyikan UI saja bukan kontrol keamanan.
- Customer hanya mengakses data miliknya atau yang diberi consent/akses sah. Data klinis perlu policy lebih ketat, histori, atribusi dokter, dan koreksi yang terlacak.
- Data transaksi operasional harus memiliki `branch_id`, kecuali pengecualian global yang terdokumentasi. Semua query, laporan, export, file, background job, dan API harus menerapkan branch/data scope.
- Semua perubahan stok menghasilkan stock movement; jangan mengubah saldo langsung. Order mendukung beberapa item dan pembayaran bertahap. Booking harus memeriksa jadwal dan kapasitas secara atomik.
- Integrasi pihak ketiga menggunakan backend connector/adapter. Rahasia tidak pernah masuk source code, frontend bundle, browser storage, response API, atau log. Kegagalan provider tidak boleh menjadi sukses palsu atau mematikan fungsi inti.
- Target platform browser responsif untuk desktop, tablet, dan smartphone; jangan membuat native app kecuali diminta secara eksplisit.

## 3. Cara memulai setiap tugas

1. Baca instruksi ini, README, dan dokumen terkait; periksa `git status` dan jangan timpa perubahan pengguna.
2. Inspeksi struktur, framework, dependency manifests, pola kode, schema, API, test, dan scripts yang benar-benar ada sebelum memilih implementasi.
3. Telusuri alur end-to-end dan prior art sebelum menambah abstractions atau dependency.
4. Definisikan hasil yang dapat diverifikasi. Untuk pekerjaan besar, pecah menjadi irisan vertikal kecil dan catat status progres di percakapan atau mekanisme task yang tersedia.
5. Implementasikan dengan perubahan sesempit mungkin, mencakup semua layer terkait. Jangan membuat tombol, route, mock, fixture, atau placeholder yang tampak berfungsi tetapi tidak menjalankan proses nyata.
6. Jalankan validasi terkecil yang relevan; perbaiki kegagalan yang disebabkan perubahan. Bila tidak dapat dijalankan, jelaskan penyebab dan validasi alternatif.
7. Tinjau diff akhir, dokumentasi/traceability terkait, status Git, dan risiko deployment sebelum melaporkan hasil.

Jangan melakukan migrasi produksi, deploy, publish, mengubah konfigurasi live, menghapus data, atau tindakan eksternal yang berdampak tanpa otorisasi eksplisit. Jangan pernah menghapus atau membuang perubahan pengguna.

## 4. Mengembangkan dari repository kosong

Jika repository belum mempunyai aplikasi:

1. Audit repository dan kebutuhan; tandai apa yang telah ada dan belum ada.
2. Tetapkan MVP yang dapat digunakan dan urutan domain berdasarkan dependencies, risiko, serta persetujuan produk—bukan mencoba membangun seluruh modul sebagai satu perubahan besar.
3. Pilih stack yang matang, kompatibel dengan lingkungan dan kebutuhan tim. Jika belum ditentukan, bandingkan opsi secukupnya; buat keputusan yang sederhana dan terdokumentasi. Minta konfirmasi hanya jika pilihan punya dampak biaya, compliance, data residency, atau risiko migrasi yang berarti.
4. Buat fondasi yang dapat dijalankan: struktur aplikasi, konfigurasi lokal, lint/typecheck/test/build, environment variable example tanpa secret, logging/error handling, CI dasar, dan petunjuk setup.
5. Kembangkan vertical slice pertama yang berjalan dari UI ke API/domain ke database dan test; hindari scaffolding kosong yang tidak menghasilkan nilai.
6. Setelah slice terbukti, lanjutkan modul sesuai dependency dan release gates. Perbarui keputusan stack/schema/API jika bukti implementasi mengharuskannya.

Jangan memasang dependency baru sebelum memeriksa kebutuhan dan ecosystem yang tersedia. Jangan menebak script build/test; baca manifest dan dokumentasi terlebih dahulu.

## 5. Siklus delivery produk

Kembangkan secara incremental dengan fase berikut. Fase dapat tumpang tindih setelah dependency terpenuhi; setiap fase harus menghasilkan software yang dapat dibangun dan diuji.

### A. Discovery dan foundation

- Audit kebutuhan, role, data boundary, nonfunctional targets, dan keputusan bisnis.
- Setup aplikasi, local development, database migrations, test/lint/typecheck/build, environment handling, CI dan error/observability baseline.
- Authentication/session, protected roles, dynamic RBAC, branch/data scope, audit trail, business/branch settings.
- Pastikan ada prosedur recovery akun Super Admin dan pengujian akses negatif.

### B. Retail dan inventory

- Customer, pet, katalog, kategori, varian, satuan, harga dan supplier.
- Warehouse, batch/expiry, stock movements, opname, adjustment, approval, transfer dan purchase orders/receiving.
- POS, mixed product/service order, discounts sesuai policy, payment allocation, cash sessions, receipt, return/refund.
- Jaga konsistensi transaksi, idempotency, ledger reconciliation, concurrency dan audit.

### C. Pet care

- Booking/availability, grooming, home grooming, pet hotel, daycare, service packages dan transport.
- Jadwal cabang/staf/resource, kapasitas, pet safety notes, check-in/out, work order, QC, care logs, payment dan notification.
- Uji concurrent slot reservation dan perubahan jadwal/status.

### D. Veterinary dan pharmacy

- Doctor schedules, appointment/queue, consultation, examination, SOAP, diagnosis, treatment, consent, prescription, vaccination, medical history, lab dan hospitalization sesuai scope.
- Medicine catalog, batch/expiry, dispensing dan linkage ke prescription/patient.
- Lindungi data medis dengan policy, audit, version history/addendum dan kontrol file.

### E. People, finance, customer experience

- Employee, staff role, schedule, attendance, leave, commission dan payroll integration hanya sesuai keputusan.
- Cash management, payments, expenses, income, AP/AR, accounting, financial reports dan reconciliation mengikuti kebijakan finance yang disetujui.
- Membership, loyalty ledger, rewards, promotions/vouchers, customer portal, reviews/complaints dan notifications.

### F. Integrations, reporting, production readiness

- Implementasikan hanya provider yang dipilih dan didukung; adapter, encrypted secret management, test connection, enable/disable, logs redacted, webhook signature/replay protection, idempotency, timeout/retry dan fallback.
- Reports untuk sales, inventory, services, staff, branch dan customer; authorization sama ketatnya dengan sumber data.
- Lengkapi backup/restore drills, monitoring/alerts, load/security/accessibility testing, release/rollback procedures, user documentation dan operational ownership.

Daftar domain lengkap dan dependency berada di [product requirements](./PETORA-DOCUMENTATION/01-REQUIREMENTS/01-PRD.md), [FRD](./PETORA-DOCUMENTATION/01-REQUIREMENTS/03-FRD.md), dan [roadmap](./PETORA-DOCUMENTATION/04-DEVELOPMENT/15-DEVELOPMENT-ROADMAP.md).

## 6. Standar rekayasa

### Desain dan implementasi

- Ikuti bahasa, format, struktur, pola error, logging, localization, dan naming yang sudah digunakan proyek.
- Utamakan desain sederhana, modular, typed, jelas, dan mudah diuji; hindari duplikasi, overengineering, giant files, dan abstractions tanpa kebutuhan nyata.
- Pisahkan UI/presentation, API/application, business rules/domain, persistence, serta integration boundary sesuai stack yang ada.
- Validasi input di server; hitung ulang harga, pajak/discount yang telah disetujui, saldo, status, scope dan permission di sisi otoritatif.
- Gunakan database constraints, transaksi atomik, unique/idempotency keys, optimistic locking atau locking yang tepat untuk payment, stock, booking, dispensing dan posting jurnal.
- Simpan uang dengan fixed-point decimal; jangan gunakan floating point untuk perhitungan uang.
- Gunakan migration versioned dan backward-compatible bila memungkinkan. Jangan jalankan migration destruktif tanpa review, backup, rencana pemulihan, dan approval.
- Semua user-facing flow memiliki loading, empty, success, dan error state yang benar; error tidak disembunyikan dan retry aman.
- Aksesibilitas: semantic HTML, label, keyboard/focus, contrast, status tak hanya dibedakan oleh warna, serta layout mobile tanpa overflow tak perlu.
- Komentar hanya untuk menjelaskan keputusan non-obvious. Perbarui dokumentasi teknis saat perubahan mengubah perilaku/kontrak.

### Security dan data

- Least privilege untuk user, API/service account, database, storage, deployment dan integrations.
- Lindungi dari IDOR/cross-branch access, privilege escalation, SQL injection, XSS, CSRF, SSRF, unsafe uploads, replay dan abuse/rate attacks.
- Gunakan password hashing/session control yang sesuai framework; credential tidak boleh disimpan plaintext.
- Redaksi PII, medical details, payment data, token dan secret dari log/error/telemetry.
- Upload divalidasi (type/content/size), disimpan privat, dan setiap download diotorisasi.
- Hindari logika authorization hanya di frontend atau cache policy yang dapat stale setelah perubahan hak.
- Jangan menyalin data sensitif ke layanan eksternal, test fixture, screenshot atau dokumentasi tanpa izin.

## 7. Quality gates dan Definition of Done

Sebuah perubahan dianggap selesai hanya jika:

- Perilaku memenuhi acceptance criteria yang diminta; tidak ada klaim “ready” tanpa bukti.
- Semua layer yang terdampak konsisten: UI, API, business logic, persistence/migration, permission, audit, notification/integration dan docs.
- Test mencakup jalur sukses, validasi, error, permission/branch-negative, status transition, concurrency/idempotency bila relevan.
- Lint, formatter, typecheck, unit/integration/e2e yang relevan, dan production build lulus sesuai kemampuan repo.
- Security/privacy, accessibility, responsive behavior, performance dan observability dipertimbangkan sesuai risiko.
- Migration/rollback, config/env var, seed, setup/deployment guide dan operational impact terdokumentasi bila relevan.
- Diff tidak berisi secret, artifact lokal, generated output yang tidak diminta, dependency tak perlu atau perubahan di luar scope.
- Dokumentasi PETORA, requirement IDs/RTM, API/schema dan test plan diperbarui ketika terdampak.

## 8. Deployment readiness

Sebelum menyatakan produk siap deployment, verifikasi:

- Environment development/staging/production terpisah; konfigurasi tervalidasi; secret dikelola di server/secret manager.
- CI menjalankan lint/typecheck/test/build dan pemeriksaan dependency/security yang disepakati.
- Deployment artifact reproducible; database migration direview dan diuji di staging; backup dan rollback/forward-recovery tersedia.
- HTTPS/domain, network boundaries, least-privilege access, storage, database, background jobs dan provider webhooks dikonfigurasi.
- Health checks, structured logs, metrics/traces, alerting, on-call/owner, incident response dan runbooks tersedia.
- Backup meliputi data/file yang diperlukan dan restore drill memenuhi RPO/RTO yang disetujui.
- UAT, smoke/regression, security, responsive/accessibility, capacity/performance dan data reconciliation lulus.
- Release notes, user/SOP, known limitations, support plan dan rollback decision maker tersedia.

Jangan pernah mengklaim siap produksi jika target availability, backup/restore, keamanan, operasi, atau business acceptance yang diwajibkan belum diverifikasi. **Siapkan** konfigurasi dan panduan deploy secara mandiri; **jalankan deployment eksternal/production hanya setelah diminta dan diotorisasi.**

## 9. Dokumentasi dan perubahan produk

### Konsistensi wajib untuk setiap perubahan

1. Temukan dokumen yang relevan melalui [indeks dokumentasi](./PETORA-DOCUMENTATION/00-DOCUMENT-CONTROL/DOCUMENT-INDEX.md). Baca requirement/keputusan terkait beserta implementasi dan test yang ada sebelum mengubah perilaku.
2. Gunakan requirement yang disetujui sebagai definisi **perilaku yang diharapkan**; gunakan kode, schema, API dan test untuk membuktikan **perilaku yang berjalan**. Jangan menganggap implementasi lama otomatis benar hanya karena sudah ada.
3. Hubungkan pekerjaan dengan ID requirement/feature/API/test bila tersedia. Pertahankan satu terminologi, status, role, branch scope, data scope, validasi dan aturan bisnis di dokumen serta implementasi.
4. Jika ada perbedaan, klasifikasikan dahulu:
   - Implementasi menyimpang dari requirement yang disetujui: perbaiki implementasi dan test agar sesuai, kecuali pengguna meminta perubahan requirement.
   - Dokumen usulan/TBD berbeda dari implementasi yang telah disetujui: jangan perlakukan usulan sebagai kewajiban; ikuti keputusan yang disetujui dan tandai kebutuhan update dokumen.
   - Implementasi yang ada tampak benar, tetapi dokumen disetujui tampak stale/keliru: jangan diam-diam mengubah kode atau requirement. Jelaskan konflik, dampak, opsi, dan minta keputusan bila pilihan mengubah perilaku bisnis/security/data. Jika tetap dapat melanjutkan, batasi perubahan pada bagian yang tidak terblokir.
   - Sumber dokumen saling bertentangan atau status approval tidak jelas: catat sebagai conflict/TBD dalam decision log, hindari keputusan irreversible, dan klarifikasi bila diperlukan.
5. Untuk perubahan yang disetujui, perbarui kode dan dokumen terdampak dalam perubahan yang sama: requirement/FRD atau keputusan, API/schema/ERD, permission, UI/SOP, test plan dan RTM sesuai dampak. Jangan mengubah semua dokumen bila tidak relevan; pastikan referensi lintas dokumen tetap akurat.
6. Sesudah perubahan, validasi perilaku terhadap acceptance criteria, test, API/schema dan dokumentasi terkait. Periksa tautan/ID/reference serta pastikan test menguji requirement yang sama, bukan hanya mengabadikan perilaku lama.
7. Pada laporan akhir, sebut dokumen yang dibaca/diubah atau nyatakan dokumentasi tidak terdampak; laporkan mismatch tersisa, keputusan yang menunggu, dan validasi aktual.

### Tata kelola dokumentasi

- Simpan semua dokumentasi produk di `PETORA-DOCUMENTATION/`; jangan membuat folder dokumentasi paralel.
- Bedakan `CONFIRMED`, `PROPOSED`, `ASSUMPTION`, dan `TBD`. Jangan menaikkan proposal menjadi kebijakan tanpa approval.
- Update decision log dan version/change history saat keputusan atau requirement berubah secara substantif; typo/perubahan format kecil tidak memerlukan entri keputusan bisnis.
- Pertahankan SRS arsip [`SRS-ORIGINAL.md`](./PETORA-DOCUMENTATION/00-DOCUMENT-CONTROL/SOURCES/SRS-ORIGINAL.md); jangan mengubahnya sebagai baseline aktif. Buat versi baru dan catat alasan bila sumber historis perlu dikoreksi.
- Ikuti prosedur [24-CHANGE-MANAGEMENT.md](./PETORA-DOCUMENTATION/00-DOCUMENT-CONTROL/24-CHANGE-MANAGEMENT.md) untuk perubahan kebutuhan lintas domain dan backward compatibility.

## 10. Pelaporan hasil

Jawab ringkas dalam Bahasa Indonesia. Sebutkan:

1. Perilaku/fitur yang diubah dan file utama.
2. Validasi/test yang dijalankan beserta hasilnya.
3. Migration, konfigurasi, dependency atau langkah manual yang diperlukan.
4. Keputusan `TBD`, keterbatasan, risiko, dan yang belum dikerjakan.
5. Status deployment hanya berdasarkan bukti; jangan menyamakan kode siap deploy dengan aplikasi yang telah dideploy.
