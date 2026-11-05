# 16 — Test Plan dan Test Case

**Status:** Rencana dan acceptance scenarios. Belum ada source code/test runner sehingga actual result belum diisi.

## 1. Strategi

- **Unit:** domain rule, status transitions, price calculation, permission evaluator, capacity/stock logic.
- **Integration:** database constraints/transactions, payment adapter, webhook, storage and queue.
- **API:** schema, auth, role/branch negative cases, idempotency, validation and error contract.
- **UI:** form states, responsive, keyboard/accessibility, role-based navigation and no false success.
- **E2E:** POS-to-stock/payment, PO-to-receiving, booking-to-service, medical-to-dispensing, finance reconciliation.
- **Security:** IDOR/cross-branch, privilege escalation, injection/XSS/CSRF, rate limits, file/webhook/secret handling.
- **Performance:** load and concurrency on realistic branch, data and payment/booking peaks; thresholds TBD.
- **UAT/regression:** representative Super Admin, Admin, Doctor, Customer and staff; rerun critical flows each release.

## 2. Test data and environment

Use synthetic accounts/data across Branch A/B, protected role and least-privilege custom roles; customers A/B; pet with owner/second owner consent; expiring/non-expiring stock batches; slot at full capacity; payments paid/partial/pending/failed; medical record with restricted access. Never put real credential or production PII in test artifacts. Reset environment using approved fixtures.

## 3. Detailed test cases

### TC-AUTH-001 — Valid/invalid authentication

- **Requirement:** SYS-FR-001, FRD-AUTH-001
- **Preconditions:** Active and inactive accounts seeded; auth service available.
- **Steps/data:** Login active account with valid credentials; logout; retry invalid password; attempt inactive account.
- **Expected:** Active login grants only own permissions; logout revokes session; invalid/inactive responses do not disclose account existence; attempts rate-limited/audited without password.
- **Actual:** Not run.
- **Status:** Not run.

### TC-RBAC-001 — Protected role guard

- **Requirement:** SYS-FR-002, FRD-RBAC-001
- **Preconditions:** Protected roles and custom role exist.
- **Steps/data:** As delegated Admin call delete on `SUPER_ADMIN`; repeat for custom role with active assignments.
- **Expected:** Protected role deletion rejected; assigned custom role cannot be deleted until policy-required reassignment; no data mutation; audit outcome present.
- **Actual:** Not run.
- **Status:** Not run.

### TC-RBAC-002 — Permission delegation

- **Requirement:** SYS-FR-003–004
- **Preconditions:** Admin has limited delegated permission; second user is Admin.
- **Steps/data:** Attempt to grant `integrations.configure` not in delegation; attempt self-grant and branch escalation.
- **Expected:** Backend rejects all prohibited changes regardless UI; valid assignment stays scoped; audit records denial/change.
- **Actual:** Not run.
- **Status:** Not run.

### TC-SCOPE-001 — Cross-branch API/report isolation

- **Requirement:** SYS-FR-004, SYS-FR-028
- **Preconditions:** User assigned Branch A only; transaction/report data exists in A and B.
- **Steps/data:** Request B order by ID; submit create/update with `branch_id=B`; query report with branch B and export.
- **Expected:** No B data or mutation; response safely denied/not-found; report/export obey same scope.
- **Actual:** Not run.
- **Status:** Not run.

### TC-PRIVACY-001 — Customer ownership and pet consent

- **Requirement:** SYS-FR-007, SYS-FR-029
- **Preconditions:** Customer A and B each own pets; one pet has secondary owner with active/revoked consent.
- **Steps/data:** Customer A requests B profile/pet/medical/order by ID; secondary owner accesses pet before and after consent revocation.
- **Expected:** Cross-customer request denied; active consent grants only allowed pet data; revoked consent removes access; medical fields still follow separate policy.
- **Actual:** Not run.
- **Status:** Not run.

### TC-POS-001 — Mixed cart and partial payment

- **Requirement:** SYS-FR-009–010
- **Preconditions:** Active product and service, stock available, cash session open, price configuration approved.
- **Steps/data:** Create mixed order; pay partial then remaining amount; repeat first request using same idempotency key.
- **Expected:** Server-derived totals and snapshots; payment allocations sum to order balance; duplicate request returns same result; stock movement once for product.
- **Actual:** Not run.
- **Status:** Not run.

### TC-PAY-001 — Payment callback integrity

- **Requirement:** SYS-FR-010–011
- **Preconditions:** Provider sandbox adapter configured.
- **Steps/data:** Send unsigned webhook, then valid callback twice, then callback for unknown payment.
- **Expected:** Unsigned/unknown event cannot settle; valid event settles once; duplicate deduplicated; reconciliation can identify discrepancy; no secret in logs.
- **Actual:** Not run.
- **Status:** Not run.

### TC-REFUND-001 — Approved refund

- **Requirement:** SYS-FR-011
- **Preconditions:** Settled order/payment, refund permission and approval threshold configured.
- **Steps/data:** Request refund over remaining refundable value; request valid amount; attempt without approval.
- **Expected:** Over-refund and unauthorized request rejected; valid approved refund links original payment, audit, receipt/ledger and stock disposition as policy defines.
- **Actual:** Not run.
- **Status:** Not run.

### TC-STOCK-001 — Stock movement ledger

- **Requirement:** SYS-FR-013–014
- **Preconditions:** Warehouse/batch and opening balance established through approved opening movement.
- **Steps/data:** Receive stock, sell one unit, return eligible unit, attempt direct balance edit/API forgery.
- **Expected:** Each approved operation adds a unique movement; balance projection reconciles; direct mutation rejected; reason and actor traceable.
- **Actual:** Not run.
- **Status:** Not run.

### TC-TRANSFER-001 — Inter-branch transfer

- **Requirement:** SYS-FR-014
- **Preconditions:** Branch A stock available; user can request but not approve.
- **Steps/data:** Create transfer A→B; approve as authorized user; ship; receive partial quantity; retry receipt.
- **Expected:** Segregation enforced; origin/destination ledger entries trace transfer; partial discrepancy visible; retry does not duplicate stock.
- **Actual:** Not run.
- **Status:** Not run.

### TC-PO-001 — Partial goods receiving

- **Requirement:** SYS-FR-015
- **Preconditions:** Approved PO with multiple items.
- **Steps/data:** Receive fewer units than ordered with batch/expiry; then receive remainder; submit duplicate receipt.
- **Expected:** PO state partial then received; movement recorded per receipt/batch; duplicate idempotent; invoice discrepancy exception visible.
- **Actual:** Not run.
- **Status:** Not run.

### TC-CAPACITY-001 — Concurrent hotel/daycare capacity

- **Requirement:** SYS-FR-016,018
- **Preconditions:** One remaining capacity slot for overlapping interval.
- **Steps/data:** Submit two concurrent booking commands for different customers/pets.
- **Expected:** Exactly one reservation succeeds; other gets `CAPACITY_EXCEEDED` or conflict and safe alternatives; capacity is never negative.
- **Actual:** Not run.
- **Status:** Not run.

### TC-GROOM-001 — Grooming workflow

- **Requirement:** SYS-FR-017
- **Preconditions:** Confirmed booking and assigned groomer.
- **Steps/data:** Check-in with condition notes, start session, complete checklist, submit QC, complete, attempt out-of-order status as unassigned user.
- **Expected:** Valid transitions and actor assignment enforced; photos/private notes scoped; premature completion rejected; audit complete.
- **Actual:** Not run.
- **Status:** Not run.

### TC-MEDICAL-001 — Medical history and correction

- **Requirement:** SYS-FR-020–021
- **Preconditions:** Authorized doctor and appointment.
- **Steps/data:** Create and sign encounter; attempt direct overwrite/delete; add correction/addendum.
- **Expected:** Actor/time/version recorded; signed record immutable via ordinary edit; addendum preserves prior content and author.
- **Actual:** Not run.
- **Status:** Not run.

### TC-PHARMACY-001 — Prescription batch dispensing

- **Requirement:** SYS-FR-022
- **Preconditions:** Valid signed prescription; medicine batches include expired and valid stock.
- **Steps/data:** Dispense requested quantity; attempt expired batch and duplicate dispense.
- **Expected:** Expired batch rejected; valid batch movement and patient use history created atomically; duplicate does not dispense twice.
- **Actual:** Not run.
- **Status:** Not run.

### TC-INTEGRATION-001 — Secret-safe configuration

- **Requirement:** SYS-FR-031
- **Preconditions:** Supported adapter and Super Admin access.
- **Steps/data:** Save secret; GET config; inspect browser response/log/test error; disable and rotate secret.
- **Expected:** Secret write-only and encrypted server-side; no value in API read/browser storage/log; rotation and disable audited.
- **Actual:** Not run.
- **Status:** Not run.

### TC-INTEGRATION-002 — Core behavior without provider

- **Requirement:** SYS-FR-030–031
- **Preconditions:** Payment/email connector disabled.
- **Steps/data:** Use internal booking/stock/notification; attempt external payment path.
- **Expected:** Core internal workflows remain available; provider-only action returns explicit unavailable/pending state, not false success; in-app notifications function.
- **Actual:** Not run.
- **Status:** Not run.

### TC-AUDIT-001 — Sensitive operation audit

- **Requirement:** SYS-FR-032
- **Preconditions:** Audit viewer and actor available.
- **Steps/data:** Change permission, approve refund, open medical record, export report.
- **Expected:** Actor, action, target, time, branch, outcome and correlation present; log excludes credentials and unnecessary medical payload; access to audit itself scoped.
- **Actual:** Not run.
- **Status:** Not run.

### TC-REPORT-001 — Reconciliation and report scope

- **Requirement:** SYS-FR-025–028
- **Preconditions:** Known orders, refunds, stock and finance records in two branches.
- **Steps/data:** Generate branch and consolidated report; reconcile totals against authorized ledgers.
- **Expected:** Definitions/filter/timezone agreed; values reconcile; branch-limited user cannot export other branch.
- **Actual:** Not run.
- **Status:** Not run.

### TC-FILE-001 — File access control

- **Requirement:** SYS-FR-035
- **Preconditions:** Valid and unauthorized users; safe and disallowed file fixtures.
- **Steps/data:** Upload permitted image; upload disguised executable/oversized file; request attachment URL from unrelated user.
- **Expected:** Allowed file stored privately; unsafe file rejected; unrelated user cannot download; audit and error are explicit.
- **Actual:** Not run.
- **Status:** Not run.

## 4. Release exit criteria

All relevant tests pass in CI/staging; no critical/high security issue unresolved; business owner approves financial/medical policies; performance and availability thresholds set then met; backup restore and migration rehearsed; actual results, build ID, environment and evidence linked. “Not run” is not a pass.
