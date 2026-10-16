# APGEA Website — React + Vite

Redesign of apgea.org (Andhra Pradesh Govt. Employees Association) using the existing brand palette:
crimson red `#C8102E`, navy `#1F2638`, ochre gold `#B8892A`, on white.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview
```

## Structure

```
src/
  data/content.js        ← ALL site text (apgea.org content: articles index, About paragraphs, photos, contacts…)
  i18n/                  ← Telugu / English strings + useLang()
  styles/global.css      ← design tokens, buttons, motion utilities
  hooks/useReveal.js     ← scroll reveal, count-up, pointer tilt + spotlight
  components/
    Header.jsx           ← utility strip, official masthead, ticker, white sticky nav, drawer
    Hero.jsx             ← split poster (crimson slogan / navy photo stack), slogan marquee, contact dock
    Desk.jsx             ← "From the President's pen": byline, current series, 16-article index
    Updates.jsx          ← bento grid: lead story, events, GOs, videos
    Story.jsx            ← sticky-scroll About APGEA (4 chapters) + Vision / Mission
    Leadership.jsx       ← state office bearers + 26-district tile board
    Filmstrip.jsx        ← gallery as a film strip, pinned + scroll-panned on desktop
    Join.jsx             ← membership CTA, affiliated associations, service links
    Emblem.jsx           ← official logo (public/brand/apgea-logo.webp); `mono` = line-art SVG for watermarks
    Footer.jsx, Intro.jsx, LangToggle.jsx, SafeImg.jsx, WhatsAppFab.jsx
  pages/Home.jsx, Page.jsx
```

## Before launch — replace placeholders

- **Photos:** drop the apgea.org photos into `public/gallery/1.jpg … 10.jpg` and `public/news/62.jpg`, `60.jpg`. The comment above `photos` in `src/data/content.js` lists which original file goes to which name. Missing files show a branded placeholder (`SafeImg`).
- Add `?nointro` to the URL to skip the opening animation while testing.

- `public/bearers/president.jpg`, `public/bearers/secretary.jpg` — office-bearer photos
- `public/brochure.pdf` — the APGEA brochure
- `[MEMBERS]`, `[GO TITLE]`, `[EVENT TITLE]`, `[DISTRICT PRESIDENT NAME]` in `src/data/content.js`
- YouTube video IDs in `components/NewsTabs.jsx`
- Point `news`, `events`, `gos` at your PHP/REST API when ready (the shape is already array-of-objects)

## Language (Telugu / English)

- Toggle in the top strip, sticky nav (once scrolled), mobile drawer and footer. Choice is saved in `localStorage` (`apgea-lang`); default is Telugu.
- `src/i18n/strings.js` — UI strings for both languages. `src/i18n/LangContext.jsx` — `useLang()` gives `t(key)`, `tx({ en, te })`, `date()`.
- Content in `src/data/content.js` uses `{ en, te }` objects for translatable fields.

## Brand

- `components/Emblem.jsx` — the official APGEA logo (`public/brand/apgea-logo.webp`, transparent PNG/WebP). `mono` renders a line-art SVG version for decorative watermarks.
- Masthead in `Header.jsx` follows the official letterhead (`public/brand/apgea-masthead.png`): slogans top corners, seals either side, red Anton title, Regd / G.O. lines.

## Fonts

Google Fonts: Anton (masthead title), Manrope (English UI), Noto Sans Telugu (Telugu body/headlines). Loaded in `index.html`.

## Motion

All animations respect `prefers-reduced-motion`. Framer Motion drives the intro curtain, masthead entrance, hero word reveal + pointer parallax, scroll-progress bar, tab/district transitions and the language thumb. Cards use a pointer tilt + spotlight (`useTilt`, `spotlight` in `hooks/useReveal.js`); scroll reveals are CSS + IntersectionObserver.
