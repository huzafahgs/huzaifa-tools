import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../App.css";
import logo from "../assets/logo.png";
import LiveWallpaper from "./LiveWallpaper";
import SiteFooter from "./SiteFooter";
import "../styles/design-v2.css";

const navItems = [
  { to: "/", label: "Home", icon: "⌂", end: true },
  { to: "/all-tools", label: "All Tools", icon: "▦" },
  { to: "/blog", label: "Blog", icon: "▤" },
  { to: "/pricing", label: "Free access", icon: "◇" },
  { to: "/about-us", label: "About", icon: "◎" },
  { to: "/contact", label: "Contact", icon: "↗" },
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
  const sidebar = useRef(null);
  const toggle = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sidebar.current?.querySelector("a")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const items = [
          toggle.current,
          ...sidebar.current.querySelectorAll("a,button"),
        ];
        const index = items.indexOf(document.activeElement);
        if (event.shiftKey && index <= 0) {
          event.preventDefault();
          items.at(-1).focus();
        } else if (
          !event.shiftKey &&
          (index === items.length - 1 || index === -1)
        ) {
          event.preventDefault();
          items[0].focus();
        }
      }
    };
    const desktop = matchMedia("(min-width: 769px)");
    const resize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", resize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", resize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="container design-v2">
      <LiveWallpaper />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <button
        ref={toggle}
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

      <aside
        ref={sidebar}
        id="sidebar-nav"
        className={`sidebar${menuOpen ? " is-open" : ""}`}
      >
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

      <div className="main-column" inert={menuOpen ? true : undefined}>
        <div className="workspace-bar">
          <Link to="/">
            HGS <span>/</span> HUZAIFA TOOLS
          </Link>
          <Link to="/all-tools">
            Your next task, simplified <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <main className="main" id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

export default Layout;
