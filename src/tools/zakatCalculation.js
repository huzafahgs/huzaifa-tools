export const NISAB_GRAMS = Object.freeze({
  gold: 87.48,
  silver: 612.36,
});

const finiteNonNegative = (value, label) => {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`${label} must be zero or a positive number.`);
  }
  return number;
};

export function calculateZakat({ assets = [], liabilities = 0, metal = "silver", pricePerGram = 0 }) {
  if (!(metal in NISAB_GRAMS)) throw new Error("Choose a valid nisab standard.");

  const totalAssets = assets.reduce(
    (total, value, index) => total + finiteNonNegative(value, `Asset ${index + 1}`),
    0,
  );
  const deductibleLiabilities = finiteNonNegative(liabilities, "Liabilities");
  const metalPrice = finiteNonNegative(pricePerGram, "Metal price");
  if (metalPrice === 0) throw new Error("Enter a current metal price greater than zero.");

  const netWealth = Math.max(0, totalAssets - deductibleLiabilities);
  const nisab = NISAB_GRAMS[metal] * metalPrice;
  const meetsNisab = netWealth >= nisab;

  return {
    totalAssets,
    deductibleLiabilities,
    netWealth,
    nisab,
    meetsNisab,
    zakat: meetsNisab ? netWealth * 0.025 : 0,
  };
}
