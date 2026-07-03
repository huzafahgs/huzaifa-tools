import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.png";

function Layout({ children, title }) {
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Huzaifa Logo" className="logo" />
          <h2 className="brand">HUZAIFA</h2>
        </Link>

        <ul className="menu">
          <li><Link to="/" style={{ color: "inherit", textDecoration: "none" }}>🏠 Home</Link></li>
          <li><Link to="/all-tools" style={{ color: "inherit", textDecoration: "none" }}>🧰 All Tools</Link></li>
          <li><Link to="/favorites" style={{ color: "inherit", textDecoration: "none" }}>⭐ Favorites</Link></li>
          <li><Link to="/history" style={{ color: "inherit", textDecoration: "none" }}>🕒 History</Link></li>
          <li><Link to="/blog" style={{ color: "inherit", textDecoration: "none" }}>📰 Blog</Link></li>
          <li><Link to="/pricing" style={{ color: "inherit", textDecoration: "none" }}>💰 Pricing</Link></li>
          <li><Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>📞 Contact</Link></li>
        </ul>

        <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #222", fontSize: "12px", color: "#666", textAlign: "center" }}>
          <p>Powered by</p>
          <p style={{ color: "gold", fontWeight: "bold" }}>Huzaifa Group of Software</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        {children}
      </main>
    </div>
  );
}

export default Layout;
