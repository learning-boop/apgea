import { districts } from '../data/content'
import { useLang } from '../i18n/LangContext'
import { pageEn } from '../i18n/pageStrings'
import PageShell, { Reveal } from './PageShell'
import { Field, SentCard, SubmitRow, makeRef, useWaForm } from './forms'

const cats = ['da', 'pay', 'promo', 'transfer', 'leave', 'pension', 'health', 'other']

export default function Grievance() {
  const { t, tx } = useLang()
  const form = useWaForm(
    {
      name: { required: true }, empId: {}, dept: { required: true }, desig: {}, district: { required: true },
      phone: { required: true, type: 'phone' }, category: { required: true }, since: {}, details: { required: true },
      consent: { required: true, type: 'consent' },
    },
    (v, ref) => [
      `*APGEA grievance* (${ref})`,
      `Category: ${pageEn[`gr.c.${v.category}`]}`,
      [`Name: ${v.name}`, v.empId && `Employee ID: ${v.empId}`, `Department: ${v.dept}`, v.desig && `Designation: ${v.desig}`,
        `District: ${v.district}`, `Mobile: ${v.phone}`, v.since && `Pending since: ${v.since}`].filter(Boolean).join('\n'),
      `Details:\n${v.details}`,
    ].join('\n\n'),
  )
  const { errors, field } = form

  return (
    <PageShell title={t('gr.title')} lede={t('gr.lede')} crumbs={[[t('pg.services'), '/services']]}>
      <section className="section">
        <div className="container ip-formpage">
          <Reveal className="ip-why ip-why--steps">
            <h2>{t('gr.how')}</h2>
            <ol>
              {['gr.h1', 'gr.h2', 'gr.h3', 'gr.h4'].map((k, i) => <li key={k}><span className="en">{i + 1}</span> {t(k)}</li>)}
            </ol>
            <p className="ip-why__note">{t('f.attach')}</p>
          </Reveal>
          <Reveal className="ip-formcard" delay={0.08}>
            <h2 className="ip-h2">{t('gr.form')}</h2>
            {form.sent ? <SentCard sent={form.sent} onReset={form.reset} /> : (
              <form className="fm" noValidate onSubmit={(e) => form.onSubmit(e, makeRef('G'))}>
                <Field id="category" label={t('f.category')} required error={errors.category} wide>
                  <div className="fm__chips" role="radiogroup" aria-label={t('f.category')}>
                    {cats.map((c) => (
                      <label key={c} className={`fm__chip ${form.values.category === c ? 'is-on' : ''}`}>
                        <input type="radio" name="category" value={c} checked={form.values.category === c} onChange={field('category').onChange} id={c === cats[0] ? 'f-category' : undefined} />
                        {t(`gr.c.${c}`)}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field id="name" label={t('f.name')} required error={errors.name}><input {...field('name')} autoComplete="name" /></Field>
                <Field id="empId" label={t('f.empId')} optional error={errors.empId}><input {...field('empId')} /></Field>
                <Field id="dept" label={t('f.dept')} required error={errors.dept}><input {...field('dept')} /></Field>
                <Field id="desig" label={t('f.desig')} optional error={errors.desig}><input {...field('desig')} /></Field>
                <Field id="district" label={t('f.district')} required error={errors.district}>
                  <select {...field('district')}>
                    <option value="">{t('p.select')}</option>
                    {districts.map((d) => <option key={d.en} value={d.en}>{tx(d)}</option>)}
                  </select>
                </Field>
                <Field id="phone" label={t('f.phone')} required error={errors.phone}><input {...field('phone')} type="tel" inputMode="numeric" autoComplete="tel" /></Field>
                <Field id="since" label={t('f.since')} optional error={errors.since}><input {...field('since')} type="month" /></Field>
                <Field id="details" label={t('f.details')} required error={errors.details} wide><textarea {...field('details')} rows={6} /></Field>
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
