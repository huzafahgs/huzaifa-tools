import Layout from "../components/Layout";

function Disclaimer() {
  return (
    <Layout title="Disclaimer">
      <section style={{ padding: "40px" }}>
        <h1 style={{ color: "gold", marginBottom: "30px", textAlign: "center" }}>⚠️ Disclaimer</h1>

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
          <p style={{ color: "gold", marginBottom: "20px", fontWeight: "bold" }}>
            Last Updated: July 8, 2026
          </p>

          <p style={{ marginBottom: "20px" }}>
            If you require any more information or have any questions about our site&apos;s disclaimer, please feel free to contact us by email at{" "}
            <a href="mailto:huzaifagroupofsoftware@gmail.com" style={{ color: "gold" }}>
              huzaifagroupofsoftware@gmail.com
            </a>.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>1. Disclaimers for Huzaifa Tools</h2>
          <p style={{ marginBottom: "20px" }}>
            All the information and tools on this website - Huzaifa Tools - are published in good faith and for general information purpose only. Huzaifa Tools does not make any warranties about the completeness, reliability, and accuracy of this information or tool calculations. 
          </p>
          <p style={{ marginBottom: "20px" }}>
            Any action you take upon the information you find on this website (Huzaifa Tools) is strictly at your own risk. Huzaifa Tools will not be liable for any losses and/or damages in connection with the use of our website.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>2. Professional & Financial Advice</h2>
          <p style={{ marginBottom: "20px" }}>
            The financial calculators, math utilities, converters, or coding helpers provided here are designed to assist you in various tasks, but they should <strong>not</strong> be considered professional, medical, legal, or financial advice. Please cross-verify any critical results, conversions, or generated passwords/keys before using them for production purposes.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>3. Consent</h2>
          <p style={{ marginBottom: "20px" }}>
            By using our website, you hereby consent to our disclaimer and agree to its terms.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>4. Update</h2>
          <p style={{ marginBottom: "20px" }}>
            Should we update, amend or make any changes to this document, those changes will be prominently posted here.
          </p>

          <p style={{ marginTop: "40px", textAlign: "center", fontStyle: "italic", color: "gold" }}>
            Thank you for using our web utilities responsibly!
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default Disclaimer;
