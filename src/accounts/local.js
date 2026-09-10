const KEY = "hgs-guest-library-v1";
export function sanitizeLibrary(value, catalog) {
  const valid = new Set(catalog.map((t) => t.slug));
  const favorites = [
    ...new Set(
      (Array.isArray(value?.favorites) ? value.favorites : []).filter((s) =>
        valid.has(s),
      ),
    ),
  ];
  const history = new Map();
  for (const item of Array.isArray(value?.history) ? value.history : []) {
    if (!valid.has(item?.slug) || typeof item.timestamp !== "string") continue;
    const time = Date.parse(item.timestamp);
    if (!Number.isFinite(time) || time > Date.now() + 60000) continue;
    const record = { slug: item.slug, timestamp: new Date(time).toISOString() };
    if (
      !history.has(item.slug) ||
      history.get(item.slug).timestamp < record.timestamp
    )
      history.set(item.slug, record);
  }
  return {
    favorites,
    history: [...history.values()]
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, 100),
  };
}
export function readGuest(storage, catalog) {
  try {
    const saved = storage.getItem(KEY);
    if (saved !== null) return sanitizeLibrary(JSON.parse(saved), catalog);
    let favorites = [],
      history = [];
    try {
      const old = JSON.parse(storage.getItem("favoriteTools") || "[]");
      favorites = Array.isArray(old)
        ? old.map((name) => catalog.find((t) => t.name === name)?.slug)
        : [];
    } catch {
      /* Ignore corrupt legacy records. */
    }
    try {
      history = JSON.parse(storage.getItem("toolHistory") || "[]");
    } catch {
      /* Ignore corrupt legacy records. */
    }
    return sanitizeLibrary({ favorites, history }, catalog);
  } catch {
    return { favorites: [], history: [] };
  }
}
export function writeGuest(storage, value, catalog) {
  const clean = sanitizeLibrary(value, catalog);
  storage.setItem(KEY, JSON.stringify(clean));
  // Once safely migrated, remove obsolete copies so deletions stay meaningful.
  storage.removeItem?.("favoriteTools");
  storage.removeItem?.("toolHistory");
  return clean;
}

export function readBrowserGuest(catalog) {
  try {
    return readGuest(window.localStorage, catalog);
  } catch {
    return { favorites: [], history: [] };
  }
}
