import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Portfolio</span>
            <span className={styles.logoAccent}>.</span>
          </div>
          <nav className={styles.nav}>
            <a href="#projects" className={styles.navLink}>Projects</a>
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;