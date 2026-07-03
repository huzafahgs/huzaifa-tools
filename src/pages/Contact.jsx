import Layout from "../components/Layout";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all fields");
      return;
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Layout title="Contact">
      <section style={{ padding: "40px" }}>
        <h1 style={{ color: "gold", marginBottom: "30px", textAlign: "center" }}>📞 Contact Us</h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {/* Contact Form */}
          <div>
            <h2 style={{ color: "gold", marginBottom: "20px" }}>Send us a Message</h2>
            {submitted && (
              <div style={{
                background: "#1a3a1a",
                border: "1px solid #4caf50",
                color: "#4caf50",
                padding: "15px",
                borderRadius: "5px",
                marginBottom: "20px"
              }}>
                ✓ Thank you! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "gold", display: "block", marginBottom: "8px" }}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#0a0d1a",
                    border: "1px solid #333",
                    borderRadius: "5px",
                    color: "white",
                    boxSizing: "border-box"
                  }}
                  placeholder="Your name"
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "gold", display: "block", marginBottom: "8px" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#0a0d1a",
                    border: "1px solid #333",
                    borderRadius: "5px",
                    color: "white",
                    boxSizing: "border-box"
                  }}
                  placeholder="your@email.com"
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "gold", display: "block", marginBottom: "8px" }}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#0a0d1a",
                    border: "1px solid #333",
                    borderRadius: "5px",
                    color: "white",
                    boxSizing: "border-box"
                  }}
                  placeholder="Subject"
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "gold", display: "block", marginBottom: "8px" }}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#0a0d1a",
                    border: "1px solid #333",
                    borderRadius: "5px",
                    color: "white",
                    minHeight: "150px",
                    boxSizing: "border-box"
                  }}
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                style={{
                  background: "gold",
                  color: "black",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "100%"
                }}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 style={{ color: "gold", marginBottom: "20px" }}>Get in Touch</h2>
            <div style={{
              background: "#0c1022",
              border: "1px solid gold",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <h3 style={{ color: "gold", marginBottom: "10px" }}>📧 Email</h3>
              <p style={{ color: "#ddd" }}>support@huzaifahub.com</p>
              <p style={{ color: "#ddd" }}>info@huzaifahub.com</p>
            </div>

            <div style={{
              background: "#0c1022",
              border: "1px solid gold",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px"
            }}>
              <h3 style={{ color: "gold", marginBottom: "10px" }}>🌐 Social Media</h3>
              <p style={{ color: "#ddd" }}>Follow us on social media for updates:</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <a href="#" style={{ color: "gold", textDecoration: "none" }}>Twitter</a>
                <a href="#" style={{ color: "gold", textDecoration: "none" }}>Facebook</a>
                <a href="#" style={{ color: "gold", textDecoration: "none" }}>Instagram</a>
                <a href="#" style={{ color: "gold", textDecoration: "none" }}>LinkedIn</a>
              </div>
            </div>

            <div style={{
              background: "#0c1022",
              border: "1px solid gold",
              borderRadius: "8px",
              padding: "20px"
            }}>
              <h3 style={{ color: "gold", marginBottom: "10px" }}>💼 Company</h3>
              <p style={{ color: "#ddd" }}>Huzaifa Group of Software</p>
              <p style={{ color: "#aaa", fontSize: "14px" }}>Building premium tools for developers, students, and businesses.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Contact;
