# 19 — User Manual dan SOP

**Status:** Panduan operasional rancangan untuk sistem yang belum tersedia. Label/menu aktual dapat berbeda setelah implementasi.

## 1. Super Admin

### Menyiapkan akses dan cabang

1. Login dengan akun privileged dan verifikasi branch/identity context.
2. Buka **Pengguna & Akses > Roles**; buat custom role dengan nama, tujuan dan status.
3. Pilih hanya module/action yang dibutuhkan; tetapkan branch/data scope. Review permission sebelum menyimpan.
4. Jangan menghapus protected role atau memberikan hak di luar delegation.
5. Buka **Organization > Branches**; isi kode, alamat, kontak, jam/hari libur, gudang dan layanan. Pastikan konfigurasi cabang benar sebelum diaktifkan.
6. Assign pengguna/employee ke cabang dan role. Uji dengan akun role terbatas, bukan akun Super Admin.

### Konfigurasi integrasi

1. Pilih connector yang sudah terdaftar/didukung backend.
2. Isi credential melalui form resmi, bukan source code atau chat.
3. Simpan; cek bahwa UI hanya menampilkan status “credential configured”, bukan nilai rahasia.
4. Jalankan test connection; bila gagal, periksa error yang sudah disanitasi dan log backend berizin.
5. Enable hanya setelah koneksi/sandbox diuji; monitor health dan lakukan rotation sesuai provider.
6. Provider/protokol baru memerlukan implementasi adapter; konfigurasi UI saja tidak menambah dukungan teknis.

## 2. Admin dan staf operasional

### POS

1. Pastikan konteks cabang benar dan buka shift kasir dengan saldo awal.
2. Cari item memakai barcode/SKU/nama, periksa varian, harga dan jumlah.
3. Tambahkan layanan bila perlu; verifikasi pet/booking dan jumlah.
4. Tinjau diskon/promo yang tertera; minta approval bila diminta sistem.
5. Submit order sekali. Untuk status pembayaran pending, periksa order sebelum mencoba ulang.
6. Terima pembayaran; untuk pembayaran parsial berikan informasi sisa tagihan.
7. Cetak/kirim receipt sesuai kebijakan. Tutup shift dan rekonsiliasi cash; laporkan selisih, jangan mengubah saldo tanpa movement.

### Inventory dan pembelian

1. Baca stock card dan batch/expiry sebelum membuat adjustment.
2. Buat adjustment dengan kuantitas, alasan, referensi opname dan attachment jika diperlukan; tunggu approval.
3. Buat PO berdasarkan supplier dan kebutuhan; submit untuk approval.
4. Saat barang tiba, cocokkan PO, kuantitas fisik, kualitas, batch dan expiry; catat penerimaan aktual.
5. Penerimaan parsial dicatat apa adanya; selisih/invoice mismatch dilaporkan, bukan dimanipulasi.
6. Untuk transfer, pilih cabang asal/tujuan; catat dispatch dan konfirmasi penerimaan tujuan. Jangan menandai transfer selesai sebelum hitung fisik.

### Customer service, membership, dan laporan

1. Cari customer dan pet sebelum membuat booking atau order; periksa consent untuk owner tambahan.
2. Terangkan harga, slot, syarat deposit, voucher dan batas promo yang berlaku; jangan menjanjikan kombinasi promo yang tidak tampil di sistem.
3. Enrollment membership dicatat dengan masa berlaku dan bukti pembayaran/eligibility; poin hanya dikreditkan melalui transaksi yang memenuhi aturan.
4. Untuk laporan, tentukan periode dan cabang sebelum ekspor; periksa cakupan data, status transaksi dan filter. Jangan mengekspor data yang tidak diperlukan atau membagikan file ke kanal publik.

### Staff, attendance, finance, dan approval

1. Admin/HR memelihara data kerja, cabang, jadwal dan akun sesuai permission; perubahan role tidak dilakukan di luar workflow akses.
2. Catat attendance atau koreksi dengan alasan dan approval sesuai kebijakan; hindari mengubah histori langsung.
3. Finance mencocokkan order/payment/refund, kas, expense dan supplier invoice menggunakan reference asal.
4. Pengajuan expense, refund, PO atau transfer harus memiliki lampiran/alasan yang disyaratkan dan approver terpisah bila diwajibkan.
5. Jurnal yang telah diposting tidak dihapus; ikuti prosedur correction/reversal dan simpan bukti rekonsiliasi.
6. Komisi diperiksa terhadap rule version dan transaksi sumber; payroll penuh tidak dijalankan sebelum scope/policy disahkan.

### Customer, pet dan layanan

1. Cari customer sebelum membuat data baru untuk mencegah duplikasi.
2. Verifikasi pemilik/consent sebelum mengubah pet ownership.
3. Booking harus memakai pet, cabang, slot dan layanan yang tepat; sistem perlu mengonfirmasi kapasitas.
4. Groomer mencatat kondisi awal, instruksi dan checklist; lakukan QC sebelum completion.
5. Hotel/daycare staff menyelesaikan care task pada waktu yang sesuai dan membuat catatan exception.
6. Driver hanya mengubah trip yang ditugaskan; catat pickup/delivery proof sesuai policy.

## 3. Dokter

1. Buka clinical queue dan pilih appointment/pasien yang berhak diakses.
2. Verifikasi identitas pet dan owner; tinjau alergi/riwayat yang relevan.
3. Catat anamnesis, pemeriksaan, vital, assessment/diagnosis dan plan pada encounter.
4. Dapatkan consent sebelum tindakan yang memerlukan persetujuan.
5. Buat resep dengan dosis, unit, rute, frekuensi dan durasi yang lengkap; review sebelum sign.
6. Setelah sign, jangan mengubah catatan lama tanpa jejak; gunakan prosedur addendum/correction.
7. Buat kontrol lanjutan bila diperlukan. Jangan membagikan rekam medis di luar policy.

## 4. Customer

1. Login atau registrasi melalui portal browser dan lengkapi kontak.
2. Tambahkan pet dengan informasi dan kondisi yang akurat; kelola owner tambahan dengan persetujuan.
3. Pilih layanan, cabang dan waktu; baca syarat booking/deposit sebelum konfirmasi.
4. Pantau status booking/order dan pembayaran di portal; bila status belum terkonfirmasi, jangan mengulang pembayaran tanpa memeriksa histori.
5. Riwayat medis yang terlihat dibatasi kebijakan akses; hubungi cabang bila ada koreksi.
6. Perbarui preferensi notifikasi dan informasi profil; gunakan kanal dukungan untuk sengketa/refund.

## 5. Umum: masalah dan eskalasi

- Akses ditolak: jangan mencoba akun/branch lain; minta administrator meninjau assignment.
- Booking penuh/stok habis: pilih alternatif atau minta staf memeriksa status.
- Payment/provider timeout: simpan request/reference, periksa status dan hubungi finance; jangan menandai manual sebagai lunas.
- Kesalahan transaksi: ikuti prosedur cancel/return/refund berizin; tidak menghapus transaksi.
- Insiden kehilangan perangkat, credential atau data: hentikan penggunaan akun, laporkan ke administrator/security contact yang akan ditetapkan.

Kontak dukungan, jam layanan, SLA, refund policy dan nama menu aktual TBD sebelum SOP dipakai sebagai prosedur resmi.
