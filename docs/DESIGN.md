# SONET Design — applied skills and decisions

Design pass on 2026-11-05, after installing 77 design skills in
`~/workspace/custom-skills/`. This pass applies the skills to the design
system and the homepage (the front door). The tokens and components changed
here carry to every page; no page content, copy or route was removed.

## Skills applied

- **designxi** (27 phases) — order of work: understand → requirements →
  structure → visual direction → UI → validation → handoff. This document
  is the phase-25 handoff.
- **frontend-design** — two-pass plan, then build; spend boldness in one
  place (the dark + lime hero from Mark's mockup); avoid the generic
  SaaS-card kit and the tracked-out eyebrow on every heading.
- **ui-ux-pro-max** — design-system search ran for "education learning
  platform minimal premium". Its suggested purple/cyan palette was NOT
  adopted: Mark's brief pins #315CBA, and the brief wins. Its
  pre-delivery checklist was applied instead: contrast 4.5:1, visible
  focus, reduced motion, responsive 375/768/1024/1440, SVG icons only.
- **better-ui** — press scale 0.96 over 150ms, transitions name only the
  properties that change, shadows for elevation / borders for structure,
  image outlines, staggered entrances only where they communicate
  hierarchy (hero only, not every section).
- **better-typography** — type scale with semantic roles, line-height by
  role (display 1.1, headings 1.25, body 1.5–1.6, lead 1.6), measure
  capped at 65ch for the lead, headings use `text-wrap: balance`.
- **better-layout** — group with space/background before lines; gap
  between groups at least 2× the gap inside a group; one primary action
  per view; `scroll-padding-top` for the sticky header.
- **better-colors / a11y-audit** — contrast measured, not eyeballed (see
  below). Note: a11y-audit's kit (tokens/scripts) was not installed —
  only its skill folder was — so its gate scripts could not run; ratios
  were measured with a small Python WCAG calculation instead.
- **better-accessibility** — 44px minimum touch targets, focus-visible
  kept, reduced-motion handling, no colour-only signalling.

## Problem and users (DesignXI phases 1–3)

- **Problem:** the homepage was a long stack of identical Section + Grid +
  Card blocks. Every section looked the same, so nothing had hierarchy.
- **Users:** Bangladeshi students and parents (Academy), creators and
  learners (AI / Studio / Microstock / Skills). Bengali is the default
  student language; the interface must stay legible in both scripts.
- **One thing to remember:** one account, six divisions — Learn, Create,
  Earn, Grow.

## Tokens (unchanged palette, fixed contrast)

| Token | Value | Note |
| --- | --- | --- |
| --bg / --bg2 | #FFFFFF / #F5F6F8 | unchanged |
| --ink | #17191D | unchanged |
| --ink2 (light) | **#6B6F76** | was #737780 |
| --accent / --accent-soft | #315CBA / #DCE5F7 | unchanged |
| --line | #E5E7EB | unchanged |
| --radius / --radius-lg / --radius-xl | 12 / 16 / 24px | new |
| --space-section | 72px desktop, 48px mobile | was a flat 56px |
| --shadow / --shadow-lift | 0 1px 2px … / 0 12px 28px … | new lift shadow |
| --ease-out | cubic-bezier(0.2, 0, 0, 1) | better-ui value |

Hero lime #A3E635 on dark is Mark's mockup direction and is unchanged.

## Measured contrast (WCAG, light mode unless noted)

| Pair | Ratio | Verdict |
| --- | --- | --- |
| muted #6B6F76 on #FFFFFF | 5.05:1 | AA pass (was #737780 at 4.49:1 — just under AA) |
| accent #315CBA on #FFFFFF | 6.23:1 | AA pass |
| white on accent #315CBA | 6.23:1 | AA pass |
| lime #A3E635 on #17191D | 11.67:1 | AA pass |
| muted dark #A1A1AA on #101114 | 7.37:1 | AA pass |
| accent dark #8B9DFF on #101114 | 7.52:1 | AA pass |

## Hero — exact mockup rebuild (2026-11-05, supersedes the navy+blue redesign above)

Mark sent a new hero mockup and asked for it exactly. Rebuilt
`src/components/hero.tsx` and the header in `src/app/layout.tsx` to
match it: deep navy (#050D1A) full-bleed hero with blue light waves,
"SONET" spelled in binary digits (5×7 pixel bitmaps, deterministic
digits so server and client render identically) inside a circuit-bracket
frame with a glowing blue line, serif tagline with a blue left bar,
blue gradient Get Started button, Watch Overview (still opens the real
overview dialog — no video exists), the founder's transparent cutout
inside a glowing blue circle, and a name plate (blue slash + "Md. Sonet
Mia" in serif). Header is now dark navy too, with the blue-slash SONET
logo and the mockup's nav: AI Tools, Academy, Marketplace, Skills,
Contact, Sign In, Get Started. Home is the logo; Divisions and Founder
stay reachable from the footer. No green anywhere. Preview mockup:
`preview/hero-mockup-ui.png` (script `make_hero_mockup_preview.py`).
Verified: tests pass, tsc clean, lint clean, production build passes,
local serve returns the binary SONET block, the name plate and the
cutout with no lime value in the served HTML. Local only, not uploaded.

### Hero cleanup (2026-11-05, same day)
On Mark's request: the glowing circle behind the photo, the name plate
under the photo, and the circuit brackets/dots around the binary word
were removed. The photo is bigger (max 560px) and the binary SONET is
clearer (32px bold, on-cells brighter with a stronger glow, off-cells
dimmed to 0.07 so the letters read at a glance). Preview remade at
`preview/hero-mockup-ui.png`.

### Photo bleed (2026-11-05, same day)
Mark noticed the body looked cut off: the cutout is cropped at the
waist, and its straight bottom edge showed inside the hero. Fixed by
bleeding the photo off the hero's bottom edge (`marginBottom: -120` on
the image; the section's `overflow: hidden` clips it), so the body
looks like it continues below the hero instead of being cut. Nothing
else in the hero changed.

### Homepage is the hero only (2026-11-06)
Mark asked for the photo to sit higher and for nothing below the hero
on the website. `src/app/page.tsx` now renders only `<Hero />` — all
homepage sections and the CTA band are gone. The footer is hidden on
the homepage only (new `src/components/footer.tsx`, a client component
using `usePathname`; it still shows on every other page, where
Divisions and Founder are reachable from it). The photo is lifted
higher in the hero (`marginTop: -64`, bottom bleed kept with
`marginBottom: -152`). Verified locally: tests pass, tsc clean, lint
clean, production build passes, and a local serve shows the homepage
with the hero and no section or footer text, while /academy still
shows the footer. Local only, not uploaded.

## Hero — professional redesign (2026-11-05, after this pass)

Mark removed the lime-green accent: **no green anywhere in the hero**.
The hero is now professional multinational style (ui-ux-pro-max:
"Professional navy + blue CTA", avoid playful design): deep navy
background (#0E1626 → #0B0F19, blue glow), white headline, SONET blue
#315CBA as the single CTA colour, light blue #8B9DFF for icons and
separators, soft blue #DCE5F7 for the eyebrow and founder link, 8px
button radius matching the site's buttons. The founder photo is the
transparent cutout with the lime line from the original mockup cleaned
out of it. All new hero colours pass WCAG AA on the navy background
(light blue 7.2:1, soft blue 14.29:1, white on #315CBA 6.23:1, white on
navy 18.08:1). Verified: `src/components/hero.tsx` contains no green
colour value; only the comment explaining the removal mentions lime.

## What changed in this pass

- `src/app/globals.css` — tokens above; section rhythm 72px/48px;
  `.section-featured` soft-accent band; card hover lift + shadow;
  buttons 44px min-height with 0.96 press scale; `text-wrap: balance`
  on headings; lead capped at 65ch; scroll padding for the sticky
  header; global reduced-motion rule.
- `src/app/page.tsx` — Academy is now the featured band (same copy);
  Updates and Testimonials use the honest `Empty` state instead of a
  plain muted paragraph. No content, prices or counts were invented.
- `src/components/ui.tsx` — `Section` accepts an optional `className`
  (for the featured band). No other component API changed.
- `src/components/hero.tsx` — pillar links now meet the 44px touch
  target; hero image uses the better-ui outline recipe.
- `src/app/layout.tsx` — primary nav gets an `aria-label` and 44px-hit
  link padding.
- This file (`docs/DESIGN.md`) — the handoff record.

## What was deliberately NOT changed

- Palette, fonts (Inter + Hind Siliguri), hero dark + lime style.
- All copy, division names, links, prices and catalogue counts.
- No fabricated users, revenue, testimonials or stats anywhere.
- Dashboard / admin pages: they inherit the tokens, but were not
  redesigned in this pass.

## Validation

- `npm test` — 2 passed
- `npx tsc --noEmit` — clean
- `npx eslint` on the four changed code files — clean, no warnings
- `npm run build` — production build passed, 59/59 static pages
  (including / and /academy)

## Next steps (need Mark)

- Upload these files to GitHub main when he approves (globals.css,
  page.tsx, ui.tsx, hero.tsx, layout.tsx, docs/DESIGN.md).
- Live check of the homepage after Vercel redeploys.
- A real usability check with a student/parent remains outstanding —
  the UX research skills (survey-designer, interview-study-builder,
  task-scenario-linter) are now installed for that.
