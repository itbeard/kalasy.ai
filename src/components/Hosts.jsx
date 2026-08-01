import { useLang } from '../i18n.jsx'
import { renderRich } from '../richtext.jsx'
import './Hosts.css'

const HOSTS = ['1', '2', '3']

export default function Hosts() {
  const { t } = useLang()
  return (
    <section className="hosts" id="hosts">
      <div className="wrap">
        <h2 className="sec-title">{t('hosts.title')}</h2>
        <p className="sec-lead">{t('hosts.lead')}</p>
        <div className="hosts-flex" data-reveal="">
          <div className="hosts-photo">
            <img src="/assets/hosts.jpg" alt={t('hosts.photo.alt')} />
          </div>
          <div className="hosts-list">
            {HOSTS.map((n) => (
              <div className="host" key={n}>
                <b>{renderRich(t(`hosts.${n}.name`))}</b>
                <p>{renderRich(t(`hosts.${n}.text`))}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
