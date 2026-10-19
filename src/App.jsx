import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import Home from './pages/Home/Home';
import ServicesPage from './pages/Services/ServicesPage';
import ServiceDetailPage from './pages/Services/ServiceDetailPage';
import WorkPage from './pages/Work/WorkPage';
import CaseStudyPage from './pages/Work/CaseStudyPage';
import AboutPage from './pages/About/AboutPage';
import ContactPage from './pages/Contact/ContactPage';
import LegalPage from './components/pages/LegalPage/LegalPage';
import DemoApp from './components/mockup/DemoApp';
import BiasharaApp from './components/mockup/biashara/BiasharaApp';
import NotFoundPage from './pages/NotFoundPage';
import { useDarkMode } from './hooks/useDarkMode';
import './styles/globals.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function DemoLayout({ children }) {
  return <div className="app">{children}</div>;
}

function SchoolHubDemo() {
  const navigate = useNavigate();
  return (
    <DemoLayout>
      <DemoApp onBack={() => navigate('/work/schoolhub')} />
    </DemoLayout>
  );
}

function BiasharaDemo() {
  const navigate = useNavigate();
  return (
    <DemoLayout>
      <BiasharaApp onBack={() => navigate('/work/biashara')} />
    </DemoLayout>
  );
}

export default function App() {
  const { isDark, toggle: toggleDark } = useDarkMode();

  return (
    <div className="app">
      <ScrollToTop />
      <div className="noise-overlay" />
      <Routes>
        <Route path="/demo/schoolhub" element={<SchoolHubDemo />} />
        <Route path="/demo/biashara" element={<BiasharaDemo />} />
        <Route
          path="*"
          element={
            <>
              <Header isDark={isDark} onToggleDark={toggleDark} />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/work/:slug" element={<CaseStudyPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<LegalPage page="privacy" />} />
                  <Route path="/terms" element={<LegalPage page="terms" />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
