// Генеруе index.html з content/be.md (мова пераключаецца кліентам:
// беларуская для беларускіх браўзераў, англійская для астатніх),
// а таксама public/sitemap.xml і public/llms.txt.
// Так title, description, OG, JSON-LD, noscript і бачныя тэксты не разыходзяцца.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { LINKS } from '../src/links.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://kalasy.ai'
export const PODCAST_START_DATE = '2025-06-24'
const GA_ID = 'G-L0912BET60'
const OG_IMAGE = `${SITE}/assets/og-cover.jpg`

// Той жа парсер ключоў, што і ў src/i18n.jsx.
function parseContent(raw) {
  const dict = {}
  let key = null
  let buf = []
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^##\s+(.+)$/)
    if (m) {
      if (key) dict[key] = buf.join('\n').trim()
      key = m[1].trim()
      buf = []
    } else if (key) {
      buf.push(line)
    }
  }
  if (key) dict[key] = buf.join('\n').trim()
  return dict
}

const BE = parseContent(readFileSync(join(ROOT, 'content/be.md'), 'utf8'))
const EN = parseContent(readFileSync(join(ROOT, 'content/en.md'), 'utf8'))

// [тэкст](url) → тэкст: для JSON-LD і meta патрэбны звычайны тэкст.
const plain = (text) => text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')

const esc = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const HOSTS = [
  { be: 'Эмілія Гаўрус', en: 'Emilia Haurus', url: 'https://www.linkedin.com/in/emilia-gawrus-200a141a0/' },
  { be: 'Яўген Яфімаў', en: 'Yauhen Yafimau', url: 'https://www.linkedin.com/in/eugene-efimov/' },
  { be: 'Аляксей Картыннік', en: 'Aliaksei Kartynnik', url: 'https://itbeard.com/' },
]

function podcastSeriesJsonLd(lang, dict) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: 'Каласы пад сярпом ШІ',
    alternateName: ['КПСШІ', 'Kalasy pad siarpom ŠI'],
    url: `${SITE}/`,
    image: `${SITE}/assets/logo-square.jpg`,
    inLanguage: 'be',
    description: plain(dict['meta.description']),
    startDate: PODCAST_START_DATE,
    webFeed: LINKS.rss,
    author: HOSTS.map((h) => ({ '@type': 'Person', name: h[lang], url: h.url })),
    sameAs: [
      LINKS.spotify,
      LINKS.apple,
      LINKS.youtube,
      LINKS.telegram,
      LINKS.instagram,
      `${LINKS.podbean}/`,
    ],
  }
}

function faqJsonLd(dict) {
  const mainEntity = []
  for (let i = 1; dict[`faq.q${i}`]; i += 1) {
    mainEntity.push({
      '@type': 'Question',
      name: plain(dict[`faq.q${i}`]),
      acceptedAnswer: { '@type': 'Answer', text: plain(dict[`faq.a${i}`]) },
    })
  }
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }
}

function noscriptBlock(lang, dict) {
  const label = lang === 'be' ? 'MP3 на Podbean' : 'MP3 on Podbean'
  return `<noscript>
  <h1>Каласы пад сярпом ШІ</h1>
  <p>${esc(plain(dict['meta.description']))} ${esc(plain(dict['faq.a1']))}</p>
  <ul>
    <li><a href="${LINKS.spotify}">Spotify</a></li>
    <li><a href="${LINKS.apple}">Apple Podcasts</a></li>
    <li><a href="${LINKS.youtube}">YouTube</a></li>
    <li><a href="${LINKS.telegram}">Telegram</a></li>
    <li><a href="${LINKS.instagram}">Instagram</a></li>
    <li><a href="${LINKS.podbean}">${label}</a></li>
    <li><a href="${LINKS.rss}">RSS</a></li>
  </ul>
</noscript>`
}

function buildPage(lang) {
  const dict = lang === 'be' ? BE : EN
  const url = `${SITE}/`
  const title = plain(dict['meta.title'])
  const description = plain(dict['meta.description'])
  const ogLocale = lang === 'be' ? 'be_BY' : 'en_US'
  const ogLocaleAlt = lang === 'be' ? 'en_US' : 'be_BY'

  return `<!DOCTYPE html>
<!-- Згенеравана scripts/generate-seo.mjs з content/${lang}.md — не рэдагуйце ўручную. -->
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#14100b">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(title)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${ogLocale}">
<meta property="og:locale:alternate" content="${ogLocaleAlt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${OG_IMAGE}">
<link rel="canonical" href="${url}">
<link rel="alternate" type="application/rss+xml" title="Каласы пад сярпом ШІ" href="${LINKS.rss}">
<link rel="icon" href="/assets/favicon.jpg">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_ID}');
</script>
<script type="application/ld+json">
${JSON.stringify(podcastSeriesJsonLd(lang, dict), null, 2)}
</script>
<script type="application/ld+json">
${JSON.stringify(faqJsonLd(dict), null, 2)}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&family=Golos+Text:wght@400;500;600&family=Bad+Script&family=Marck+Script&display=swap" rel="stylesheet">
</head>
<body>
${noscriptBlock(lang, dict)}
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
</body>
</html>
`
}

function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
  </url>
</urlset>
`
}

function buildLlmsTxt() {
  return `# Каласы пад сярпом ШІ

> «Каласы пад сярпом ШІ» (КПСШІ) — беларускамоўны падкаст пра штучны інтэлект,
> тэхналогіі, культуру і грамадства. Першы выпуск выйшаў 24 чэрвеня 2025 году;
> новыя выпускі звычайна выходзяць раз на два тыдні і доўжацца каля дзвюх гадзін.
> Вядоўцы: Эмілія Гаўрус, Яўген Яфімаў, Аляксей Картыннік.

"Kalasy pad siarpom ŠI" (roughly "Ears of Grain under the Sickle of AI") is a
Belarusian-language podcast about artificial intelligence, technology, culture
and society. The first episode was published on June 24, 2025; new episodes
usually arrive every two weeks and run for about two hours.
Hosts: Emilia Haurus, Yauhen Yafimau, Aliaksei Kartynnik.

## Пра што выпускі / What's inside

- Галоўныя навіны ШІ ў свеце і Беларусі / The AI news that matters, globally and in Belarus
- Мадэлі, робаты, навука, праца, адукацыя, культура, права і этыка / Models, robots, research, work, education, culture, law and ethics
- Моўная рубрыка: вядоўцы выпраўляюць беларускамоўныя памылачкі адно аднаго / Language notes: hosts correct each other's Belarusian
- Фінальны верш у выкананні Эміліі / A closing poem read by Emilia

## Дзе слухаць / Where to listen

- Spotify: ${LINKS.spotify}
- Apple Podcasts: ${LINKS.apple}
- YouTube: ${LINKS.youtube}
- MP3 на Podbean: ${LINKS.podbean}
- RSS: ${LINKS.rss}

## Сацсеткі / Social

- Telegram (анонсы): ${LINKS.telegram}
- Instagram: ${LINKS.instagram}

## Сайт / Site

- ${SITE}/ (беларуская і англійская версіі, мова вызначаецца аўтаматычна)
`
}

writeFileSync(join(ROOT, 'index.html'), buildPage('be'))
writeFileSync(join(ROOT, 'public/sitemap.xml'), buildSitemap())
writeFileSync(join(ROOT, 'public/llms.txt'), buildLlmsTxt())
console.log('generate-seo: index.html, sitemap.xml, llms.txt абноўленыя')
