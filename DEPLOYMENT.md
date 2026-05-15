# Evalio deployment (Vercel + Render)

You do not need to run the app locally. Use this checklist for production.

## 1. Supabase

1. Run SQL in **SQL Editor**: `supabase/migrations/001_grading_sessions.sql`
2. **Authentication → Providers → Email**: turn **off** “Confirm email”
3. **Authentication → URL configuration**:
   - **Site URL**: `https://YOUR-VERCEL-DOMAIN.vercel.app`
   - **Redirect URLs** (add all):
     - `https://YOUR-VERCEL-DOMAIN.vercel.app/**`
     - `https://YOUR-VERCEL-DOMAIN.vercel.app/auth/callback`
     - `http://localhost:3000/**` (optional, for local testing)

## 2. Render (Python API + pdfplumber)

Create a **Web Service** from this repo, root directory: `backend`.

| Variable | Value |
|----------|--------|
| `GEMINI_API_KEY` | Your Gemini key |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xhqkjmxuzcjlyfoushdr.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable/anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secret key |
| `CORS_ORIGINS` | `https://YOUR-VERCEL-DOMAIN.vercel.app` |
| `MAX_STUDENT_SHEETS` | `5` |

Student PDFs and marking keys are processed on Render with **pdfplumber** (text extraction only).

Copy your Render URL, e.g. `https://evalio-api.onrender.com`.

## 3. Vercel (Next.js frontend)

Root directory: **`frontend`**

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Same as Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same anon key |
| `NEXT_PUBLIC_API_URL` | Your **Render** API URL (no trailing slash) |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL |
| `CONTACT_NOTIFY_EMAIL` | `msalmansaleem08@gmail.com` |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | `Evalio <onboarding@resend.dev>` |
| `PILOT_ALLOWED_EMAILS` | Comma-separated pilot emails |
| `SUPABASE_SERVICE_ROLE_KEY` | For waitlist/signup API routes on Vercel |

Redeploy after changing env vars.

## 4. Login / session (Vercel)

Auth uses **cookies** via `@supabase/ssr`:

- Sign-in runs in the **browser** so the session cookie is set correctly on Vercel.
- Middleware refreshes the session on each request.

If login fails after deploy, check Supabase **Site URL** and **Redirect URLs** match your Vercel domain exactly.

## 5. Smoke test (production)

1. Open Vercel URL → **Request pilot access** → submit → email arrives at `msalmansaleem08@gmail.com`
2. **Sign up** with a pilot email → lands on **/dashboard**
3. Refresh the page → still signed in
4. **New paper check** → upload PDFs + marking key → grading runs on Render → results table appears

## 6. Browser console notes

- `contentScript.bundle.js … No auth token` comes from a **browser extension**, not Evalio.
- `message channel closed` is usually an extension; safe to ignore if the app works.
