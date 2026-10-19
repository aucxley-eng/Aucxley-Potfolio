import { Link } from 'react-router-dom';
import { company } from '../../../data/company';
import { services as serviceList } from '../../../data/services';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoText}>Aucxley</span>
              <span className={styles.logoAccent}> Solutions</span>
            </Link>
            <p className={styles.description}>{company.description}</p>
            <div className={styles.social}>
              <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
              <a href={company.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linkTitle}>Services</h4>
            <ul className={styles.linkList}>
              {serviceList.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className={styles.link}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linkTitle}>Company</h4>
            <ul className={styles.linkList}>
              <li><Link to="/work" className={styles.link}>Our Work</Link></li>
              <li><Link to="/about" className={styles.link}>About Us</Link></li>
              <li><Link to="/contact" className={styles.link}>Contact</Link></li>
              <li><Link to="/privacy" className={styles.link}>Privacy Policy</Link></li>
              <li><Link to="/terms" className={styles.link}>Terms of Service</Link></li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linkTitle}>Contact</h4>
            <ul className={styles.linkList}>
              <li><a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>{company.whatsappLabel}</a></li>
              <li><a href={`mailto:${company.email}`} className={styles.link}>{company.email}</a></li>
              <li><span className={styles.linkMuted}>{company.location}</span></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
