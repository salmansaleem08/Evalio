# Evalio — Development Rules

These rules apply to all contributors and automated workflows on this project.

## Minimize API Usage

Optimize code to use the Gemini API only when necessary. Prioritize data persistence in the database to reduce costs and latency. Cache grading results; avoid re-grading unchanged submissions.

## Adhere to UI Standards

Strictly follow the design system documented in [UI-SPECS.md](./UI-SPECS.md). Match colors, typography, spacing, focus states, and component variants precisely.

## Scalable Engineering

Write industry-standard, high-quality code designed to scale for a growing startup. Prefer clear module boundaries, typed interfaces, and testable units.

## Deployment Optimization

- **Frontend:** Vercel — root directory `frontend`, framework Next.js.
- **Backend:** Render — root directory `backend`, Python runtime per `runtime.txt`.
- Keep environment variables in sync between `.env.example`, Vercel, and Render dashboards.

## Version Management

Use isolated Python environments for backend work (`python -m venv .venv`). Pin dependencies in `requirements.txt`. Use Node version from `frontend/package.json` engines when specified.

## Incremental Version Control

Commit and push changes incrementally with clear messages. One logical change per commit when possible.

## Premium Aesthetics

Leverage high-end design principles for a visually appealing, professional interface. Follow UI-SPECS tokens and component patterns.

## Implementation Privacy

Do not reveal implementation details, internal APIs, or stack specifics in user-facing copy or the public README. Product messaging stays teacher- and outcome-focused.
