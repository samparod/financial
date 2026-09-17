import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveAlibabaHref } from "../src/lib/alibaba-url.ts";

test("resolveAlibabaHref accepts https URLs", () => {
  assert.equal(resolveAlibabaHref("https://www.alibaba.com/foo"), "https://www.alibaba.com/foo");
});

test("resolveAlibabaHref builds URL from offer id", () => {
  assert.equal(
    resolveAlibabaHref("286e6461179"),
    "https://www.alibaba.com/product-detail/_286e6461179.html"
  );
});

test("resolveAlibabaHref adds https to domain", () => {
  assert.equal(
    resolveAlibabaHref("www.alibaba.com/product-detail/x.html"),
    "https://www.alibaba.com/product-detail/x.html"
  );
});
