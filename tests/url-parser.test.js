import assert from "node:assert/strict";
import test from "node:test";
import { parseWebUrl } from "../src/utils/urlParser.js";

test("parses origin, host, path, repeated parameters and fragment", () => {
  const result = parseWebUrl(
    "https://example.com:8443/search?q=tea%20%26%20cake&q=coffee&empty=#results"
  );

  assert.equal(result.Protocol, "https:");
  assert.equal(result.Origin, "https://example.com:8443");
  assert.equal(result.Host, "example.com:8443");
  assert.equal(result.Hostname, "example.com");
  assert.equal(result.Port, "8443");
  assert.equal(result.Path, "/search");
  assert.equal(result.Hash, "#results");
  assert.equal(result.Parameters, "q: tea & cake\nq: coffee\nempty: (empty value)");
});

test("warns about embedded credentials without exposing them", () => {
  const result = parseWebUrl("https://person:secret@example.com/private");
  assert.equal(result.Credentials, "Present — remove before sharing");
  assert.equal(JSON.stringify(result).includes("secret"), false);
});

test("rejects relative and non-web URLs", () => {
  assert.throws(() => parseWebUrl("/relative/path"), /absolute URL/);
  assert.throws(() => parseWebUrl("ftp://example.com/file"), /web URL/);
  assert.throws(() => parseWebUrl(""), /Enter a URL/);
});
