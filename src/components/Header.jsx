import { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'
import './Header.css'

export default function Header() {
  const { lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <a className="brand" href="#top" aria-label="Kalasy AI">
        <img src="/assets/favicon.jpg" alt="" />
        <span>КАЛАСЫ ПАД СЯРПОМ ШІ</span>
      </a>
      <nav className="lang-toggle" aria-label="Language">
        <button
          className={lang === 'be' ? 'active' : ''}
          onClick={() => setLang('be')}
        >
          БЕЛ
        </button>
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={() => setLang('en')}
        >
          ENG
        </button>
      </nav>
    </header>
  )
}
