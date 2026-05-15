import { env } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function serverApiFetch<T>(path: string): Promise<T | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    return null;
  }

  const response = await fetch(`${env.apiUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<T>;
}
