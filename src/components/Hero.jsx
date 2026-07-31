import { useMemo } from 'react'
import { useLang } from '../i18n.jsx'
import { LINKS } from '../links.js'
import { SpotifyIcon, AppleIcon, YouTubeIcon } from './Icons.jsx'
import './Hero.css'

const SHARD_COLORS = ['#d8431f', '#2e7d43', '#f2b93f', '#a92f14']
const SHARD_COUNT = 26

function useShards() {
  return useMemo(
    () =>
      Array.from({ length: SHARD_COUNT }, (_, i) => {
        const size = 5 + Math.random() * 9
        return {
          id: i,
          style: {
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 30}%`,
            background: SHARD_COLORS[i % SHARD_COLORS.length],
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${9 + Math.random() * 14}s`,
            animationDelay: `${-Math.random() * 20}s`,
          },
        }
      }),
    [],
  )
}

export default function Hero() {
  const { t } = useLang()
  const shards = useShards()

  return (
    <div className="hero">
      {shards.map((s) => (
        <span key={s.id} className="shard" style={s.style} />
      ))}
      <p className="hero-kicker">{t('hero.kicker')}</p>
      <h1>
        Каласы пад сярпом <span className="ai">ШІ</span>
      </h1>
      <p className="hero-sub">{t('hero.sub')}</p>
      <p className="hero-quote">{t('hero.quote')}</p>
      <div className="hero-cta">
        <a className="btn btn-gold" href={LINKS.spotify} target="_blank" rel="noopener noreferrer">
          <SpotifyIcon />
          Spotify
        </a>
        <a className="btn btn-gold" href={LINKS.apple} target="_blank" rel="noopener noreferrer">
          <AppleIcon />
          Apple Podcasts
        </a>
        <a className="btn btn-ghost" href={LINKS.youtube} target="_blank" rel="noopener noreferrer">
          <YouTubeIcon />
          YouTube
        </a>
      </div>
      <a className="scroll-hint" href="#about" aria-label="scroll down">
        ▾
      </a>
    </div>
  )
}
