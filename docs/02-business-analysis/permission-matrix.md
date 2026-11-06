---
title: Permission Matrix
document_id: PET-DOC-0205
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['user-roles.md']
---

# Permission Matrix

Matriks akses menghubungkan peran dengan modul dan tingkat izin.

## Draft Role Baseline

Matriks berikut adalah default least-privilege untuk perencanaan, bukan persetujuan final. Permission harus diberikan per action dan scope; penugasan aktual organisasi dapat mempersempit hak. Cross-organization Super Admin scope dan detail akses clinical/customer masih perlu keputusan owner.

| Role | Default scope | Allowed baseline | Explicitly restricted / needs separate grant |
| --- | --- | --- | --- |
| Super Admin | Organization yang ditugaskan; cabang dalam organization tersebut | Mengelola user/role dan konfigurasi, membaca audit, mengusulkan perubahan | Tidak melewati RLS, approval, lock, atau audit; cross-organization/global scope TBD |
| Owner | Seluruh cabang organization | Dashboard konsolidasi, review/approval, akses business data sesuai kebutuhan | Tidak mengubah histori final langsung; separation of duties untuk high-risk disarankan |
| Branch Manager | Assigned branch | Operasional cabang, staf, stock review, booking/approval yang didelegasikan | Tidak melihat/mengubah branch lain tanpa assignment; approval limits TBD |
| Administrator | Assigned branch atau assigned records | Data master dan administrasi operasional | Tidak otomatis memiliki akses refund, payroll, medical full record, permission, atau system settings |
| Cashier | Assigned branch dan shift | POS, menerima pembayaran, receipt, close shift | Refund/void, price override, discount override, cash adjustment perlu permission terpisah |
| Inventory Staff | Assigned warehouse/branch | Receiving, transfer request, stock count, ledger view | Stock adjustment approval, write-off, dan perubahan policy perlu approver terpisah |
| Purchasing Staff | Assigned organization/branch | Supplier, purchase request, PO draft, receiving reconciliation | PO approval, supplier payment, dan vendor master high-risk perlu grant/approval |
| Groomer / Service Staff | Assigned appointments/visits | Melihat service brief dan mencatat pelaksanaan/kondisi hewan | Tidak mendapat akses rekam medis penuh atau payroll secara default |
| Veterinarian | Assigned clinical branch/visit | Triage, examination, diagnosis, treatment, prescription, clinical record revision workflow | Tidak menghapus rekam final; payroll, finance, dan policy admin tidak termasuk |
| Pharmacist | Assigned pharmacy branch | Melihat resep yang diperlukan, memvalidasi dan mendispense obat, mengelola pharmacy stock | Tidak membuat/mengubah diagnosis atau resep dokter |
| Customer Service | Assigned customer/branch | Customer contact, booking, complaint, permitted service status | Rekam medis detail, payment credentials, dan payroll tidak termasuk |
| HR / Payroll Staff | Assigned organization/branch and HR records | Employee, attendance, payroll preparation and review | Payroll approval/payment dipisahkan jika kebijakan mengharuskan; tidak mengakses clinical records |
| Finance / Accounting Staff | Assigned organization/branch and finance records | Payment reconciliation, cash/bank, journal preparation, reports | Final journal close, supplier payout, refund, payroll payment mengikuti approval matrix |
| Customer | Own account, owned pets, explicitly shared records | Profil sendiri, booking/transaksi sendiri, permitted medical summary | Tidak boleh mengakses customer/pet milik pengguna lain atau internal notes |

## Access Model

Permission diwujudkan dengan action-based permission: view, create, update, delete, approve, authorize, export, reconcile. Scope model: own, branch, all, assigned_records.

Permission key sebaiknya mencakup domain, resource, action, dan scope. Contoh konseptual: `inventory.stock_adjustment.approve` pada scope `branch`; format final harus diseragamkan pada authorization contract. `delete` bukan default action untuk financial, clinical, ledger, dan audit entities.

## Approval Controls

| Activity | Initiator | Required control |
| --- | --- | --- |
| Refund / void | Cashier or service staff | Elevated permission, reason, transaction-state check, audit; threshold and approver TBD |
| Price / discount override | Authorized sales or catalog role | Policy limit, reason, snapshot on sale; approval threshold TBD |
| Stock adjustment / write-off | Inventory staff | Reason code, evidence, approval based on tolerance/value; no direct balance edit |
| Purchase order / supplier payment | Purchasing / Finance | Separate prepare and approve actions; amount thresholds TBD |
| Payroll close / payment | HR / Finance | Restricted records, reviewer/approver separation as approved |
| Journal close / correction | Accounting | Balanced entries, period checks, reversal/correction trail |
| Critical system setting | Super Admin proposer | Validated draft, approval, optimistic version check, audit and active-version verification |

Approval limits, eligible approver roles, and self-approval exceptions remain open decisions; do not infer amounts or legal requirements.

## Security Note

Scope harus divalidasi di server dan database. Tidak menerima organization_id atau branch_id dari browser tanpa verifikasi.

## Related Documents

- [User Roles](user-roles.md)
- [Authentication and Authorization](../05-backend/authentication-authorization.md)
- [RLS Security Policies](../04-database/rls-security-policies.md)
- [Open Decisions](../13-traceability/open-decisions.md)

