# Audit Repositori PETORA

**Tanggal audit:** 2026-11-05  
**Cakupan:** repository pada audit awal 2026-11-05; pembenahan struktur dan perubahan instruksi agen berikutnya dicatat pada bagian akhir.

## Ringkasan

Repositori merupakan repositori dokumentasi awal, bukan aplikasi yang dapat dijalankan. File tracked yang ditemukan hanya `AGENT.md` dan `documentation/SRS.md`. Tidak ada source code, dependency manifest, database migration/schema, API definition, test suite, deployment manifest, atau konfigurasi CI/CD yang dapat diverifikasi. Tidak ada stack teknologi implementasi yang dapat dinyatakan sebagai fakta.

## Inventaris pada audit awal

| Area | Bukti yang ditemukan | Kesimpulan |
|---|---|---|
| Instruksi produk | `AGENT.md` versi awal | Memuat master prompt untuk menyusun dokumentasi PETORA; kemudian diganti menjadi panduan agen pengembangan full-stack. |
| Spesifikasi sebelumnya | `documentation/SRS.md` (2.103 baris) | Spesifikasi PETORA yang kaya fitur; berisi visi, model single-business/multi-branch, role, modul, aturan, rancangan database tingkat entitas, UI/UX, security, NFR, acceptance criteria, dan roadmap. |
| Source aplikasi | Tidak ada | Tidak dapat mengaudit perilaku aktual, framework, endpoint, maupun implementasi modul. |
| Database aktual | Tidak ada | Daftar tabel di SRS adalah rancangan, bukan skema yang telah diterapkan. |
| Tests / CI | Tidak ada | Tidak ada validasi otomatis proyek yang dapat dijalankan. |
| Deployment / integrations | Tidak ada | Tidak ada bukti connector/provider atau lingkungan deployment yang aktif. |
| Riwayat repository | Commit terbaru `a9ec4c6` (“Create complete documentation for PETORA project”) | Riwayat yang terlihat berisi penambahan/perubahan dokumentasi, bukan implementasi aplikasi. |

## Temuan spesifikasi

Spesifikasi sumber menetapkan web responsif (bukan native), satu entitas bisnis dengan database terpusat dan cabang, empat role bawaan terlindungi (`Super Admin`, `Admin`, `Dokter`, `Customer`), custom RBAC dinamis, layanan inti native, serta integrasi eksternal melalui connector/adapter. Spesifikasi juga mencakup POS, inventaris, procurement, pet care, veterinary, pharmacy, HR, finance, customer portal, reporting, dan audit.

Spesifikasi lama memberi daftar entitas serta aturan penting (contoh: transaksi bercabang, stock movement wajib, pembayaran bertahap, reservasi hotel memeriksa kapasitas, rekam medis punya histori). Namun tidak menetapkan DBMS, framework, skema kolom lengkap, pajak, kebijakan akuntansi, retensi, target RPO/RTO, provider, atau ambang beban terukur. Hal tersebut tidak diperlakukan sebagai fakta.

## Konflik dan batasan

1. Instruksi meminta dokumentasi berbasis kondisi proyek, sedangkan proyek belum memiliki implementasi. Paket ini karena itu memisahkan kebutuhan dari rekomendasi arsitektur dan tidak menyebut fitur sebagai “sudah tersedia”.
2. SRS sumber menyebutkan beberapa kebijakan secara garis besar, tetapi belum mendefinisikan detail persetujuan, pajak, refund, promosi bertumpuk, pembulatan, dan akuntansi. Detail transaksi yang berdampak finansial ditandai perlu persetujuan.
3. SRS menyebut mata uang rupiah dan zona waktu `Asia/Jakarta`; perlakuan pajak, aturan legal, serta apakah semua cabang menggunakan zona waktu yang sama belum dikonfirmasi.
4. Ada instruksi struktur dokumen yang sedikit tidak konsisten terkait lokasi file nomor 23–24; paket ini menempatkannya di `00-DOCUMENT-CONTROL/` seperti struktur yang diminta.

## Rekomendasi tindak lanjut

1. Pemilik bisnis menyetujui keputusan pada [log keputusan](./00-DOCUMENT-CONTROL/23-DECISION-LOG-ASSUMPTIONS.md), terutama kebijakan finansial/medis dan aturan cabang.
2. Tetapkan stack dan lingkungan melalui keputusan arsitektur sebelum implementasi.
3. Validasi model transaksi, persediaan, dan rekam medis bersama pemangku kepentingan domain.
4. Setelah kode tersedia, lakukan audit ulang dan sinkronkan dokumentasi terhadap schema, endpoint, role policy, serta test aktual.

## Pelestarian dokumen sebelumnya

SRS asli yang ditemukan pada `documentation/SRS.md` dipindahkan utuh ke [`00-DOCUMENT-CONTROL/SOURCES/SRS-ORIGINAL.md`](./00-DOCUMENT-CONTROL/SOURCES/SRS-ORIGINAL.md). Isinya tidak ditimpa; lokasi arsip memberi satu tempat kanonis untuk seluruh dokumen. Paket baru menguraikan kebutuhan terkait dan membedakan spesifikasi dari implementasi. Perubahan struktur ini dicatat pada riwayat versi.

## Pembenahan struktur

Pada 2026-11-05, dokumen sumber yang sebelumnya terpisah di root `documentation/` dikonsolidasikan ke `PETORA-DOCUMENTATION/00-DOCUMENT-CONTROL/SOURCES/`. Root repository kini menyediakan `README.md` sebagai pintu masuk, sementara seluruh materi dokumentasi berada di bawah satu folder paket dengan indeks. Tidak ada source aplikasi yang dipindahkan atau dihapus.

## Pembaruan instruksi agen

Pada 2026-11-05, `AGENT.md` dirombak dari prompt generator dokumentasi menjadi panduan full-stack engineering. Instruksi baru mengarahkan agen untuk mengaudit kondisi aktual, mengembangkan aplikasi PETORA secara bertahap dari foundation sampai fitur dan kesiapan deployment, menguji setiap perubahan, menjaga keamanan/RBAC/multi-cabang, serta tidak mengklaim deployment tanpa bukti. `AGENT.md` kini mengarahkan dokumen bisnis/teknis ke paket dokumentasi; ia bukan lagi spesifikasi produk.
