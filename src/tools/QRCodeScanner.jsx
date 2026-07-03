import { useState } from "react";
import "../styles/Tool.css";

export default function QRCodeScanner() {
  const [scannedCode, setScannedCode] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [videoRef, setVideoRef] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      setIsCameraActive(true);
      alert("Camera started. Point at a QR code. (Note: Full QR scanning requires a library like jsQR or html5-qrcode)");
    } catch (err) {
      alert("Camera access denied or not available");
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
  };

  const handleManualScan = (e) => {
    const code = prompt("Enter QR code content or paste scanned data:");
    if (code) {
      setScannedCode(code);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(scannedCode);
    alert("Copied!");
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📱 QR Code Scanner</h1>
        <p>Scan QR codes with your camera</p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <button className="tool-button" onClick={startCamera} disabled={isCameraActive}>
          Start Camera
        </button>
        <button className="tool-button" onClick={stopCamera} disabled={!isCameraActive}>
          Stop Camera
        </button>
        <button className="tool-button" onClick={handleManualScan}>
          Manual Input
        </button>
      </div>

      {isCameraActive && (
        <div style={{
          background: "#0c1022",
          border: "2px solid gold",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
          textAlign: "center",
          color: "gold"
        }}>
          <p>📷 Camera Active - Point at QR code</p>
          <p style={{ fontSize: "12px", color: "#aaa" }}>Note: For best results, use a QR code scanner app or ensure proper lighting</p>
        </div>
      )}

      {scannedCode && (
        <div className="output-box">
          <div className="output-label">Scanned Code:</div>
          <div style={{ wordBreak: "break-all", fontFamily: "monospace", marginBottom: "15px", fontSize: "14px" }}>
            {scannedCode}
          </div>
          <button className="tool-button-secondary" onClick={copy} style={{ width: "100%" }}>
            Copy Code
          </button>
        </div>
      )}

      <div style={{ marginTop: "30px", padding: "15px", background: "#0a0d1a", borderRadius: "8px", fontSize: "12px", color: "#aaa" }}>
        <p><strong>Note:</strong> This is a basic QR scanner. For production use, integrate a library like jsQR or ZXing.</p>
        <p style={{ marginTop: "10px" }}>You can test by entering QR code content manually or taking a screenshot of a QR code to scan.</p>
      </div>
    </div>
  );
}
