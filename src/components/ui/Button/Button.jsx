import { motion } from 'framer-motion';
import styles from './Button.module.css';

export default function Button({ children, onClick, variant = 'primary', type = 'button', className = '' }) {
  return (
    <motion.button
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
