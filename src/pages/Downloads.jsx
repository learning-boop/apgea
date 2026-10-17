import { Download, FileText, MessageCircle } from 'lucide-react'
import { gos, org } from '../data/content'
import { useLang } from '../i18n/LangContext'
import PageShell, { Reveal } from './PageShell'

const isReal = (v) => !String(typeof v === 'object' && v ? v.en : v).trim().startsWith('[')
const hasFile = (f) => f && f !== '#'

// Association documents. Put the PDF in /public and set `file` to show a download button.
const docs = [
  { k: 'dl.member', file: null },
  { k: 'dl.brochure', file: null },
  { k: 'dl.visionDoc', file: null },
  { k: 'dl.recognition', file: null },
]

function Row({ title, meta, file }) {
  const { t } = useLang()
  return (
    <li className="ip-doc">
      <span className="ip-doc__icon"><FileText size={22} /></span>
      <span className="ip-doc__body"><b>{title}</b>{meta && <small>{meta}</small>}</span>
      {hasFile(file)
        ? <a href={file} download className="ip-btn ip-btn--sm"><Download size={15} /> PDF</a>
        : <span className="ip-badge">{t('p.soon')}</span>}
    </li>
  )
}

export default function Downloads() {
  const { t, tx, date } = useLang()
  const list = gos.filter((g) => isReal(g.title))
  return (
    <PageShell title={t('pg.downloads')} lede={t('dl.lede')}>
      <section className="section">
        <div className="container ip-docs">
          <Reveal id="gos">
            <h2 className="ip-h2">{t('dl.gos')}</h2>
            <ul className="ip-doclist">
              {list.map((g) => <Row key={g.id} title={tx(g.title)} meta={`${tx(g.dept)} · ${date(g.date)}`} file={g.file} />)}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="ip-h2">{t('dl.forms')}</h2>
            <ul className="ip-doclist">
              {docs.map((d) => <Row key={d.k} title={t(d.k)} file={d.file} />)}
            </ul>
          </Reveal>
        </div>
        <div className="container">
          <Reveal className="ip-callout">
            <MessageCircle size={20} />
            <p>{t('dl.send')}</p>
            <a href={org.whatsapp} target="_blank" rel="noreferrer" className="ip-btn ip-btn--sm">WhatsApp</a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
