import { Link } from 'react-router-dom'
import { Facebook, Twitter, Youtube, MessageCircle, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import { org } from '../data/content'
import { useLang } from '../i18n/LangContext'
import Emblem from './Emblem'
import LangToggle from './LangToggle'
import './Footer.css'

const quick = [
  ['ft.home', '/'], ['ft.aboutUs', '/about'], ['ft.bearers', '/office-bearers'], ['ft.news', '/news'],
  ['ft.downloads', '/downloads'], ['ft.gallery', '/gallery'], ['ft.contact', '/contact'],
]
const services = [
  ['ft.enroll', '/enroll'], ['ft.login', '/login'], ['ft.rti', '/services#rti'],
  ['ft.suggest', '/suggestions'], ['ft.weblinks', '/weblinks'],
]

export default function Footer() {
  const { t, tx } = useLang()
  return (
    <footer className="ft" id="contact">
      <div className="container">
        <div className="ft__strip">
          <div className="ft__social">
            <a href={org.social.facebook} aria-label="Facebook" target="_blank" rel="noreferrer"><Facebook size={18} /></a>
            <a href={org.social.twitter} aria-label="Twitter / X" target="_blank" rel="noreferrer"><Twitter size={18} /></a>
            <a href={org.whatsapp} aria-label="WhatsApp" target="_blank" rel="noreferrer"><MessageCircle size={18} /></a>
            <a href={org.social.youtube} aria-label="YouTube" target="_blank" rel="noreferrer"><Youtube size={18} /></a>
          </div>
          <div className="ft__strip-item">
            <Mail size={26} />
            <span><small>{t('ft.email')}</small>{org.emails.map((e) => <a key={e} href={`mailto:${e}`} className="en">{e}</a>)}</span>
          </div>
          <div className="ft__strip-item">
            <Phone size={26} />
            <span><small>{t('ft.call')}</small>{org.phones.map((p, i) => <a key={p} href={`tel:${org.phonesIntl[i]}`} className="en">+91 {p}</a>)}</span>
          </div>
        </div>
      </div>

      <div className="ft__main">
        <div className="container ft__grid">
          <div className="ft__about">
            <span className="ft__brand">
              <Emblem size={64} spin />
              <span>
                <span className="ft__logo">APGEA</span>
                <span className="ft__te">{org.nameTe}</span>
              </span>
            </span>
            <p>{t('ft.about')}</p>
            <LangToggle id="footer" />
          </div>
          <div>
            <h3 className="ft__h">{t('ft.quick')}</h3>
            <ul className="ft__links">{quick.map(([k, to]) => <li key={k}><Link to={to}>{t(k)}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className="ft__h">{t('ft.services')}</h3>
            <ul className="ft__links">{services.map(([k, to]) => <li key={k}><Link to={to}>{t(k)}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className="ft__h">{t('ft.office')}</h3>
            <address className="ft__addr">
              <MapPin size={16} />
              <span>{tx(org.address).map((l) => <span key={l}>{l}<br /></span>)}</span>
            </address>
            <a href={org.mapLink} target="_blank" rel="noreferrer" className="link-arrow ft__map" style={{ color: 'var(--gold-light)' }}>{t('ft.maps')}</a>
          </div>
        </div>
      </div>

      <div className="ft__word" aria-hidden="true"><span>APGEA</span></div>

      <div className="ft__bottom">
        <div className="container ft__bottom-in">
          <span>© {new Date().getFullYear()} APGEA. {t('ft.rights')}</span>
          <span>{t('ft.designed')} <a href="https://creatorstouchglobal.com" target="_blank" rel="noreferrer" className="en">Creators Touch</a></span>
          <button className="ft__top" aria-label={t('ft.top')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={16} /></button>
        </div>
      </div>
    </footer>
  )
}
