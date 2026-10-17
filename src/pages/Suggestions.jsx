import { Lightbulb } from 'lucide-react'
import { districts } from '../data/content'
import { useLang } from '../i18n/LangContext'
import { pageEn } from '../i18n/pageStrings'
import PageShell, { Reveal } from './PageShell'
import { Field, SentCard, SubmitRow, useWaForm } from './forms'

const cats = ['welfare', 'policy', 'assoc', 'site', 'other']

export default function Suggestions() {
  const { t, tx } = useLang()
  const form = useWaForm(
    { category: { required: true }, message: { required: true }, name: {}, district: {}, phone: { type: 'phone' } },
    (v) => [
      `*APGEA suggestion* — ${pageEn[`sg.c.${v.category}`]}`,
      v.message,
      [v.name && `From: ${v.name}`, v.district && `District: ${v.district}`, v.phone && `Mobile: ${v.phone}`].filter(Boolean).join('\n'),
    ].filter(Boolean).join('\n\n'),
  )
  const { errors, field } = form

  return (
    <PageShell title={t('pg.suggestions')} lede={t('sg.lede')}>
      <section className="section">
        <div className="container ip-narrow">
          <Reveal className="ip-formcard">
            <h2 className="ip-h2"><Lightbulb size={22} /> {t('sg.form')}</h2>
            {form.sent ? <SentCard sent={form.sent} onReset={form.reset} /> : (
              <form className="fm" noValidate onSubmit={(e) => form.onSubmit(e)}>
                <Field id="category" label={t('f.category')} required error={errors.category} wide>
                  <div className="fm__chips" role="radiogroup" aria-label={t('f.category')}>
                    {cats.map((c) => (
                      <label key={c} className={`fm__chip ${form.values.category === c ? 'is-on' : ''}`}>
                        <input type="radio" name="category" value={c} checked={form.values.category === c} onChange={field('category').onChange} id={c === cats[0] ? 'f-category' : undefined} />
                        {t(`sg.c.${c}`)}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field id="message" label={t('f.message')} required error={errors.message} wide><textarea {...field('message')} rows={6} /></Field>
                <Field id="name" label={t('f.name')} optional hint={t('sg.anon')} error={errors.name}><input {...field('name')} autoComplete="name" /></Field>
                <Field id="district" label={t('f.district')} optional error={errors.district}>
                  <select {...field('district')}>
                    <option value="">{t('p.select')}</option>
                    {districts.map((d) => <option key={d.en} value={d.en}>{tx(d)}</option>)}
                  </select>
                </Field>
                <Field id="phone" label={t('f.phone')} optional error={errors.phone}><input {...field('phone')} type="tel" inputMode="numeric" autoComplete="tel" /></Field>
                <SubmitRow />
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
