import { CheckCircle2 } from 'lucide-react'
import { districts } from '../data/content'
import { useLang } from '../i18n/LangContext'
import Emblem from '../components/Emblem'
import PageShell, { Reveal } from './PageShell'
import { Field, SentCard, SubmitRow, makeRef, useWaForm } from './forms'

export default function Enroll() {
  const { t, tx } = useLang()
  const form = useWaForm(
    {
      name: { required: true }, empId: {}, dept: { required: true }, desig: { required: true },
      district: { required: true }, office: {}, phone: { required: true, type: 'phone' }, email: { type: 'email' },
      consent: { required: true, type: 'consent' },
    },
    (v, ref) => [
      `*APGEA membership application* (${ref})`,
      `Name: ${v.name}`, v.empId && `Employee ID: ${v.empId}`, `Department: ${v.dept}`, `Designation: ${v.desig}`,
      `District: ${v.district}`, v.office && `Office: ${v.office}`, `Mobile: ${v.phone}`, v.email && `Email: ${v.email}`,
    ].filter(Boolean).join('\n'),
  )
  const { errors, field } = form

  return (
    <PageShell title={t('pg.enroll')} lede={t('en.lede')}>
      <section className="section">
        <div className="container ip-formpage">
          <Reveal className="ip-why">
            <Emblem size={96} title="" />
            <h2>{t('en.why')}</h2>
            <ul>
              {['en.w1', 'en.w2', 'en.w3', 'en.w4'].map((k) => <li key={k}><CheckCircle2 size={20} /> {t(k)}</li>)}
            </ul>
          </Reveal>
          <Reveal className="ip-formcard" delay={0.08}>
            <h2 className="ip-h2">{t('en.form')}</h2>
            {form.sent ? <SentCard sent={form.sent} onReset={form.reset} /> : (
              <form className="fm" noValidate onSubmit={(e) => form.onSubmit(e, makeRef('M'))}>
                <Field id="name" label={t('f.name')} required error={errors.name}><input {...field('name')} autoComplete="name" /></Field>
                <Field id="empId" label={t('f.empId')} optional error={errors.empId}><input {...field('empId')} /></Field>
                <Field id="dept" label={t('f.dept')} required error={errors.dept}><input {...field('dept')} /></Field>
                <Field id="desig" label={t('f.desig')} required error={errors.desig}><input {...field('desig')} /></Field>
                <Field id="district" label={t('f.district')} required error={errors.district}>
                  <select {...field('district')}>
                    <option value="">{t('p.select')}</option>
                    {districts.map((d) => <option key={d.en} value={d.en}>{tx(d)}</option>)}
                  </select>
                </Field>
                <Field id="office" label={t('f.office')} optional error={errors.office}><input {...field('office')} /></Field>
                <Field id="phone" label={t('f.phone')} required error={errors.phone}><input {...field('phone')} type="tel" inputMode="numeric" autoComplete="tel" /></Field>
                <Field id="email" label={t('f.email')} optional error={errors.email}><input {...field('email')} type="email" autoComplete="email" /></Field>
                <div className={`fm__check ${errors.consent ? 'has-error' : ''}`}>
                  <input type="checkbox" id="f-consent" checked={form.values.consent} onChange={field('consent').onChange} />
                  <label htmlFor="f-consent">{t('f.consent')}</label>
                  {errors.consent && <span className="fm__err" role="alert">{errors.consent}</span>}
                </div>
                <SubmitRow />
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
