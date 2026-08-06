import { useLang } from '../i18n.jsx'
import { NewsGlyph, BelarusGlyph, QuillGlyph, MoonGlyph } from './AboutGlyphs.jsx'
import './About.css'

const CARDS = [
  { key: 'card1', Glyph: NewsGlyph },
  { key: 'card2', Glyph: BelarusGlyph },
  { key: 'card3', Glyph: QuillGlyph },
  { key: 'card4', Glyph: MoonGlyph },
]

export default function About() {
  const { t } = useLang()
  return (
    <section className="about" id="about">
      <div className="wrap">
        <h2 className="sec-title">{t('about.title')}</h2>
        <p className="sec-lead">{t('about.lead')}</p>
        <div className="cards" data-reveal="">
          {CARDS.map(({ key, Glyph }) => (
            <div className="card" key={key}>
              <span className="glyph"><Glyph /></span>
              <h3>{t(`about.${key}.title`)}</h3>
              <p>{t(`about.${key}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
