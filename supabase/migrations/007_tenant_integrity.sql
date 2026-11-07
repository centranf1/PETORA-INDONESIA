-- PETORA Database Migration 007: Tenant-scoped foreign-key integrity
-- Prevents a row from referencing an entity owned by another organization.
-- NOT VALID keeps legacy data from blocking rollout while enforcing new writes.

DO $$
DECLARE
  foreign_key RECORD;
  unique_index_name TEXT;
  tenant_constraint_name TEXT;
BEGIN
  FOR foreign_key IN
    SELECT
      child.relname AS child_table,
      parent.relname AS parent_table,
      child_column.attname AS child_column,
      constraint_row.conname AS source_constraint
    FROM pg_constraint constraint_row
    JOIN pg_class child ON child.oid = constraint_row.conrelid
    JOIN pg_namespace child_schema ON child_schema.oid = child.relnamespace
    JOIN pg_class parent ON parent.oid = constraint_row.confrelid
    JOIN pg_namespace parent_schema ON parent_schema.oid = parent.relnamespace
    JOIN pg_attribute child_column
      ON child_column.attrelid = child.oid
      AND child_column.attnum = constraint_row.conkey[1]
    JOIN pg_attribute parent_column
      ON parent_column.attrelid = parent.oid
      AND parent_column.attnum = constraint_row.confkey[1]
    WHERE constraint_row.contype = 'f'
      AND child_schema.nspname = 'public'
      AND parent_schema.nspname = 'public'
      AND array_length(constraint_row.conkey, 1) = 1
      AND array_length(constraint_row.confkey, 1) = 1
      AND parent_column.attname = 'id'
      AND child_column.attname <> 'organization_id'
      AND EXISTS (
        SELECT 1 FROM pg_attribute
        WHERE attrelid = child.oid
          AND attname = 'organization_id'
          AND NOT attisdropped
      )
      AND EXISTS (
        SELECT 1 FROM pg_attribute
        WHERE attrelid = parent.oid
          AND attname = 'organization_id'
          AND NOT attisdropped
      )
    ORDER BY child.relname, child_column.attname, constraint_row.conname
  LOOP
    unique_index_name := 'uq_org_' || foreign_key.parent_table || '_id';
    EXECUTE format(
      'CREATE UNIQUE INDEX IF NOT EXISTS %I ON public.%I (organization_id, id)',
      unique_index_name,
      foreign_key.parent_table
    );

    tenant_constraint_name := 'fk_tenant_' || left(foreign_key.child_table, 24) || '_' ||
      substr(md5(foreign_key.child_table || ':' || foreign_key.source_constraint), 1, 8);

    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conrelid = format('public.%I', foreign_key.child_table)::regclass
        AND conname = tenant_constraint_name
    ) THEN
      EXECUTE format(
        'ALTER TABLE public.%I ADD CONSTRAINT %I FOREIGN KEY (organization_id, %I) REFERENCES public.%I (organization_id, id) NOT VALID',
        foreign_key.child_table,
        tenant_constraint_name,
        foreign_key.child_column,
        foreign_key.parent_table
      );
    END IF;
  END LOOP;
END $$;