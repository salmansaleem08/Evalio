import { NextResponse } from "next/server";

import { notifySchoolInquiry } from "@/lib/email/notify";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String((body as { email?: string }).email ?? "").trim();
  if (!email) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await notifySchoolInquiry({
    email,
    school: "New pilot sign-up",
    source: "signup",
  }).catch(() => undefined);

  return NextResponse.json({ ok: true });
}
