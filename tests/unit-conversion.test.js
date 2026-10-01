import test from "node:test";
import assert from "node:assert/strict";
import { convertUnit, groupForUnit, UNIT_GROUPS } from "../src/tools/unitConversion.js";

test("converts within length, weight, and volume categories", () => {
  assert.equal(convertUnit(1, "meter", "centimeter"), 100);
  assert.equal(convertUnit(1, "kilogram", "gram"), 1000);
  assert.equal(convertUnit(1, "liter", "milliliter"), 1000);
});

test("rejects cross-category and invalid conversions", () => {
  assert.throws(() => convertUnit(1, "meter", "kilogram"), /same measurement category/);
  assert.throws(() => convertUnit("not-a-number", "meter", "foot"), /valid number/);
  assert.throws(() => convertUnit(1, "unknown", "foot"), /same measurement category/);
});

test("every registered unit belongs to exactly one category", () => {
  const units = Object.values(UNIT_GROUPS).flat();
  assert.equal(new Set(units).size, units.length);
  for (const unit of units) assert.ok(groupForUnit(unit));
});
