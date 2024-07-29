import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './textarea.module.scss';

interface TextareaProps {
  name: string;
  label: string;
  maxLength: number;
  placeholder: string;
  register: UseFormRegister<Record<string, unknown>>;
}

export const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  maxLength,
  placeholder,
  register,
}) => {
  const [charCount, setCharCount] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(event.target.value.length);
  };

  return (
    <div className={styles.textareaContainer}>
      <label className={styles.label}>
        <span>{label}</span>
      </label>
      <textarea
        {...register(name)}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={handleChange}
        className={styles.textarea}
      />
      <div className={styles.charCount}>
        {maxLength - charCount} characters left
      </div>
    </div>
  );
};
