import React, { useState, useEffect } from "react";
import "../styles/Tool.css";

export default function ScreenResolutionTester() {
  const [resolution, setResolution] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio
  });

  useEffect(() => {
    const handleResize = () => {
      setResolution({
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📺 Screen Resolution Tester</h1>
        <p>Check your screen resolution and device information</p>
      </div>

      <div className="result-box">
        <p><strong>Width:</strong> {resolution.width}px</p>
        <p><strong>Height:</strong> {resolution.height}px</p>
        <p><strong>Pixels:</strong> {(resolution.width * resolution.height).toLocaleString()}</p>
        <p><strong>Device Pixel Ratio:</strong> {resolution.devicePixelRatio}x</p>
        <p><strong>Aspect Ratio:</strong> {(resolution.width / resolution.height).toFixed(2)}</p>

        <p>
          <strong>Device Type:</strong>{" "}
          {resolution.width < 768
            ? "📱 Mobile"
            : resolution.width < 1024
            ? "📱 Tablet"
            : "💻 Desktop"}
        </p>
      </div>
    </div>
  );
}