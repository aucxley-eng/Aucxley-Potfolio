import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import SearchBar from '../SearchBar/SearchBar';
import styles from './ProjectsSection.module.css';

export default function ProjectsSection({
  projects,
  searchTerm,
  filterTag,
  onSearchChange,
  onTagFilter,
  allTags,
}) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="section-label">What I Do</span>
            <h2 className="section-title">
              My <span className="gradient-text">Services</span>
            </h2>
            <p className="section-subtitle">
              I focus on one thing and do it well: building modern websites that help your business grow.
            </p>
          </div>
        </motion.div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onTagFilter={onTagFilter}
          filterTag={filterTag}
          allTags={allTags}
        />

        <AnimatePresence mode="wait">
          {projects.length > 0 ? (
            <motion.div
              key="grid"
              className={styles.grid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onView={setSelectedProject}
                  index={i}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className={styles.empty}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.emptyIcon}>
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <h3>No projects found</h3>
              <p>Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
