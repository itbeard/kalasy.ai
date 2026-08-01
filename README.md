# kalasy.ai

Лэндынг падкаста «Каласы пад сярпом ШІ» — React + Vite.

## Каманды

```bash
npm install    # першы раз
npm run dev    # лакальны сервер (http://localhost:5173)
npm run build  # прадакшн-зборка ў dist/
```

## Структура

- `content/be.md`, `content/en.md` — **усе тэксты сайта**. Правіце проста тут: секцыя пачынаецца з `## ключ`, тэкст пад ёй можна мяняць, ключы чапаць нельга.
- `src/components/` — кампаненты (Hero, Episodes, Platforms…) + іх стылі побач.
- `src/hooks/useEpisodes.js` — жывая стужка выпускаў: цягне RSS з Podbean у браўзеры, пры памылцы паказвае ўбудаваны здымак апошніх 6 эпізодаў.
- `src/links.js` — усе спасылкі на пляцоўкі ў адным месцы.
- `public/assets/` — графіка (фон, лога, фота вядоўцаў).
- `Графіка/` — зыходнікі графікі (PSD і поўнапамерныя выявы), у зборку не трапляюць.

## GEO / SEO

- `index.html` — JSON-LD разметка (`PodcastSeries`, `FAQPage`), canonical, OG-мета, `<noscript>`-змест для краулераў без JS.
- `public/llms.txt` — апісанне праекта для ШІ-краулераў у prompt-friendly фармаце.
- `public/robots.txt` — усе краулеры (у т.л. GPTBot, ClaudeBot, PerplexityBot) дазволеныя; спасылка на sitemap.
- `public/sitemap.xml` — абнаўляйце `lastmod` пры значных зменах.
- Пры праўках FAQ у `content/*.md` сінхранізуйце адказы з блокам `FAQPage` у `index.html`.
