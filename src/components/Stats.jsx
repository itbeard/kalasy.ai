import { useLang } from '../i18n.jsx'
import { useEpisodes } from '../hooks/useEpisodes.js'
import './Stats.css'

export default function Stats() {
  const { t } = useLang()
  const episodes = useEpisodes()
  const hours = Math.round(
    episodes.reduce((sum, ep) => sum + (ep.durationSec || 0), 0) / 3600,
  )
  const items = [
    [episodes.length, t('stats.episodes')],
    [hours, t('stats.hours')],
    ['2', t('stats.cadence')],
    ['3', t('stats.hosts')],
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
