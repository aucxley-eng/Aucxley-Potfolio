import { useState, useMemo } from 'react';
import Header from './components/common/Header/Header';
import Hero from './components/projects/Hero/Hero';
import AboutSection from './components/sections/AboutSection/AboutSection';
import WhyChooseUsSection from './components/sections/WhyChooseUsSection/WhyChooseUsSection';
import ProcessSection from './components/sections/ProcessSection/ProcessSection';
import PricingSection from './components/sections/PricingSection/PricingSection';
import SkillsSection from './components/sections/SkillsSection/SkillsSection';
import ProjectsSection from './components/projects/ProjectsSection/ProjectsSection';
import ContactSection from './components/sections/ContactSection/ContactSection';
import Footer from './components/common/Footer/Footer';
import LegalPage from './components/pages/LegalPage/LegalPage';
import { getProjects } from './data/projects';
import { useDarkMode } from './hooks/useDarkMode';
import './styles/globals.css';

function App() {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const [page, setPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const projects = useMemo(() => getProjects(), []);

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.technologies.some(t => t.toLowerCase().includes(term))
      );
    }
    if (filterTag) {
      result = result.filter(p => p.technologies.includes(filterTag));
    }
    return result;
  }, [projects, searchTerm, filterTag]);

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach(p => p.technologies.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [projects]);

  if (page === 'privacy' || page === 'terms') {
    return (
      <div className="app">
        <div className="noise-overlay" />
        <Header isDark={isDark} onToggleDark={toggleDark} />
        <LegalPage page={page} onBack={() => setPage('home')} />
        <Footer onNavigate={setPage} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="noise-overlay" />
      <Header
        isDark={isDark}
        onToggleDark={toggleDark}
      />
      <main>
        <Hero />
        <ProjectsSection
          projects={filteredProjects}
          searchTerm={searchTerm}
          filterTag={filterTag}
          onSearchChange={setSearchTerm}
          onTagFilter={setFilterTag}
          allTags={allTags}
        />
        <AboutSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <SkillsSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer onNavigate={setPage} />
    </div>
  );
}

export default App;
