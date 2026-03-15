import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import Layout from './components/Layout'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Process from './components/Process'
import ContactSection from './components/ContactSection'
import CTA from './components/CTA'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import AIDesignPage from './pages/AIDesignPage'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const HomePage = () => (
  <>
    <Hero />
    <About isPreview={true} />
    <Services isPreview={true} />
    <Portfolio isPreview={true} />
    <ContactSection />
    <CTA />
  </>
)

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ai-design" element={<AIDesignPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App