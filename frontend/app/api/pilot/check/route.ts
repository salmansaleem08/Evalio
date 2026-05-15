import { NextResponse } from "next/server";

import { isPilotEmail } from "@/lib/auth/pilot";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String((body as { email?: string }).email ?? "").trim();
  return NextResponse.json({ allowed: isPilotEmail(email) });
}
