'use client';
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import styles from './customInput.module.scss';

interface CustomInputProps {
  control: Control<FieldValues>;
  errors: FieldErrors;
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  isCurrency?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  required = false,
  isCurrency = false,
}) => {
  const formatCurrency = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>
        <span>{label}</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={styles.input}
            onChange={(e) => {
              let inputValue = e.target.value.replace(/,/g, '');
              if (isCurrency) {
                inputValue = formatCurrency(inputValue);
              }
              field.onChange(inputValue);
            }}
            value={isCurrency ? formatCurrency(field.value || '') : field.value}
          />
        )}
        rules={{ required }}
      />
      {errors[name]?.message && <span>{errors[name]?.message as string}</span>}
    </div>
  );
};
