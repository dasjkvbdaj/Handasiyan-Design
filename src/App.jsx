import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import Layout from './components/Layout'
import HomePage from './pages/Homepage'
import ProtectedRoute from './components/ProtectedRoute'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Profile = lazy(() => import('./pages/Profile'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const DigitalCard = lazy(() => import('./pages/DigitalCard'))
const AdminPanel = lazy(() => import('./pages/AdminPanel'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('./pages/TermsOfService'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const Handasiyan3DProjects = lazy(() => import('./pages/Handasiyan3DProjects'))

const NavigateTo3D = () => {
  useEffect(() => {
    window.location.replace('/3d/');
  }, []);
  return null;
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    } else {
      // Only scroll to top if the pathname itself has changed
      // (not just search params or hash removal on the same page)
      window.scrollTo(0, 0);
    }
  }, [pathname]); // Only trigger on pathname change

  // Separate effect for hash changes to allow jumping to sections within the same page
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return null;
};


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* All other routes wrapped in Layout */}
        <Route
          path="*"
          element={
            <Layout>
              <Suspense fallback={<div className="min-h-[80vh] bg-[#061e15] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div></div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  {/* <Route path="/ai-design" element={<AIDesignPage />} /> */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/digitalCard" element={<DigitalCard />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />


                  {/* Protected Routes */}
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />

                  <Route path="/admin" element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminPanel />
                    </ProtectedRoute>
                  } />

                  <Route path="/3d/" element={<Handasiyan3DProjects />} />
                  <Route path="/3d/*" element={<Handasiyan3DProjects />} />


                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Layout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App