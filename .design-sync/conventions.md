# Kalasy.ai conventions

Belarusian AI-podcast site ("Каласы пад сярпом ШІ"): a dark, wheat-field-at-night aesthetic — near-black brown backgrounds, warm gold accents, folk-ornament details. Content language is Belarusian first (English via the built-in i18n).

## Setup — required

1. **Wrap every page in `LangProvider`** (from this library). All components read the i18n context via `useLang()` and **crash without it**.
2. **Pages are dark**: set `background: var(--night); color: var(--cream)` on your page root (the site sets it on `body`). Components are designed for that surface and look broken on white.

```jsx
const { LangProvider, Header, Hero, Ornament, Episodes, Footer } = window.KalasyAI;
<LangProvider>
  <div style={{ background: 'var(--night)', color: 'var(--cream)', minHeight: '100vh' }}>
    <Header />
    <main>
      <Hero />
      <Ornament />
      <Episodes />
    </main>
    <Footer />
  </div>
</LangProvider>
```

`Header` is `position:fixed`; place it once, outside `<main>`. The site rhythm alternates `<Ornament />` (red) and `<Ornament green />` between sections.

## Styling idiom

Plain global CSS classes + CSS custom properties — no utility framework, no CSS-in-JS. For your own layout glue, use the tokens and these shipped classes:

- **Tokens** (all on `:root`): `--night` `--dusk` `--field` (backgrounds, darkest→lightest), `--gold` `--gold-bright` `--gold-soft` (accents/headings), `--cream` `--cream-dim` (text), `--red` `--red-deep` `--green` (folk accents), `--maxw` (1120px content width).
- **Layout**: `section` (84px vertical padding) → `.wrap` (max-width container) → `.sec-title` (Marck Script section heading) + `.sec-lead` (centered dim lead).
- **Buttons**: `.btn` + `.btn-gold` (glowing gold pill) or `.btn-ghost` (outlined) — an icon inside is auto-sized to 20px.
- **Fonts** (shipped): `Unbounded` (h1–h3, brand), `Golos Text` (body), `Marck Script` (`.sec-title`, hero h1), `Bad Script` (quotes).

Typical new-section skeleton:

```jsx
<section>
  <div className="wrap">
    <h2 className="sec-title">Загаловак</h2>
    <p className="sec-lead">Кароткі падводзячы тэкст.</p>
    {/* content */}
  </div>
</section>
```

## Utilities on `window.KalasyAI`

`LINKS` (real platform URLs: spotify/apple/youtube/telegram/instagram/podbean/rss), `useLang()` (`{ lang, setLang, t }`), `useEpisodes()` (episode list with static fallback), `renderRich(text)` (markdown links + bare URLs → `<a>`), `FALLBACK_EPISODES`.

## Gotchas

- Icons (`SpotifyIcon` … `PauseIcon`) are **unsized** SVGs inheriting `currentColor` — always set size via `style`/`width`/`height` unless inside `.btn`.
- `/assets/*` image paths only exist on the deployed site; the shipped stylesheet restores the hero/hosts/logo images via embedded data-URIs, so don't reference `/assets/*` yourself.
- Read `styles.css` → `_ds_bundle.css` (all component styles + tokens) before inventing a class; per-component usage lives in each component's docs.
