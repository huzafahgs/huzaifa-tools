import tools from "../toolsData";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("favoriteTools") || "[]");
      setFavorites(Array.isArray(saved) ? saved.filter(name => tools.some(tool => tool.name === name)) : []);
    } catch { setFavorites([]); }
  }, []);

  const removeFromFavorites = (toolName) => {
    const newFavorites = favorites.filter(t => t !== toolName);
    setFavorites(newFavorites);
    localStorage.setItem("favoriteTools", JSON.stringify(newFavorites));
  };

  return (
    <Layout title="Favorites">
      <section style={{ padding: "40px" }}>
        <h1 style={{ color: "gold", marginBottom: "30px" }}>⭐ My Favorite Tools ({favorites.length})</h1>

        {favorites.length === 0 ? (
          <div style={{
            background: "#0c1022",
            border: "2px solid gold",
            borderRadius: "8px",
            padding: "60px 30px",
            textAlign: "center",
            color: "#aaa"
          }}>
            <p style={{ fontSize: "18px", marginBottom: "15px" }}>No favorite tools yet</p>
            <p>Saving new favorites is not available in the current catalog. You can bookmark individual tool pages in your browser.</p>
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
              Browse All Tools
            </a>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {favorites.map((tool, index) => (
              <div key={index} style={{
                background: "#0c1022",
                border: "1px solid gold",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center"
              }}>
                <p style={{ color: "gold", marginBottom: "15px" }}>{tool}</p>
                <button
                  onClick={() => removeFromFavorites(tool)}
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
                  Remove ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Favorites;
