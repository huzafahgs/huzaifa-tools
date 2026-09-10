import { useState } from "react";
import { Link } from "react-router-dom";
import { AccountFrame } from "./Accounts";
import { useLibrary } from "../accounts/LibraryProvider";
import tools from "../toolsData";
export default function SavedTools({ history = false }) {
  const library = useLibrary();
  const [confirm, setConfirm] = useState(false);
  const entries = history
    ? library.history
    : library.favorites.map((slug) => ({ slug }));
  return (
    <AccountFrame title={history ? "Recently opened tools" : "Your favorites"}>
      <p>
        {library.cloud ? (
          "These records sync with your account."
        ) : (
          <>
            Saved on this browser. <Link to="/login">Sign in</Link> to use cloud
            storage; guest records are imported only when you choose.
          </>
        )}
      </p>
      <p>
        History keeps the latest visit for each tool, up to 100 tools. It never
        saves text, passwords, calculations or files entered into a tool.
      </p>
      {library.error && (
        <p role="alert" className="account-error">
          {library.error}
        </p>
      )}
      {!library.ready && !library.error ? (
        <p role="status">Loading saved tools…</p>
      ) : entries.length ? (
        <>
          {history &&
            (confirm ? (
              <div className="account-notice">
                <p>
                  Delete all history from{" "}
                  {library.cloud ? "your account" : "this browser"}?
                </p>
                <button
                  disabled={library.busy}
                  onClick={async () => {
                    if (await library.mutate("clear")) setConfirm(false);
                  }}
                >
                  Yes, clear history
                </button>{" "}
                <button onClick={() => setConfirm(false)}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setConfirm(true)}>Clear history</button>
            ))}
          <ul className="saved-tools">
            {entries.map((entry) => {
              const tool = tools.find((t) => t.slug === entry.slug);
              return tool ? (
                <li key={entry.slug}>
                  <div>
                    <Link to={`/${tool.slug}`}>{tool.name}</Link>
                    {history && (
                      <time dateTime={entry.timestamp}>
                        {new Date(entry.timestamp).toLocaleString()}
                      </time>
                    )}
                  </div>
                  <button
                    aria-label={`Remove ${tool.name}`}
                    disabled={library.busy}
                    onClick={() =>
                      library.mutate(history ? "remove" : "favorite", tool.slug)
                    }
                  >
                    Remove
                  </button>
                </li>
              ) : null;
            })}
          </ul>
        </>
      ) : (
        <p>
          No {history ? "recent tools" : "favorites"} yet.{" "}
          <Link to="/all-tools">Explore all tools</Link>
          {!history && " and use Save favorite on a tool page."}
        </p>
      )}
    </AccountFrame>
  );
}
