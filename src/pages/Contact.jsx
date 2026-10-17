import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { org } from '../data/content'
import { useLang } from '../i18n/LangContext'
import PageShell, { Reveal } from './PageShell'
import { Field, SentCard, SubmitRow, useWaForm } from './forms'

export default function Contact() {
  const { t, tx } = useLang()
  const form = useWaForm(
    { name: { required: true }, phone: { required: true, type: 'phone' }, email: { type: 'email' }, subject: { required: true }, message: { required: true } },
    (v) => `*APGEA website — Contact message*\nName: ${v.name}\nMobile: ${v.phone}${v.email ? `\nEmail: ${v.email}` : ''}\nSubject: ${v.subject}\n\n${v.message}`,
  )
  const { errors, field } = form
  const mapQ = encodeURIComponent('Kummaripalem Centre, Vidyadhara Puram, Vijayawada 520012')

  return (
    <PageShell title={t('pg.contact')} lede={t('ct.lede')}>
      <section className="section">
        <div className="container ip-contact">
          <div className="ip-contact__cards">
            <Reveal className="ip-ccard">
              <span className="ip-ccard__icon"><MapPin size={22} /></span>
              <h2>{t('ct.office')}</h2>
              <address>{tx(org.address).map((l) => <span key={l}>{l}<br /></span>)}</address>
              <a href={org.mapLink} target="_blank" rel="noreferrer" className="link-arrow">{t('ft.maps')}</a>
            </Reveal>
            <Reveal className="ip-ccard" delay={0.06}>
              <span className="ip-ccard__icon"><Phone size={22} /></span>
              <h2>{t('ct.phone')}</h2>
              {org.phones.map((p, i) => <a key={p} href={`tel:${org.phonesIntl[i]}`} className="ip-ccard__big en">+91 {p}</a>)}
              <span className="ip-ccard__muted"><Clock size={14} /> {t('ct.hours')}</span>
            </Reveal>
            <Reveal className="ip-ccard" delay={0.12}>
              <span className="ip-ccard__icon"><Mail size={22} /></span>
              <h2>{t('ct.email')}</h2>
              {org.emails.map((e) => <a key={e} href={`mailto:${e}`} className="ip-ccard__big en">{e}</a>)}
            </Reveal>
            <Reveal className="ip-ccard ip-ccard--wa" delay={0.18}>
              <span className="ip-ccard__icon"><MessageCircle size={22} /></span>
              <h2>{t('ct.wa')}</h2>
              <a href={org.whatsapp} target="_blank" rel="noreferrer" className="ip-btn"><MessageCircle size={17} /> {t('ct.waOpen')}</a>
            </Reveal>
          </div>

          <div className="ip-contact__right">
            <Reveal className="ip-formcard">
              <h2 className="ip-h2">{t('ct.form')}</h2>
              {form.sent ? <SentCard sent={form.sent} onReset={form.reset} /> : (
                <form className="fm" noValidate onSubmit={(e) => form.onSubmit(e)}>
                  <Field id="name" label={t('f.name')} required error={errors.name}><input {...field('name')} autoComplete="name" /></Field>
                  <Field id="phone" label={t('f.phone')} required error={errors.phone}><input {...field('phone')} type="tel" inputMode="numeric" autoComplete="tel" /></Field>
                  <Field id="email" label={t('f.email')} optional error={errors.email}><input {...field('email')} type="email" autoComplete="email" /></Field>
                  <Field id="subject" label={t('f.subject')} required error={errors.subject}><input {...field('subject')} /></Field>
                  <Field id="message" label={t('f.message')} required error={errors.message} wide><textarea {...field('message')} rows={5} /></Field>
                  <SubmitRow />
                </form>
              )}
            </Reveal>
            <Reveal className="ip-map" delay={0.1}>
              <iframe title={t('ct.map')} src={`https://www.google.com/maps?q=${mapQ}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
