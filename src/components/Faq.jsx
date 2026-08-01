import { useLang } from '../i18n.jsx'
import './Faq.css'

const ITEMS = ['1', '2', '3', '4', '5']

export default function Faq() {
  const { t } = useLang()
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <h2 className="sec-title">{t('faq.title')}</h2>
        <div className="faq-list">
          {ITEMS.map((n) => (
            <details className="faq-item" key={n}>
              <summary>{t(`faq.q${n}`)}</summary>
              <p>{t(`faq.a${n}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
