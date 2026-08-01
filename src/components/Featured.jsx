import { useLang } from '../i18n.jsx'
import './Featured.css'

const VIDEO_ID = '-H2B3QC_NdY'

export default function Featured() {
  const { t } = useLang()
  return (
    <section className="featured" id="featured">
      <div className="featured-split" data-reveal="">
        <div className="featured-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
            title="Каласы пад сярпом ШІ — афлайн-выпуск у замку"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="featured-text">
          <p className="featured-kicker">{t('featured.kicker')}</p>
          <h2>{t('featured.title')}</h2>
          <p>{t('featured.lead')}</p>
        </div>
      </div>
    </section>
  )
}
