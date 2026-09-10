import test from "node:test";
import assert from "node:assert/strict";
import {
  readGuest,
  sanitizeLibrary,
  writeGuest,
} from "../src/accounts/local.js";
const catalog = [
  { slug: "word-counter", name: "Word Counter" },
  { slug: "json-formatter", name: "JSON Formatter" },
];
const storage = (values = {}) => ({
  getItem: (key) => values[key] ?? null,
  setItem: (key, value) => {
    values[key] = value;
  },
});
test("history drops arbitrary inputs and invalid or future records; deduplicates newest first", () => {
  const value = sanitizeLibrary(
    {
      favorites: ["word-counter", "word-counter", "fake"],
      history: [
        {
          slug: "word-counter",
          timestamp: "2026-01-01",
          password: "private",
          text: "secret",
        },
        { slug: "word-counter", timestamp: "2026-02-01" },
        { slug: "json-formatter", timestamp: "2099-01-01" },
        { slug: "fake", timestamp: "2026-01-01" },
        null,
      ],
    },
    catalog,
  );
  assert.deepEqual(value, {
    favorites: ["word-counter"],
    history: [{ slug: "word-counter", timestamp: "2026-02-01T00:00:00.000Z" }],
  });
});
test("malformed and inaccessible local storage are safe", () => {
  assert.deepEqual(
    readGuest(storage({ "hgs-guest-library-v1": "{bad" }), catalog),
    { favorites: [], history: [] },
  );
  assert.deepEqual(
    readGuest(
      {
        getItem() {
          throw Error("blocked");
        },
      },
      catalog,
    ),
    { favorites: [], history: [] },
  );
  assert.throws(() =>
    writeGuest(
      {
        setItem() {
          throw Error("full");
        },
      },
      {},
      catalog,
    ),
  );
});
test("legacy names migrate only to known tools; explicit clear does not resurrect legacy data", () => {
  const s = storage({
    favoriteTools: '["Word Counter","fake"]',
    toolHistory: "[]",
  });
  assert.deepEqual(readGuest(s, catalog).favorites, ["word-counter"]);
  writeGuest(s, { favorites: [], history: [] }, catalog);
  assert.deepEqual(readGuest(s, catalog), { favorites: [], history: [] });
});
