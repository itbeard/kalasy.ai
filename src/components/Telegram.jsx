import { useLang } from '../i18n.jsx'
import { LINKS } from '../links.js'
import './Telegram.css'

export default function Telegram() {
  const { t } = useLang()
  return (
    <section className="tg-band">
      <div className="wrap" data-reveal="">
        <p className="tg-quote">{t('tg.quote')}</p>
        <a className="btn btn-gold" href={LINKS.telegram} target="_blank" rel="noopener noreferrer">
          {t('tg.cta')}
        </a>
        <p className="tg-note">{t('tg.note')}</p>
      </div>
    </section>
  )
}
