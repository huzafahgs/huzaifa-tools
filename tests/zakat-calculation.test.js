import test from "node:test";
import assert from "node:assert/strict";
import { calculateZakat, NISAB_GRAMS } from "../src/tools/zakatCalculation.js";

test("uses the selected published nisab weight and applies 2.5%", () => {
  const result = calculateZakat({
    assets: [500000, 250000, 50000],
    liabilities: 100000,
    metal: "silver",
    pricePerGram: 100,
  });
  assert.equal(result.nisab, NISAB_GRAMS.silver * 100);
  assert.equal(result.netWealth, 700000);
  assert.equal(result.meetsNisab, true);
  assert.equal(result.zakat, 17500);
});

test("returns zero below nisab and never creates negative net wealth", () => {
  const below = calculateZakat({ assets: [1000], liabilities: 2000, metal: "gold", pricePerGram: 20000 });
  assert.equal(below.netWealth, 0);
  assert.equal(below.meetsNisab, false);
  assert.equal(below.zakat, 0);
});

test("rejects invalid amounts, prices, and standards", () => {
  assert.throws(() => calculateZakat({ assets: [-1], metal: "silver", pricePerGram: 100 }), /positive/);
  assert.throws(() => calculateZakat({ assets: [1], metal: "silver", pricePerGram: 0 }), /greater than zero/);
  assert.throws(() => calculateZakat({ assets: [1], metal: "other", pricePerGram: 100 }), /valid nisab/);
});
