import { useState } from "react";
import "../styles/Tool.css";

export default function ScreenResolution() {
  const [resolution] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio
  });

  React.useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📺 Screen Resolution Tester</h1>
        <p>Check your screen resolution</p>
      </div>

      <div className="result-box" style={{textAlign: "center"}}>
        <div className="result-item">
          <span className="result-label">Screen Width</span>
          <span className="result-value">{resolution.width}px</span>
        </div>
        <div className="result-item">
          <span className="result-label">Screen Height</span>
          <span className="result-value">{resolution.height}px</span>
        </div>
        <div className="result-item">
          <span className="result-label">Total Pixels</span>
          <span className="result-value">{(resolution.width * resolution.height).toLocaleString()}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Device Pixel Ratio</span>
          <span className="result-value">{resolution.devicePixelRatio}x</span>
        </div>
        <div className="result-item">
          <span className="result-label">Aspect Ratio</span>
          <span className="result-value">{(resolution.width / resolution.height).toFixed(2)}</span>
        </div>
      </div>

      <div style={{marginTop: "30px", padding: "20px", background: "#0a0d1a", borderRadius: "10px", fontSize: "12px", color: "#aaa"}}>
        <p><strong>Device Type Detection:</strong></p>
        <p>
          {resolution.width < 768 ? "📱 Mobile Device" : resolution.width < 1024 ? "📱 Tablet" : "💻 Desktop/Large Screen"}
        </p>
      </div>
    </div>
  );
}
