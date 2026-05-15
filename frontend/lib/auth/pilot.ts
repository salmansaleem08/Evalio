const DEFAULT_ALLOWED = [
  "msalmansaleem08@gmail.com",
  "zuhaak.ahmad04@gmail.com",
];

export function getPilotAllowedEmails(): string[] {
  const raw =
    process.env.PILOT_ALLOWED_EMAILS ??
    process.env.NEXT_PUBLIC_PILOT_ALLOWED_EMAILS ??
    "";
  const list = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.length > 0 ? list : DEFAULT_ALLOWED;
}

export function isPilotEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return getPilotAllowedEmails().includes(normalized);
}
