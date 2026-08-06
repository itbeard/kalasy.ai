// Сцягвае Podbean RSS падчас зборкі і абнаўляе committed snapshot
// src/data/episodes.json. Калі стужка недаступная — пакідае папярэдні
// snapshot, каб сайт ніколі не заставаўся з пустым спісам выпускаў.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'src/data/episodes.json')
const OUT_CHANNEL = join(ROOT, 'src/data/channel.json')
const FEED_URL = 'https://feed.podbean.com/kalasyai/feed.xml'
const YT_ABOUT_URL = 'https://www.youtube.com/@kalasyai/about'

function decodeEntities(text) {
  return text
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .trim()
}

function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))
  return m ? decodeEntities(m[1]) : null
}

function parseDuration(text) {
  if (!text) return null
  if (/^\d+$/.test(text)) return parseInt(text, 10)
  const parts = text.split(':').map(Number)
  if (parts.some(Number.isNaN)) return null
  return parts.reduce((acc, p) => acc * 60 + p, 0)
}

// Назвы бываюць "#26 - Тэма...", "Тэма... / КПСШІ #18" або "Спэшал #1 | Тэма..."
// — тая ж логіка, што і ў src/hooks/useEpisodes.js.
function splitTitle(rawTitle) {
  const specialMatch = rawTitle.match(/^(?:Спэшал|Special)\s*#\s*(\d+)\s*[|\-–—]\s*/i)
  if (specialMatch) {
    return {
      num: specialMatch[1],
      special: true,
      title: rawTitle.slice(specialMatch[0].length).trim(),
    }
  }
  const numMatch = rawTitle.match(/#\s*(\d+)/)
  const title = rawTitle
    .replace(/^#\s*\d+\s*[-–—]\s*/, '')
    .replace(/\s*\/\s*КПСШІ\s*#\s*\d+\s*$/i, '')
    .trim()
  return { num: numMatch ? numMatch[1] : null, special: false, title }
}

function parseFeed(xml) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? []
  return items
    .map((block) => {
      const { num, special, title } = splitTitle(tag(block, 'title') ?? '')
      const pubDate = tag(block, 'pubDate')
      const enclosure = block.match(/<enclosure[^>]*\burl="([^"]+)"/)
      return {
        num,
        special,
        title,
        date: pubDate ? new Date(pubDate).toISOString() : null,
        durationSec: parseDuration(tag(block, 'itunes:duration')),
        link: tag(block, 'link'),
        mp3: enclosure ? decodeEntities(enclosure[1]) : null,
      }
    })
    .filter((ep) => ep.title)
}

// Агульныя прагляды канала — з публічнай старонкі "About": без API-ключа
// і без ручнога абнаўлення лічбы ў кодзе. Пры няўдачы застаецца папярэдняе значэнне.
async function syncYouTubeViews() {
  try {
    const res = await fetch(YT_ABOUT_URL, {
      headers: { 'accept-language': 'en' },
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const html = await res.text()
    const m = html.match(/"viewCountText":"([\d\s., ]+)\s*views?"/)
    if (!m) throw new Error('viewCountText не знойдзены')
    const views = parseInt(m[1].replace(/\D/g, ''), 10)
    if (!Number.isFinite(views) || views <= 0) throw new Error(`дзіўнае значэнне: ${m[1]}`)
    writeFileSync(
      OUT_CHANNEL,
      JSON.stringify({ fetchedAt: new Date().toISOString(), youtubeViews: views }, null, 2) + '\n',
    )
    console.log(`sync-episodes: прагляды YouTube — ${views}`)
  } catch (err) {
    console.warn(`sync-episodes: прагляды YouTube не абнавіліся (${err.message}).`)
    if (!existsSync(OUT_CHANNEL)) {
      // без файла зборка ўпадзе на import — ствараем пусты, Stats пакажа вядоўцаў
      writeFileSync(OUT_CHANNEL, JSON.stringify({ fetchedAt: null, youtubeViews: null }, null, 2) + '\n')
    }
  }
}

async function main() {
  await syncYouTubeViews()
  let episodes = null
  try {
    const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(20000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    episodes = parseFeed(await res.text())
  } catch (err) {
    console.warn(`sync-episodes: RSS недаступны (${err.message}) — пакідаю папярэдні snapshot.`)
  }

  if (!episodes || episodes.length === 0) {
    try {
      const prev = JSON.parse(readFileSync(OUT, 'utf8'))
      if (prev.episodes?.length) {
        console.warn(`sync-episodes: выкарыстоўваю committed snapshot (${prev.episodes.length} выпускаў).`)
        return
      }
    } catch {
      /* няма папярэдняга файла */
    }
    console.error('sync-episodes: няма ні RSS, ні папярэдняга snapshot — спыняюся.')
    process.exit(1)
  }

  writeFileSync(
    OUT,
    JSON.stringify({ fetchedAt: new Date().toISOString(), episodes }, null, 2) + '\n',
  )
  console.log(`sync-episodes: захаваў ${episodes.length} выпускаў у src/data/episodes.json`)
}

main()
