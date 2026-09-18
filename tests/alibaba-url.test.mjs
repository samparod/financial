import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveAlibabaHref } from "../src/lib/alibaba-url.ts";

test("resolveAlibabaHref accepts https URLs", () => {
  assert.equal(resolveAlibabaHref("https://www.alibaba.com/foo"), "https://www.alibaba.com/foo");
});

test("resolveAlibabaHref builds URL from numeric offer id", () => {
  assert.equal(
    resolveAlibabaHref("1600123456789"),
    "https://www.alibaba.com/product-detail/_1600123456789.html"
  );
});

test("resolveAlibabaHref searches when the paste is not a numeric offer id", () => {
  assert.equal(
    resolveAlibabaHref("286e6461179"),
    "https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&SearchText=286e6461179"
  );
});

test("resolveAlibabaHref adds https to domain", () => {
  assert.equal(
    resolveAlibabaHref("www.alibaba.com/product-detail/x.html"),
    "https://www.alibaba.com/product-detail/x.html"
  );
});
