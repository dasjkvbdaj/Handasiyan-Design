import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import Layout from './components/Layout'
import HomePage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import AIDesignPage from './pages/AIDesignPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import ResetPassword from './pages/ResetPassword'
import DigitalCard from './pages/DigitalCard'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};


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
           <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/digitalCard" element={<DigitalCard/>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App