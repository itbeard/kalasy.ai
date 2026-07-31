import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n.jsx'
import { LINKS } from '../links.js'
import { useEpisodes } from '../hooks/useEpisodes.js'
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

export default function Episodes() {
  const { lang, t } = useLang()
  const episodes = useEpisodes()
  const audioRef = useRef(null)
  const [playingMp3, setPlayingMp3] = useState(null)

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio
    const onEnded = () => setPlayingMp3(null)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.pause()
    }
  }, [])

  function togglePlay(ev, mp3) {
    ev.preventDefault()
    ev.stopPropagation()
    const audio = audioRef.current
    if (!audio || !mp3) return
    if (playingMp3 === mp3) {
      audio.pause()
      setPlayingMp3(null)
      return
    }
    if (audio.src !== mp3) audio.src = mp3
    audio.play()
    setPlayingMp3(mp3)
  }

  const months = t('episodes.months').split(',').map((m) => m.trim())

  return (
    <section id="episodes">
      <div className="wrap">
        <h2 className="sec-title">{t('episodes.title')}</h2>
        <p className="sec-lead">{t('episodes.lead')}</p>

        <div className="ep-list">
          {episodes.map((ep) => {
            const meta = [formatDate(ep.date, lang, months), formatDuration(ep.durationSec, t)]
              .filter(Boolean)
              .join(' · ')
            const isPlaying = ep.mp3 && playingMp3 === ep.mp3
            return (
              <a className="ep" href={ep.link} target="_blank" rel="noopener noreferrer" key={ep.link}>
                {ep.num && <span className="ep-num">#{ep.num}</span>}
                <span className="ep-body">
                  <span className="ep-title">{ep.title}</span>
                  {meta && <span className="ep-meta">{meta}</span>}
                </span>
                {ep.mp3 && (
                  <button
                    className={`ep-play${isPlaying ? ' playing' : ''}`}
                    onClick={(ev) => togglePlay(ev, ep.mp3)}
                    aria-label={`${isPlaying ? 'Pause' : 'Play'} ${ep.title}`}
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
