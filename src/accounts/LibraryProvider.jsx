import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import tools from "../toolsData";
import { useAuth } from "./AuthProvider";
import { getClient } from "./client";
import { readBrowserGuest, writeGuest } from "./local";
const Context = createContext(null);
export const useLibrary = () => useContext(Context);
const empty = () => ({ favorites: [], history: [] });
export default function LibraryProvider({ children }) {
  const { user, status } = useAuth();
  const owner =
    user?.id ||
    (status === "ready" || status === "unconfigured" ? "guest" : null);
  const ownerRef = useRef(owner);
  useLayoutEffect(() => {
    ownerRef.current = owner;
  }, [owner]);
  const [state, setState] = useState({ owner: null, ...empty() });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const read = async (id) => {
    if (id === "guest") return readBrowserGuest(tools);
    const client = await getClient();
    const [fav, hist] = await Promise.all([
      client.from("account_favorites").select("tool_slug").eq("user_id", id),
      client
        .from("account_history")
        .select("tool_slug,visited_at")
        .eq("user_id", id)
        .order("visited_at", { ascending: false })
        .limit(100),
    ]);
    if (fav.error || hist.error) throw new Error("Database unavailable");
    return {
      favorites: fav.data.map((r) => r.tool_slug),
      history: hist.data.map((r) => ({
        slug: r.tool_slug,
        timestamp: r.visited_at,
      })),
    };
  };
  useEffect(() => {
    let active = true;
    setError("");
    if (owner)
      read(owner)
        .then((data) => {
          if (active) setState({ owner, ...data });
        })
        .catch(() => {
          if (active)
            setError(
              "Your saved tools could not be loaded. Please refresh to retry.",
            );
        });
    return () => {
      active = false;
    };
  }, [owner]);
  const ready = Boolean(owner && state.owner === owner);
  const data = ready ? state : empty();
  const mutate = async (kind, slug) => {
    if (!ready || lock.current) return false;
    if (slug && !tools.some((t) => t.slug === slug)) return false;
    const id = owner;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      if (id === "guest") {
        const next = readBrowserGuest(tools);
        if (kind === "favorite")
          next.favorites = next.favorites.includes(slug)
            ? next.favorites.filter((s) => s !== slug)
            : [...next.favorites, slug];
        if (kind === "visit")
          next.history = [
            { slug, timestamp: new Date().toISOString() },
            ...next.history.filter((r) => r.slug !== slug),
          ];
        if (kind === "remove")
          next.history = next.history.filter((r) => r.slug !== slug);
        if (kind === "clear") next.history = [];
        writeGuest(window.localStorage, next, tools);
      } else {
        const client = await getClient();
        let result;
        if (kind === "favorite")
          result = data.favorites.includes(slug)
            ? await client
                .from("account_favorites")
                .delete()
                .eq("user_id", id)
                .eq("tool_slug", slug)
            : await client
                .from("account_favorites")
                .upsert(
                  { user_id: id, tool_slug: slug },
                  { onConflict: "user_id,tool_slug", ignoreDuplicates: true },
                );
        if (kind === "visit")
          result = await client
            .from("account_history")
            .upsert(
              { user_id: id, tool_slug: slug },
              { onConflict: "user_id,tool_slug" },
            );
        if (kind === "remove" || kind === "clear") {
          let query = client.from("account_history").delete().eq("user_id", id);
          if (slug) query = query.eq("tool_slug", slug);
          result = await query;
        }
        if (kind === "import") {
          const guest = readBrowserGuest(tools);
          // Preserve cloud timestamps; imported visits receive the server import time.
          const favorites = guest.favorites.map((tool_slug) => ({
            user_id: id,
            tool_slug,
          }));
          const history = guest.history.map((r) => ({
            user_id: id,
            tool_slug: r.slug,
          }));
          if (favorites.length) {
            const r = await client.from("account_favorites").upsert(favorites, {
              onConflict: "user_id,tool_slug",
              ignoreDuplicates: true,
            });
            if (r.error) throw r.error;
          }
          if (history.length) {
            const r = await client.from("account_history").upsert(history, {
              onConflict: "user_id,tool_slug",
              ignoreDuplicates: true,
            });
            if (r.error) throw r.error;
          }
          result = {};
        }
        if (result?.error) throw result.error;
      }
      const next = await read(id);
      if (ownerRef.current === id) setState({ owner: id, ...next });
      return true;
    } catch {
      if (ownerRef.current === id)
        setError(
          "Could not save this change. Check your connection or browser storage and try again.",
        );
      return false;
    } finally {
      lock.current = false;
      setBusy(false);
    }
  };
  return (
    <Context.Provider
      value={{
        ...data,
        owner,
        ready,
        busy,
        error:
          status === "error"
            ? "Account service unavailable. Refresh to retry."
            : error,
        mutate,
        cloud: Boolean(user),
      }}
    >
      {children}
    </Context.Provider>
  );
}
