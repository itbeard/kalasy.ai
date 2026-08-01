import { useLang } from '../i18n.jsx'
import './Quote.css'

export default function Quote() {
  const { t } = useLang()
  return (
    <section className="quote-band">
      <div data-reveal="">
        <span className="quote-mark" aria-hidden="true">
          ❦
        </span>
        <blockquote>{t('hero.quote')}</blockquote>
      </div>
    </section>
  )
}
