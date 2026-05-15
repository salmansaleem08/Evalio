# UI Specification — Evalio Design System

This document captures the visual design system, tokens, component styles, and page layouts so any implementation can reproduce the exact UI look-and-feel. **These rules are mandatory for all Evalio UI work.**

## Scope

Match colors, typography, corner radii, borders, focus states, spacing, and component variants precisely. Dark mode is supported via a `.dark` class on the `html`/`body` root.

## Technology Baseline

- Framework: Next.js App Router
- Styling: Tailwind CSS v4 with CSS variables and utility classes
- Fonts (Google):
  - `--font-manrope` → primary sans
  - `--font-geist-sans` (Inter) → defined but not used as primary
  - `--font-geist-mono` (JetBrains Mono) → monospace
- Animation: framer-motion where needed; CSS keyframes for accordions (~0.2s ease-out)

## Design Tokens (CSS Variables)

### Corner Radius

- `--radius: 0.625rem` (10px). Derived:
  - `--radius-sm`: calc(var(--radius) - 4px) → 6px
  - `--radius-md`: calc(var(--radius) - 2px) → 8px
  - `--radius-lg`: var(--radius) → 10px
  - `--radius-xl`: calc(var(--radius) + 4px) → 14px

### Color Tokens (Light Mode)

| Token | Value |
|-------|--------|
| `--background` | oklch(1 0 0) |
| `--foreground` | oklch(0.145 0 0) |
| `--card` / `--card-foreground` | oklch(1 0 0) / oklch(0.145 0 0) |
| `--popover` / `--popover-foreground` | oklch(1 0 0) / oklch(0.145 0 0) |
| `--primary` | **#00b67b** |
| `--primary-foreground` | oklch(0.985 0 0) |
| `--secondary` | **#000032** |
| `--secondary-foreground` | #ffffff |
| `--muted` | oklch(0.97 0 0) |
| `--muted-foreground` | oklch(0.556 0 0) |
| `--accent` | oklch(0.97 0 0) |
| `--accent-foreground` | oklch(0.205 0 0) |
| `--destructive` | oklch(0.577 0.245 27.325) |
| `--destructive-foreground` | #ffffff |
| `--border` | oklch(0.922 0 0) |
| `--input` | oklch(0.922 0 0) |
| `--ring` | oklch(0.708 0 0) |

Charts: `--chart-1` through `--chart-5` per Signal LMS spec. Sidebar tokens: `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border`, `--sidebar-ring`.

### Color Tokens (Dark Mode — `.dark` on root)

Invert surfaces: `--background` oklch(0.145 0 0), `--foreground` oklch(0.985 0 0). Primary stays **#00b67b**; secondary **#000032**. Borders/inputs use oklch white at 10–15% opacity.

## Global Base Styles

- Root font: `font-sans` = Manrope (`--font-manrope`). Mono = JetBrains Mono.
- Body: `bg-background`, `text-foreground`.
- Border color: `--border`. Focus: `ring-[3px]` with `--ring/50` on `focus-visible`.
- Selection: `bg-primary`, `text-primary-foreground`.
- Disabled: `pointer-events-none` + `opacity-50`.

## Typography

- Labels/helper: `text-sm`
- Inputs: `text-base` (auth forms keep `text-base` with `h-11`)
- Auth titles: `text-2xl font-bold`; subtitles: `text-muted-foreground`

## Spacing Conventions

- Form stacks: `gap-5`; field groups: `space-y-2`
- Cards: `py-6`, `px-6` for header/content/footer
- Buttons/inputs (auth): `h-11` (44px)
- Max auth form width: `max-w-md`

## Shadows

- `shadow-xs` — subtle elevation
- `shadow-sm` — cards
- Viewer shadow: `0 1px 3px 0 rgb(0 0 0 / 0.08)`

## Components (Summary)

Implement under `frontend/components/ui/`:

1. **Button** — variants: default, destructive, outline, secondary, ghost, link. Sizes: default (h-9), sm, lg, icon. Auth: often `h-11`.
2. **Input** — border `--input`, `rounded-md`, focus ring 3px, `aria-invalid` → destructive ring/border.
3. **Label** — `text-sm font-medium select-none`
4. **PasswordInput** — toggle ghost button, Eye/EyeOff 16px
5. **Card** — `rounded-xl`, `border`, `shadow-sm`, `gap-6`, `py-6`
6. **Site header** — `--header-height`, border-b, breadcrumbs
7. **Alert** — success/destructive variants for forms

All interactive elements: visible `focus-visible` ring; error states use `aria-invalid`.

## Dark Mode

Add `.dark` on `<html>`. Use `next-themes` for toggling. Components inherit dark token overrides (e.g. `dark:bg-input/30` on inputs).

## Assets

- Logo: `/logo.svg` (~128×128 on auth)
- Icons: `lucide-react`, 16px in controls

## Motion

- Auth pages: fade/slide ~0.5–0.6s easeOut, slight stagger
- Accordions: height animation ~0.2s ease-out

## Replication Checklist

1. Load Manrope + JetBrains Mono
2. Set all CSS variables (light + `.dark`)
3. Base resets: body, borders, focus, selection
4. Implement Button, Input, Label, Card per spec
5. Auth layout: two-column responsive, `max-w-md` form
6. Match hover/focus/disabled/invalid states
7. Support `.dark` class toggling

## Exactness Notes

- Use exactly **#00b67b** (primary) and **#000032** (secondary)
- Auth controls: **44px** (`h-11`)
- Controls: `rounded-md`; cards: `rounded-xl`
- Contrast: `foreground` vs `muted-foreground` for hierarchy

---

*Full component class strings and variant definitions are implemented in `frontend/components/ui/` and `frontend/app/globals.css` as the project grows.*
