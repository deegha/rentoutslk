import React from 'react';
import styles from './formComponents.module.scss';

export const Input = ({
  placeholder,
  label,
  className,
  type = 'text',
  passwordLogin = false,
}: {
  placeholder: string;
  label: string;
  name: string;
  className: string;
  type?: string;
  passwordLogin?: boolean;
}) => {
  return (
    <div className={styles.input__container}>
      {passwordLogin ? (
        <div className={styles.input__password__container}>
          <label htmlFor="" className={styles.input__label}>
            {label}
          </label>
          <p className={styles.reset__password}>Forgot your password?</p>
        </div>
      ) : (
        <label htmlFor="" className={styles.input__label}>
          {label}
        </label>
      )}

      <input
        type={type}
        className={`${styles.input} ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};
