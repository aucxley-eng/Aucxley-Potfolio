import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../../ui/Button/Button';
import styles from './ProjectsSection.module.css';

const ProjectsSection = ({ 
  projects, 
  searchTerm, 
  filterTag,
  onSearchChange, 
  onTagFilter,
  onAddProject, 
  onDeleteProject,
  allTags 
}) => {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Projects</h2>
          <Button onClick={onAddProject} className={styles.addProjectBtn}>
            Add New Project
          </Button>
        </div>
        
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onTagFilter={onTagFilter}
          filterTag={filterTag}
          allTags={allTags}
        />
        
        {projects.length > 0 ? (
          <div className={styles.projectsGrid}>
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onDelete={onDeleteProject}
              />
            ))}
          </div>
        ) : (
          <div className={styles.noProjects}>
            <h3>No projects found</h3>
            <p>Try adjusting your search or add a new project.</p>
            <Button onClick={onAddProject}>Add New Project</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;