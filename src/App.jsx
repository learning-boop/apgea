import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import Intro from './components/Intro'
import Home from './pages/Home'
import Page from './pages/Page'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

const inner = [
  ['/about', 'pg.about'],
  ['/office-bearers', 'pg.bearers'],
  ['/weblinks', 'pg.weblinks'],
  ['/affiliated', 'pg.affiliated'],
  ['/activities', 'pg.activities'],
  ['/services', 'pg.services'],
  ['/gallery', 'pg.gallery'],
  ['/downloads', 'pg.downloads'],
  ['/news', 'pg.news'],
  ['/news/:id', 'pg.news'],
  ['/enroll', 'pg.enroll'],
  ['/login', 'pg.login'],
  ['/suggestions', 'pg.suggestions'],
  ['/contact', 'pg.contact'],
]

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Intro />
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {inner.map(([path, key]) => (
            <Route key={path} path={path} element={<Page titleKey={key} />} />
          ))}
          <Route path="*" element={<Page titleKey="pg.notFound" />} />
        </Routes>
        <Footer />
        <WhatsAppFab />
      </BrowserRouter>
    </LangProvider>
  )
}
