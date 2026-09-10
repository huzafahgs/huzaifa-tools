import { createContext, useContext, useEffect, useState } from "react";
import { configured, getClient } from "./client";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export default function AuthProvider({ children }) {
  const [state, setState] = useState({
    status: configured ? "loading" : "unconfigured",
    user: null,
    recovery: false,
  });
  useEffect(() => {
    if (!configured) return;
    let active = true,
      subscription,
      revision = 0;
    getClient()
      .then((client) => {
        if (!active) return;
        const verify = async (session, recovery = false) => {
          const current = ++revision;
          if (!session) {
            setState({ status: "ready", user: null, recovery: false });
            return;
          }
          setState({ status: "loading", user: null, recovery });
          try {
            const { data, error } = await client.auth.getUser();
            if (active && current === revision)
              setState({
                status: error ? "error" : "ready",
                user: error ? null : data.user,
                recovery,
              });
          } catch {
            if (active && current === revision)
              setState({ status: "error", user: null, recovery: false });
          }
        };
        subscription = client.auth.onAuthStateChange((event, session) => {
          // Do not await another auth method inside the SDK's event lock.
          if (event === "TOKEN_REFRESHED") return;
          queueMicrotask(() => {
            if (active) verify(session, event === "PASSWORD_RECOVERY");
          });
        }).data.subscription;
      })
      .catch(() => {
        if (active) setState({ status: "error", user: null, recovery: false });
      });
    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
