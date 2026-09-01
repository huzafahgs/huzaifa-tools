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
            Coming Soon! Our AI Chat assistant will help you with all your questions and provide expert guidance across all our tools.
          </p>
          <button style={{
            background: "gold",
            color: "black",
            border: "none",
            padding: "12px 40px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "20px"
          }}>
            Notify Me
          </button>
        </div>
      </section>
    </Layout>
  );
}

export default Chat;