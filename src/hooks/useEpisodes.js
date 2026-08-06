import { useEffect, useState } from 'react'
import { LINKS } from '../links.js'
import episodesSnapshot from '../data/episodes.json'
import youtubeOnly from '../data/youtube-only.json'

// Выпускі №1–4 ёсць толькі на YouTube (іх няма ў Podbean/RSS) —
// гл. src/data/youtube-only.json. Калі яны з'явяцца ў RSS, файл трэба ачысціць.
export const YOUTUBE_ONLY_EPISODES = youtubeOnly.episodes

// Build-time snapshot стужкі (scripts/sync-episodes.mjs): старонка адразу
// паказвае актуальныя выпускі, а жывы RSS ціха абнаўляе іх у браўзеры.
export const FALLBACK_EPISODES = episodesSnapshot.episodes

function parseDuration(text) {
  if (!text) return null
  if (/^\d+$/.test(text)) return parseInt(text, 10)
  const parts = text.split(':').map(Number)
  if (parts.some(Number.isNaN)) return null
  return parts.reduce((acc, p) => acc * 60 + p, 0)
}

// Titles come as "#26 - Тэма...", "Тэма... / КПСШІ #18"
// or "Спэшал #1 | Тэма..." — pull the number (and special flag) out.
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
  return { num: numMatch ? numMatch[1] : null, title }
}

function parseFeed(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml')
  if (doc.querySelector('parsererror')) throw new Error('bad XML')
  return [...doc.querySelectorAll('channel > item')]
    .map((item) => {
      const { num, special, title } = splitTitle(
        item.querySelector('title')?.textContent ?? '',
      )
      const durationEl = item.getElementsByTagNameNS('*', 'duration')[0]
      const pubDate = item.querySelector('pubDate')?.textContent
      return {
        num,
        special,
        title,
        date: pubDate ? new Date(pubDate).toISOString() : null,
        durationSec: parseDuration(durationEl?.textContent?.trim()),
        link: item.querySelector('link')?.textContent ?? LINKS.podbean,
        mp3: item.querySelector('enclosure')?.getAttribute('url') ?? null,
      }
    })
    .filter((ep) => ep.title)
}

// The hook is used by several components at once (Hero, Stats, Episodes) —
// fetch the feed once and share the promise between them.
let feedPromise = null
function fetchFeed() {
  feedPromise ??= fetch(LINKS.rss)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.text()
    })
    .then(parseFeed)
    .catch(() => {
      feedPromise = null
      return []
    })
  return feedPromise
}

export function useEpisodes() {
  const [episodes, setEpisodes] = useState(FALLBACK_EPISODES)

  useEffect(() => {
    let cancelled = false
    fetchFeed().then((eps) => {
      if (!cancelled && eps.length) setEpisodes(eps)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return episodes
}
