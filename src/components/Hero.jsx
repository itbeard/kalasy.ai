import { useMemo } from 'react'
import { useLang } from '../i18n.jsx'
import { LINKS } from '../links.js'
import { useEpisodes } from '../hooks/useEpisodes.js'
import { usePlayer } from '../player/PlayerProvider.jsx'
import { PlayIcon } from './Icons.jsx'
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
  const episodes = useEpisodes()
  const { play } = usePlayer()
  const latest = episodes[0]

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
      <button className="hero-play" onClick={() => play(latest)}>
        <span className="hero-play-ico" aria-hidden="true">
          <PlayIcon />
        </span>
        <span>
          <small>
            {t('hero.latest')}
            {latest.num && ` · #${latest.num}`}
          </small>
          <b>{latest.title}</b>
        </span>
      </button>
      <p className="hero-also">
        <span>{t('hero.also')}</span>
        <a href={LINKS.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
        <a href={LINKS.apple} target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
        <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href={LINKS.rss} target="_blank" rel="noopener noreferrer">RSS</a>
      </p>
      <a className="scroll-hint" href="#featured" aria-label="scroll down">
        ▾
      </a>
    </div>
  )
}
