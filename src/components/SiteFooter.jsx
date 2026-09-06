import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "../constants/contact";

const footerLinks = [
  { to: "/about-us", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-conditions", label: "Terms & Conditions" },
  { to: "/disclaimer", label: "Disclaimer" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <p className="site-footer__brand">Huzaifa Tools</p>
      <p className="site-footer__tagline">
        Free browser-based tools by Huzaifa Group of Software
      </p>

      <nav className="site-footer__nav" aria-label="Footer">
        {footerLinks.map((item) => (
          <Link key={item.to} to={item.to} className="site-footer__link">
            {item.label}
          </Link>
        ))}
      </nav>

      <p className="site-footer__contact">
        Contact:{" "}
        <a
          className="site-footer__email"
          href={`mailto:${CONTACT_EMAIL}`}
        >
          {CONTACT_EMAIL}
        </a>
      </p>

      <p className="site-footer__copy">
        © {year} Huzaifa Tools. All rights reserved.
      </p>
      <p className="brand-line">Powered by Huzaifa Group of Software</p>
    </footer>
  );
}
