import Layout from "../components/Layout";

function AboutUs() {
  return (
    <Layout title="About Us">
      <section style={{ padding: "40px" }}>
        <h1 style={{ color: "gold", marginBottom: "30px", textAlign: "center" }}>ℹ️ About Us</h1>

        <div style={{
          background: "#0c1022",
          border: "1px solid gold",
          borderRadius: "8px",
          padding: "40px",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.6",
          color: "#ddd"
        }}>
          <h2 style={{ color: "gold", marginBottom: "20px" }}>Who We Are</h2>
          <p style={{ marginBottom: "20px" }}>
            Welcome to <strong>Huzaifa Tools</strong>, a premier web platform designed and powered by <strong>Huzaifa Group of Software</strong>. 
            Our mission is to empower developers, students, content creators, and businesses with a comprehensive suite of highly 
            efficient, secure, and user-friendly digital utilities.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "20px" }}>Our Mission</h2>
          <p style={{ marginBottom: "20px" }}>
            We believe that high-quality, practical tools should be accessible to everyone without any cost, paywalls, or privacy concerns. 
            That is why we offer all of our tools completely free of charge, running directly inside your browser so that your data 
            never leaves your device.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "20px" }}>What Makes Us Unique?</h2>
          <ul style={{ listStyleType: "square", paddingLeft: "20px", marginBottom: "20px" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong style={{ color: "gold" }}>100% Client-Side Processing:</strong> Your security is our utmost priority. Almost all computations and operations are performed on your machine, ensuring your sensitive data remains entirely private.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong style={{ color: "gold" }}>No Account or Sign-Up Needed:</strong> Get right to work. There are no registration forms, subscriptions, or subscription requirements to access any of our tools.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong style={{ color: "gold" }}>Lightning Fast Experience:</strong> By utilizing modern client-side technologies, our web applications execute instantly without relying on delayed server communication.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong style={{ color: "gold" }}>Mobile-First Design:</strong> Accessible on any device, whether you're working on a desktop PC, a tablet, or a smartphone on the go.
            </li>
          </ul>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "20px" }}>Our Growing Toolkit</h2>
          <p style={{ marginBottom: "20px" }}>
            From file converters and web utilities to developer aids, financial calculators, and design tools, we continuously design and 
            publish new components to support your daily digital tasks. 
          </p>

          <p style={{ marginTop: "40px", textAlign: "center", fontStyle: "italic", color: "gold" }}>
            Thank you for choosing Huzaifa Tools as your trusted digital utility partner!
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default AboutUs;
