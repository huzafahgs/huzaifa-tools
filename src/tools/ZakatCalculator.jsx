import { useMemo, useState } from "react";
import { calculateZakat, NISAB_GRAMS } from "./zakatCalculation";
import "../styles/Tool.css";

const moneyFields = [
  ["cash", "Cash and bank savings"],
  ["preciousMetals", "Gold and silver value"],
  ["investments", "Zakatable investments"],
  ["business", "Business stock and receivables"],
  ["other", "Other zakatable assets"],
];

const initialValues = Object.fromEntries(moneyFields.map(([key]) => [key, ""]));

export default function ZakatCalculator() {
  const [values, setValues] = useState(initialValues);
  const [liabilities, setLiabilities] = useState("");
  const [metal, setMetal] = useState("silver");
  const [pricePerGram, setPricePerGram] = useState("");
  const [currency, setCurrency] = useState("PKR");
  const [hawlConfirmed, setHawlConfirmed] = useState(false);

  const calculation = useMemo(() => {
    try {
      return {
        result: calculateZakat({
          assets: moneyFields.map(([key]) => values[key] || 0),
          liabilities: liabilities || 0,
          metal,
          pricePerGram,
        }),
        error: "",
      };
    } catch (error) {
      return { result: null, error: error.message };
    }
  }, [values, liabilities, metal, pricePerGram]);

  const format = (value) => new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  }).format(value);

  const result = calculation.result;
  const amountDue = result && hawlConfirmed ? result.zakat : 0;

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>☾ Zakat Calculator</h1>
        <p>Estimate Zakat using a transparent 2.5% method and the gold or silver nisab you select.</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="zakat-currency">Currency label</label>
          <input id="zakat-currency" value={currency} maxLength="8" onChange={(event) => setCurrency(event.target.value.toUpperCase())} placeholder="PKR" />
        </div>
        <div className="form-group">
          <label htmlFor="zakat-metal">Nisab standard</label>
          <select id="zakat-metal" value={metal} onChange={(event) => setMetal(event.target.value)}>
            <option value="silver">Silver — {NISAB_GRAMS.silver} g</option>
            <option value="gold">Gold — {NISAB_GRAMS.gold} g</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="zakat-price">Current {metal} price per gram</label>
          <input id="zakat-price" type="number" min="0" step="any" inputMode="decimal" value={pricePerGram} onChange={(event) => setPricePerGram(event.target.value)} placeholder="Enter a verified current price" />
        </div>
      </div>

      <h2>Zakatable assets</h2>
      <p className="tool-guidance">Enter each amount in the same currency. Decide what belongs in each category using guidance you trust.</p>
      <div className="form-grid">
        {moneyFields.map(([key, label]) => (
          <div className="form-group" key={key}>
            <label htmlFor={`zakat-${key}`}>{label}</label>
            <input id={`zakat-${key}`} type="number" min="0" step="any" inputMode="decimal" value={values[key]} onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))} placeholder="0" />
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="zakat-liabilities">Eligible short-term liabilities</label>
          <input id="zakat-liabilities" type="number" min="0" step="any" inputMode="decimal" value={liabilities} onChange={(event) => setLiabilities(event.target.value)} placeholder="0" />
        </div>
      </div>

      <label className="tool-check-row" htmlFor="zakat-hawl">
        <input id="zakat-hawl" type="checkbox" checked={hawlConfirmed} onChange={(event) => setHawlConfirmed(event.target.checked)} />
        <span>I have confirmed that the relevant lunar-year (hawl) condition applies to this calculation.</span>
      </label>

      <div aria-live="polite">
        {calculation.error ? (
          <p className="error-message">{calculation.error}</p>
        ) : (
          <div className="result-box">
            <div className="result-item"><span className="result-label">Net zakatable wealth</span><span className="result-value">{currency || "Currency"} {format(result.netWealth)}</span></div>
            <div className="result-item"><span className="result-label">Selected nisab</span><span className="result-value">{currency || "Currency"} {format(result.nisab)}</span></div>
            <div className="result-item"><span className="result-label">Estimated Zakat</span><span className="result-value">{currency || "Currency"} {format(amountDue)}</span></div>
            <p>{result.meetsNisab ? "The entered net wealth meets the selected nisab." : "The entered net wealth is below the selected nisab."}</p>
            {!hawlConfirmed && result.meetsNisab && <p>Confirm the hawl condition above before an amount is shown as due.</p>}
          </div>
        )}
      </div>

      <section className="tool-method-note" aria-labelledby="zakat-method-heading">
        <h2 id="zakat-method-heading">Method and important limits</h2>
        <p>This educational estimate subtracts the liability amount from entered assets, compares the remainder with the selected nisab, and applies 2.5% when the threshold and hawl confirmation are met. It does not decide which assets, jewellery, investments, debts, or liabilities are Zakatable in your circumstances.</p>
        <p>Gold and silver standards can produce very different thresholds, and scholarly methods differ. The weights shown follow published guidance from <a href="https://islamic-relief.org/zakat/nisab/" target="_blank" rel="noreferrer">Islamic Relief</a> and <a href="https://nwusa.tcfpk.com/give-zakat" target="_blank" rel="noreferrer">The Citizens Foundation</a>. Verify today’s per-gram price with a reliable local source and consult a qualified scholar for a ruling.</p>
        <p>Your entries stay in this browser and are not uploaded for the calculation.</p>
      </section>
    </div>
  );
}
