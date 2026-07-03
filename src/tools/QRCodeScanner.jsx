import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../styles/Tool.css";

export default function QRCodeScanner() {
  const [result, setResult] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setResult(decodedText);
      },
      () => {
        // ignore scan errors
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📱 QR Code Scanner</h1>
        <p>Scan QR codes using your camera</p>
      </div>

      <div
        id="reader"
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "20px auto"
        }}
      ></div>

      {result && (
        <div className="output-box">
          <h3>Scanned Result</h3>
          <p
            style={{
              wordBreak: "break-word",
              fontFamily: "monospace"
            }}
          >
            {result}
          </p>

          <button
            className="tool-button"
            onClick={() => navigator.clipboard.writeText(result)}
          >
            Copy Result
          </button>
        </div>
      )}
    </div>
  );
}