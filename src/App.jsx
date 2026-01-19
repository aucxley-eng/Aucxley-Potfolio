import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/common/Header/Header';
import Hero from './components/projects/Hero/Hero';
import ProjectsSection from './components/projects/ProjectsSection/ProjectsSection';
import AddProjectModal from './components/projects/AddProjectModal/AddProjectModal';
import Footer from './components/common/Footer/Footer';
import { getProjects } from './data/projects';
import './styles/globals.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterTag, setFilterTag] = useState('');
  
  // Load initial projects
  useEffect(() => {
    setProjects(getProjects());
  }, []);
  
  // Filter projects based on search term and tag
  const filteredProjects = useMemo(() => {
    let result = projects;
    
    if (searchTerm) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    if (filterTag) {
      result = result.filter(project => 
        project.technologies.includes(filterTag)
      );
    }
    
    return result;
  }, [projects, searchTerm, filterTag]);
  
  // Add new project
  const handleAddProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: Date.now() }]);
    setShowAddModal(false);
  };
  
  // Delete a project
  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };
  
  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach(project => {
      project.technologies.forEach(tech => tags.add(tech));
    });
    return Array.from(tags);
  }, [projects]);
  
  return (
    <div className="app">
      <Header />
      <main>
        <Hero onAddProject={() => setShowAddModal(true)} />
        <ProjectsSection 
          projects={filteredProjects}
          searchTerm={searchTerm}
          filterTag={filterTag}
          onSearchChange={setSearchTerm}
          onTagFilter={setFilterTag}
          onAddProject={() => setShowAddModal(true)}
          onDeleteProject={handleDeleteProject}
          allTags={allTags}
        />
      </main>
      <Footer />
      <AddProjectModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddProject}
      />
    </div>
  );
}

export default App;