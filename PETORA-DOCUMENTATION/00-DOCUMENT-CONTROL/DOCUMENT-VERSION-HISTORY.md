# Riwayat Versi Dokumen

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 1.0 | 2026-11-05 | Paket dokumentasi disusun dari prompt `AGENT.md` versi awal dan spesifikasi `documentation/SRS.md`; hasil audit menyatakan belum ada implementasi yang dapat diverifikasi. | Draft untuk review pemangku kepentingan |
| 1.1 | 2026-11-05 | Struktur dirapikan: SRS asli dipindahkan utuh ke `00-DOCUMENT-CONTROL/SOURCES/`, seluruh dokumentasi dikonsolidasikan di `PETORA-DOCUMENTATION/`, dan root `README.md` ditambahkan sebagai pintu masuk. | Draft untuk review pemangku kepentingan |
| 1.2 | 2026-11-05 | `AGENT.md` diubah menjadi panduan agen full-stack untuk mengembangkan dan menyiapkan PETORA sampai deployment readiness; dokumentasi diperbarui agar instruksi agen tidak dianggap sumber requirement bisnis. | Draft untuk review pemangku kepentingan |
| 1.3 | 2026-11-05 | Aturan agen diperjelas agar setiap perubahan membandingkan requirement yang disetujui dengan perilaku implementasi, menyelesaikan mismatch secara eksplisit, memperbarui dokumen/RTM terkait, dan melaporkan validasi serta konflik tersisa. | Draft untuk review pemangku kepentingan |

## Catatan versi

- Dokumen sumber asli dipertahankan tanpa perubahan di `00-DOCUMENT-CONTROL/SOURCES/SRS-ORIGINAL.md`.
- `AGENT.md` berisi instruksi engineering; requirement bisnis bersumber dari dokumen requirement dan keputusan yang disetujui.
- Pernyataan mengenai desain, alur API, skema database, keamanan, dan operasi dalam paket baru berstatus kebutuhan atau usulan, bukan bukti produk telah diimplementasikan.
- Setiap perubahan bisnis yang telah disetujui harus menambah entri, ID keputusan, dan tanggal efektif.
