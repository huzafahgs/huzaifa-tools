import { useEffect, useMemo, useState } from "react";
import "../styles/Tool.css";

const luminance = (hex) => {
  const value = hex.replace("#", "");
  const rgb = [0, 2, 4].map(i => parseInt(value.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
};

export default function ColorContrastChecker() {
  const [foreground, setForeground] = useState("#FFD700");
  const [background, setBackground] = useState("#050816");

  useEffect(() => {
    document.title = "Color Contrast Checker - Huzaifa Tools";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Check WCAG contrast ratio between foreground and background colors.");
  }, []);

  const ratio = useMemo(() => {
    const light = Math.max(luminance(foreground), luminance(background));
    const dark = Math.min(luminance(foreground), luminance(background));
    return ((light + 0.05) / (dark + 0.05));
  }, [foreground, background]);

  return (
    <div className="tool-container">
      <div className="tool-header"><h1>◐ Color Contrast Checker</h1><p>Check accessible color contrast</p></div>
      <div className="form-grid">
        <div className="form-group"><label htmlFor="contrast-foreground">Text color</label><input id="contrast-foreground" type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} /></div>
        <div className="form-group"><label htmlFor="contrast-background">Background color</label><input id="contrast-background" type="color" value={background} onChange={(e) => setBackground(e.target.value)} /></div>
      </div>
      <div className="output-box" style={{background, color: foreground, borderColor: "gold", fontSize: "22px", textAlign: "center"}}>Sample readable text</div>
      <div className={ratio >= 4.5 ? "success-message" : "error-message"} role="status" aria-live="polite" style={{marginTop: "20px"}}>
        Contrast ratio: {ratio.toFixed(2)}:1. AA normal text: {ratio >= 4.5 ? "Pass" : "Fail"}. Large text: {ratio >= 3 ? "Pass" : "Fail"}.
      </div>
    </div>
  );
}
