# 09 — Technical Architecture

**Status:** Logical reference architecture. No framework, DBMS, hosting provider or source implementation was present in the audited repository.

## 1. Architecture style

Recommended modular application with explicit domain boundaries, backend-enforced policies, a relational system of record, background job processing, private file storage and adapter-based integrations. A modular monolith is a reasonable initial deployment proposal because repository scale and load are unknown; service decomposition should follow measured needs, not be assumed.

## 2. Stack inventory versus proposed components

| Layer | Existing fact | Recommended capability (technology TBD) |
|---|---|---|
| Frontend | None found | Responsive browser SPA/SSR framework selected by engineering |
| Backend | None found | API application with domain services/policy enforcement |
| Database | None found | Relational DB with transactions, constraints, migrations |
| Authentication | None found | Secure session/identity service and recovery flow |
| Queue | None found | Durable job queue for notifications, imports, callbacks |
| Files | None found | Private object/file storage with scoped access |
| Secrets | None found | Managed secret store or encrypted backend storage with key rotation |
| Observability | None found | Central logs, metrics, tracing, alerting and correlation IDs |
| CI/CD | None found | Automated build, tests, migration checks and approved deployment pipeline |

## 3. Frontend and API architecture

Frontend organizes routes by domain and shared layouts; a centralized permission-aware navigation improves UX but is not security. API client handles auth/session, validation display, pagination, request correlation and safe retry. Backend middleware resolves principal, checks action permission, branch/data scope, then invokes domain command/query. Client-supplied branch, price, total, status, role or owner claims are never trusted.

## 4. Identity, RBAC and policy

Authentication establishes identity; authorization evaluates `(principal, action, resource, branch, ownership/assignment, sensitivity)`. Protected roles are seeded and guarded. Permission changes, user assignment and Super Admin recovery are audited. Customer and clinical policies are separate constraints, not just ordinary role checks.

## 5. Data and transaction strategy

Relational records and constraints maintain integrity. Each command has a transaction boundary. Important operations include payment allocation, order finalization + stock posting, receipt + movement, transfer, medicine dispensing, journal posting and capacity reservation. Use optimistic concurrency or database locking where two requests could consume the same stock/slot. Keep append-only ledgers for stock, loyalty and posted accounting; derive balances and reconcile them.

Read models/reports can be optimized separately but must apply the same scope filters and have an agreed freshness indicator. Cache only data whose staleness and invalidation are defined; never cache authorization decisions across policy changes without safe invalidation.

## 6. Integration, files and background jobs

Provider adapters expose a stable internal interface and isolate provider-specific payloads. Configuration is validated against adapter schema; secrets are server-side encrypted/managed and write-only in UI. Webhooks require signature/replay protection and event deduplication. Use bounded retries, timeout, circuit-breaker/degraded state and dead-letter/reconciliation workflow.

Background jobs process notification delivery, expiry reminders, report exports and import validation. Job handlers are idempotent and observable. Files are private by default, virus/content validation policy TBD, associated with owner entity and checked at every download.

## 7. Security boundaries

Browser ↔ API: TLS, session protection, CSRF controls according to auth model, rate limiting. API ↔ DB: least-privilege service identity and parameterized persistence. API ↔ provider: egress restrictions, credential isolation and redacted logs. Staff/customer domains need explicit access boundaries. Backup credentials/storage must be isolated from runtime credentials.

## 8. Logging, monitoring and reliability

Record request ID, actor ID where appropriate, branch, operation outcome, latency and dependency status; redact tokens, passwords, payment credentials, and unnecessary PII/medical content. Measure API latency/error rate, queue lag, DB saturation, stock reconciliation, webhook failures, backup freshness and auth anomalies. Define SLO, on-call, retention, RPO/RTO, alert thresholds and escalation before production.

## 9. Scalability and resilience

Begin with capacity modeling using branch count, concurrent sessions, peak checkout, appointments and report workload (all TBD). Optimize indexes and aggregation with measurements. Isolate heavy exports and provider calls in jobs. Use graceful degradation for optional provider failure; core POS/stock/booking must not claim external success. Database HA, multi-zone design and caching are deployment decisions after availability targets.

## 10. Decision gates

Before implementation select and document framework/runtime, database, hosting/data residency, identity/session design, queue, file storage, encryption key management, backup, CI/CD and monitoring. Validate through threat model, prototype of concurrency-critical inventory/booking/payment flows, load tests and restore test. No production config is present to modify.
