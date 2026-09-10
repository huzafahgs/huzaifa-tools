import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../accounts/AuthProvider";
import { callbackUrl, getClient } from "../accounts/client";
import { useLibrary } from "../accounts/LibraryProvider";
import { readBrowserGuest } from "../accounts/local";
import tools from "../toolsData";
import "../styles/accounts.css";

export function AccountFrame({ title, children }) {
  return (
    <Layout>
      <section className="account-page">
        <p className="account-eyebrow">HUZAIFA ACCOUNTS</p>
        <h1>{title}</h1>
        <div className="account-panel">{children}</div>
        <nav className="account-links" aria-label="Account navigation">
          <Link to="/account">Account</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/history">History</Link>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/contact">Help</Link>
        </nav>
      </section>
    </Layout>
  );
}

export default function Accounts() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, status, recovery } = useAuth();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setMessage("");
    setError("");
  }, [pathname]);
  useEffect(() => {
    if (pathname !== "/auth/callback" || status !== "ready" || !user) return;
    // Remove the one-time auth code/hash from browser history.
    navigate(recovery ? "/reset-password" : "/account", { replace: true });
  }, [pathname, status, user, recovery, navigate]);
  const signup = pathname === "/signup",
    forgot = pathname === "/forgot-password",
    reset = pathname === "/reset-password";
  const title = signup
    ? "Create your account"
    : forgot
      ? "Reset your password"
      : reset
        ? "Choose a new password"
        : pathname === "/account"
          ? "Your account"
          : pathname === "/auth/callback"
            ? "Confirming your account"
            : "Welcome back";
  if (pathname === "/account" && status === "ready" && !user)
    return <Navigate to="/login" replace />;
  if (pathname === "/account" && user) return <Profile key={user.id} />;
  if (user && (pathname === "/login" || signup))
    return <Navigate to="/account" replace />;
  const unavailable = status === "unconfigured" || status === "error";
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    const values = new FormData(event.currentTarget);
    const email = String(values.get("email") || "").trim();
    const password = String(values.get("password") || "");
    if ((signup || reset) && password !== values.get("confirm")) {
      setError("The passwords do not match.");
      return;
    }
    if (unavailable) {
      setError(
        "Accounts are not available yet. You can still use all tools without signing in.",
      );
      return;
    }
    setBusy(true);
    try {
      const client = await getClient();
      let result;
      if (signup)
        result = await client.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: callbackUrl() },
        });
      else if (forgot)
        result = await client.auth.resetPasswordForEmail(email, {
          redirectTo: callbackUrl(),
        });
      else if (reset) result = await client.auth.updateUser({ password });
      else result = await client.auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;
      event.target.reset();
      if (signup)
        setMessage(
          "If registration can proceed, a confirmation email will arrive. Open it in this browser. Already registered? Sign in or reset your password.",
        );
      else if (forgot)
        setMessage(
          "If an account matches that address, a reset link will arrive. Open it in this browser.",
        );
      else if (reset) {
        setMessage("Password updated.");
        navigate("/account", { replace: true });
      } else navigate("/account", { replace: true });
    } catch {
      setError(
        forgot
          ? "The request could not be completed. Please wait and try again."
          : signup
            ? "Registration could not be completed. Check your details, try signing in, or retry later."
            : reset
              ? "The password could not be updated. Request a fresh reset link and try again."
              : "Unable to sign in. Check your email and password, confirm your email, or try again later.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <AccountFrame title={title}>
      {status === "loading" ? (
        <p role="status">Checking your session…</p>
      ) : pathname === "/auth/callback" ? (
        <p role="status">
          {user
            ? "Opening your account…"
            : "This link could not establish a session. It may have expired or been opened in another browser."}{" "}
          <Link to="/login">Sign in</Link> or{" "}
          <Link to="/forgot-password">request a new reset link</Link>.
        </p>
      ) : (
        <>
          {unavailable && (
            <p role="status" className="account-notice">
              Accounts are awaiting service setup. All tools remain available
              without an account.
            </p>
          )}
          {reset && !user ? (
            <p>
              Open a valid password-reset email in this browser first.{" "}
              <Link to="/forgot-password">Request a new link</Link>.
            </p>
          ) : (
            <form className="account-form" onSubmit={submit}>
              {!reset && (
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                  />
                </label>
              )}
              {!forgot && (
                <label>
                  {reset ? "New password" : "Password"}
                  <input
                    name="password"
                    type="password"
                    autoComplete={
                      signup || reset ? "new-password" : "current-password"
                    }
                    required
                    minLength={signup || reset ? 12 : 1}
                    maxLength={128}
                  />
                </label>
              )}
              {(signup || reset) && (
                <>
                  <p>
                    Use at least 12 characters. A unique passphrase works well.
                  </p>
                  <label>
                    Confirm password
                    <input
                      name="confirm"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={12}
                      maxLength={128}
                    />
                  </label>
                </>
              )}
              <button disabled={busy} type="submit">
                {busy
                  ? "Please wait…"
                  : signup
                    ? "Create account"
                    : forgot
                      ? "Send reset link"
                      : reset
                        ? "Update password"
                        : "Sign in"}
              </button>
            </form>
          )}
          {message && (
            <p role="status" className="account-notice">
              {message}
            </p>
          )}
          {error && (
            <p role="alert" className="account-error">
              {error}
            </p>
          )}
          <nav className="account-links" aria-label="Sign in options">
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Create account</Link>
            <Link to="/forgot-password">Forgot password?</Link>
          </nav>
          <p>
            Your favorites and recently opened tools can sync across devices.
            Tool inputs and uploaded files are not included in account history.
          </p>
          <p>
            By creating an account, you agree to the{" "}
            <Link to="/terms-conditions">Terms</Link>. Read our{" "}
            <Link to="/privacy-policy">Privacy policy</Link>.
          </p>
        </>
      )}
    </AccountFrame>
  );
}

function Profile() {
  const { user } = useAuth();
  const library = useLibrary();
  const [name, setName] = useState(""),
    [loaded, setLoaded] = useState(false),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  const guest = readBrowserGuest(tools);
  useEffect(() => {
    let active = true;
    getClient()
      .then((c) =>
        c
          .from("account_profiles")
          .select("display_name")
          .eq("user_id", user.id)
          .maybeSingle(),
      )
      .then(({ data, error }) => {
        if (!active) return;
        if (error)
          setError("Your profile could not be loaded. Refresh to retry.");
        else {
          setName(data?.display_name || "");
          setLoaded(true);
        }
      })
      .catch(() => {
        if (active) setError("Your profile could not be loaded.");
      });
    return () => {
      active = false;
    };
  }, [user.id]);
  const save = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const c = await getClient();
      const r = await c
        .from("account_profiles")
        .upsert(
          { user_id: user.id, display_name: name.trim() },
          { onConflict: "user_id" },
        );
      if (r.error) throw r.error;
      setMessage("Display name saved.");
    } catch {
      setError("Your display name could not be saved. Please try again.");
    } finally {
      setBusy(false);
    }
  };
  const logout = async () => {
    setBusy(true);
    setError("");
    try {
      const c = await getClient();
      const r = await c.auth.signOut({ scope: "local" });
      if (r.error) throw r.error;
    } catch {
      setError("Sign out could not be completed. Please retry.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <AccountFrame title="Your account">
      <div className="account-avatar" aria-hidden="true">
        {(name || user.email || "H").slice(0, 1).toUpperCase()}
      </div>
      <p className="account-email">{user.email}</p>
      <p>Created {new Date(user.created_at).toLocaleDateString()}</p>
      <form className="account-form" onSubmit={save}>
        <label>
          Display name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            autoComplete="nickname"
            disabled={!loaded}
          />
        </label>
        <button disabled={!loaded || busy}>Save display name</button>
      </form>
      {message && <p role="status">{message}</p>}
      {error && (
        <p role="alert" className="account-error">
          {error}
        </p>
      )}
      <h2>Bring your saved tools with you</h2>
      <p>
        This browser has {guest.favorites.length} guest favorites and{" "}
        {guest.history.length} recent tools. Importing copies only tool
        identifiers into your account. Existing cloud records are kept; newly
        imported history is dated at import time. Guest records remain on this
        browser.
      </p>
      <button
        disabled={
          !library.ready ||
          library.busy ||
          (!guest.favorites.length && !guest.history.length)
        }
        onClick={async () => {
          if (await library.mutate("import"))
            setMessage("Guest records imported.");
        }}
      >
        Import guest favorites and history
      </button>
      {library.error && <p role="alert">{library.error}</p>}
      <div className="account-links">
        <Link to="/reset-password">Change password</Link>
        <button disabled={busy} onClick={logout}>
          Sign out on this device
        </button>
      </div>
      <p>
        For account deletion, <Link to="/contact">contact HGS</Link>. History
        and favorites can be deleted from their pages.
      </p>
    </AccountFrame>
  );
}
