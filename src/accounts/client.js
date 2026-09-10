let clientPromise;
export const configured = Boolean(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
export function getClient() {
  if (!configured) return Promise.resolve(null);
  if (!clientPromise)
    clientPromise = import("@supabase/supabase-js").then(({ createClient }) => {
      const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      if (key.startsWith("sb_secret_"))
        throw new Error("Invalid public configuration");
      // Only Supabase publishable keys belong in this browser application.
      if (!key.startsWith("sb_publishable_"))
        throw new Error("A publishable key is required");
      return createClient(import.meta.env.VITE_SUPABASE_URL, key, {
        auth: {
          flowType: "pkce",
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    });
  return clientPromise;
}
export const callbackUrl = () => `${window.location.origin}/auth/callback`;
