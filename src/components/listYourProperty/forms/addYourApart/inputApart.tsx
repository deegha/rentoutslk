import React from 'react';
import styles from './addYourApart.module.scss';
import { useFormContext, FieldError } from 'react-hook-form';

interface InputApartProps {
  placeholder: string;
  label: string;
  name: string;
  className?: string;
  type?: string;
  required?: boolean;
  classNameContainer?: string;
  error?: FieldError;
}

export const InputApart = React.forwardRef<HTMLInputElement, InputApartProps>(
  (
    {
      placeholder,
      label,
      name,
      className,
      type = 'text',
      required = false,
      classNameContainer,
      // error,
    },
    ref,
  ) => {
    const {
      register,
      formState: { errors },
    } = useFormContext(); // Retrieve register and errors from useFormContext
    const fieldError = errors[name] as FieldError;

    return (
      <div className={`${classNameContainer}`}>
        <label htmlFor={name} className={styles.input__label}>
          {label}
          {required && '*'}
        </label>
        <input
          id={name}
          // name={name}
          type={type}
          className={`${styles.input} ${className}`}
          placeholder={placeholder}
          {...register(name, { required })}
          ref={ref}
        />
        {fieldError && (
          <span style={{ color: 'red' }}>{fieldError.message}</span>
        )}
      </div>
    );
  },
);

// Set the display name for the component
InputApart.displayName = 'InputApart';
