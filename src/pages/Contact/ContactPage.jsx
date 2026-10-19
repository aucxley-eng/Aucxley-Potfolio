import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../../components/ui/PageHeader';
import { company } from '../../data/company';
import { services as serviceList } from '../../data/services';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const isDemoRequest = searchParams.get('request') === 'demo';
  const demoProduct = searchParams.get('product');

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    service: serviceList[0]?.name || '',
    message: isDemoRequest
      ? `I'd like to request a demo of ${demoProduct || 'your product'}. Please share the next steps and what I need to prepare.`
      : '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text =
      `Hello ${company.name},%0A%0A` +
      `Name: ${form.name}%0A` +
      `Company: ${form.company || '—'}%0A` +
      `Email: ${form.email}%0A` +
      `Interested in: ${form.service}%0A%0A` +
      `${form.message}`;
    window.open(`${company.whatsappUrl}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <PageHeader
        label="Contact"
        title="Let’s have coffee. Get in touch."
        subtitle="Tell us about your project — the more context you give us, the more useful our first reply will be. Prefer WhatsApp? We are fast there."
      />

      <section className={styles.contact}>
        <div className="container">
          <div className={styles.grid}>
            <motion.div
              className={styles.channels}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href={company.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${styles.channelCard} ${styles.whatsapp}`}>
                <div className={styles.channelIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <h3 className={styles.channelLabel}>WhatsApp</h3>
                <p className={styles.channelValue}>{company.whatsappLabel}</p>
                <span className={styles.channelAction}>Send a message &rarr;</span>
              </a>

              <a href={`mailto:${company.email}`} className={`${styles.channelCard} ${styles.email}`}>
                <div className={styles.channelIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className={styles.channelLabel}>Email</h3>
                <p className={styles.channelValue}>{company.email}</p>
                <span className={styles.channelAction}>Send an email &rarr;</span>
              </a>

              <div className={`${styles.channelCard} ${styles.location}`}>
                <div className={styles.channelIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className={styles.channelLabel}>Studio</h3>
                <p className={styles.channelValue}>{company.location}</p>
                <span className={styles.channelAction}>East Africa &amp; remote</span>
              </div>
            </motion.div>

            <motion.form
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className={styles.formTitle}>{isDemoRequest ? 'Request a demo' : 'Start a project'}</h2>
              <p className={styles.formSubtitle}>
                Fill this in and we will open WhatsApp with your message ready to send.
              </p>

              <div className={styles.formRow}>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Your name *</span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Wanjiru"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>Company</span>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Ltd"
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Email *</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.co.ke"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Service you are interested in</span>
                <select name="service" value={form.service} onChange={handleChange}>
                  {serviceList.map((s) => (
                    <option key={s.slug} value={s.name}>{s.name}</option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>Project details *</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What are you building? Who is it for? Any timeline we should know about?"
                />
              </label>

              <button type="submit" className={styles.submitBtn}>
                Send via WhatsApp
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      <section className={styles.social}>
        <div className="container">
          <span className={styles.socialLabel}>Also find us on</span>
          <div className={styles.socialIcons}>
            <a href={company.github} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
