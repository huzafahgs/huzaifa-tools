import assert from "node:assert/strict";
import test from "node:test";
import { calculatePace } from "../src/utils/pace.js";

test("calculates pace and speed with seconds", () => {
  assert.deepEqual(calculatePace(5, 0, 25, 30), {
    paceMinutes: 5,
    paceSeconds: 6,
    speed: 11.764705882352942,
  });
});

test("carries rounded pace seconds into the next minute", () => {
  const result = calculatePace(3, 0, 14, 59);
  assert.equal(result.paceMinutes, 5);
  assert.equal(result.paceSeconds, 0);
  assert.ok(Math.abs(result.speed - 12.013348) < 0.000001);
});

test("rejects invalid distance and clock components", () => {
  assert.equal(calculatePace(0, 0, 25, 0), null);
  assert.equal(calculatePace(5, 0, 60, 0), null);
  assert.equal(calculatePace(5, 0, 25, 60), null);
  assert.equal(calculatePace(5, -1, 25, 0), null);
});
