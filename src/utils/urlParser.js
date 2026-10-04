export function parseWebUrl(input) {
  const value = String(input ?? "").trim();
  if (!value) throw new Error("Enter a URL before parsing.");

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Enter a valid absolute URL, including https:// or http://.");
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Enter a web URL that starts with https:// or http://.");
  }

  const parameters = [...url.searchParams.entries()]
    .map(([key, parameterValue]) =>
      `${key || "(empty key)"}: ${parameterValue || "(empty value)"}`
    )
    .join("\n");

  return {
    Protocol: url.protocol,
    Origin: url.origin,
    Host: url.host,
    Hostname: url.hostname,
    Port: url.port || "Default",
    Path: url.pathname,
    Query: url.search || "None",
    Hash: url.hash || "None",
    Credentials:
      url.username || url.password
        ? "Present — remove before sharing"
        : "None",
    Parameters: parameters || "None",
  };
}

