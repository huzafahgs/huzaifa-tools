import test from "node:test";
import assert from "node:assert/strict";
import { bmiValue, uptimeValue } from "../src/tools/calculationMath.js";

test("BMI agrees with independent metric and CDC pounds/inches examples", () => {
  assert.equal(bmiValue(70, 175, "metric").toFixed(1), "22.9");
  assert.equal(bmiValue(150, 65, "imperial").toFixed(1), "25.0");
  assert.equal(bmiValue(200, 68, "imperial").toFixed(1), "30.4");
});
test("BMI rejects zero, negative and nonfinite measurements", () => {
  for (const value of [0, -1, NaN, Infinity, ""]) {
    assert.throws(() => bmiValue(value, 175, "metric"));
    assert.throws(() => bmiValue(70, value, "metric"));
  }
});
test("duration totals do not invent an observation period", () => {
  assert.deepEqual(uptimeValue(1, 2, 30, ""), {
    totalMinutes: 1590,
    totalHours: 26.5,
    totalDays: 1590 / 1440,
    percentage: null,
  });
});
test("availability uses the actual window including zero and full availability", () => {
  assert.equal(uptimeValue(0, 1, 39, 100).percentage, 99);
  assert.equal(uptimeValue(0, 0, 0, 100).percentage, 0);
  assert.equal(uptimeValue(1, 0, 0, 1440).percentage, 100);
});
test("invalid or inconsistent windows and duration components are rejected", () => {
  for (const args of [
    [1, 0, 0, 100],
    [1, 0, 0, 0],
    [0, 24, 0, ""],
    [0, 0, 60, ""],
    [-1, 0, 0, ""],
    [0, 1.5, 0, ""],
    [0, 0, 0, Infinity],
  ])
    assert.throws(() => uptimeValue(...args));
});
