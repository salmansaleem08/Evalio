import { env } from "@/lib/env";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function getAccessToken(): Promise<string | null> {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.access_token) {
    return null;
  }
  return session.access_token;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await getAccessToken();
  if (!token) {
    throw new ApiError("Not signed in. Please sign in again.", 401);
  }

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${env.apiUrl}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      (data as { detail?: string }).detail ?? "Request failed",
      response.status,
    );
  }

  return data as T;
}

export async function apiUpload<T>(
  path: string,
  formData: FormData,
): Promise<T> {
  const token = await getAccessToken();
  if (!token) {
    throw new ApiError("Not signed in. Please sign in again.", 401);
  }

  const response = await fetch(`${env.apiUrl}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      (data as { detail?: string }).detail ?? "Upload failed",
      response.status,
    );
  }

  return data as T;
}
