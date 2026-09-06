import Layout from "../components/Layout";

function TermsConditions() {
  return (
    <Layout title="Terms & Conditions">
      <section style={{ padding: "40px" }}>
        <h1 style={{ color: "gold", marginBottom: "30px", textAlign: "center" }}>📜 Terms & Conditions</h1>

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
            Welcome to <strong>Huzaifa Tools</strong>! These terms and conditions outline the rules and regulations for the use of Huzaifa Tools' Website, located at our platform.
          </p>

          <p style={{ marginBottom: "20px" }}>
            By accessing this website, we assume you accept these terms and conditions. Do not continue to use Huzaifa Tools if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>1. License & Intellectual Property</h2>
          <p style={{ marginBottom: "20px" }}>
            Unless otherwise stated, Huzaifa Tools and/or its licensors own the intellectual property rights for all material on Huzaifa Tools. All intellectual property rights are reserved. You may access this from Huzaifa Tools for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p style={{ marginBottom: "20px" }}>
            You must not republish material from Huzaifa Tools, sell, rent, or sub-license material, reproduce, duplicate, or copy material, or redistribute content from Huzaifa Tools unless explicitly permitted by the authors.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>2. Acceptable Use</h2>
          <p style={{ marginBottom: "20px" }}>
            You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of Huzaifa Tools; or in any way which is unlawful, illegal, fraudulent, or harmful.
          </p>
          <p style={{ marginBottom: "20px" }}>
            Any automated scraping, high-frequency requests, or misuse of backend endpoints is strictly prohibited and may result in temporary or permanent IP blocking.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>3. No Warranties</h2>
          <p style={{ marginBottom: "20px" }}>
            This website is provided "as is," with all faults, and Huzaifa Tools expresses no representations or warranties, of any kind related to this website or the materials contained on this website. Also, nothing contained on this website shall be interpreted as advising you.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>4. Limitation of Liability</h2>
          <p style={{ marginBottom: "20px" }}>
            In no event shall Huzaifa Tools, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. Huzaifa Tools, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>5. Severability & Variation of Terms</h2>
          <p style={{ marginBottom: "20px" }}>
            If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
          </p>
          <p style={{ marginBottom: "20px" }}>
            Huzaifa Tools is permitted to revise these Terms at any time as it sees fit, and by using this website you are expected to review these Terms on a regular basis.
          </p>

          <p style={{ marginTop: "40px", textAlign: "center", fontStyle: "italic", color: "gold" }}>
            Questions about these Terms? Contact{" "}
            <a href="mailto:huzaifagroupofsoftware@gmail.com" style={{ color: "gold" }}>
              huzaifagroupofsoftware@gmail.com
            </a>.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default TermsConditions;
