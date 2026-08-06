// Аўтаматычныя праверкі кантэнту і згенераваных файлаў (npm run check).
// Падае з ненулявым кодам, калі знойдзеная хоць адна памылка.
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const fail = (msg) => errors.push(msg)

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

const read = (p) => readFileSync(join(ROOT, p), 'utf8')

// ── 1. Адпаведнасць ключоў be/en і адсутнасць пустых значэнняў ──
const be = parseContent(read('content/be.md'))
const en = parseContent(read('content/en.md'))
for (const key of Object.keys(be)) {
  if (!(key in en)) fail(`content/en.md: няма ключа "${key}"`)
  if (!be[key]) fail(`content/be.md: пусты ключ "${key}"`)
}
for (const key of Object.keys(en)) {
  if (!(key in be)) fail(`content/be.md: няма ключа "${key}"`)
  if (!en[key]) fail(`content/en.md: пусты ключ "${key}"`)
}

// ── 2. Забароненыя радкі ў production-файлах ──
const FORBIDDEN = ['подкаст', 'youtube.com/kalasyai', 'жніўня 2025', '26+', 'больш за 26', 'August 2025']
const PROD_FILES = [
  'index.html',
  'content/be.md',
  'content/en.md',
  'public/llms.txt',
  'src/links.js',
  'src/data/episodes.json',
  'src/data/youtube-only.json',
]
for (const file of PROD_FILES) {
  const text = read(file)
  for (const needle of FORBIDDEN) {
    // назвы саміх выпускаў прыходзяць з RSS як ёсць — іх не правяраем
    if (file.endsWith('episodes.json')) continue
    if (text.includes(needle)) fail(`${file}: знойдзены забаронены радок "${needle}"`)
  }
}

// ── 3. JSON-LD валідны, startDate правільны ──
for (const file of ['index.html']) {
  const html = read(file)
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  if (blocks.length < 2) fail(`${file}: чакаліся 2 JSON-LD блокі, знойдзена ${blocks.length}`)
  for (const [, json] of blocks) {
    let data
    try {
      data = JSON.parse(json)
    } catch (e) {
      fail(`${file}: JSON-LD не парсіцца (${e.message})`)
      continue
    }
    if (data['@type'] === 'PodcastSeries' && data.startDate !== '2025-06-24') {
      fail(`${file}: PodcastSeries.startDate = "${data.startDate}", чакаўся "2025-06-24"`)
    }
    if (data['@type'] === 'FAQPage' && !(data.mainEntity?.length >= 3)) {
      fail(`${file}: FAQPage мае замала пытанняў`)
    }
  }
}
const beHtml = read('index.html')
if (!beHtml.includes('<link rel="canonical" href="https://kalasy.ai/">')) fail('index.html: няправільны canonical')
if (!beHtml.includes('<html lang="be">')) fail('index.html: чакаўся lang="be"')

// ── 4. Sitemap: галоўная старонка прысутнічае ──
const sitemap = read('public/sitemap.xml')
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!locs.includes('https://kalasy.ai/')) {
  fail(`sitemap.xml: няма https://kalasy.ai/, знойдзена: ${locs.join(', ')}`)
}

// ── 5. Episode manifest: існуе, непусты, унікальныя спасылкі і нумары ──
if (!existsSync(join(ROOT, 'src/data/episodes.json'))) {
  fail('src/data/episodes.json адсутнічае — запусціце npm run generate')
} else {
  const manifest = JSON.parse(read('src/data/episodes.json'))
  const ytOnly = JSON.parse(read('src/data/youtube-only.json'))
  const all = [...(manifest.episodes ?? []), ...(ytOnly.episodes ?? [])]
  if (!manifest.episodes?.length) fail('src/data/episodes.json: пусты спіс выпускаў')
  const links = new Set()
  const regularNums = new Set()
  const specialNums = new Set()
  for (const ep of all) {
    if (!ep.title) fail(`episodes: выпуск без назвы (${ep.link})`)
    if (links.has(ep.link)) fail(`episodes: паўторная спасылка ${ep.link}`)
    links.add(ep.link)
    if (ep.num != null) {
      const set = ep.special ? specialNums : regularNums
      const label = ep.special ? `спэшал #${ep.num}` : `#${ep.num}`
      if (set.has(ep.num)) fail(`episodes: паўторны нумар ${label}`)
      set.add(ep.num)
    }
  }
}

if (errors.length) {
  console.error(`check-content: ${errors.length} памылак:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log('check-content: усе праверкі прайшлі ✓')
