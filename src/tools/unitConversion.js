export const UNIT_GROUPS = Object.freeze({
  Length: ["meter", "kilometer", "centimeter", "millimeter", "mile", "yard", "foot", "inch"],
  Weight: ["kilogram", "gram", "milligram", "pound", "ounce", "ton"],
  Volume: ["liter", "milliliter", "gallon", "quart", "pint", "cup"],
});

const conversionFactors = Object.freeze({
  meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000,
  mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701,
  kilogram: 1, gram: 1000, milligram: 1000000, pound: 2.20462,
  ounce: 35.274, ton: 0.001,
  liter: 1, milliliter: 1000, gallon: 0.264172, quart: 1.05669,
  pint: 2.11338, cup: 4.22675,
});

export function groupForUnit(unit) {
  return Object.keys(UNIT_GROUPS).find((group) => UNIT_GROUPS[group].includes(unit));
}

export function convertUnit(value, fromUnit, toUnit) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error("Enter a valid number.");
  const fromGroup = groupForUnit(fromUnit);
  const toGroup = groupForUnit(toUnit);
  if (!fromGroup || !toGroup || fromGroup !== toGroup) {
    throw new Error("Choose units from the same measurement category.");
  }
  return (number * conversionFactors[toUnit]) / conversionFactors[fromUnit];
}
