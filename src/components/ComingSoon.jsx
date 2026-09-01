import React from "react";
import { Link } from "react-router-dom";
import "../styles/Tool.css";

export default function ComingSoon({ toolName, toolIcon }) {
  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>{toolIcon} {toolName}</h1>
        <p>Coming Soon</p>
      </div>

      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>🚀</div>
        <h2 style={{ color: "gold", fontSize: "32px", marginBottom: "15px" }}>
          {toolName}
        </h2>
        <p style={{ color: "#ddd", fontSize: "18px", marginBottom: "10px" }}>
          This tool is coming soon!
        </p>
        <p style={{ color: "#999", marginBottom: "30px" }}>
          We're working hard to bring you this amazing feature.
        </p>

        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            style={{
              background: "gold",
              color: "black",
              border: "none",
              padding: "12px 40px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
