import { useLang } from '../i18n.jsx'
import { LINKS } from '../links.js'
import { useEpisodes } from '../hooks/useEpisodes.js'
import { usePlayer } from '../player/PlayerProvider.jsx'
import { PlayIcon, PauseIcon } from './Icons.jsx'
import './Episodes.css'

function formatDate(iso, lang, months) {
  if (!iso) return null
  const d = new Date(iso)
  if (lang === 'en') return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function formatDuration(sec, t) {
  if (!sec) return null
  const h = Math.floor(sec / 3600)
  const m = Math.round((sec % 3600) / 60)
  return h > 0
    ? `${h} ${t('episodes.hours')} ${m} ${t('episodes.minutes')}`
    : `${m} ${t('episodes.minutes')}`
}

const EPISODE_COUNT = 6

export default function Episodes() {
  const { lang, t } = useLang()
  const episodes = useEpisodes().slice(0, EPISODE_COUNT)
  const { current, playing, play } = usePlayer()

  function togglePlay(ev, ep) {
    ev.preventDefault()
    ev.stopPropagation()
    play(ep)
  }

  const months = t('episodes.months').split(',').map((m) => m.trim())

  return (
    <section id="episodes">
      <div className="wrap">
        <h2 className="sec-title">{t('episodes.title')}</h2>
        <p className="sec-lead">{t('episodes.lead')}</p>

        <div className="ep-list" data-reveal="">
          {episodes.map((ep) => {
            const date = formatDate(ep.date, lang, months)
            const duration = formatDuration(ep.durationSec, t)
            const isPlaying = ep.mp3 && current?.mp3 === ep.mp3 && playing
            return (
              <a className="ep" href={ep.link} target="_blank" rel="noopener noreferrer" key={ep.link}>
                {ep.num && (
                  <span
                    className={`ep-num${ep.special ? ' special' : ''}`}
                    title={ep.special ? t('episodes.special') : undefined}
                  >
                    {ep.special ? 'S' : '#'}{ep.num}
                  </span>
                )}
                <span className="ep-body">
                  <span className="ep-title">{ep.title}</span>
                  {(date || duration) && (
                    <span className="ep-meta">
                      {date && <time dateTime={ep.date}>{date}</time>}
                      {date && duration && ' · '}
                      {duration}
                    </span>
                  )}
                </span>
                {ep.mp3 && (
                  <button
                    className={`ep-play${isPlaying ? ' playing' : ''}`}
                    onClick={(ev) => togglePlay(ev, ep)}
                    aria-label={`${isPlaying ? t('player.pause') : t('player.play')}: ${ep.title}`}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </button>
                )}
              </a>
            )
          })}
        </div>

        <div className="all-eps">
          <a className="btn btn-ghost" href={LINKS.podbean} target="_blank" rel="noopener noreferrer">
            {t('episodes.all')}
          </a>
        </div>
      </div>
    </section>
  )
}
