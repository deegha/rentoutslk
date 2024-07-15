import React from 'react';
import styles from './addYOurApart.module.scss';

export const InputApart = ({
  placeholder,
  label,
  className,
  type = 'text',
  required = false,
  classNameContainer,
}: {
  placeholder: string;
  label: string;
  name: string;
  className?: string;
  type?: string;
  required?: boolean;
  classNameContainer?: string;
}) => {
  return (
    <div className={`${classNameContainer}`}>
      <label htmlFor="" className={styles.input__label}>
        {label}
        {required && '*'}
      </label>
      <input
        type={type}
        className={`${styles.input} ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};
