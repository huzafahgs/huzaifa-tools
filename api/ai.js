import {
  MAX_BODY,
  validateInput,
  providerRequest,
  extractOutput,
} from "../server/ai.js";

export const config = { maxDuration: 60 };
const ORIGIN = "https://ai-tools-by-huzaifa.vercel.app";
const messages = {
  unavailable: "AI generation is not available yet. Please try again later.",
  invalid: "Enter 20–12,000 characters and choose the available options.",
  auth: "Please sign in with a confirmed account to generate.",
  limited:
    "Request limit reached. Wait at least 30 seconds; daily limits reset at midnight UTC.",
  provider:
    "The AI service could not complete this request. Please try again later.",
  incomplete:
    "No complete result was returned. Try a shorter or clearer request.",
};

// Dependencies can be injected by isolated tests; production always uses real fetch.
export function createHandler({ env = process.env, request = fetch } = {}) {
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    const send = (status, code) =>
      res.status(status).json({ error: code, message: messages[code] });
    if (!["GET", "POST"].includes(req.method)) {
      res.setHeader("Allow", "GET, POST");
      return res
        .status(405)
        .json({ error: "method", message: "Method not supported." });
    }
    const url = env.VITE_SUPABASE_URL;
    const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const configured = Boolean(
      env.OPENAI_API_KEY &&
      /^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url || "") &&
      key?.startsWith("sb_publishable_"),
    );
    if (req.method === "GET") {
      let catalogReady = false;
      if (
        /^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url || "") &&
        key?.startsWith("sb_publishable_")
      ) {
        try {
          const ready = await request(`${url}/rest/v1/rpc/ai_tools_ready`, {
            method: "POST",
            headers: { apikey: key, "Content-Type": "application/json" },
            body: "{}",
            signal: AbortSignal.timeout(8000),
          });
          catalogReady = ready.ok && (await ready.json()) === true;
        } catch {
          /* Remain unavailable until configuration is healthy. */
        }
      }
      return res
        .status(200)
        .json({
          configured: configured && catalogReady,
          catalogReady,
          requiresSignIn: true,
        });
    }
    if (
      req.headers.origin !== ORIGIN &&
      !(
        env.NODE_ENV !== "production" &&
        /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(req.headers.origin || "")
      )
    )
      return res
        .status(403)
        .json({
          error: "origin",
          message: "Open this tool on Huzaifa Tools to continue.",
        });
    if (!configured) return send(503, "unavailable");
    if (!/^application\/json(?:;|$)/i.test(req.headers["content-type"] || ""))
      return send(415, "invalid");
    if (Number(req.headers["content-length"]) > MAX_BODY)
      return send(413, "invalid");
    let body;
    try {
      if (
        typeof req.body === "string" &&
        Buffer.byteLength(req.body) > MAX_BODY
      )
        return send(413, "invalid");
      body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (Buffer.byteLength(JSON.stringify(body) || "") > MAX_BODY)
        return send(413, "invalid");
    } catch {
      return send(400, "invalid");
    }
    const input = validateInput(body);
    if (!input) return send(400, "invalid");
    const authorization = req.headers.authorization;
    if (
      typeof authorization !== "string" ||
      !/^Bearer [A-Za-z0-9._-]{20,4096}$/.test(authorization)
    )
      return send(401, "auth");
    const headers = {
      apikey: key,
      Authorization: authorization,
      "Content-Type": "application/json",
    };
    try {
      // Server verification, not a decoded or client-supplied user ID.
      const auth = await request(`${url}/auth/v1/user`, {
        headers,
        signal: AbortSignal.timeout(8000),
      });
      if (!auth.ok)
        return send(
          auth.status >= 500 ? 503 : 401,
          auth.status >= 500 ? "unavailable" : "auth",
        );
      const user = await auth.json();
      if (!user.id || !user.email_confirmed_at || user.is_anonymous)
        return send(401, "auth");
      // Atomic database limits survive cold starts and parallel function instances.
      const quota = await request(`${url}/rest/v1/rpc/consume_ai_quota`, {
        method: "POST",
        headers,
        body: "{}",
        signal: AbortSignal.timeout(8000),
      });
      if (!quota.ok) return send(503, "unavailable");
      if ((await quota.json()) !== true) {
        res.setHeader("Retry-After", "30");
        return send(429, "limited");
      }
      const response = await request("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(providerRequest(input)),
        signal: AbortSignal.timeout(35000),
      });
      if (!response.ok)
        return send(response.status === 429 ? 429 : 502, "provider");
      const output = extractOutput(await response.json());
      if (!output) return send(502, "incomplete");
      return res.status(200).json({ output });
    } catch {
      // Never log the request, provider response, credentials or generated content.
      return send(503, "provider");
    }
  };
}
export default createHandler();
