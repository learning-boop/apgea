import { MessageCircle } from 'lucide-react'
import { org } from '../data/content'
import { useLang } from '../i18n/LangContext'

export default function WhatsAppFab() {
  const { t } = useLang()
  return (
    <a href={org.whatsapp} target="_blank" rel="noreferrer" aria-label={t('wa.label')} className="wa-fab">
      <MessageCircle size={28} />
    </a>
  )
}
