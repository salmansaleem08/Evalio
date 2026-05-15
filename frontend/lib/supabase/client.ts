import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { env } from "@/lib/env";

let browserClient: SupabaseClient | null = null;

/**
 * Single browser Supabase client (avoids multiple GoTrueClient instances).
 * Uses cookie-based auth compatible with Next.js middleware on Vercel.
 */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (!browserClient) {
    if (!env.supabaseUrl || !env.supabaseAnonKey) {
      throw new Error("Supabase environment variables are not configured");
    }
    browserClient = createSupabaseBrowserClient(
      env.supabaseUrl,
      env.supabaseAnonKey,
    );
  }
  return browserClient;
}
