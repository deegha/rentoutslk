import React from 'react';
import styles from './addYOurApart.module.scss';
import Select, { StylesConfig } from 'react-select';
import { Controller, Control, FieldValues, FieldErrors } from 'react-hook-form';

const customStyles: StylesConfig = {
  container: (provided) => ({
    ...provided,
    width: '100%',
    marginTop: '8px',
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderColor: '#ccc',
    minHeight: '48px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#888',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 8px',
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
      ? '#007bff'
      : state.isFocused
        ? '#e9ecef'
        : 'white',
    color: state.isSelected ? 'white' : '#333',
    '&:active': {
      backgroundColor: state.isSelected ? '#007bff' : '#f8f9fa',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#e9ecef',
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
      backgroundColor: '#dc3545',
      color: 'white',
    },
  }),
};

interface OptionType {
  value: string;
  label: string;
}

interface SelectInputProps {
  control: Control<FieldValues>;
  option: { value: string; label: string }[];
  errors: FieldErrors;
  label: string;
  name: string;
  required?: boolean;
  isDefaultOption?: boolean;
}
export const SelectInput: React.FC<SelectInputProps> = ({
  control,
  option,
  errors,
  label,
  name,
  required = false,
  isDefaultOption = false,
}) => {
  const defaultOption = option[0];
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
            defaultValue={isDefaultOption && defaultOption}
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
      {errors.propertyType && <span>{errors.propertyType.message}</span>}
    </div>
  );
};
