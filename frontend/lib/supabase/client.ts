import { createClient } from "@supabase/supabase-js";

import { env } from "@/lib/env";

export function createBrowserClient() {
  return createClient(env.supabaseUrl, env.supabaseAnonKey);
}
