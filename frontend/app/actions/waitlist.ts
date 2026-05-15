"use server";

import { notifySchoolInquiry } from "@/lib/email/notify";

export type WaitlistState = {
  error?: string;
  success?: string;
};

export async function submitWaitlistAction(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim();
  const school = String(formData.get("school") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();

  if (!email || !school) {
    return { error: "Please enter your school name and work email." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const result = await notifySchoolInquiry({
    email,
    school,
    name: name || undefined,
    source: "waitlist",
  });

  if (!result.ok) {
    return {
      error:
        result.error ??
        "Something went wrong. Please try again or email us directly.",
    };
  }

  return {
    success:
      "Thank you. We have received your request and will be in touch soon.",
  };
}
