type SchoolInquiryPayload = {
  email: string;
  school: string;
  name?: string;
  message?: string;
  source?: string;
};

export async function notifySchoolInquiry(
  payload: SchoolInquiryPayload,
): Promise<{ ok: boolean; error?: string }> {
  const to =
    process.env.CONTACT_NOTIFY_EMAIL ?? "msalmansaleem08@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;

  const subject =
    payload.source === "waitlist"
      ? `Pilot access request: ${payload.school}`
      : payload.source === "signup"
        ? `New pilot sign-up: ${payload.email}`
        : `New institution inquiry: ${payload.school}`;
  const html = `
    <h2>New inquiry from Evalio</h2>
    <p><strong>School:</strong> ${escapeHtml(payload.school)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    ${payload.name ? `<p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>` : ""}
    ${payload.message ? `<p><strong>Message:</strong><br/>${escapeHtml(payload.message)}</p>` : ""}
    ${payload.source ? `<p><strong>Source:</strong> ${escapeHtml(payload.source)}</p>` : ""}
    <p><em>Sent at ${new Date().toISOString()}</em></p>
  `;

  if (!apiKey) {
    console.error(
      "[Evalio] RESEND_API_KEY is not set. Inquiry not emailed:",
      payload,
    );
    return {
      ok: false,
      error:
        "Email delivery is not configured yet. Please try again shortly or email us directly.",
    };
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? "Evalio <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[Evalio] Resend error:", res.status, body);
    return { ok: false, error: "We could not send your request. Please try again." };
  }

  return { ok: true };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
