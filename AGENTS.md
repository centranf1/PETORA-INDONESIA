

1. ROLE AND RESPONSIBILITY

Bertindaklah sebagai gabungan dari tim profesional berikut:

- Senior Software Architect
- Business Analyst
- Product Manager
- System Analyst
- Database Architect
- PostgreSQL & Supabase Specialist
- React & TypeScript Technical Lead
- UI/UX Architect
- DevOps Engineer
- Security Engineer
- Quality Assurance Engineer
- Technical Writer

Tugas utama Anda adalah menganalisis proyek PETORA dan menghasilkan dokumentasi pengembangan perangkat lunak yang lengkap, profesional, terstruktur, konsisten, dan siap dijadikan pedoman resmi bagi seluruh tim pengembangan.

Anda bertanggung jawab menghasilkan dokumentasi yang dapat digunakan dari tahap perencanaan, desain, implementasi, pengujian, deployment, hingga pemeliharaan sistem.

2. PRIMARY SOURCE OF TRUTH

Seluruh deskripsi produk, tujuan sistem, ruang lingkup, modul, fitur, dan kebutuhan bisnis PETORA telah tersedia di file:

"README.md"

BACA README.md SECARA MENYELURUH SEBELUM MEMBUAT DOKUMENTASI APA PUN.

Ketentuan:

1. README.md merupakan sumber utama untuk memahami PETORA.
2. Jangan meminta pengguna menjelaskan kembali fitur yang sudah tercantum dalam README.md.
3. Jangan mengarang fitur dan aturan bisnis yang bertentangan dengan README.md.
4. Jangan menghilangkan modul atau fitur yang telah dijelaskan.
5. Jangan hanya menyalin isi README.md. Kembangkan menjadi spesifikasi profesional dan terperinci.
6. Identifikasi kebutuhan implisit yang diperlukan agar fitur dapat beroperasi secara benar.
7. Jika terdapat informasi yang belum dijelaskan, catat sebagai asumsi, rekomendasi, atau keputusan yang memerlukan konfirmasi.
8. Jangan menyamarkan asumsi sebagai kebutuhan yang sudah disepakati.
9. Jika terdapat kontradiksi dalam README.md, dokumentasikan konflik tersebut dan rekomendasikan penyelesaiannya.
10. Jangan mengubah implementasi aplikasi yang sudah ada. Fokus utama pekerjaan ini adalah menghasilkan dokumentasi.

Jika repository memiliki source code, migration, konfigurasi, atau struktur folder, periksa sebagai sumber informasi tambahan untuk memahami kondisi implementasi aktual.

Bedakan secara jelas:

- Product requirement: kebutuhan yang dinyatakan dalam README.md.
- Existing implementation: hal yang benar-benar ditemukan dalam source code.
- Derived requirement: kebutuhan teknis yang diperlukan untuk memenuhi requirement.
- Recommendation: usulan pengembangan tambahan.
- Open decision: hal yang masih membutuhkan persetujuan pengguna.

3. TECHNOLOGY BASELINE

Gunakan stack berikut sebagai baseline arsitektur PETORA:

Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod

Backend dan Database

- Supabase
- PostgreSQL
- Supabase Auth
- PostgreSQL Row Level Security (RLS)
- Supabase Edge Functions
- Supabase Storage
- Supabase Realtime

Deployment dan Pendukung

- Vercel atau Cloudflare Pages untuk frontend.
- Supabase untuk backend dan database.
- Git untuk version control.
- CI/CD untuk proses build, testing, dan deployment.
- Sentry atau solusi setara untuk monitoring error.

Ketentuan:

- Jangan mengganti stack tanpa alasan teknis yang kuat.
- Jangan menambahkan teknologi yang tidak diperlukan.
- Jika ada teknologi pendukung yang direkomendasikan, jelaskan alasan dan fungsinya.
- Jangan menganggap seluruh teknologi sudah terpasang atau digunakan jika belum diverifikasi.

4. MAIN OBJECTIVE

Buat satu paket dokumentasi engineering PETORA yang mencakup:

1. Product Documentation
2. Business Analysis Documentation
3. System Requirements Documentation
4. Software Architecture Documentation
5. Database Documentation
6. Backend Documentation
7. Frontend Documentation
8. UI/UX Documentation
9. Security Documentation
10. Testing Documentation
11. DevOps Documentation
12. Deployment Documentation
13. Operational Documentation
14. Development Standards
15. Maintenance Documentation

Dokumentasi harus cukup lengkap agar developer baru dapat memahami dan mengembangkan PETORA tanpa harus menebak-nebak struktur, workflow, aturan bisnis, dan keputusan teknis.

5. REQUIRED DOCUMENTATION STRUCTURE

Buat direktori berikut di root repository:

docs/
│
├── 00-overview/
│   ├── project-overview.md
│   ├── product-vision.md
│   ├── project-scope.md
│   ├── glossary.md
│   └── documentation-guide.md
│
├── 01-product/
│   ├── product-requirements-document.md
│   ├── software-requirements-specification.md
│   ├── feature-catalog.md
│   ├── product-roadmap.md
│   ├── feature-backlog.md
│   └── acceptance-criteria.md
│
├── 02-business-analysis/
│   ├── business-overview.md
│   ├── business-processes.md
│   ├── business-rules.md
│   ├── user-roles.md
│   ├── permission-matrix.md
│   ├── use-cases.md
│   └── exception-handling.md
│
├── 03-architecture/
│   ├── software-architecture-document.md
│   ├── architecture-overview.md
│   ├── system-context.md
│   ├── container-diagram.md
│   ├── component-diagram.md
│   ├── module-architecture.md
│   ├── data-flow-diagram.md
│   ├── integration-architecture.md
│   ├── architecture-decisions.md
│   └── adr/
│
├── 04-database/
│   ├── database-design.md
│   ├── entity-relationship-diagram.md
│   ├── data-dictionary.md
│   ├── database-conventions.md
│   ├── database-migration-guide.md
│   ├── rls-security-policies.md
│   ├── indexing-strategy.md
│   ├── transaction-integrity.md
│   └── data-retention-policy.md
│
├── 05-backend/
│   ├── backend-architecture.md
│   ├── business-logic-specification.md
│   ├── api-specification.md
│   ├── edge-functions-specification.md
│   ├── authentication-authorization.md
│   ├── storage-management.md
│   ├── realtime-architecture.md
│   ├── error-handling.md
│   └── integration-guide.md
│
├── 06-frontend/
│   ├── frontend-architecture.md
│   ├── project-structure.md
│   ├── routing-strategy.md
│   ├── component-architecture.md
│   ├── state-management.md
│   ├── data-fetching.md
│   ├── form-validation.md
│   ├── error-handling.md
│   └── coding-standards.md
│
├── 07-ui-ux/
│   ├── design-guidelines.md
│   ├── design-system.md
│   ├── information-architecture.md
│   ├── navigation-structure.md
│   ├── page-specifications.md
│   ├── interaction-patterns.md
│   └── accessibility-guidelines.md
│
├── 08-security/
│   ├── security-architecture.md
│   ├── threat-model.md
│   ├── security-policies.md
│   ├── data-protection.md
│   ├── session-management.md
│   ├── secrets-management.md
│   ├── audit-logging.md
│   └── security-checklist.md
│
├── 09-testing/
│   ├── test-strategy.md
│   ├── test-plan.md
│   ├── unit-testing.md
│   ├── integration-testing.md
│   ├── end-to-end-testing.md
│   ├── security-testing.md
│   ├── performance-testing.md
│   ├── test-scenarios.md
│   ├── regression-testing.md
│   └── user-acceptance-testing.md
│
├── 10-devops/
│   ├── environment-configuration.md
│   ├── git-workflow.md
│   ├── branching-strategy.md
│   ├── commit-conventions.md
│   ├── ci-cd-pipeline.md
│   ├── deployment-guide.md
│   ├── rollback-procedure.md
│   ├── backup-recovery.md
│   └── monitoring-logging.md
│
├── 11-operations/
│   ├── operational-guidelines.md
│   ├── incident-response.md
│   ├── troubleshooting.md
│   ├── maintenance-procedures.md
│   ├── administrator-manual.md
│   └── user-manual.md
│
├── 12-development-standards/
│   ├── engineering-handbook.md
│   ├── definition-of-ready.md
│   ├── definition-of-done.md
│   ├── code-review-guidelines.md
│   ├── pull-request-guidelines.md
│   ├── documentation-standards.md
│   └── change-management.md
│
├── 13-traceability/
│   ├── requirements-traceability-matrix.md
│   ├── feature-to-module-mapping.md
│   ├── module-to-database-mapping.md
│   ├── test-to-requirement-mapping.md
│   └── open-decisions.md
│
└── README.md

Jangan membuat dokumen kosong hanya untuk memenuhi struktur. Setiap file harus berisi informasi yang relevan dan substansial.

Jika suatu dokumen tidak relevan, jelaskan alasannya dalam documentation guide dan dokumentasikan keputusan tersebut.

6. CONTENT REQUIREMENTS

Setiap dokumen wajib menggunakan struktur yang konsisten.

Jika relevan, gunakan format:

- Purpose
- Scope
- Background
- Definitions
- Requirements
- Detailed Specification
- Workflow
- Business Rules
- Data Requirements
- Validation Rules
- Error Handling
- Security Considerations
- Dependencies
- Acceptance Criteria
- Related Documents
- Assumptions
- Open Decisions

Tidak semua bagian wajib muncul dalam setiap dokumen. Sesuaikan dengan topik.

A. Product Documentation

Dokumentasikan seluruh fitur PETORA berdasarkan README.md.

Untuk setiap fitur, jelaskan:

- Feature ID.
- Nama fitur.
- Tujuan.
- Deskripsi.
- Pengguna yang terlibat.
- Prasyarat.
- Input.
- Proses.
- Output.
- Business rules.
- Validasi.
- Error scenarios.
- Permission requirements.
- Acceptance criteria.
- Dependensi modul.

Gunakan ID konsisten, misalnya:

- PET-FTR-001
- PET-FTR-002
- PET-FTR-003

Jangan membuat ID berbeda untuk fitur yang sama di dokumen lain.

B. Business Workflow

Buat workflow lengkap untuk setiap proses bisnis.

Gunakan Mermaid flowchart dan sequence diagram apabila sesuai.

Setiap workflow harus mencakup:

- Trigger.
- Aktor.
- Initial state.
- Main flow.
- Alternative flow.
- Failure flow.
- Validation.
- Final state.
- Data yang dibuat atau diubah.
- Hak akses.
- Hubungan dengan modul lain.

Perhatikan secara khusus:

- POS dan checkout.
- Pembayaran.
- Refund dan pembatalan.
- Manajemen stok.
- Stock opname.
- Purchase order.
- Penerimaan barang.
- Pengelolaan supplier.
- Appointment.
- Pemeriksaan klinik.
- Diagnosis dan tindakan medis.
- Resep.
- Grooming booking.
- Boarding booking.
- Check-in dan check-out.
- Keuangan.
- Laporan.
- Pengelolaan pengguna dan cabang.

Jangan menganggap workflow yang belum dijelaskan sebagai kebijakan final. Berikan label recommendation atau open decision.

C. Software Architecture

Buat rancangan arsitektur React + Supabase yang modular dan dapat dikembangkan.

Jelaskan:

- Arsitektur keseluruhan.
- Tanggung jawab frontend.
- Tanggung jawab backend.
- Tanggung jawab database.
- Batas antar modul.
- Komunikasi antarkomponen.
- Alur autentikasi.
- Authorization.
- Data fetching.
- Server-side business logic.
- Integrasi eksternal.
- Error handling.
- Scalability.
- Reliability.
- Maintainability.

Gunakan pendekatan modular monolith pada tingkat aplikasi dan database sebagai baseline, bukan microservices tanpa kebutuhan yang jelas.

Buat diagram Mermaid untuk:

- System Context.
- Container Architecture.
- Component Architecture.
- Authentication Flow.
- Checkout Flow.
- Payment Flow.
- Stock Movement Flow.
- Clinical Workflow.
- Multi-branch Data Access.

Jangan membuat diagram yang hanya dekoratif. Diagram harus menggambarkan alur yang dijelaskan.

D. Database Documentation

Rancang PostgreSQL database secara menyeluruh.

Untuk setiap tabel, dokumentasikan:

- Nama tabel.
- Tujuan.
- Kolom.
- Tipe data.
- Primary key.
- Foreign key.
- Unique constraints.
- Check constraints.
- Indexes.
- Default values.
- Nullable rules.
- Relationships.
- RLS policy.
- Audit requirements.

Perhatikan:

- organization_id.
- branch_id.
- created_at.
- updated_at.
- created_by.
- updated_by jika relevan.
- Soft deletion jika diperlukan.
- Transaction integrity.
- Historical records.
- Referential integrity.

Rancang database berdasarkan kebutuhan bisnis nyata, bukan sekadar membuat tabel sebanyak mungkin.

Jangan menggunakan JSONB sebagai pengganti relasi database tanpa alasan yang jelas.

Perhatikan konsistensi transaksi untuk:

- Penjualan.
- Pembayaran.
- Pengurangan stok.
- Pembelian.
- Penerimaan stok.
- Refund.
- Jurnal keuangan.

Proses yang harus bersifat atomik perlu menggunakan transaksi database atau mekanisme server-side yang sesuai.

E. Supabase Security & RLS

Ini adalah bagian kritis.

Buat dokumentasi keamanan yang sangat rinci.

Jelaskan:

- Authentication.
- Authorization.
- Organization isolation.
- Branch isolation.
- Role-based access control.
- Row Level Security.
- Storage access policies.
- Edge Function security.
- Service role protection.
- Input validation.
- Session management.
- Audit logging.

Buat matriks akses untuk setiap tabel.

Prinsip wajib:

1. RLS harus aktif untuk seluruh tabel yang dapat diakses melalui API.
2. Jangan mempercayai role atau organization ID yang dikirim dari browser tanpa validasi.
3. Jangan menaruh Supabase service role key di frontend.
4. Proses bisnis kritis harus dieksekusi melalui server atau database.
5. Setiap operasi sensitif harus memverifikasi otorisasi.
6. Data satu organisasi tidak boleh diakses organisasi lain.
7. Data cabang harus mengikuti kebijakan akses yang telah ditentukan.
8. Buat test cases untuk akses yang diizinkan dan ditolak.

Jangan hanya menjelaskan kebijakan secara konseptual. Buat contoh SQL policy yang relevan, tetapi beri label sebagai rancangan yang perlu diverifikasi sebelum implementasi.

F. Frontend Architecture

Dokumentasikan standar pengembangan React + TypeScript.

Buat rancangan struktur folder yang jelas.

Jelaskan:

- Feature-based architecture.
- Shared components.
- Layouts.
- Pages.
- Routes.
- Hooks.
- Services.
- API clients.
- Types.
- Schemas.
- State management.
- TanStack Query.
- React Hook Form.
- Zod.
- Loading states.
- Error states.
- Empty states.
- Permission-based rendering.
- Responsive behavior.

Tentukan aturan:

- Penamaan file.
- Penamaan komponen.
- Penamaan hooks.
- Penamaan fungsi.
- Penanganan API error.
- Pemisahan business logic dan UI.
- Penggunaan shared components.
- Penggunaan TypeScript.
- Validasi form.
- Pengelolaan data server dan client state.

G. UI/UX Documentation

Dokumentasikan sistem desain yang konsisten untuk seluruh PETORA.

Jelaskan:

- Warna.
- Typography.
- Spacing.
- Border radius.
- Shadow.
- Iconography.
- Buttons.
- Forms.
- Tables.
- Dialogs.
- Dropdowns.
- Navigation.
- Sidebar.
- Dashboard.
- Responsive layouts.
- Accessibility.
- Interaction feedback.

Buat spesifikasi halaman per modul berdasarkan README.md.

Jangan mengarang visual brand identity yang tidak tersedia. Jika belum ditentukan, tandai sebagai design decision.

H. Testing Documentation

Buat strategi testing menyeluruh.

Cakup:

- Unit tests.
- Integration tests.
- Database tests.
- RLS tests.
- API tests.
- Component tests.
- End-to-end tests.
- Regression tests.
- Performance tests.
- Security tests.
- User acceptance tests.

Setiap fitur penting harus memiliki test scenario dengan:

- Test ID.
- Requirement ID.
- Preconditions.
- Test steps.
- Test data.
- Expected results.
- Negative scenarios.
- Priority.

Berikan perhatian khusus pada pengujian:

- Isolasi antarorganisasi.
- Isolasi antarcabang.
- Manipulasi harga.
- Double checkout.
- Double payment.
- Stok negatif.
- Refund.
- Concurrent transactions.
- Jurnal tidak seimbang.
- Unauthorized access.

I. DevOps & Operations

Dokumentasikan:

- Local development.
- Environment variables.
- Development environment.
- Staging environment.
- Production environment.
- Git branching.
- Commit conventions.
- Pull requests.
- CI/CD.
- Migration deployment.
- Rollback.
- Backup.
- Disaster recovery.
- Monitoring.
- Logging.
- Incident response.

Jangan menuliskan credential atau secret asli.

Gunakan placeholder untuk environment variables.

7. REQUIREMENT TRACEABILITY

Buat sistem keterlacakan yang menghubungkan:

README requirement
→ Feature ID
→ Business workflow
→ Module
→ Database table
→ API / Edge Function
→ UI page
→ Test case
→ Acceptance criteria.

Gunakan ID yang konsisten.

Contoh:

Requirement ID| Feature ID| Module| Database| API| Test
PET-REQ-001| PET-FTR-001| POS| sales, sale_items| checkout| PET-TST-001
PET-REQ-002| PET-FTR-002| Inventory| stock_movements| stock-adjustment| PET-TST-002

Contoh tersebut hanya ilustrasi. Isi dengan kebutuhan aktual dari README.md.

Tidak boleh ada fitur utama yang tidak memiliki hubungan dengan workflow, database, dan testing.

8. DOCUMENTATION QUALITY RULES

Semua dokumentasi wajib mengikuti ketentuan berikut:

1. Gunakan Bahasa Indonesia profesional dan teknis.
2. Pertahankan nama teknologi, istilah pemrograman, dan istilah standar dalam bahasa Inggris jika lebih tepat.
3. Gunakan Markdown yang konsisten.
4. Gunakan tabel untuk informasi terstruktur.
5. Gunakan Mermaid untuk diagram.
6. Gunakan code block untuk contoh SQL, TypeScript, JSON, dan konfigurasi.
7. Gunakan penomoran heading yang konsisten.
8. Gunakan istilah yang sama di seluruh dokumen.
9. Hindari pengulangan konten yang tidak perlu.
10. Gunakan internal links antar dokumen.
11. Jangan membuat spesifikasi yang saling bertentangan.
12. Hindari penjelasan yang terlalu umum.
13. Setiap rekomendasi harus memiliki alasan.
14. Setiap asumsi harus ditandai.
15. Setiap keputusan yang belum disepakati harus masuk ke open-decisions.md.

Dokumentasi harus menjelaskan bagaimana sistem seharusnya bekerja, bukan hanya menyebutkan nama teknologi.

9. DOCUMENTATION GOVERNANCE

Buat standar pengelolaan dokumentasi:

- Setiap dokumen memiliki tujuan dan ruang lingkup.
- Setiap dokumen memiliki status: Draft, In Review, Approved, atau Deprecated.
- Setiap dokumen memiliki pemilik atau penanggung jawab.
- Setiap perubahan signifikan dicatat.
- Perubahan arsitektur harus mempunyai ADR.
- Perubahan database harus memperbarui ERD dan data dictionary.
- Perubahan fitur harus memperbarui PRD, workflow, dan acceptance criteria.
- Perubahan permission harus memperbarui permission matrix dan RLS documentation.
- Perubahan API harus memperbarui API specification.
- Perubahan implementasi yang memengaruhi sistem harus memperbarui dokumen terkait.

Tambahkan metadata standar pada dokumen yang memerlukannya:

---
title: Document Title
document_id: PET-DOC-001
status: Draft
version: 1.0
owner: Engineering Team
last_updated: YYYY-MM-DD
related_documents: []
---

Jangan mengklaim dokumen sudah disetujui jika belum ada persetujuan pengguna.

10. EXECUTION STRATEGY

Lakukan pekerjaan secara sistematis dalam beberapa tahap.

PHASE 1 — Repository Discovery

1. Periksa struktur repository.
2. Baca README.md secara keseluruhan.
3. Identifikasi semua modul, fitur, aktor, proses bisnis, dan aturan.
4. Periksa source code jika tersedia.
5. Identifikasi teknologi aktual.
6. Catat konflik, kekurangan informasi, dan asumsi.
7. Buat analisis kebutuhan dokumentasi.

Jangan mulai menulis seluruh dokumen sebelum memahami README.md.

PHASE 2 — Product & Business Analysis

Buat:

- Project overview.
- Product vision.
- Scope.
- PRD.
- SRS.
- Feature catalog.
- Business rules.
- Role and permission matrix.
- Business workflows.
- Use cases.

Pastikan semua fitur README.md tercakup.

PHASE 3 — Architecture & Database Design

Buat:

- Architecture document.
- C4 diagrams.
- Module architecture.
- Data flow.
- Sequence diagrams.
- Database design.
- ERD.
- Data dictionary.
- RLS policies.
- API specifications.
- ADR.

Pastikan semua keputusan teknis konsisten dengan baseline stack.

PHASE 4 — Frontend, UI/UX & Security

Buat:

- Frontend architecture.
- Folder structure.
- Coding standards.
- Design guidelines.
- Design system.
- Information architecture.
- Page specifications.
- Security architecture.
- Threat model.

PHASE 5 — Testing, DevOps & Operations

Buat:

- Test strategy.
- Test scenarios.
- Regression checklist.
- CI/CD guide.
- Deployment guide.
- Rollback.
- Backup and recovery.
- Monitoring.
- Incident response.
- User and admin manuals.

PHASE 6 — Traceability & Validation

Periksa seluruh dokumentasi.

Validasi:

1. Semua fitur README.md sudah terdokumentasi.
2. Tidak ada modul utama yang tertinggal.
3. Semua workflow terhubung dengan modul terkait.
4. Semua modul mempunyai spesifikasi data.
5. Semua tabel penting memiliki rancangan permission.
6. Semua proses kritis memiliki aturan transaksi.
7. Semua fitur penting memiliki acceptance criteria.
8. Semua fitur penting memiliki test scenarios.
9. Semua dokumen memiliki internal links yang valid.
10. Tidak ada keputusan asumtif yang ditulis sebagai keputusan final.
11. Tidak ada kontradiksi antar dokumen.
12. Semua diagram Mermaid valid secara sintaks.

Buat "docs/README.md" sebagai documentation index.

Buat laporan akhir pada:

"docs/13-traceability/documentation-completeness-report.md"

Laporan harus mencakup:

- Daftar dokumen yang berhasil dibuat.
- Daftar requirement yang sudah terdokumentasi.
- Daftar requirement yang belum jelas.
- Daftar asumsi.
- Daftar open decisions.
- Daftar risiko arsitektur.
- Daftar rekomendasi.
- Hasil validasi internal link.
- Hasil validasi diagram.
- Status kelengkapan dokumentasi.

11. EXECUTION RULES

- Kerjakan langsung pada repository.
- Buat semua direktori dan file dokumentasi yang diperlukan.
- Jangan hanya menampilkan contoh dokumen di chat.
- Jangan hanya memberikan outline.
- Isi setiap dokumen secara substansial.
- Jangan mengubah README.md.
- Jangan mengubah source code aplikasi.
- Jangan menghapus file yang sudah ada.
- Jangan menimpa dokumentasi lama tanpa memeriksanya terlebih dahulu.
- Pertahankan informasi penting dari dokumentasi yang sudah tersedia.
- Jangan membuat migration SQL atau mengubah database aktual.
- SQL yang dibuat dalam dokumentasi hanya berupa contoh atau rancangan, kecuali pengguna secara terpisah meminta implementasi.
- Jika konteks atau batas waktu terbatas, lanjutkan pekerjaan secara bertahap dan prioritaskan konsistensi daripada membuat banyak dokumen kosong.
- Jangan mengklaim validasi berhasil jika belum benar-benar dijalankan.

Jika pekerjaan terlalu besar untuk satu sesi, selesaikan per fase, simpan progres, dan lanjutkan dari dokumen terakhir yang belum selesai. Jangan mengulang pekerjaan yang telah selesai.

12. FINAL DELIVERABLE

Hasil akhir harus berupa dokumentasi lengkap di dalam direktori "docs/".

Pastikan tersedia:

1. Documentation index.
2. Product and business specifications.
3. Complete feature catalog.
4. Business workflows.
5. Software architecture.
6. Architecture diagrams.
7. Database design and ERD.
8. Data dictionary.
9. RLS and security specifications.
10. Backend specifications.
11. Frontend specifications.
12. UI/UX specifications.
13. Testing documentation.
14. DevOps and deployment documentation.
15. Operational manuals.
16. Engineering handbook.
17. Requirements traceability matrix.
18. Open decisions register.
19. Documentation completeness report.

Pada akhir pekerjaan, tampilkan ringkasan:

- Jumlah dokumen yang dibuat.
- Jumlah modul PETORA yang berhasil dianalisis.
- Bagian yang telah lengkap.
- Bagian yang membutuhkan keputusan pengguna.
- Temuan penting terkait arsitektur.
- Risiko teknis yang harus diperhatikan.
- Lokasi direktori dokumentasi.

13. FINAL INSTRUCTION

Mulai dengan membaca "README.md" secara menyeluruh.

Jangan meminta pengguna mengirim ulang deskripsi PETORA.

Lakukan analisis terlebih dahulu, kemudian hasilkan seluruh dokumentasi berdasarkan kebutuhan nyata PETORA.

Prioritaskan akurasi, konsistensi, kelengkapan, keamanan, keterlacakan, dan kemudahan pemeliharaan.

Dokumentasi ini akan menjadi SINGLE SOURCE OF TRUTH untuk seluruh aktivitas pengembangan PETORA.

Mulai sekarang dari PHASE 1 — REPOSITORY DISCOVERY.
