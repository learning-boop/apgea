import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LangProvider } from './i18n/LangContext'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import Intro from './components/Intro'
import Home from './pages/Home'
import About from './pages/About'
import Bearers from './pages/Bearers'
import Affiliated from './pages/Affiliated'
import Activities from './pages/Activities'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Downloads from './pages/Downloads'
import Weblinks from './pages/Weblinks'
import News from './pages/News'
import Article from './pages/Article'
import Enroll from './pages/Enroll'
import Grievance from './pages/Grievance'
import Suggestions from './pages/Suggestions'
import Login from './pages/Login'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

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

const pages = [
  ['/about', About],
  ['/office-bearers', Bearers],
  ['/affiliated', Affiliated],
  ['/activities', Activities],
  ['/services', Services],
  ['/gallery', Gallery],
  ['/downloads', Downloads],
  ['/weblinks', Weblinks],
  ['/news', News],
  ['/news/:id', Article],
  ['/enroll', Enroll],
  ['/grievance', Grievance],
  ['/suggestions', Suggestions],
  ['/login', Login],
  ['/contact', Contact],
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
          {pages.map(([path, C]) => <Route key={path} path={path} element={<C />} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <WhatsAppFab />
      </BrowserRouter>
    </LangProvider>
  )
}
