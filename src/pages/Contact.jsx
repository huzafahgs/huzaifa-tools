import Layout from "../components/Layout";
import { CONTACT_EMAIL } from "../constants/contact";
import { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return;
    }

    const body = [
      `Name: ${formData.name}`,
      `Reply-to: ${formData.email}`,
      "",
      formData.message,
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <Layout title="Contact">
      <section className="page-shell contact-page">
        <header className="page-header">
          <h1>Contact Us</h1>
          <p>
            Reach Huzaifa Group of Software for product questions, feedback, or support.
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-panel">
            <h2>Send a message</h2>
            {submitted && (
              <div className="form-status form-status--success" role="status" aria-live="polite">
                Your email app should open with the message ready to send.
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Your message..."
                />
              </div>
              <button type="submit" className="btn-primary contact-submit">
                Open email to send
              </button>
            </form>
          </div>

          <aside className="contact-aside">
            <div className="info-card">
              <h2>Email</h2>
              <p>
                <a className="contact-email-link" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="info-card__note">
                This is the official contact address for Huzaifa Tools.
              </p>
            </div>

            <div className="info-card">
              <h2>Company</h2>
              <p>Huzaifa Group of Software</p>
              <p className="info-card__note">
                Building free, practical browser tools for developers, students, and businesses.
              </p>
            </div>

            <div className="info-card">
              <h2>Helpful links</h2>
              <nav className="contact-quick-links" aria-label="Helpful links">
                <Link to="/about-us">About Us</Link>
                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="/terms-conditions">Terms & Conditions</Link>
                <Link to="/disclaimer">Disclaimer</Link>
                <Link to="/all-tools">All Tools</Link>
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

export default Contact;
