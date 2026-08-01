import { useEffect, useState } from 'react'
import { LINKS } from '../links.js'

// Snapshot shown instantly (and if the RSS fetch fails); the live feed replaces it.
export const FALLBACK_EPISODES = [
  { num: '26', title: 'Рабатызацыя Беларусі, каханне з робатам, Grok у Пентагоне і магутны Fable 5', date: '2026-06-30T06:22:43Z', durationSec: 8391, link: 'https://kalasyai.podbean.com/e/26/', mp3: 'https://mcdn.podbean.com/mf/web/eqk6sue4eauexzf4/kalasyai-26.mp3' },
  { num: '25', title: 'ШІ-светлафоры ў Беларусі, працэсар-пластыр, Gemini Omni, Claude Opus 4.8, гаўно і трэскі', date: '2026-06-18T20:24:55Z', durationSec: 8082, link: 'https://kalasyai.podbean.com/e/25/', mp3: 'https://mcdn.podbean.com/mf/web/nnxt5gqwgu2s2g4a/kalasyai-25.mp3' },
  { num: '24', title: 'Сакрэты Пентагона, робат-манах, табло ганьбы і ШІ-скандал з Mark Formelle', date: '2026-05-21T21:07:35Z', durationSec: 7272, link: 'https://kalasyai.podbean.com/e/24/', mp3: 'https://mcdn.podbean.com/mf/web/z5qrdde8jq6wbwuk/kalasyai-24.mp3' },
  { num: '23', title: 'Сабакі з кулямётамі, клон Цукерберга, GPT 5.5, DeepSeek v4 і ШІ-магістратура ў БНТУ', date: '2026-05-06T19:48:12Z', durationSec: 7104, link: 'https://kalasyai.podbean.com/e/23/', mp3: 'https://mcdn.podbean.com/mf/web/7b9k7a5rkvs78qbv/23.mp3' },
  { num: '22', title: 'Першы афлайн у замку: эмоцыі ў ШІ, кланаванне калег, звальненні і крыху віна', date: '2026-04-29T12:17:04Z', durationSec: 9099, link: 'https://kalasyai.podbean.com/e/22/', mp3: 'https://mcdn.podbean.com/mf/web/n9m77ggq4y5u4uqw/22.mp3' },
  { num: '21', title: 'Беларускі ШІ-журналіст, марш супраць ШІ, робат учыніў вэрхал, закрыццё Sora', date: '2026-04-06T11:20:54Z', durationSec: 7217, link: 'https://kalasyai.podbean.com/e/21/', mp3: 'https://mcdn.podbean.com/mf/web/f6f8qggmhb5uriva/21_2.mp3' },
]

function parseDuration(text) {
  if (!text) return null
  if (/^\d+$/.test(text)) return parseInt(text, 10)
  const parts = text.split(':').map(Number)
  if (parts.some(Number.isNaN)) return null
  return parts.reduce((acc, p) => acc * 60 + p, 0)
}

// Titles come as "#26 - Тэма..." or "Тэма... / КПСШІ #18" — pull the number out.
function splitTitle(rawTitle) {
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
      const { num, title } = splitTitle(
        item.querySelector('title')?.textContent ?? '',
      )
      const durationEl = item.getElementsByTagNameNS('*', 'duration')[0]
      const pubDate = item.querySelector('pubDate')?.textContent
      return {
        num,
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
