export function bmiValue(weight, height, unit) {
  const w = Number(weight),
    h = Number(height);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0)
    throw new Error("Enter a positive weight and height.");
  const value = unit === "imperial" ? (w * 703) / (h * h) : w / (h / 100) ** 2;
  if (!Number.isFinite(value))
    throw new Error("These measurements are outside the supported range.");
  return value;
}
export function uptimeValue(days, hours, minutes, observedMinutes) {
  const values = [days, hours, minutes].map((v) => Number(v));
  if (
    values.some((v) => !Number.isSafeInteger(v) || v < 0) ||
    values[1] > 23 ||
    values[2] > 59
  )
    throw new Error(
      "Use whole nonnegative days, hours from 0 to 23, and minutes from 0 to 59.",
    );
  const totalMinutes = values[0] * 1440 + values[1] * 60 + values[2];
  if (!Number.isSafeInteger(totalMinutes))
    throw new Error("The duration is outside the supported range.");
  let percentage = null;
  if (observedMinutes !== "") {
    const window = Number(observedMinutes);
    if (!Number.isFinite(window) || window <= 0 || window < totalMinutes)
      throw new Error(
        "The observation window must be positive and at least as long as the uptime.",
      );
    percentage = (totalMinutes / window) * 100;
  }
  return {
    totalMinutes,
    totalHours: totalMinutes / 60,
    totalDays: totalMinutes / 1440,
    percentage,
  };
}
