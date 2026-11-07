#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
container_name="petora-db-test-$$"

cleanup() {
  docker rm -f "$container_name" >/dev/null 2>&1 || true
}
trap cleanup EXIT

docker run --name "$container_name" --rm -d \
  -e POSTGRES_PASSWORD=petora_test \
  -e POSTGRES_DB=petora \
  postgres:16-alpine >/dev/null

database_ready=false
for attempt in {1..30}; do
  if docker exec "$container_name" psql -q -v ON_ERROR_STOP=1 -U postgres -d petora \
    -c 'SELECT 1' >/dev/null 2>&1; then
    database_ready=true
    break
  fi
done

if [[ "$database_ready" != "true" ]]; then
  printf 'PostgreSQL container did not become ready\n' >&2
  exit 1
fi

apply_migrations() {
  local migration

  for migration in "$repo_root"/supabase/migrations/*.sql; do
    printf 'Applying %s\n' "${migration##*/}"
    docker exec -i "$container_name" psql -q -v ON_ERROR_STOP=1 \
      -U postgres -d petora < "$migration"
  done
}

apply_migrations
printf 'Reapplying migrations to check idempotency\n'
apply_migrations

docker exec -i "$container_name" psql -q -v ON_ERROR_STOP=1 -U postgres -d petora <<'SQL'
DO $$
DECLARE
  tenant_constraint RECORD;
BEGIN
  FOR tenant_constraint IN
    SELECT conrelid::regclass AS table_name, conname
    FROM pg_constraint
    WHERE contype = 'f'
      AND conname LIKE 'fk_tenant_%'
      AND NOT convalidated
  LOOP
    EXECUTE format('ALTER TABLE %s VALIDATE CONSTRAINT %I', tenant_constraint.table_name, tenant_constraint.conname);
  END LOOP;
END $$;
SQL

cross_tenant_result="$(docker exec -i "$container_name" psql -qAt -v ON_ERROR_STOP=1 -U postgres -d petora <<'SQL'
DO $$
DECLARE
  org_a uuid;
  org_b uuid;
  branch_a uuid;
  branch_b uuid;
BEGIN
  INSERT INTO public.organizations (code, name)
  VALUES ('tenant-a', 'Tenant A') RETURNING id INTO org_a;
  INSERT INTO public.organizations (code, name)
  VALUES ('tenant-b', 'Tenant B') RETURNING id INTO org_b;
  INSERT INTO public.branches (organization_id, code, name)
  VALUES (org_a, 'A-1', 'A branch') RETURNING id INTO branch_a;
  INSERT INTO public.branches (organization_id, code, name)
  VALUES (org_b, 'B-1', 'B branch') RETURNING id INTO branch_b;
  INSERT INTO public.customers (organization_id, branch_id, full_name, phone, normalized_phone)
  VALUES (org_a, branch_a, 'Same tenant', '100', '100');

  BEGIN
    INSERT INTO public.customers (organization_id, branch_id, full_name, phone, normalized_phone)
    VALUES (org_a, branch_b, 'Cross tenant', '200', '200');
    RAISE EXCEPTION 'cross-tenant branch reference unexpectedly succeeded';
  EXCEPTION WHEN foreign_key_violation THEN
    NULL;
  END;
END $$;
SELECT 'tenant-boundary-enforced';
SQL
)"

if [[ "$cross_tenant_result" != "tenant-boundary-enforced" ]]; then
  printf 'Cross-tenant reference test did not return expected result\n' >&2
  exit 1
fi

docker exec "$container_name" psql -q -v ON_ERROR_STOP=1 -U postgres -d petora \
  -c "CREATE ROLE authenticated NOLOGIN; GRANT USAGE ON SCHEMA public TO authenticated; GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated; INSERT INTO public.organizations (code, name) VALUES ('rls-test', 'RLS test');" \
  >/dev/null

tables_without_rls="$(docker exec "$container_name" psql -qAt -U postgres -d petora \
  -c "SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE n.nspname = 'public' AND c.relkind = 'r' AND NOT c.relrowsecurity;")"

if [[ "$tables_without_rls" != "0" ]]; then
  printf 'Found %s public tables without RLS enabled\n' "$tables_without_rls" >&2
  exit 1
fi

policy_count="$(docker exec "$container_name" psql -qAt -U postgres -d petora \
  -c "SELECT count(*) FROM pg_policy p JOIN pg_class c ON c.oid = p.polrelid JOIN pg_namespace n ON n.oid = c.relnamespace WHERE n.nspname = 'public';")"

if [[ "$policy_count" != "0" ]]; then
  printf 'Expected no unapproved public RLS policies; found %s\n' "$policy_count" >&2
  exit 1
fi

visible_rows="$(docker exec "$container_name" psql -qAt -U postgres -d petora \
  -c "SET ROLE authenticated; SELECT count(*) FROM public.organizations;")"

if [[ "$visible_rows" != "0" ]]; then
  printf 'Expected unscoped authenticated role to see no organization rows; got %s\n' "$visible_rows" >&2
  exit 1
fi

printf 'Database checks passed: migrations rerun cleanly, RLS is enabled, and unscoped reads are denied.\n'