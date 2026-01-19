import React, { useState } from 'react';
import Tag from '../../ui/Tag/Tag';
import Button from '../../ui/Button/Button';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardImage}>
        <img src={project.imageUrl} alt={project.title} />
        <div className={`${styles.overlay} ${isHovered ? styles.overlayVisible : ''}`}>
          <Button 
            onClick={() => onDelete(project.id)} 
            className={styles.deleteBtn}
            variant="icon"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </Button>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDescription}>{project.description}</p>
        <div className={styles.cardTags}>
          {project.technologies.slice(0, 3).map((tech, index) => (
            <Tag key={index}>{tech}</Tag>
          ))}
          {project.technologies.length > 3 && (
            <span className={styles.moreTags}>+{project.technologies.length - 3}</span>
          )}
        </div>
        <div className={styles.cardFooter}>
          {project.projectUrl && (
            <a href={project.projectUrl} className={styles.cardLink} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          )}
          <span className={styles.cardDate}>{project.date}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;