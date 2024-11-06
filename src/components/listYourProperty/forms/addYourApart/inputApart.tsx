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
  isCurrency?: boolean;
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
      isCurrency = false,
    },
    ref,
  ) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const fieldError = errors[name] as FieldError;

    const formatCurrency = (value: string) => {
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
      <div className={`${classNameContainer}`}>
        <label htmlFor={name} className={styles.input__label}>
          {label}
          {required && '*'}
        </label>
        <input
          id={name}
          type={type}
          className={`${styles.input} ${className}`}
          placeholder={placeholder}
          {...register(name, {
            required,
            setValueAs: (value) => {
              if (isCurrency) {
                return parseFloat(value.replace(/,/g, ''));
              }
              return type === 'number' ? parseFloat(value) : value;
            },
          })}
          ref={ref}
          onChange={(e) => {
            let inputValue = e.target.value.replace(/,/g, '');
            if (isCurrency) {
              inputValue = formatCurrency(inputValue);
            }
            e.target.value = inputValue;
          }}
        />
        {fieldError && (
          <span style={{ color: 'red' }}>{fieldError.message}</span>
        )}
      </div>
    );
  },
);

InputApart.displayName = 'InputApart';
