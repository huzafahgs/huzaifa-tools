import { useState } from "react";
import "../styles/Tool.css";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");

  const generateQR = async () => {
    if (!text) {
      alert("Please enter text!");
      return;
    }

    // Using qr-code-styling library approach with a simple API
    const encodedText = encodeURIComponent(text);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`;
    setQrCode(qrUrl);
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>📱 QR Code Generator</h1>
        <p>Create QR codes instantly</p>
      </div>

      <p className="info-message">Your text is sent to api.qrserver.com to create the code. Do not enter sensitive information.</p>
      <label htmlFor="qr-input">Text or URL</label>
      <input
        id="qr-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL..."
        className="tool-input"
        onKeyDown={(e) => e.key === "Enter" && generateQR()}
      />

      <button className="tool-button" onClick={generateQR} style={{marginBottom: "30px"}}>
        Generate QR Code
      </button>

      {qrCode && (
        <div style={{textAlign: "center"}}>
          <img
            src={qrCode}
            alt="Generated QR code"
            width="300"
            height="300"
            loading="lazy"
            decoding="async"
            style={{border: "2px solid gold", borderRadius: "10px", maxWidth: "300px", height: "auto"}}
          />
          <button className="tool-button" onClick={downloadQR} style={{marginTop: "20px"}}>
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}
