import Layout from "../components/Layout";

function Pricing() {
  return (
    <Layout title="Pricing">
      <section style={{ padding: "40px" }}>
        <h1 style={{ color: "gold", marginBottom: "10px", textAlign: "center" }}>💰 Pricing</h1>
        <p style={{ textAlign: "center", color: "#aaa", marginBottom: "50px" }}>All tools are completely FREE!</p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {/* Free Plan */}
          <div style={{
            background: "#0c1022",
            border: "2px solid gold",
            borderRadius: "8px",
            padding: "40px",
            textAlign: "center"
          }}>
            <h2 style={{ color: "gold", marginBottom: "10px" }}>FREE</h2>
            <p style={{ color: "#aaa", marginBottom: "30px" }}>Forever Free</p>
            <p style={{ fontSize: "40px", color: "gold", fontWeight: "bold", marginBottom: "30px" }}>$0<span style={{ fontSize: "18px" }}>/month</span></p>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "30px", textAlign: "left" }}>
              <li style={{ padding: "12px 0", borderBottom: "1px solid #222", color: "#ddd" }}>✓ 50+ Premium Tools</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid #222", color: "#ddd" }}>✓ No Sign-up Required</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid #222", color: "#ddd" }}>✓ No API Keys Needed</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid #222", color: "#ddd" }}>✓ 100% Client-Side Processing</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid #222", color: "#ddd" }}>✓ Completely Secure</li>
              <li style={{ padding: "12px 0", color: "#ddd" }}>✓ Unlimited Usage</li>
            </ul>
            <button style={{
              background: "gold",
              color: "black",
              border: "none",
              padding: "12px 30px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
              fontSize: "16px"
            }}>
              Start Using Now
            </button>
          </div>

          {/* Pro Plan */}
          <div style={{
            background: "#0c1022",
            border: "2px solid gold",
            borderRadius: "8px",
            padding: "40px",
            textAlign: "center",
            position: "relative",
            transform: "scale(1.05)"
          }}>
            <div style={{
              position: "absolute",
              top: "-15px",
              right: "20px",
              background: "gold",
              color: "black",
              padding: "5px 15px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "bold"
            }}>
              COMING SOON
            </div>
            <h2 style={{ color: "gold", marginBottom: "10px" }}>PRO</h2>
            <p style={{ color: "#aaa", marginBottom: "30px" }}>Enhanced Features</p>
            <p style={{ fontSize: "40px", color: "gold", fontWeight: "bold", marginBottom: "30px" }}>$4.99<span style={{ fontSize: "18px" }}>/month</span></p>
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "30px", textAlign: "left" }}>
              <li style={{ padding: "12px 0", borderBottom: "1px solid #222", color: "#ddd" }}>✓ Everything in Free</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid #222", color: "#ddd" }}>✓ Advanced Tools</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid #222", color: "#ddd" }}>✓ Priority Support</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid #222", color: "#ddd" }}>✓ Custom Workflows</li>
              <li style={{ padding: "12px 0", borderBottom: "1px solid #222", color: "#ddd" }}>✓ Ad-Free Experience</li>
              <li style={{ padding: "12px 0", color: "#ddd" }}>✓ Offline Mode</li>
            </ul>
            <button style={{
              background: "none",
              color: "gold",
              border: "2px solid gold",
              padding: "12px 30px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
              fontSize: "16px"
            }} disabled>
              Coming Soon
            </button>
          </div>
        </div>

        <div style={{
          marginTop: "60px",
          background: "#0c1022",
          border: "1px solid gold",
          borderRadius: "8px",
          padding: "40px",
          textAlign: "center"
        }}>
          <h2 style={{ color: "gold", marginBottom: "20px" }}>Why Choose Huzaifa?</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px"
          }}>
            <div>
              <p style={{ fontSize: "30px", marginBottom: "10px" }}>🔒</p>
              <h3 style={{ color: "gold", marginBottom: "10px" }}>100% Secure</h3>
              <p style={{ color: "#aaa" }}>All processing happens on your device. Your data is never sent to our servers.</p>
            </div>
            <div>
              <p style={{ fontSize: "30px", marginBottom: "10px" }}>⚡</p>
              <h3 style={{ color: "gold", marginBottom: "10px" }}>Lightning Fast</h3>
              <p style={{ color: "#aaa" }}>No waiting for API calls or server processing. Get instant results.</p>
            </div>
            <div>
              <p style={{ fontSize: "30px", marginBottom: "10px" }}>💯</p>
              <h3 style={{ color: "gold", marginBottom: "10px" }}>Always Free</h3>
              <p style={{ color: "#aaa" }}>All 50+ tools are completely free. No hidden fees or premium paywalls.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Pricing;
