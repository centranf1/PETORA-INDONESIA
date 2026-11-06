---
title: Form Validation
document_id: PET-DOC-0607
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['data-fetching.md']
---

# Form Validation

Dokumen ini memerinci pendekatan validasi form.

## Schema Rules

Use Zod with React Hook Form for local type/shape feedback when these dependencies are present. Client schema improves UX but is not authoritative. Server repeats validation against current data, authenticated scope, active policy, concurrency state and permission.

Separate syntax validation (required/type/range/format) from asynchronous uniqueness/eligibility and final server business validation. Async checks are advisory because data may change before submit. Never expose a database lookup that confirms another tenant's private record.

## Examples

Examples of rule layers:

| Form | Client guidance | Server authority |
| --- | --- | --- |
| Customer | Phone normalization/format, required name | Duplicate match within organization, consent and scope |
| Product price | Currency/decimal format, non-negative value | Permission, valid price floor/branch rule and effective date |
| Booking | Required service/pet/time and local hours display | Current capacity, staff/resource schedule, cancellation/deposit policy |
| Stock adjustment | Quantity/reason required | Current balance, unit conversion, approval threshold and concurrency |
| Clinical prescription | Required patient/medicine/dose fields | Prescriber authority, allergy/clinical state, permitted dosage and stock checks |
| System setting | Schema-driven field and range | Allowlisted key/schema, scope, lock, expected version and approval |

Do not hardcode unresolved tax, age, discount, payroll, medical or retention thresholds in client schema.

## UX Rule

Show field-level error with programmatic association and form-level summary. Preserve non-sensitive draft values after validation or network failure. Map stable server field errors to fields; show conflict as a separate state. Disable duplicate submit while pending, but do not assume button disabling prevents request replay.

## Related Documents

- [Data Fetching](data-fetching.md)
- [API Error Handling](error-handling.md)
- [Accessibility Guidelines](../07-ui-ux/accessibility-guidelines.md)

