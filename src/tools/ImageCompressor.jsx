import React, { useState } from "react";
import "../styles/Tool.css";

export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [compressedImage, setCompressedImage] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      setCompressedImage(null);
      setCompressedSize(0);
    } else {
      alert("Please select a valid image file");
    }
  };

  const compressImage = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    setIsCompressing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            setCompressedImage(canvas.toDataURL());
            setCompressedSize(blob.size);
            setIsCompressing(false);
          },
          "image/jpeg",
          quality / 100
        );
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const downloadCompressed = () => {
    if (!compressedImage) return;

    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = `compressed-${selectedFile.name}`;
    link.click();
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>🖼️ Image Compressor</h1>
        <p>Compress images and reduce file size while maintaining quality</p>
      </div>

      <div className="input-section">
        <div className="file-input-group">
          <label htmlFor="image-input" className="file-label">
            Choose Image
          </label>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          <button
            onClick={() => document.getElementById("image-input").click()}
            className="btn"
            style={{
              background: "gold",
              color: "black",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Select Image
          </button>
        </div>

        {selectedFile && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#0c1022",
              borderRadius: "5px",
              border: "1px solid gold",
            }}
          >
            <p><strong>File:</strong> {selectedFile.name}</p>
            <p><strong>Original Size:</strong> {formatBytes(originalSize)}</p>
            {compressedSize > 0 && (
              <p><strong>Compressed Size:</strong> {formatBytes(compressedSize)}</p>
            )}
            {compressedSize > 0 && (
              <p>
                <strong>Reduction:</strong>{" "}
                {Math.round(((originalSize - compressedSize) / originalSize) * 100)}%
              </p>
            )}
          </div>
        )}

        {selectedFile && (
          <div style={{ marginTop: "20px" }}>
            <label style={{ color: "gold", marginRight: "10px" }}>
              Quality: {quality}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </div>
        )}

        {selectedFile && (
          <button
            onClick={compressImage}
            disabled={isCompressing}
            style={{
              marginTop: "20px",
              background: isCompressing ? "#666" : "gold",
              color: "black",
              padding: "10px 30px",
              border: "none",
              borderRadius: "5px",
              cursor: isCompressing ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {isCompressing ? "Compressing..." : "Compress Image"}
          </button>
        )}
      </div>

      {compressedImage && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#0c1022",
            borderRadius: "5px",
            border: "2px solid gold",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "gold" }}>Compressed Image</h3>
          <img
            src={compressedImage}
            alt="Compressed"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              borderRadius: "5px",
              marginTop: "15px",
            }}
          />
          <button
            onClick={downloadCompressed}
            style={{
              marginTop: "15px",
              background: "gold",
              color: "black",
              padding: "10px 30px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Download Compressed Image
          </button>
        </div>
      )}
    </div>
  );
}
