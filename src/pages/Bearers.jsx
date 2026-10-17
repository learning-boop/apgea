import { useLang } from '../i18n/LangContext'
import Leadership from '../components/Leadership'
import PageShell from './PageShell'

export default function Bearers() {
  const { t } = useLang()
  return (
    <PageShell title={t('pg.bearers')} lede={t('br.findSub')}>
      <Leadership />
    </PageShell>
  )
}
