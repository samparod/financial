// Guards the translation rule: every UI string exists in all three languages.

import { test } from "node:test";
import assert from "node:assert/strict";

import { extraUi } from "../src/lib/i18n-ui.ts";

const LANGS = ["ar", "fr", "en"];

test("all three languages are present", () => {
  assert.deepEqual(Object.keys(extraUi).sort(), [...LANGS].sort());
});

test("no language is missing a key the others have", () => {
  const all = new Set(LANGS.flatMap((l) => Object.keys(extraUi[l])));
  const missing = [];
  for (const lang of LANGS) {
    for (const key of all) {
      if (!(key in extraUi[lang])) missing.push(`${lang} is missing "${key}"`);
    }
  }
  assert.deepEqual(missing, [], missing.join("\n"));
});

test("no translation is left empty", () => {
  const empty = [];
  for (const lang of LANGS) {
    for (const [key, value] of Object.entries(extraUi[lang])) {
      if (typeof value !== "string" || value.trim() === "") empty.push(`${lang}.${key}`);
    }
  }
  assert.deepEqual(empty, [], `empty translations: ${empty.join(", ")}`);
});

test("placeholders match across languages", () => {
  const placeholders = (s) => (s.match(/\{(\w+)\}/g) ?? []).sort().join(",");
  const mismatches = [];
  for (const key of Object.keys(extraUi.ar)) {
    const ref = placeholders(extraUi.ar[key]);
    for (const lang of ["fr", "en"]) {
      const got = placeholders(extraUi[lang][key] ?? "");
      if (got !== ref) mismatches.push(`${key}: ar has [${ref}] but ${lang} has [${got}]`);
    }
  }
  assert.deepEqual(mismatches, [], mismatches.join("\n"));
});
