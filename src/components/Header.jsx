import { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'
import './Header.css'

const NAV = [
  ['nav.episodes', '#episodes'],
  ['nav.about', '#about'],
  ['nav.hosts', '#hosts'],
  ['nav.listen', '#listen'],
]

export default function Header() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <a className="brand" href="#top" aria-label="Каласы пад сярпом ШІ">
        <img src="/assets/favicon.jpg" alt="" width="40" height="40" />
        <span lang="be">КАЛАСЫ ПАД СЯРПОМ ШІ</span>
      </a>
      <nav className="site-nav">
        {NAV.map(([key, href]) => (
          <a href={href} key={key}>
            {t(key)}
          </a>
        ))}
      </nav>
      <nav className="lang-toggle" aria-label={t('lang.label')}>
        <button
          type="button"
          lang="be"
          className={lang === 'be' ? 'active' : ''}
          aria-pressed={lang === 'be'}
          onClick={() => setLang('be')}
        >
          БЕЛ
        </button>
        <button
          type="button"
          lang="en"
          className={lang === 'en' ? 'active' : ''}
          aria-pressed={lang === 'en'}
          onClick={() => setLang('en')}
        >
          ENG
        </button>
      </nav>
    </header>
  )
}
