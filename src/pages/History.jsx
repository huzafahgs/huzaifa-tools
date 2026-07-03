import Layout from "../components/Layout";
import { useState, useEffect } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("toolHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your history?")) {
      setHistory([]);
      localStorage.removeItem("toolHistory");
    }
  };

  const removeItem = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    localStorage.setItem("toolHistory", JSON.stringify(newHistory));
  };

  return (
    <Layout title="History">
      <section style={{ padding: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "gold" }}>🕒 Recently Used Tools ({history.length})</h1>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              style={{
                background: "none",
                border: "1px solid gold",
                color: "gold",
                padding: "8px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div style={{
            background: "#0c1022",
            border: "2px solid gold",
            borderRadius: "8px",
            padding: "60px 30px",
            textAlign: "center",
            color: "#aaa"
          }}>
            <p style={{ fontSize: "18px", marginBottom: "15px" }}>No history yet</p>
            <p>Your recently used tools will appear here</p>
            <a href="/" style={{
              display: "inline-block",
              marginTop: "20px",
              background: "gold",
              color: "black",
              padding: "10px 30px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold"
            }}>
              Start Using Tools
            </a>
          </div>
        ) : (
          <div style={{ maxWidth: "900px" }}>
            {history.map((item, index) => (
              <div key={index} style={{
                background: "#0c1022",
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <p style={{ color: "gold", fontWeight: "bold", marginBottom: "5px" }}>{item.name}</p>
                  <p style={{ color: "#aaa", fontSize: "12px" }}>{new Date(item.timestamp).toLocaleString()}</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <a href={`/${item.slug}`} style={{
                    background: "gold",
                    color: "black",
                    padding: "8px 20px",
                    borderRadius: "5px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}>
                    Open
                  </a>
                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      background: "none",
                      border: "1px solid gold",
                      color: "gold",
                      padding: "8px 20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default History;
