import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import logo from "../assets/logo.png";
import LiveWallpaper from "./LiveWallpaper";
import SiteFooter from "./SiteFooter";

const navItems = [
  { to: "/", label: "Home", icon: "🏠", end: true },
  { to: "/all-tools", label: "All Tools", icon: "🧰" },
  { to: "/blog", label: "Blog", icon: "📰" },
  { to: "/pricing", label: "Pricing", icon: "💰" },
  { to: "/about-us", label: "About", icon: "ℹ️" },
  { to: "/contact", label: "Contact", icon: "📞" },
];

const legalLinks = [
  { to: "/about-us", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy-policy", label: "Privacy" },
  { to: "/terms-conditions", label: "Terms" },
  { to: "/disclaimer", label: "Disclaimer" },
];

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="container">
      <LiveWallpaper />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="sidebar-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "✕ Close" : "☰ Menu"}
      </button>

      <div
        className={`sidebar-overlay${menuOpen ? " is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside id="sidebar-nav" className={`sidebar${menuOpen ? " is-open" : ""}`}>
        <Link to="/" className="sidebar-brand" onClick={closeMenu}>
          <img
            src={logo}
            alt="Huzaifa Tools logo"
            className="logo"
            width="120"
            height="120"
            loading="eager"
            decoding="async"
          />
          <h2 className="brand">Huzaifa Tools</h2>
          <p className="brand-sub">Huzaifa Group of Software</p>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="menu">
            {navItems.map(({ to, label, icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `menu-link${isActive ? " is-active" : ""}`
                  }
                  onClick={closeMenu}
                >
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p>Powered by</p>
          <p className="brand-line">Huzaifa Group of Software</p>
          <nav className="legal-links" aria-label="Legal and trust pages">
            {legalLinks.map(({ to, label }) => (
              <Link key={to} to={to} onClick={closeMenu}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div className="main-column">
        <main className="main" id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

export default Layout;
