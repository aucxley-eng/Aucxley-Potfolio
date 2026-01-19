import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '' }) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;
  
  return (
    <button 
      type={type} 
      className={buttonClass} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;