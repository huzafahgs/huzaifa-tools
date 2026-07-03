import { useState } from "react";
import "../styles/Tool.css";

export default function RomanNumeralConverter() {
  const [number, setNumber] = useState("");
  const [roman, setRoman] = useState("");

  const decimalToRoman = (num) => {
    const romanMap = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" }
    ];

    let result = "";
    for (let i = 0; i < romanMap.length; i++) {
      while (num >= romanMap[i].value) {
        result += romanMap[i].numeral;
        num -= romanMap[i].value;
      }
    }
    return result;
  };

  const convert = () => {
    if (!number) return;
    const n = parseInt(number);
    if (n <= 0 || n >= 4000) {
      alert("Please enter a number between 1 and 3999");
      return;
    }
    setRoman(decimalToRoman(n));
  };

  const copy = () => {
    navigator.clipboard.writeText(roman);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🏛️ Roman Numeral Converter</h1>
        <p>Convert to Roman numerals</p>
      </div>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number (1-3999)"
        className="tool-input"
        min="1"
        max="3999"
      />

      <button className="tool-button" onClick={convert} style={{width: "100%", marginBottom: "30px"}}>
        Convert to Roman
      </button>

      {roman && (
        <div className="output-box">
          <div className="output-label">Roman Numeral:</div>
          <div style={{fontSize: "32px", fontWeight: "bold", color: "gold", marginBottom: "15px"}}>
            {roman}
          </div>
          <button className="tool-button-secondary" onClick={copy} style={{width: "100%"}}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
