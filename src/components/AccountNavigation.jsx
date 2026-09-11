import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../accounts/AuthProvider";
import { getClient } from "../accounts/client";

export default function AccountNavigation() {
  const { user, status } = useAuth();
  const location = useLocation();
  const menu = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [location.pathname, user?.id]);
  useEffect(() => {
    const close = (event) => {
      if (!menu.current?.open) return;
      if (event.type === "keydown" && event.key === "Escape") {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      } else if (
        event.type !== "keydown" &&
        !menu.current.contains(event.target)
      ) {
        menu.current.open = false;
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("focusin", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("focusin", close);
      document.removeEventListener("keydown", close);
    };
  }, []);
  async function logout() {
    setBusy(true);
    setError("");
    try {
      const client = await getClient();
      const { error } = await client.auth.signOut({ scope: "local" });
      if (error) throw error;
    } catch {
      setError("Could not sign out. Please retry.");
    } finally {
      setBusy(false);
    }
  }
  if (status === "loading")
    return (
      <span className="account-nav-loading" role="status">
        Checking account…
      </span>
    );
  if (!user)
    return (
      <Link className="account-nav-trigger" to="/login">
        Sign In
      </Link>
    );
  return (
    <details className="account-navigation" ref={menu}>
      <summary className="account-nav-trigger">
        Account <span aria-hidden="true">▾</span>
      </summary>
      <nav className="account-nav-panel" aria-label="Account menu">
        <Link to="/account">Account</Link>
        <Link to="/history">History</Link>
        <Link to="/favorites">Favorites</Link>
        <button type="button" disabled={busy} onClick={logout}>
          {busy ? "Signing out…" : "Logout"}
        </button>
        {error && <p role="alert">{error}</p>}
      </nav>
    </details>
  );
}
