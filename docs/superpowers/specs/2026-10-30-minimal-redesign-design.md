# Minimal portfolio redesign

Date: 2026-10-30
Status: draft, awaiting review

## Goal

Replace the current IDE-styled, text-heavy site with a very simple one. A visitor
(mainly recruiters and engineers hiring for 2027 grad roles) should understand who
Sachin is within about 10 seconds of the page opening, and reach any project or role
in two clicks.

Success looks like:

- The home page fits on one screen at desktop and phone widths, with no scrolling.
- Every project and role is reachable as: home → list → detail.
- Nothing on screen is decoration for its own sake.

## Pages and routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/projects` | Projects list |
| `/projects/:id` | Project detail |
| `/experience` | Experience list |
| `/experience/:id` | Experience detail |
| `/about` | About |
| `/now` | Redirects to `/about` (replace, so Back still works) |
| anything else | Not found, with a link home |

An unknown `:id` on a detail route shows the not-found page.

### Home

Top to bottom, left-aligned in one narrow column:

1. Name: "Sachin Verma".
2. Two-line description. Draft copy: "Software engineer building backend systems.
   Currently scaling infrastructure for 13.8M users at TalkFever, and making developer
   tools at Acadable Labs."
3. Location in small muted mono: "Gwalior, India".
4. Social icons, each a link with an accessible label:
   - GitHub: `https://github.com/sachinwhocodes`
   - LinkedIn: `https://linkedin.com/in/sachinwhocodes`
   - Email: `mailto:ramasyasachin@gmail.com`
   - Résumé: `/Sachin_Verma_Resume.pdf` (downloads)
5. Three text links: Projects, Experience, About.

External links open in a new tab with `rel="noopener noreferrer"`.

### List pages (projects, experience)

- Back link "← Sachin Verma" to home, then the page title.
- One entry per item, newest first (the existing array order), separated by hairlines.
- Each entry: title on the left, date on the right in muted mono, two short bullet
  points, then "Read more →" linking to the detail page.
- Projects use the project title (the short name, e.g. "PackShell"). Experience entries
  use the role as the title with the company beneath it.

### Detail pages

- Back link to the list ("← Projects" or "← Experience").
- Title, then one muted line of facts: role or company, date, location (experience
  only), and any external links (npm, GitHub) inline.
- The existing one-sentence summary.
- "What I built": the existing `details` bullets, unchanged.
- "The hard part": the existing `hardPart` problem and solution, when present.
- Tech as one muted line joined with " · ".

### About

- "Currently": a short paragraph built from the Now page (TalkFever creator
  monetization work, QueryMesh in private alpha, other active Acadable Labs work).
- "Education": MITS Gwalior, BTech IT, Aug 2023 – Jun 2027, CGPA 8.09.
- "Achievements": the three existing hackathon results.
- "Stack": the existing groups, one muted line per group.

## Content model

`src/data/projects.ts` and `src/data/experience.ts` stay the single source of content.
Each `Project` and `Experience` gains one required field:

```ts
highlights: [string, string]; // two short phrases for the list page, under ~50 chars each
```

The first draft of every `highlights` pair is written from the existing summary and
details, then reviewed by Sachin. Project titles that currently carry a subtitle
(e.g. "PackShell: Zero-Trust .env Sync CLI") are shortened to the name, and the
subtitle moves into the summary where it isn't already covered.

Home and About copy, socials and the stack/achievements/education lists live in a new
`src/data/profile.ts`, so the page components hold layout only.

## Components

| Unit | Purpose |
| --- | --- |
| `Layout` | Narrow centred column, page padding, optional back link, page fade. |
| `EntryList` | Renders a list page from normalized entries and a base path. |
| `EntryDetail` | Renders a detail page from one normalized entry. |
| `SocialLinks` | The four icon links on the home page. |
| Pages | `Home`, `ProjectsPage`, `ProjectDetail`, `ExperiencePage`, `ExperienceDetail`, `About`, `NotFound`; thin wrappers that pick data and pass it on. |

Projects and experience share `EntryList` and `EntryDetail` through one normalized
shape, mapped from each data type in one small module:

```ts
interface Entry {
  id: string;
  title: string;
  subtitle?: string;      // company, for experience
  date: string;
  facts: string[];        // role or company, date, location
  summary: string;
  highlights: [string, string];
  details: string[];
  hardPart?: { problem: string; solution: string };
  techStack: string[];
  links?: { label: string; href: string }[];
}
```

Icons come from `lucide-react` (already installed): `Github`, `Linkedin`, `Mail`,
`FileText`.

### Removed

`Terminal`, `CommandPalette`, `GitHubActivity`, `KbdHint`, `TabNavigation`,
`Breadcrumb`, the `Now` page, the old `Projects`/`Experience` list and detail pages,
and the CSS that only they use (terminal, command palette, cursor blink, tech tags,
`//` heading styles). Unused shadcn `ui/` components are left alone; that's out of scope.

## Visual design

One theme only: semi-dark charcoal, not near-black.

| Token | Value | Use | Contrast on background |
| --- | --- | --- | --- |
| background | `#1f1f21` | page | — |
| text | `#e8e6e3` | name, titles, body | 13.2:1 |
| secondary | `#a3a19d` | description, bullets, summaries | 6.4:1 |
| meta | `#8a8884` | dates, location, facts, tech line | 4.65:1 |
| hairline | `#323235` | list separators, link underline | decorative |

- No accent colour. Links are text-coloured with a thin hairline underline that turns
  text-coloured on hover.
- Type: Inter 400/500 for everything; JetBrains Mono 400 only for dates, location and
  facts lines. Name 1.5rem/500, page titles 1.25rem/500, body 1rem, meta 0.8125rem.
- Column max width 36rem, left-aligned, generous top padding (about 20vh on home,
  6rem elsewhere), 1.5rem side padding (16px minimum at phone width).
- No boxes, cards, shadows or borders except list hairlines.
- Motion: a 150ms opacity fade on page change, disabled under
  `prefers-reduced-motion`.
- `color-scheme: dark` and a matching `theme-color` meta tag.

### Font loading fix

Move the `@fontsource` imports out of `src/index.css` into `src/main.tsx` as JS
imports, keeping only the weights above. This fixes the current bug where browsers
ignore the CSS `@import`s because they come after the `@tailwind` lines.

## Other changes

- `public/sitemap.xml`: drop `/now`, add `/about`, and list every project and
  experience detail URL.
- `index.html` metadata stays, with `theme-color` updated.

## Testing

Vitest with Testing Library (already set up):

- Home renders the name, four social links with accessible names and correct hrefs,
  and three nav links.
- Each list page renders every entry's title, both highlights, and a "Read more" link
  to `/<base>/<id>`.
- A detail page renders the summary, every detail bullet, and the hard part when present.
- An unknown id renders not found; `/now` lands on About.
- Every `Project` and `Experience` has exactly two non-empty highlights.

Then `npm run build` and `npm run lint` pass with no CSS `@import` warning, and a
manual check in the browser at desktop width and at 375px confirms the home page fits
on one screen and the fonts actually load (`document.fonts` shows Inter and
JetBrains Mono as loaded).

## Out of scope

Light theme, a blog or writing section, analytics, a CMS, deployment changes, and
pruning unused shadcn components.
