import { useLang } from '../i18n.jsx'
import { LINKS } from '../links.js'
import {
  SpotifyIcon,
  AppleIcon,
  YouTubeIcon,
  TelegramIcon,
  InstagramIcon,
  Mp3Icon,
  RssIcon,
} from './Icons.jsx'
import './Platforms.css'

const PLATFORMS = [
  { name: 'Spotify', tagKey: 'plat.spotify', href: LINKS.spotify, Icon: SpotifyIcon, color: '#1DB954' },
  { name: 'Apple Podcasts', tagKey: 'plat.apple', href: LINKS.apple, Icon: AppleIcon, color: '#B150E2' },
  { name: 'YouTube', tagKey: 'plat.youtube', href: LINKS.youtube, Icon: YouTubeIcon, color: '#FF0000' },
  { name: 'Telegram', tagKey: 'plat.telegram', href: LINKS.telegram, Icon: TelegramIcon, color: '#2AABEE' },
  { name: 'Instagram', tagKey: 'plat.instagram', href: LINKS.instagram, Icon: InstagramIcon, color: '#E1306C' },
  { nameKey: 'plat.mp3.name', tag: 'kalasyai.podbean.com', href: LINKS.podbean, Icon: Mp3Icon, color: '#f2b93f' },
  { name: 'RSS', tagKey: 'plat.rss', href: LINKS.rss, Icon: RssIcon, color: '#f28c1e' },
]

export default function Platforms() {
  const { t } = useLang()
  return (
    <section className="platforms" id="listen">
      <div className="wrap">
        <h2 className="sec-title">{t('listen.title')}</h2>
        <p className="sec-lead">{t('listen.lead')}</p>
        <div className="plat-grid">
          {PLATFORMS.map(({ name, nameKey, tag, tagKey, href, Icon, color }) => (
            <a className="plat" href={href} target="_blank" rel="noopener noreferrer" key={href}>
              <Icon style={{ color }} />
              <span>
                <b>{nameKey ? t(nameKey) : name}</b>
                <small>{tagKey ? t(tagKey) : tag}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
