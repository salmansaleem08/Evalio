import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy | Evalio",
  description: "Privacy policy and intellectual property terms for Evalio.",
};

const sections = [
  {
    title: "1. Introduction",
    body: `This Privacy Policy explains how Evalio ("we", "us", "our") collects, uses, and protects information when you visit our website, request access, or use our services. By using Evalio, you agree to this policy.`,
  },
  {
    title: "2. Information we collect",
    body: `We may collect your name, school or institution name, work email address, and any details you submit through contact or waitlist forms. If you create an account, we store your email and account credentials in line with our authentication provider. We may also collect basic usage data needed to operate and improve the service.`,
  },
  {
    title: "3. How we use your information",
    body: `We use your information to respond to school inquiries, manage pilot access, provide the service, communicate with you about your account, improve Evalio, and meet legal obligations. School inquiries are sent to our team so we can follow up with you directly.`,
  },
  {
    title: "4. Sharing of information",
    body: `We do not sell your personal information. We share data only with trusted service providers who help us host, secure, or deliver Evalio, and only to the extent needed for those purposes. We may disclose information if required by law or to protect our rights and users.`,
  },
  {
    title: "5. Data retention and security",
    body: `We keep information only as long as needed for the purposes described here or as required by law. We apply reasonable technical and organisational measures to protect data. No method of transmission over the internet is completely secure.`,
  },
  {
    title: "6. Your rights",
    body: `Depending on your location, you may have rights to access, correct, delete, or restrict use of your personal data, or to object to certain processing. To make a request, contact us at the email below.`,
  },
  {
    title: "7. Intellectual property and prohibited use",
    body: `Evalio, including its name, logo, visual design, software, workflows, documentation, and all related materials, is owned by Evalio and protected by applicable intellectual property laws. You may not copy, reproduce, modify, distribute, reverse engineer, scrape, or create derivative works from our product or website without our prior written consent. Unauthorised use may result in immediate termination of access and legal action.`,
  },
  {
    title: "8. Confidentiality of the service",
    body: `Features made available during pilot or early access are confidential. You agree not to disclose non-public aspects of the product to third parties without our permission, except as needed for evaluation within your institution.`,
  },
  {
    title: "9. Children's data",
    body: `Evalio is intended for use by schools and educators. Student answer content may be uploaded by authorised staff. Schools are responsible for ensuring they have appropriate consent and authority to upload student work.`,
  },
  {
    title: "10. Changes to this policy",
    body: `We may update this policy from time to time. The revised version will be posted on this page with an updated effective date. Continued use after changes means you accept the updated policy.`,
  },
  {
    title: "11. Contact",
    body: `For privacy questions or requests, contact: msalmansaleem08@gmail.com`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-[var(--header-height)] max-w-3xl items-center justify-between px-6">
          <Logo size="sm" />
          <ThemeToggle />
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Effective date: May 15, 2026
        </p>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          Please read this policy carefully. It describes how we handle your
          information and the rules that apply to use of Evalio.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-foreground">
                {section.title}
              </h2>
              <p className="mt-3 whitespace-pre-line text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>

      <footer className="border-t border-border/60 px-6 py-8 text-center">
        <Link href="/">
          <Button variant="outline">Back to home</Button>
        </Link>
      </footer>
    </>
  );
}
