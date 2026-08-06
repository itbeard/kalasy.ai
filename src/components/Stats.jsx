import { useLang } from '../i18n.jsx'
import {
  useEpisodes,
  UNLISTED_EPISODES_COUNT,
  UNLISTED_EPISODES_SECONDS,
} from '../hooks/useEpisodes.js'
import './Stats.css'

// Total views on youtube.com/@kalasyai — no public API without a key, update by hand.
const YOUTUBE_VIEWS = '30K+'

export default function Stats() {
  const { t } = useLang()
  const episodes = useEpisodes()
  const hours = Math.round(
    (episodes.reduce((sum, ep) => sum + (ep.durationSec || 0), 0) +
      UNLISTED_EPISODES_SECONDS) / 3600,
  )
  const items = [
    [episodes.length + UNLISTED_EPISODES_COUNT, t('stats.episodes')],
    [hours, t('stats.hours')],
    ['2', t('stats.cadence')],
    [YOUTUBE_VIEWS, t('stats.views')],
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
