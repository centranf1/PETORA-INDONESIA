---
title: Documentation Guide
document_id: PET-DOC-0005
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['project-overview.md']
---

# Documentation Guide

Panduan ini mengatur bagaimana dokumen disusun, diperbarui, disetujui, dan divalidasi. Panduan ini berlaku bagi penulis manusia, AI assistant, dan automation.

## Authority and Status

- Root `README.md` adalah baseline ruang lingkup produk PETORA.
- Dokumen di `docs/` merinci requirement dan kontrak teknis; dokumen Draft belum menjadi persetujuan stakeholder.
- `AGENTS.md` menetapkan prosedur AI/agent untuk membaca dan mematuhi dokumentasi.
- `open-decisions.md` adalah register terpusat untuk keputusan yang belum disetujui.
- Jika ada konflik, tandai konflik dan pemilik keputusan; jangan memilih diam-diam aturan yang berdampak pada uang, stok, klinik, privasi, akses, pajak, atau retensi.

## Document Status

Setiap dokumen memerlukan metadata dan salah satu status: Draft, In Review, Approved, atau Deprecated. Gunakan Approved hanya setelah ada persetujuan pihak yang berwenang dan bukti persetujuan yang dapat ditelusuri.

Metadata standar: `title`, `document_id` unik, `status`, `version`, `owner`, `last_updated`, dan `related_documents`. ID yang sudah terbit tidak boleh digunakan ulang.

## Required Structure

Dokumen harus memuat tujuan, ruang lingkup, istilah/asumsi penting, spesifikasi atau prosedur, workflow/exception, permission dan security, dependencies, acceptance/verification criteria, open decisions, serta related documents sesuai relevansi. Hindari heading kosong dan pernyataan umum yang tidak dapat diverifikasi.

Untuk requirement, gunakan ID stabil dan rumusan yang dapat diuji: aktor/kondisi, tindakan sistem, hasil yang diharapkan, exception, dan prioritas. Untuk prosedur operasi, nyatakan prasyarat, langkah, hasil sukses/gagal, bukti audit, dan eskalasi.

## Change Governance

Perubahan fitur harus memperbarui PRD/SRS, feature catalog/backlog, workflow/use case, acceptance criteria, dan test mapping. Perubahan permission harus memperbarui user roles, permission matrix, authentication/authorization, RLS, security tests, dan traceability. Perubahan data harus memperbarui schema, data dictionary, migration, retention, dan module mapping. Perubahan API harus memperbarui API specification, edge-function/backend docs, error contract, tests, dan UI consumer bila terdampak.

Perubahan arsitektur material harus memiliki ADR dengan konteks, opsi, keputusan, konsekuensi, dan status. Perubahan operasional harus memperbarui runbook, monitoring, backup/rollback, serta manual yang relevan.

## Traceability Rule

Setiap requirement yang dapat diimplementasikan harus terhubung dengan feature ID, workflow, role/permission, module, data entity, API/function, UI bila ada, acceptance criteria, dan test case. Jika suatu kolom belum diketahui, tulis `TBD` dan buat open decision atau gap; jangan mengisinya dengan nama rekaan.

## Quality Rule

Dokumen tetap Draft jika belum disetujui stakeholder. Bedakan fakta README, keputusan yang disetujui, rekomendasi, contoh, dan TBD. Jangan mengklaim sistem telah mengimplementasikan spesifikasi hanya karena dokumentasinya ada.

## Validation Checklist

- Metadata lengkap dan ID unik.
- Relative links valid dan related documents ada.
- Requirement IDs, feature IDs, table names, endpoint names, and test IDs konsisten lintas dokumen.
- Tidak ada kebijakan Draft yang ditulis seolah final.
- Acceptance criteria dapat diuji dan traceability mengarah ke test.
- Mermaid, SQL, JSON, dan contoh kontrak diberi label bila berupa ilustrasi yang belum diverifikasi.
- Completeness report mencatat gap, keputusan, bukti validasi, serta batas audit; jangan menyebut baseline lengkap tanpa bukti.

