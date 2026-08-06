import { useLang } from '../i18n.jsx'
import { LINKS } from '../links.js'
import './Footer.css'

const FOOT_LINKS = [
  ['Spotify', LINKS.spotify],
  ['Apple Podcasts', LINKS.apple],
  ['YouTube', LINKS.youtube],
  ['Telegram', LINKS.telegram],
  ['Instagram', LINKS.instagram],
  ['Podbean', LINKS.podbean],
  ['RSS', LINKS.rss],
]

export default function Footer() {
  const { t } = useLang()
  return (
    <footer>
      <p className="foot-quote">{t('footer.quote')}</p>
      <div className="foot-links">
        {FOOT_LINKS.map(([name, href]) => (
          <a href={href} target="_blank" rel="noopener noreferrer" key={name}>
            {name}
          </a>
        ))}
      </div>
      <p className="copy">© {new Date().getFullYear()} {t('footer.copy')}</p>
    </footer>
  )
}
