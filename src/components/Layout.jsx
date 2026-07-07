import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import logo from "../assets/logo.png";

const navItems = [
  { to: "/", label: "Home", icon: "🏠", end: true },
  { to: "/all-tools", label: "All Tools", icon: "🧰" },
  { to: "/favorites", label: "Favorites", icon: "⭐" },
  { to: "/history", label: "History", icon: "🕒" },
  { to: "/blog", label: "Blog", icon: "📰" },
  { to: "/pricing", label: "Pricing", icon: "💰" },
  { to: "/contact", label: "Contact", icon: "📞" },
];

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="container">
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
        <Link to="/" style={{ textDecoration: "none" }} onClick={closeMenu}>
          <img src={logo} alt="Huzaifa Logo" className="logo" />
          <h2 className="brand">HUZAIFA</h2>
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
        </div>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}

export default Layout;
