import { useLang } from '../i18n.jsx'
import './About.css'

const CARDS = [
  { key: 'card1', glyph: '🌾' },
  { key: 'card2', glyph: '🏰' },
  { key: 'card3', glyph: '✍️' },
  { key: 'card4', glyph: '🌙' },
]

export default function About() {
  const { t } = useLang()
  return (
    <section className="about" id="about">
      <div className="wrap">
        <h2 className="sec-title">{t('about.title')}</h2>
        <p className="sec-lead">{t('about.lead')}</p>
        <div className="cards" data-reveal="">
          {CARDS.map(({ key, glyph }) => (
            <div className="card" key={key}>
              <span className="glyph">{glyph}</span>
              <h3>{t(`about.${key}.title`)}</h3>
              <p>{t(`about.${key}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
