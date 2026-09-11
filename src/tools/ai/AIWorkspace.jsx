import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import aiTools from "../../data/aiTools";
import { useAuth } from "../../accounts/AuthProvider";
import { getClient } from "../../accounts/client";
import "./ai.css";

const LIMIT = 12000;
const defaults = (tool) =>
  Object.fromEntries(tool.fields.map((f) => [f.key, f.values[0]]));
export default function AIWorkspace() {
  const { slug } = useParams();
  const { user } = useAuth();
  // Remount on account or route changes so private drafts cannot cross users.
  return <Workspace key={`${slug}:${user?.id || 'guest'}`} user={user} tool={aiTools.find((t) => t.slug === slug)} />;
}
function Workspace({ tool, user }) {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(() => defaults(tool));
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [availability, setAvailability] = useState("checking");
  const active = useRef(null);
  const editor = useRef(null);
  const result = useRef(null);
  const owner = useRef(user?.id);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/ai", { signal: controller.signal, cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) =>
        setAvailability(data.configured ? "ready" : "unavailable"),
      )
      .catch(() => {
        if (!controller.signal.aborted) setAvailability("unavailable");
      });
    return () => {
      controller.abort();
      active.current?.abort();
      active.current = null;
    };
  }, []);
  const clear = () => {
    active.current?.abort();
    active.current = null;
    setBusy(false);
    setText("");
    setOutput("");
    setError("");
    setNotice("");
    setOptions(defaults(tool));
    editor.current?.focus();
  };
  const generate = async (event) => {
    event.preventDefault();
    if (active.current) return;
    setError("");
    setNotice("");
    if (text.trim().length < 20 || text.length > LIMIT) {
      setError(
        "Enter 20–12,000 characters with enough context for a useful result.",
      );
      editor.current?.focus();
      return;
    }
    if (!user) {
      setError("Sign in with a confirmed account to generate.");
      return;
    }
    if (availability !== "ready") {
      setError("AI generation is not available yet. Please try again later.");
      return;
    }
    const controller = new AbortController();
    active.current = controller;
    const requestOwner = user.id;
    const timeout = setTimeout(() => controller.abort(), 55000);
    setBusy(true);
    setOutput("");
    try {
      const client = await getClient();
      const { data, error: sessionError } = await client.auth.getSession();
      if (sessionError || !data.session?.access_token) throw new Error("auth");
      if (active.current !== controller || owner.current !== requestOwner)
        return;
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({ tool: tool.slug, text, options }),
        signal: controller.signal,
      });
      const dataOut = await response.json();
      if (active.current !== controller || owner.current !== requestOwner)
        return;
      if (!response.ok) {
        const safe = {
          auth: "Your session needs attention. Sign in again with a confirmed account.",
          invalid:
            "Check the input length and selected options, then try again.",
          limited:
            "Request limit reached. Wait at least 30 seconds. Daily limits reset at midnight UTC.",
          unavailable:
            "AI generation is not available yet. Please try again later.",
          incomplete:
            "No complete result was returned. Try a shorter or clearer request.",
        };
        setError(
          safe[dataOut.error] ||
            "The AI service could not complete this request. Please try again later.",
        );
      } else if (
        typeof dataOut.output === "string" &&
        dataOut.output.trim() &&
        dataOut.output.length <= 20000
      ) {
        setOutput(dataOut.output);
        setNotice("Result ready. Review it before use.");
      } else {
        setError("No complete result was returned. Please try again later.");
      }
    } catch {
      if (active.current === controller)
        setError(
          "The request could not finish. Check your connection and try again later.",
        );
    } finally {
      clearTimeout(timeout);
      if (active.current === controller) {
        active.current = null;
        setBusy(false);
      }
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setNotice("Result copied.");
    } catch {
      result.current?.focus();
      result.current?.select();
      setNotice(
        "Copy is unavailable here. The result is selected; use your device’s copy command.",
      );
    }
  };
  return (
    <section className="ai-workspace" aria-labelledby="ai-title">
      <header className="ai-hero">
        <div className="ai-orbit" aria-hidden="true">
          <span>✦</span>
        </div>
        <p className="ai-eyebrow">HUZAIFA AI STUDIO · WORDS WITH PURPOSE</p>
        <h1 id="ai-title">{tool.name}</h1>
        <p className="ai-intro">{tool.intro}</p>
        <div className="ai-badges">
          <span>✦ Guided generation</span>
          <span>Review before sharing</span>
          <span>Private drafts stay out of history</span>
        </div>
      </header>
      <div className="ai-service" role="status">
        {availability === "checking"
          ? "Checking AI service availability…"
          : availability === "unavailable"
            ? "AI generation is not available yet. You can explore the editor; no AI output will be generated until the service is enabled."
            : "AI requests require a confirmed account. Up to 10 requests per account per UTC day, at least 30 seconds apart, subject to shared service capacity."}
        {!user && (
          <>
            {" "}
            <Link to="/login">Sign in</Link> ·{" "}
            <Link to="/signup">Create an account</Link>
          </>
        )}
      </div>
      <form onSubmit={generate} className="ai-panels">
        <div className="ai-panel">
          <div className="ai-panel-heading">
            <h2>01 / Your brief</h2>
            <button
              type="button"
              onClick={() => {
                setText(tool.example);
                setNotice(
                  "Example loaded into the editor. Nothing has been sent.",
                );
                editor.current?.focus();
              }}
              disabled={busy}
            >
              Try an example
            </button>
          </div>
          <label htmlFor="ai-input">{tool.inputLabel}</label>
          <textarea
            ref={editor}
            id="ai-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={LIMIT}
            placeholder={tool.placeholder}
            aria-describedby="ai-input-count ai-privacy"
            disabled={busy}
            autoComplete="off"
            spellCheck="false"
          />
          <p id="ai-input-count" className="ai-counter">
            {text.length.toLocaleString()} / 12,000 characters · Minimum 20
          </p>
          <div className="ai-options">
            {tool.fields.map((field) => (
              <label key={field.key} htmlFor={`ai-${field.key}`}>
                {field.label}
                <select
                  id={`ai-${field.key}`}
                  value={options[field.key]}
                  disabled={busy}
                  onChange={(e) =>
                    setOptions({ ...options, [field.key]: e.target.value })
                  }
                >
                  {field.values.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="ai-actions">
            <button
              className="ai-generate"
              type="submit"
              disabled={busy || !user || availability !== "ready"}
            >
              {busy ? "Working on your request…" : tool.action}
            </button>
            <button type="button" onClick={clear}>
              {busy ? "Cancel & clear" : "Clear all"}
            </button>
          </div>
          <p id="ai-privacy" className="ai-fineprint">
            Generating sends your text to our server and OpenAI. Do not include
            passwords, tokens or confidential information. Prompts and results
            are not saved in account history.{" "}
            <Link to="/privacy-policy">Data handling</Link>
          </p>
          {error && (
            <p className="ai-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <div className="ai-panel ai-output" aria-busy={busy}>
          <div className="ai-panel-heading">
            <h2>02 / Your result</h2>
            <button type="button" onClick={copy} disabled={!output || busy}>
              Copy result
            </button>
          </div>
          {output ? (
            <>
              <label htmlFor="ai-result" className="sr-only">
                Generated result
              </label>
              <textarea id="ai-result" ref={result} readOnly value={output} />
              <p className="ai-fineprint">
                AI-generated draft. Verify facts, meaning and suitability.
              </p>
              {tool.refine && (
                <button
                  type="button"
                  onClick={() => {
                    if (output.length > LIMIT - 100) {
                      setNotice(
                        "This result is too long to refine here. Copy a shorter passage into the editor.",
                      );
                      return;
                    }
                    setText(
                      tool.slug === 'ai-writing-assistant' ? `Revise this draft according to the selected settings:\n\n${output}` : output,
                    );
                    setNotice(
                      "Draft moved to the editor. Add your refinement instructions before generating again.",
                    );
                    editor.current?.focus();
                  }}
                >
                  Refine this result
                </button>
              )}
            </>
          ) : (
            <div className={`ai-empty${busy ? " ai-empty--busy" : ""}`}>
              <span aria-hidden="true">✦</span>
              <h3>{busy ? "Shaping your words" : "A clear starting point"}</h3>
              <p>
                {busy
                  ? "This can take a little time. You can cancel and clear at any point."
                  : "Your result will appear here after a successful generation. Start with your own brief or explore an example."}
              </p>
            </div>
          )}
          <p className="ai-notice" role="status" aria-live="polite">
            {notice}
          </p>
        </div>
      </form>
      <section className="ai-faq" aria-labelledby="ai-faq-heading">
        <h2 id="ai-faq-heading">Before you use the result</h2>
        {tool.faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
        <details>
          <summary>What happens to my text?</summary>
          <p>
            The editor keeps drafts in memory, not saved browser history or
            account history. When you generate, your text goes through our
            server to OpenAI. We request no stored Responses API state; provider
            security retention may still apply. Usage protection stores your
            account ID, request count and timestamps, never your text. Clearing
            the editor cannot retract a request already sent.
          </p>
        </details>
        <p>
          <Link to="/word-counter">Check word count</Link> ·{" "}
          <Link to="/text-diff-checker">Compare revisions</Link> ·{" "}
          <Link to="/contact">Contact HGS</Link>
        </p>
      </section>
    </section>
  );
}
