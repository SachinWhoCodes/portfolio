# Minimal Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the IDE-styled, text-heavy portfolio with a very simple semi-dark site: home → list → detail.

**Architecture:** Content stays in `src/data/*.ts`. A small mapper normalizes projects and experience into one `Entry` shape, so one `EntryList` and one `EntryDetail` component render both sections. Routes move into `src/routes.tsx` so tests can mount them in a `MemoryRouter`.

**Tech Stack:** Vite 5, React 18, TypeScript, react-router-dom 6, Tailwind 3 (shadcn HSL variables), lucide-react 0.462, Vitest + Testing Library (jsdom).

**Spec:** `docs/superpowers/specs/2026-10-30-minimal-redesign-design.md`

## Global Constraints

- Work on branch `minimal-redesign`, created from `main` before Task 1. The first commit also adds the spec, this plan and `.claude/launch.json`.
- One theme only. Palette (exact): background `#1f1f21`, text `#e8e6e3`, secondary `#a3a19d`, meta `#8a8884`, hairline `#323235`. No accent colour, cards, shadows or boxes; hairlines only between list entries.
- Inter 400/500 for everything; JetBrains Mono 400 only for dates, location, facts lines and the tech line.
- Sizes: name `1.5rem`/500, page titles `1.25rem`/500, body `1rem`, meta `0.8125rem`. Column `max-width: 36rem`, left-aligned, side padding `1.5rem` (never under 16px). Top padding about `20vh` on home, `6rem` elsewhere.
- Links: text colour with a 1px `#323235` underline that becomes text-coloured on hover. External `http(s)` links get `target="_blank" rel="noopener noreferrer"`; `mailto:` and the résumé don't.
- Page change: 150ms opacity fade only, none under `prefers-reduced-motion`.
- Copy is sentence case. Arrows are "← " for back links and " →" after "Read more".
- No new dependencies.

## Review Focus

1. An entry with no `hardPart` or no `links` (`assessment-platform`, `hotel-saas`, `drippr`) should show no empty heading or stray separator. Tested in Task 4.
2. Icon-only social links must have accessible names, and email/résumé must not open a blank tab. Tested in Task 3.
3. At 375px wide, long tech lines and fact lines should wrap with no horizontal page scroll. Checked in Task 6.
4. Keyboard focus must be clearly visible on the charcoal background for every link. Checked in Task 6.
5. Refreshing a deep link such as `/projects/packshell` on the deployed site should not 404. Deployment is out of scope: check it in Task 6 and report it, don't fix it.

---

### Task 1: Content data and entry mapper

**Files:**
- Modify: `src/data/projects.ts`, `src/data/experience.ts`
- Create: `src/data/profile.ts`, `src/lib/entries.ts`
- Test: `src/test/entries.test.ts`

**Interfaces:**
- Produces:
  - `Project` and `Experience` each gain `highlights: [string, string]`.
  - `src/lib/entries.ts`:
    ```ts
    export interface Entry {
      id: string; title: string; subtitle?: string; date: string; facts: string[];
      summary: string; highlights: [string, string]; details: string[];
      hardPart?: { problem: string; solution: string };
      techStack: string[]; links?: { label: string; href: string }[];
    }
    export function projectToEntry(p: Project): Entry;      // facts: [role, date] minus empties
    export function experienceToEntry(e: Experience): Entry; // subtitle: company; facts: [company, date, location]
    export const projectEntries: Entry[];
    export const experienceEntries: Entry[];
    export function findEntry(entries: Entry[], id: string | undefined): Entry | undefined;
    ```
  - `src/data/profile.ts`:
    ```ts
    export const profile: { name: string; description: string; location: string };
    export type SocialIcon = "github" | "linkedin" | "mail" | "resume";
    export const socials: { label: string; href: string; icon: SocialIcon; download?: string }[];
    export const currently: string[];          // About paragraphs
    export const education: { school: string; degree: string; dates: string; grade: string };
    export const achievements: string[];
    export const stack: Record<string, string[]>; // move techStack from Home.tsx unchanged
    ```

- [ ] **Step 1: Write the failing test** in `src/test/entries.test.ts`:
  - `every project and role has two non-empty highlights under 60 chars`: loop over `projects` and `experiences`, check `highlights.length === 2` and that each item is trimmed, non-empty and `length < 60`.
  - `projectToEntry uses role and date as facts`: for `packshell`, `facts` equals `["Solo Developer", "2025"]` and `title` is `"PackShell"`.
  - `experienceToEntry puts company in subtitle and facts`: for `drippr`, `subtitle` is `"Drippr Technologies"` and `facts` equals `["Drippr Technologies", "Oct 2025 – Jan 2026", "New Delhi, India"]`.
  - `findEntry returns undefined for unknown or missing ids`: check `findEntry(projectEntries, "nope")` and `findEntry(projectEntries, undefined)`.

- [ ] **Step 2: Run** `npx vitest run src/test/entries.test.ts`. Expected: FAIL, because `@/lib/entries` can't be resolved.

- [ ] **Step 3: Update the data.**
  - Add `highlights` to both interfaces and every item using the copy below.
  - Set these project titles: `PackShell`, `SAGIT`, `LazyServe`, `Assessment Platform`, `Hotel Booking App`. Leave summaries as they are.

  | id | highlights |
  | --- | --- |
  | packshell | "Zero-trust .env sync CLI, published on npm" · "AES-256-GCM in the client, RSA-OAEP key sharing" |
  | sagit | "Git diffs that understand code, not just lines" · "AST diff engine on JGit, research paper submitted" |
  | lazyserve | "Wakes dev servers on request, sleeps them on idle" · "Open source on npm, 1,000+ downloads" |
  | assessment-platform | "Exam platform for 1,000+ concurrent users" · "Dual-layer persistence, 100% exam resume" |
  | hotel-saas | "Room booking and food ordering across branches" · "React Native app built for an Upwork client" |
  | talkfever-fsd | "Backend for a social platform with 13.8M users" · "Idempotent payments and a double-entry ledger" |
  | drippr | "Seller dashboard used by 500+ merchants" · "Real-time Shopify order routing via webhooks" |
  | spedee | "Led a team of 6 across a multi-phase build" · "React Native and Appwrite, delivered on schedule" |
  | upwork-hotel | "Hotel booking and food ordering mobile app" · "Real-time orders across multiple branches" |
  | acadable | "Open-source developer tools, LazyServe on npm" · "Grew from an edtech platform with 3,000+ users" |
  | talkfever-web | "17 responsive pages, 25% faster load times" · "User satisfaction up from 3.4 to 4.0" |

- [ ] **Step 4: Create `src/data/profile.ts`** with exactly this copy:
  - `profile.name`: "Sachin Verma"
  - `profile.description`: "Software engineer building backend systems. Currently scaling infrastructure for 13.8M users at TalkFever, and making developer tools at Acadable Labs."
  - `profile.location`: "Gwalior, India"
  - `socials`, in this order:
    - GitHub: `https://github.com/sachinwhocodes`
    - LinkedIn: `https://linkedin.com/in/sachinwhocodes`
    - Email: `mailto:ramasyasachin@gmail.com`
    - Résumé: `/Sachin_Verma_Resume.pdf`, with `download: "Sachin_Verma_Resume.pdf"`
  - `currently`, two paragraphs:
    1. "At TalkFever I'm building the creator monetization system: Razorpay payment flows, a double-entry wallet ledger, and a content publishing model on PostgreSQL."
    2. "Through Acadable Labs I'm building QueryMesh, a Postgres proxy that rewrites N+1 queries into JOINs (private alpha), and Assembly AI Lab, a research platform for structured multi-agent deliberation. I'm also wrapping up the SAGIT research paper."
  - `education`: school "Madhav Institute of Technology and Science", degree "BTech, Information Technology", dates "Aug 2023 – Jun 2027", grade "CGPA 8.09".
  - `achievements` and `stack`: copied unchanged from `src/pages/Home.tsx`.

- [ ] **Step 5: Implement `src/lib/entries.ts`** to the interface above. Drop empty strings from `facts`.

- [ ] **Step 6: Run** `npx vitest run src/test/entries.test.ts`. Expected: PASS. Then run `npx tsc -p tsconfig.app.json --noEmit`. Expected: no errors (the old pages still compile with the shorter titles).

- [ ] **Step 7: Commit:** `git add -A && git commit -m "feat: add highlights, profile data and entry mapper"`

---

### Task 2: Theme, fonts and app shell

**Files:**
- Modify: `src/index.css` (rewrite), `tailwind.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/components/layout/Layout.tsx`, `src/pages/NotFound.tsx`, `src/components/PageTransition.tsx` (only if its class names change)
- Create: `src/routes.tsx`, `src/test/render.tsx`
- Test: `src/test/shell.test.tsx`

**Interfaces:**
- Produces:
  - `export function AppRoutes(): JSX.Element` in `src/routes.tsx`, with every `<Route>` (same routes as today for now).
  - `export function renderAt(path: string): RenderResult` in `src/test/render.tsx`. It renders `<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>`.
  - `Layout({ back?: { to: string; label: string }, children })` renders a `<main>` column. When `back` is set, the first child is a `Link` with text `← {label}`.
  - Tailwind colours: `background`, `foreground`, `muted-foreground` (secondary), `border` (hairline), and new `meta`.

- [ ] **Step 1: Write the failing test** in `src/test/shell.test.tsx`:
  - `unknown route renders not found with a link home`: `renderAt("/does-not-exist")`. Expect the text "Page not found" and a link named "Back home" with `href` `/`.

- [ ] **Step 2: Run** `npx vitest run src/test/shell.test.tsx`. Expected: FAIL, because `@/routes` can't be resolved.

- [ ] **Step 3: Move the `<Routes>` block from `App.tsx` into `AppRoutes`.**
  - `App` becomes `BrowserRouter > ScrollToTop + PageTransition > AppRoutes`.
  - Remove `QueryClientProvider`, `TooltipProvider`, `Toaster` and `Sonner`; nothing outside `components/ui` uses them.

- [ ] **Step 4: Rewrite `NotFound`.** It goes inside `Layout`, with the title "Page not found", one secondary line "That page doesn't exist.", and a link "Back home" to `/`. Remove the `console.error`.

- [ ] **Step 5: Rewrite `src/index.css`.**
  - Keep the three `@tailwind` lines and drop every `@import`.
  - One `:root` sets these values. Set all other shadcn vars (card, popover, primary, etc.) to background or foreground so `components/ui` still compiles.

    | Variable | Value |
    | --- | --- |
    | `--background` | `240 3.1% 12.5%` |
    | `--foreground` | `36 9.8% 90%` |
    | `--muted-foreground` | `40 3.2% 62.7%` |
    | `--meta` | `40 2.5% 52.9%` |
    | `--border` | `240 2.9% 20.2%` |
    | `--ring` | same as `--foreground` |

  - Base styles:
    - `html { color-scheme: dark }` and `body` in Inter.
    - Headings in Inter, not mono.
    - `:focus-visible` with a 2px `hsl(var(--ring))` outline and 3px offset.
    - A `.link` class with the underline rules from Global Constraints.
    - `.page-transition-enter` running a 150ms opacity-only fade, with a `prefers-reduced-motion` override.
  - Delete everything else: terminal, cmd, kbd-hint, tab, tech-tag, cursor-blink and github styles.
  - Add `meta: "hsl(var(--meta))"` to `tailwind.config.ts` colours.

- [ ] **Step 6: Load the fonts in `src/main.tsx`.** Import `@fontsource/inter/400.css`, `@fontsource/inter/500.css` and `@fontsource/jetbrains-mono/400.css` before `./index.css`.

- [ ] **Step 7: Rewrite `Layout`** to the interface above.
  - Classes: `mx-auto max-w-[36rem] px-6 pt-24 pb-24`; home overrides the top padding.
  - No `TabNavigation`, `CommandPalette` or `KbdHint`.

- [ ] **Step 8: Run** `npx vitest run`. Expected: all PASS.

- [ ] **Step 9: Run** `npm run build 2>&1 | grep -c "@import must precede"`. Expected: `0`.

- [ ] **Step 10: Commit:** `git add -A && git commit -m "feat: semi-dark theme, font loading fix and simplified shell"`

---

### Task 3: Home page and social links

**Files:**
- Modify: `src/pages/Home.tsx` (rewrite)
- Create: `src/components/SocialLinks.tsx`
- Test: `src/test/home.test.tsx`

**Interfaces:**
- Consumes: `profile` and `socials` from `src/data/profile.ts`; `Layout` and `renderAt` from Task 2.
- Produces: `SocialLinks()`. It maps `SocialIcon` to lucide `Github`, `Linkedin`, `Mail` and `FileText` at 20px, coloured `text-muted-foreground`, turning `text-foreground` on hover. Each icon gets `aria-label={label}`.

- [ ] **Step 1: Write the failing test** in `src/test/home.test.tsx`:
  - `home shows name, description and location`: `renderAt("/")`. Expect heading level 1 "Sachin Verma", the `profile.description` text, and "Gwalior, India".
  - `social links have names and correct targets`:
    - Links named "GitHub" and "LinkedIn" have the `href`s from Task 1 and `target="_blank"`.
    - "Email" has `href` `mailto:ramasyasachin@gmail.com` and no `target`.
    - "Résumé" has `href` `/Sachin_Verma_Resume.pdf`, a `download` attribute and no `target`.
  - `home links to the three sections`: links named "Projects", "Experience" and "About" have `href`s `/projects`, `/experience` and `/about`.

- [ ] **Step 2: Run** `npx vitest run src/test/home.test.tsx`. Expected: FAIL. The old home has no "GitHub"-named link and no About link.

- [ ] **Step 3: Build `SocialLinks` and rewrite `Home`.**
  - Home order: name (`h1`), description (secondary), location (mono meta), `SocialLinks`, then the three `.link` nav links in a row with `gap-6`.
  - The page uses `Layout` with top padding `pt-[20vh]` and no back link.

- [ ] **Step 4: Run** `npx vitest run src/test/home.test.tsx`. Expected: PASS.

- [ ] **Step 5: Commit:** `git add -A && git commit -m "feat: minimal home page with social links"`

---

### Task 4: List and detail pages for projects and experience

**Files:**
- Create: `src/components/EntryList.tsx`, `src/components/EntryDetail.tsx`
- Modify: `src/pages/Projects.tsx`, `src/pages/ProjectDetail.tsx`, `src/pages/Experience.tsx`, `src/pages/ExperienceDetail.tsx` (all rewritten as thin wrappers)
- Test: `src/test/entries-pages.test.tsx`

**Interfaces:**
- Consumes: `Entry`, `projectEntries`, `experienceEntries` and `findEntry` from Task 1; `Layout` and `renderAt` from Task 2.
- Produces:
  - `EntryList({ title: string; basePath: "/projects" | "/experience"; entries: Entry[] })`.
  - `EntryDetail({ entry: Entry; back: { to: string; label: string } })`.
  - Detail pages read `useParams().id`. When `findEntry` returns `undefined`, they render `<NotFound />`.

- [ ] **Step 1: Write the failing test** in `src/test/entries-pages.test.tsx`:
  - `projects list shows every entry with highlights and read more`:
    - `renderAt("/projects")`, then for each item in `projectEntries`:
    - Its title is visible, and both highlights are visible.
    - A link named "Read more" exists, and `getAllByRole("link", { name: /read more/i })` maps to `basePath/id` in order.
    - A back link "← Sachin Verma" points to `/`.
  - `experience list shows role and company`: `renderAt("/experience")`. Expect "Full Stack Developer Intern" and "TalkFever Social Media Ltd" to be visible.
  - `project detail shows summary, details, hard part, tech and links`: `renderAt("/projects/packshell")`. Expect:
    - The summary text, and every `details` string.
    - Headings "What I built" and "The hard part", plus the hard part's problem text.
    - "TypeScript · Commander.js" as a substring.
    - A link named "npm" to the npm URL.
    - A back link "← Projects" pointing to `/projects`.
  - `detail omits missing sections`:
    - `renderAt("/projects/hotel-saas")`: `queryByText("The hard part")` is null.
    - `renderAt("/projects/assessment-platform")`: no link named "npm" or "github".
  - `experience detail shows company and location`: `renderAt("/experience/drippr")`. Expect "New Delhi, India" and a back link "← Experience".
  - `unknown ids render not found`: `/projects/nope` and `/experience/nope` both show "Page not found".

- [ ] **Step 2: Run** `npx vitest run src/test/entries-pages.test.tsx`. Expected: FAIL, because the components don't exist yet.

- [ ] **Step 3: Implement `EntryList`.**
  - `Layout` with back link `{ to: "/", label: "Sachin Verma" }`, then an `h1` with the title.
  - A `ul` with one `li` per entry:
    - Separated by `border-t border-border`, with `py-5` spacing.
    - First row: title (`font-medium`) on the left, date on the right in mono meta.
    - `subtitle` underneath in secondary text, when present.
    - The two highlights as a `list-disc pl-5` list in secondary text.
    - "Read more →" as a `.link` to `${basePath}/${id}`.

- [ ] **Step 4: Implement `EntryDetail`.**
  - `Layout` with `back`, then the `h1` title.
  - One mono meta line: `facts.join(" · ")`, followed by any `links` rendered inline as `.link` anchors.
  - The summary in secondary text.
  - A small `font-medium` "What I built" heading over a `list-disc` of `details`.
  - Only when `hardPart` exists: a "The hard part" heading over the problem and solution as two paragraphs.
  - The tech line in mono meta: `techStack.join(" · ")`.

- [ ] **Step 5: Rewrite the four pages as wrappers.**
  - `Projects`: `EntryList` with title "Projects", `basePath` `/projects` and `projectEntries`.
  - `Experience`: `EntryList` with title "Experience", `basePath` `/experience` and `experienceEntries`.
  - Each detail page: `findEntry` on its list, then `EntryDetail` with back label "Projects" or "Experience", or `NotFound` when nothing matches.

- [ ] **Step 6: Run** `npx vitest run`. Expected: all PASS.

- [ ] **Step 7: Commit:** `git add -A && git commit -m "feat: shared list and detail pages for projects and experience"`

---

### Task 5: About page and `/now` redirect

**Files:**
- Create: `src/pages/About.tsx`
- Modify: `src/routes.tsx`
- Delete: `src/pages/Now.tsx`
- Test: `src/test/about.test.tsx`

**Interfaces:**
- Consumes: `currently`, `education`, `achievements` and `stack` from `src/data/profile.ts`; `Layout` and `renderAt` from Task 2.

- [ ] **Step 1: Write the failing test** in `src/test/about.test.tsx`:
  - `about shows currently, education, achievements and stack`: `renderAt("/about")`.
    - Expect headings "Currently", "Education", "Achievements" and "Stack".
    - Expect the text "Madhav Institute of Technology and Science" and every `achievements` string.
    - Expect "languages" as a stack label.
    - Expect a back link "← Sachin Verma".
  - `/now redirects to about`: `renderAt("/now")` shows the heading "Currently".

- [ ] **Step 2: Run** `npx vitest run src/test/about.test.tsx`. Expected: FAIL.

- [ ] **Step 3: Implement `About`.**
  - The `h1` is "About". Then four sections, each with a small `font-medium` heading:
    - **Currently:** the `currently` paragraphs in secondary text.
    - **Education:** the school, then a mono meta line `degree · dates · grade`.
    - **Achievements:** a `list-disc` list.
    - **Stack:** one row per group, with the label in mono meta and `values.join(", ")` in secondary text.
  - In `routes.tsx`, add `/about` → `About` and `/now` → `<Navigate to="/about" replace />`. Remove the `Now` import, then delete `Now.tsx`.

- [ ] **Step 4: Run** `npx vitest run`. Expected: all PASS.

- [ ] **Step 5: Commit:** `git add -A && git commit -m "feat: about page, redirect /now"`

---

### Task 6: Remove dead code, update metadata, verify in the browser

**Files:**
- Delete:
  - `src/components/Terminal.tsx`, `src/components/CommandPalette.tsx`, `src/components/GitHubActivity.tsx`, `src/components/KbdHint.tsx`
  - `src/components/layout/TabNavigation.tsx`, `src/components/layout/Breadcrumb.tsx`
- Modify: `public/sitemap.xml`, `index.html`

- [ ] **Step 1: Delete the files listed above.** Run `grep -rn "Terminal\|CommandPalette\|GitHubActivity\|KbdHint\|TabNavigation\|Breadcrumb" src --include='*.tsx' --include='*.ts' | grep -v components/ui`. Expected: no output.

- [ ] **Step 2: Rewrite `public/sitemap.xml`.**
  - Include `/`, `/projects`, `/experience` and `/about`.
  - Include one URL per id in `projects` and in `experiences`, all on `https://sachinwhocodes.vercel.app`.
  - No `/now`.

- [ ] **Step 3: Update `index.html`.** Add or replace `<meta name="theme-color" content="#1f1f21" />`.

- [ ] **Step 4: Run** `npx vitest run && npm run lint && npm run build`. Expected:
  - All tests pass.
  - Lint shows no errors (existing `components/ui` warnings are fine).
  - The build succeeds with no `@import must precede` warning.

- [ ] **Step 5: Browser check.** Start the `portfolio-dev` preview at desktop width, and again at 375×812.
  - The home page fits with no vertical scroll.
  - No page has horizontal scroll: run `document.documentElement.scrollWidth <= innerWidth` on `/`, `/projects`, `/projects/packshell`, `/experience/talkfever-fsd` and `/about`.
  - Tabbing through home shows a visible focus ring on every link.
  - `Array.from(document.fonts).filter(f => f.status === "loaded").map(f => f.family)` includes "Inter" and "JetBrains Mono".
  - The console shows no errors.

- [ ] **Step 6: Deep-link check (report only).** Run `curl -s -o /dev/null -w "%{http_code}" https://sachinwhocodes.vercel.app/projects/packshell`. Report the code: anything but 200 means the deployed site needs an SPA rewrite. Deployment is out of scope, so don't fix it here.

- [ ] **Step 7: Commit:** `git add -A && git commit -m "chore: remove old IDE components, update sitemap and theme-color"`
