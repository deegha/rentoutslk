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
}

export const CustomInput: React.FC<CustomInputProps> = ({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  required = false,
}) => {
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
          />
        )}
        rules={{ required }}
      />
      {errors[name]?.message && <span>{errors[name]?.message as string}</span>}
    </div>
  );
};
