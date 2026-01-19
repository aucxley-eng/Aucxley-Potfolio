import React from 'react';
import Button from '../../ui/Button/Button';
import styles from './Hero.module.css';

const Hero = ({ onAddProject }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Creative Portfolio
          <span className={styles.accent}>.</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Showcasing innovative projects that push boundaries and inspire change
        </p>
        <div className={styles.heroActions}>
          <Button onClick={onAddProject} className={styles.primaryBtn}>
            Add New Project
          </Button>
          <Button variant="outline" className={styles.secondaryBtn}>
            View Our Work
          </Button>
        </div>
      </div>
      <div className={styles.heroAnimation}>
        <div className={styles.floatingElements}>
          <div className={`${styles.element} ${styles.element1}`}></div>
          <div className={`${styles.element} ${styles.element2}`}></div>
          <div className={`${styles.element} ${styles.element3}`}></div>
          <div className={`${styles.element} ${styles.element4}`}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;