-- Cloud copy of the COD calculator (one JSON document per workspace).
-- Default workspace id is "default" so every browser/device shares the same record
-- unless the user sets a different key in Settings.
CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Older EasyPanel deploys used a single-row app_state table.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = 'app_state'
  ) THEN
    INSERT INTO workspaces (id, data, updated_at)
    SELECT 'default', data, COALESCE(updated_at, now())
    FROM app_state
    WHERE id = 1
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;
