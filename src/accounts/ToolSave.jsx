import { useEffect, useRef } from "react";
import { useLibrary } from "./LibraryProvider";
export default function ToolSave({ slug }) {
  const library = useLibrary();
  const visited = useRef(null);
  useEffect(() => {
    const key = `${library.owner}:${slug}`;
    if (!library.ready || library.busy || visited.current === key) return;
    visited.current = key;
    void library.mutate("visit", slug);
  }, [slug, library]);
  return (
    <div className="tool-save">
      <button
        type="button"
        disabled={!library.ready || library.busy}
        aria-pressed={library.favorites.includes(slug)}
        onClick={() => library.mutate("favorite", slug)}
      >
        {library.favorites.includes(slug)
          ? "★ Saved — remove favorite"
          : "☆ Save favorite"}
      </button>
      <small>
        {library.cloud ? "Account storage" : "Browser storage"} · History
        records tool visits only.
      </small>
      {library.error && <p role="alert">{library.error}</p>}
    </div>
  );
}
