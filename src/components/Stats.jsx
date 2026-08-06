import { useLang } from '../i18n.jsx'
import { useEpisodes, YOUTUBE_ONLY_EPISODES } from '../hooks/useEpisodes.js'
import channel from '../data/channel.json'
import './Stats.css'

// 30308 → «30K+»; абнаўляецца пры кожнай зборцы (scripts/sync-episodes.mjs)
function formatViews(n) {
  if (n >= 1000) return `${Math.floor(n / 1000)}K+`
  return String(n)
}

export default function Stats() {
  const { t } = useLang()
  const episodes = useEpisodes()
  const all = [...episodes, ...YOUTUBE_ONLY_EPISODES]
  const hours = Math.round(all.reduce((sum, ep) => sum + (ep.durationSec || 0), 0) / 3600)
  const views = channel.youtubeViews
  const items = [
    [all.length, t('stats.episodes')],
    [hours, t('stats.hours')],
    ['2', t('stats.cadence')],
    views ? [formatViews(views), t('stats.views')] : ['3', t('stats.hosts')],
  ]

  return (
    <div className="stats" data-reveal="">
      <div className="stats-row">
        {items.map(([value, label]) => (
          <div className="stat" key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
