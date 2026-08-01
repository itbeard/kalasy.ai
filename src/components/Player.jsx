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

export default function Player() {
  const { t } = useLang()
  const { current, playing, time, dur, rate, toggle, seek, skip, cycleRate, close } = usePlayer()

  if (!current) return null

  function onTrackClick(ev) {
    if (!dur) return
    const rect = ev.currentTarget.getBoundingClientRect()
    seek(((ev.clientX - rect.left) / rect.width) * dur)
  }

  return (
    <>
      {/* keeps the fixed bar from covering the footer */}
      <div className="player-spacer" aria-hidden="true" />
      <div className="player" role="region" aria-label={t('player.region')}>
        <div className="player-row">
          <button
            className="player-play"
            onClick={toggle}
            aria-label={playing ? t('player.pause') : t('player.play')}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="player-main">
            <p className="player-title">
              {current.num &&
                (current.special
                  ? `${t('episodes.special')} #${current.num} · `
                  : `#${current.num} · `)}
              {current.title}
            </p>
            <div className="player-bar">
              <time>{formatTime(time)}</time>
              <div className="player-track" onClick={onTrackClick}>
                <div
                  className="player-fill"
                  style={{ width: dur ? `${(time / dur) * 100}%` : 0 }}
                />
              </div>
              <time>{formatTime(dur)}</time>
            </div>
          </div>
          <div className="player-extra">
            <button className="player-btn" onClick={() => skip(-15)} aria-label={t('player.back')}>
              −15
            </button>
            <button className="player-btn" onClick={() => skip(30)} aria-label={t('player.forward')}>
              +30
            </button>
            <button className="player-btn" onClick={cycleRate} aria-label={t('player.speed')}>
              {rate}×
            </button>
          </div>
          <button className="player-btn player-close" onClick={close} aria-label={t('player.close')}>
            ✕
          </button>
        </div>
      </div>
    </>
  )
}
