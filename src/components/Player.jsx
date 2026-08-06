import { useLang } from '../i18n.jsx'
import { usePlayer } from '../player/PlayerProvider.jsx'
import { PlayIcon, PauseIcon } from './Icons.jsx'
import './Player.css'

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) sec = 0
  sec = Math.floor(sec)
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = String(sec % 60).padStart(2, '0')
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`
}

// «12 хв 08 с» / «1 гадз 47 хв» — чалавечы тэкст для aria-valuetext
function formatSpoken(sec, t) {
  if (!Number.isFinite(sec) || sec < 0) sec = 0
  sec = Math.floor(sec)
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  const parts = []
  if (h > 0) parts.push(`${h} ${t('episodes.hours')}`)
  parts.push(`${m} ${t('episodes.minutes')}`)
  if (h === 0) parts.push(`${String(s).padStart(2, '0')} ${t('player.seconds')}`)
  return parts.join(' ')
}

export default function Player() {
  const { lang, t } = useLang()
  const { current, playing, time, dur, rate, toggle, seek, skip, cycleRate, close } = usePlayer()

  if (!current) return null

  const max = Math.max(Math.floor(dur), 1)
  const progress = dur ? `${(time / dur) * 100}%` : '0%'

  return (
    <>
      {/* keeps the fixed bar from covering the footer */}
      <div className="player-spacer" aria-hidden="true" />
      <div className="player" role="region" aria-label={t('player.region')}>
        <div className="player-row">
          <button
            type="button"
            className="player-play"
            onClick={toggle}
            aria-label={playing ? t('player.pause') : t('player.play')}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="player-main">
            <p className="player-title" lang={lang === 'en' ? 'be' : undefined}>
              {current.num &&
                (current.special
                  ? `${t('episodes.special')} #${current.num} · `
                  : `#${current.num} · `)}
              {current.title}
            </p>
            <div className="player-bar">
              <time>{formatTime(time)}</time>
              <input
                type="range"
                className="player-track"
                min="0"
                max={max}
                step="1"
                value={Math.min(Math.floor(time), max)}
                onChange={(ev) => seek(Number(ev.target.value))}
                disabled={!dur}
                aria-label={t('player.seek')}
                aria-valuetext={`${formatSpoken(time, t)} ${t('player.of')} ${formatSpoken(dur, t)}`}
                style={{ '--progress': progress }}
              />
              <time>{formatTime(dur)}</time>
            </div>
          </div>
          <div className="player-extra">
            <button type="button" className="player-btn" onClick={() => skip(-15)} aria-label={t('player.back')}>
              −15
            </button>
            <button type="button" className="player-btn" onClick={() => skip(30)} aria-label={t('player.forward')}>
              +30
            </button>
            <button type="button" className="player-btn" onClick={cycleRate} aria-label={t('player.speed')}>
              {rate}×
            </button>
          </div>
          <button type="button" className="player-btn player-close" onClick={close} aria-label={t('player.close')}>
            ✕
          </button>
        </div>
      </div>
    </>
  )
}
