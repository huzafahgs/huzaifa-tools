import Layout from "../components/Layout";

function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy">
      <section style={{ padding: "40px" }}>
        <h1 style={{ color: "gold", marginBottom: "30px", textAlign: "center" }}>🔒 Privacy Policy</h1>

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
            At <strong>Huzaifa Tools</strong>, accessible from our platform, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected and recorded by Huzaifa Tools and how we use it.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>1. Client-Side Operations</h2>
          <p style={{ marginBottom: "20px" }}>
            The vast majority of our tools operate entirely on your client device (web browser). This means that any files, data, text, or values you paste or upload to convert, calculate, format, or process are handled locally in your browser memory and are <strong>never sent to our servers</strong>. Your data remains 100% private and secure.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>2. Log Files</h2>
          <p style={{ marginBottom: "20px" }}>
            Huzaifa Tools follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and are a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>3. Cookies and Web Beacons</h2>
          <p style={{ marginBottom: "20px" }}>
            Like any other website, Huzaifa Tools uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            For example, cookies may be used to remember your favorite tools or history of tool usage across sessions locally.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>4. Third-Party Privacy Policies</h2>
          <p style={{ marginBottom: "20px" }}>
            Huzaifa Tools' Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h2 style={{ color: "gold", marginTop: "30px", marginBottom: "15px" }}>5. Consent</h2>
          <p style={{ marginBottom: "20px" }}>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>

          <p style={{ marginTop: "40px", textAlign: "center", fontStyle: "italic", color: "gold" }}>
            If you have any questions or require more information about our Privacy Policy, contact us at{" "}
            <a href="mailto:huzaifagroupofsoftware@gmail.com" style={{ color: "gold" }}>
              huzaifagroupofsoftware@gmail.com
            </a>.
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default PrivacyPolicy;
