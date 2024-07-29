'use client';
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import styles from './customSelect.module.scss';

const customStyles: StylesConfig = {
  container: (provided) => ({
    ...provided,
    minWidth: '200px',
    width: '100%',
    marginTop: '12px',
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderColor: '#ccc',
    minHeight: '48px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#222',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '8px 16px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#333',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#aaa',
  }),
  input: (provided) => ({
    ...provided,
    color: '#333',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#F7F7F7'
      : state.isFocused
        ? '#e9ecef'
        : '#fff',
    color: '#222',
    '&:active': {
      backgroundColor: state.isSelected ? '#007bff' : '#f8f9fa',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#F7F7F7',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#495057',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#000',
    fill: '#000',
    '&:hover': {
      color: '#000',
      fill: '#000',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#495057',
    '&:hover': {
      backgroundColor: '#F7F7F7',
      color: 'white',
    },
  }),
};

interface OptionType {
  value: string;
  label: string;
}

interface CustomSelectProps {
  control: Control<FieldValues>;
  option: { value: string; label: string }[];
  errors: FieldErrors;
  label: string;
  name: string;
  required?: boolean;
  isDefaultOption?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  control,
  option,
  errors,
  label,
  name,
  required = false,
  isDefaultOption = false,
}) => {
  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>
        <span>{label}</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            defaultValue={isDefaultOption && option[0]}
            options={option}
            value={option.find((c) => c.value === value)}
            onChange={(newValue) =>
              onChange((newValue as OptionType)?.value || '')
            }
            styles={customStyles}
          />
        )}
        rules={{ required }}
      />
      {errors[name]?.message && <span>{errors[name]?.message as string}</span>}
    </div>
  );
};
