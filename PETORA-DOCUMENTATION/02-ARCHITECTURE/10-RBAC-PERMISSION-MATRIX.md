# 10 — RBAC and Permission Matrix

**Status:** Policy baseline; not a hardcoded grant list. Each role assignment is combined with branch and data scope.

## 1. Protected roles

| System role | Intended purpose | Protected rules |
|---|---|---|
| SUPER ADMIN | System-wide configuration and cross-branch oversight | Must remain recoverable; no ordinary role operation can delete/replace its identity. All sensitive actions audited. |
| ADMIN | Delegated business administration and operations | Cannot assume Super Admin; cannot grant permissions outside its delegation. |
| DOKTER | Clinical service and authorized medical history | Medical access scoped to assigned context; finance/system configuration not implicit. |
| CUSTOMER | Self-service customer portal | Customer-owned profile/pets/orders/bookings/payments/membership; medical fields subject to policy. |

Protected role existence does not imply every permission must be granted forever; restrictive changes to Super Admin need recovery safeguards and explicit approval.

## 2. Permission catalog

Canonical permission code: `<module>.<action>`, e.g. `inventory.transfer.approve`. Minimum actions are `view`, `create`, `edit`, `delete`, `approve`, `reject`, `cancel`, `process`, `export`, `print`, `manage`, `configure`; additional domain actions include `refund`, `dispense`, `sign`, `import`, `assign`, `reconcile`.

| Module | Key permissions |
|---|---|
| Authentication/users | `users.view/create/edit/deactivate/assign_role`, `sessions.revoke` |
| Roles / permission | `roles.view/create/edit/delete/duplicate`, `permissions.manage` |
| Branch/config | `branches.view/create/edit/deactivate`, `settings.view/configure` |
| Customer/pet | `customers.view/create/edit/export`, `pets.view/create/edit`, `pet_owners.manage` |
| Product/catalog | `products.view/create/edit/archive/import/export`, `prices.manage` |
| POS/sales | `sales.view/create/discount/cancel/refund/print`, `cash_sessions.open/close/reconcile` |
| Inventory | `inventory.view/receive/adjust/transfer/create/approve/export` |
| Purchasing | `purchasing.view/create/submit/approve/receive/return/pay` |
| Service | `bookings.view/create/edit/confirm/cancel`, `grooming.execute/qc`, `hotel.check_in/check_out`, `transport.assign/execute` |
| Veterinary/pharmacy | `medical_records.view/create/edit/sign/export`, `prescriptions.create/sign`, `pharmacy.dispense/return` |
| HR/finance | `employees.manage`, `attendance.manage`, `commissions.approve`, `finance.view/manage`, `accounting.post/close_period` |
| Reporting | `reports.view/export` |
| Integrations/audit | `integrations.view/configure/test`, `audit.view/export` |
| Notification/files | `notifications.view/manage`, `files.upload/view/delete` subject to retention rules |

Delete is disabled or replaced with archive/reversal for financial, stock, medical, audit and other legally retained records.

## 3. Role capability matrix (indicative, permission assignment remains configurable)

Legend: `G` global setup; `D` delegated module access only; `C` clinical context; `O` own/authorized customer data; `—` no default grant. `D` and `C` are not blanket access and still need explicit permission.

| Domain | Super Admin | Admin | Doctor | Customer |
|---|---:|---:|---:|---:|
| Identity, protected role and permission configuration | G | D, bounded | — | — |
| Branch management | G | D | — | — |
| Customer and pet operations | G | D | C, patient context | O |
| POS, sales and cashier | G | D | — | O (own checkout/history) |
| Inventory and purchasing | G | D | — | — |
| Grooming/hotel/daycare/transport | G | D | C only if assigned | O (own booking) |
| Medical record and prescription | G by explicit sensitive policy | D only if explicitly granted | C | O, policy-filtered |
| HR/commission | G | D | — | — |
| Finance/accounting | G | D | — | O (own payment status only) |
| Reporting/export | G, scoped audit | D | D only if needed | — |
| Integration configuration/secrets | G | — by default | — | — |
| Audit logs | G | D if granted | — | — |

The table does not override need-to-know or explicit permission checks. Admin access itself is not a universal grant.

## 4. Scope model and evaluation

Scope values:

- **Global:** organization configuration/data not tied to an operational branch.
- **All branches:** all records with `branch_id` in the organization.
- **Assigned branches:** branch IDs explicitly assigned to user/role.
- **Own records:** records created/owned by principal as defined per domain.
- **Assigned records:** records explicitly assigned to principal (appointment, work order).
- **Customer-owned:** customer ID matches authenticated customer or active authorized pet-owner relation.
- **Department scope:** employee records within allowed department, where configured.

Policy evaluation requires permission **and** scope:

```text
allow = authenticated
    AND active_account
    AND has_permission(action, resource)
    AND branch_in_scope(resource.branch_id)
    AND record_scope_matches(resource, principal)
    AND sensitive_data_policy_allows(resource, purpose)
```

No branch means global only when resource type and policy explicitly permit it; null branch is not a wildcard.

## 5. Role assignment and delegation

- Super Admin assigns role and scope; Admin may assign only pre-delegated roles/permissions.
- A user cannot grant permissions to self or change their own protected access via ordinary APIs.
- Deactivating a role/user is blocked if it removes the final viable Super Admin; recovery process TBD.
- Role deletion requires custom role, zero assignments or completed reassignment, and audit; protected role deletion always rejected.
- Permission changes take effect server-side and invalidate stale sessions/cache.
- Permission inheritance is **not assumed**. Role composition, explicit deny precedence and conflicts require decision; proposed default is additive grants capped by policy with no implicit inheritance.
- Temporary elevation, break-glass and emergency clinical access require explicit policy, reason, expiry and audit before implementation.

## 6. Authorization examples

1. Branch cashier with `sales.create` assigned to branch A may create a sale in A; posting `branch_id=B` is denied server-side.
2. Doctor with `medical_records.view` but no appointment assignment does not automatically see every patient; doctor scope and emergency access policy apply.
3. Customer A cannot fetch Customer B’s pet by changing path ID. API returns safe not-found/forbidden behavior.
4. Admin with `roles.edit` but limited delegation cannot grant `integrations.configure` or `permissions.manage`.
5. Report export requires both `reports.export` and the same branch/data scope as the report view.

## 7. Audit and testing

Audit role create/edit/delete attempt, permission changes, user assignment, branch access changes, sensitive access, approval, export and denial patterns. Security test coverage maps to [test plan](../05-QA/16-TEST-PLAN-TEST-CASE.md).
