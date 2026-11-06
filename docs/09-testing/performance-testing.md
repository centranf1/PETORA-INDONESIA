---
title: Performance Testing
document_id: PET-DOC-0907
status: Draft
version: 1.0
owner: Engineering Team
last_updated: 2026-11-06
related_documents: ['test-plan.md']
---

# Performance Testing

Test kinerja untuk dashboard, search, and large report generation.

## Targets

No numeric SLO is approved yet; define workload, percentile, data volume, concurrency, and acceptable error rate with product/operations before enforcing a release target. Test representative journeys: customer/product search, POS checkout, stock ledger, booking capacity contention, clinical history lookup, dashboard aggregation, large export, and notification backlog.

Use p50/p95/p99 latency, throughput, error/conflict rate, DB CPU/IO, connection pool/lock waits, query rows/buffers, cache hit, function duration, and queue age. Test warm/cold cache, realistic tenant skew, peak periods, and branch data distribution. Do not publish a result without environment/data shape and test duration.

Run load, stress, spike and soak tests in isolated non-production environments. Prevent load tests from dispatching real payment, messaging, or clinical events. Capacity test tenant isolation and RLS query plans as well as raw throughput.

## Monitoring

Establish baseline, identify bottleneck, make one targeted change, then rerun the same workload. Check database plans and index write costs; do not cache authorization-sensitive data across scopes. Numeric targets and alert thresholds live in approved NFR/SLO decisions.

## Related Documents

- [Indexing Strategy](../04-database/indexing-strategy.md)
- [Monitoring and Logging](../10-devops/monitoring-logging.md)
- [Open Decisions](../13-traceability/open-decisions.md)

