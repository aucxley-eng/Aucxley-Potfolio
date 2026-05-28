import styles from './FormField.module.css';

export default function FormField({ label, name, value, onChange, error, textarea = false, type = 'text', placeholder, required = false }) {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${styles.textarea}`}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
          required={required}
        />
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
