import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  DEFAULT_WORKSPACE,
  parseWorkspaceId,
  workspaceIdFrom,
} from "../src/lib/workspace-id.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("workspace ids accept letters, numbers, dash and underscore", () => {
  assert.equal(parseWorkspaceId("default"), "default");
  assert.equal(parseWorkspaceId("  my-books_1  "), "my-books_1");
  assert.equal(parseWorkspaceId("bad key"), null);
  assert.equal(parseWorkspaceId(""), null);
  assert.equal(workspaceIdFrom("???"), DEFAULT_WORKSPACE);
});

test("persist uses Netlify Database and a workspaces table", () => {
  const persist = readFileSync(join(root, "src/lib/persist.ts"), "utf8");
  assert.match(persist, /@netlify\/database/);
  assert.match(persist, /NETLIFY_DB_URL/);
  assert.match(persist, /CREATE TABLE IF NOT EXISTS public\.workspaces/);
  assert.match(persist, /httpClient\.query/);
  assert.match(persist, /fullResults:\s*true/);
  assert.match(persist, /workspaceRecordFromRows/);
  assert.doesNotMatch(persist, /process\.env\.DATABASE_URL\s*;/);
});

test("API state route is workspace-aware", () => {
  const route = readFileSync(join(root, "src/app/api/state/route.ts"), "utf8");
  assert.match(route, /workspace/);
  assert.match(route, /isDurableBackend/);
});

test("client sync migrates localStorage into the cloud once", () => {
  const sync = readFileSync(join(root, "src/lib/sync.ts"), "utf8");
  assert.match(sync, /readLocalPersisted/);
  assert.match(sync, /markCloudMigrated/);
  assert.match(sync, /looksLikeSeed/);
});
