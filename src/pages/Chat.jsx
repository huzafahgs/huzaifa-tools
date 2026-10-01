import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Chat() {
  return (
    <Layout title="AI Chat">
      <section style={{ padding: "40px" }}>
        <div style={{
          minHeight: "60vh",
          background: "#0c1022",
          border: "2px solid gold",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center"
        }}>
          <p style={{ fontSize: "60px", marginBottom: "20px" }}>🤖</p>
          <h1 style={{ color: "gold", fontSize: "40px", marginBottom: "20px" }}>Huzaifa AI Chat</h1>
          <p style={{ color: "#ddd", fontSize: "18px", marginBottom: "30px", maxWidth: "600px" }}>
            Huzaifa AI was created by Muhammad Huzaifa Irfan under Huzaifa
            Group of Software, with AI capabilities powered by Google Gemini.
            Chat is not available yet; browse the available AI tools instead.
          </p>
          <Link to="/all-tools?category=AI" className="btn-primary">Explore AI tools</Link>
        </div>
      </section>
    </Layout>
  );
}

export default Chat;
