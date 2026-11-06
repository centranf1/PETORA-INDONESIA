---
title: User Acceptance Testing
document_id: PET-DOC-0910
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-plan.md']
---

# User Acceptance Testing

UAT dilakukan bersama pengguna bisnis untuk memastikan fitur sesuai kebutuhan.

## Participants

Owner, branch manager, cashiers, veterinarian, inventory staff, finance, and customer service.

Include product/business owner, Super Admin, customer representative when portal is in scope, and a facilitator/recorder. Each scenario has an accountable approver; clinical acceptance must be reviewed by a qualified veterinary stakeholder, finance by finance/accounting, and privacy/security by their owner.

## UAT Preparation and Execution

1. Freeze candidate build and test environment/schema; document version and known limitations.
2. Prepare synthetic/de-identified data, role accounts, branch context, opening stock/cash, and expected results.
3. Execute end-to-end scenarios using realistic task language; record actual result, evidence, requirement ID, tester and timestamp.
4. Classify findings as blocker/major/minor/observation with owner and retest status.
5. Reconcile balances, bookings, stock, and audit trail after financial/service scenarios; clean or preserve test state per environment policy.
6. Obtain explicit sign-off or rejection from accountable stakeholders; attendance alone is not approval.

## Exit Criteria

All release-critical acceptance scenarios pass or have documented, time-bound exceptions; role/scope behavior and reporting match approved policy; data reconciliation is complete; training/support/runbook is ready; named business owners sign off. UAT does not replace automated security, migration, performance or recovery testing.

## Related Documents

- [Test Plan](test-plan.md)
- [Acceptance Criteria](../01-product/acceptance-criteria.md)
- [Open Decisions](../13-traceability/open-decisions.md)

