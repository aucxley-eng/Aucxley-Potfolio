import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../../../data/services';
import styles from './Header.module.css';

export default function Header({ isDark, onToggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContent}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>Aucxley</span>
          <span className={styles.logoAccent}> Solutions</span>
        </Link>

        <nav className={styles.desktopNav}>
          <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            Home
          </NavLink>

          <div className={styles.dropdown}>
            <NavLink to="/services" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
              Services
              <svg className={styles.caret} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </NavLink>
            <div className={styles.dropdownMenu}>
              {services.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className={styles.dropdownItem}>
                  <span className={styles.dropdownTitle}>{s.name}</span>
                  <span className={styles.dropdownTag}>{s.tagline}</span>
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/work" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            Work
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
            Contact
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <button
            onClick={onToggleDark}
            className={styles.themeToggle}
            aria-label="Toggle dark mode"
          >
            <motion.div
              key={isDark ? 'dark' : 'light'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </motion.div>
          </button>

          <Link to="/contact" className={styles.headerCta}>
            Start a Project
          </Link>

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
            <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
            <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <nav className={styles.mobileNav}>
              <NavLink to="/" end className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                Home
              </NavLink>
              <button
                className={styles.mobileLink}
                onClick={() => setMobileServicesOpen(prev => !prev)}
              >
                Services
              </button>
              {mobileServicesOpen && (
                <div className={styles.mobileSubnav}>
                  <NavLink to="/services" className={styles.mobileSubLink} onClick={() => setMobileOpen(false)}>
                    All Services
                  </NavLink>
                  {services.map((s) => (
                    <NavLink
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className={styles.mobileSubLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      {s.name}
                    </NavLink>
                  ))}
                </div>
              )}
              <NavLink to="/work" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                Work
              </NavLink>
              <NavLink to="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                About
              </NavLink>
              <NavLink to="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
                Contact
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
