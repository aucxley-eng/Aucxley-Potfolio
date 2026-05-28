import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '../../ui/Button/Button';
import styles from './Hero.module.css';

const typewriterWords = [
  'Full-Stack Developer',
  'UI Engineer',
  'Creative Thinker',
  'Problem Solver',
];

function ParticleCanvas({ canvasRef }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(251, 191, 36, 0.25)' : 'rgba(245, 158, 11, 0.2)';
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(162, 155, 254, ${0.15 * (1 - dist / 120)})`
              : `rgba(245, 158, 11, ${0.08 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouse);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouse);
    };
  }, [canvasRef]);

  return null;
}

function Typewriter({ words }) {
  const [displayText, setDisplayText] = useState('');
  const [tick, setTick] = useState(0);
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    const currentWord = words[wordIndex.current];
    let delay;

    if (!isDeleting.current) {
      if (charIndex.current < currentWord.length) {
        charIndex.current += 1;
        delay = 60;
      } else {
        delay = 1500;
        isDeleting.current = true;
      }
    } else {
      if (charIndex.current > 0) {
        charIndex.current -= 1;
        delay = 30;
      } else {
        delay = 500;
        isDeleting.current = false;
        wordIndex.current = (wordIndex.current + 1) % words.length;
        charIndex.current = 0;
      }
    }

    const timeout = setTimeout(() => {
      setDisplayText(words[wordIndex.current].substring(0, charIndex.current));
      setTick(t => t + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [tick, words]);

  return (
    <span>
      {displayText}
      <span className={styles.cursor}>|</span>
    </span>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);

  return (
    <section className={styles.hero}>
      <div className={styles.gradientMesh}>
        <div className={styles.meshOrb} />
        <div className={`${styles.meshOrb} ${styles.orb2}`} />
        <div className={`${styles.meshOrb} ${styles.orb3}`} />
      </div>

      <canvas ref={canvasRef} className={styles.canvas} />
      <ParticleCanvas canvasRef={canvasRef} />

      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Available for hire
          </span>
        </motion.div>

        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Hi, I&apos;m <span className="gradient-text">Aucxley Ben</span>
        </motion.h1>

        <motion.p
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Typewriter words={typewriterWords} />
        </motion.p>

        <motion.p
          className={styles.heroDescription}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Building beautiful, performant digital experiences
          with modern web technologies.
        </motion.p>

        <motion.div
          className={styles.heroActions}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#projects" className={styles.primaryBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            View Work
          </a>
          <a href="https://wa.me/254796606363" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
