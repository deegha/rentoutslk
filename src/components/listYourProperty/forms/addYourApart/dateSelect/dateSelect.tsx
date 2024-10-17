import React, { useState, useEffect, useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import styles from './dateSelect.module.scss';

interface DateSelectProps {
  label: string;
  fontWeight: string;
  name: string;
  onDateChange?: (_date: string) => void;
  required?: boolean;
}

export const DateSelect: React.FC<DateSelectProps> = ({
  label,
  fontWeight,
  name,
  onDateChange,
  required = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const labelStyle: React.CSSProperties = {
    fontWeight,
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    if (showCalendar) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showCalendar]);

  const formatDateInput = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    const dayMonthPattern =
      cleanedValue.slice(0, 2) +
      (cleanedValue.length > 2 ? '/' : '') +
      cleanedValue.slice(2, 4) +
      (cleanedValue.length > 4 ? '/' : '') +
      cleanedValue.slice(4, 8);

    return dayMonthPattern;
  };

  const handleManualInputChange = (value: string) => {
    const formattedValue = formatDateInput(value);
    setInputValue(formattedValue);

    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formattedValue.match(datePattern)) {
      const [day, month, year] = formattedValue.split('/');
      const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        if (onDateChange) {
          onDateChange(parsedDate.toISOString());
        }
      }
    } else if (!formattedValue) {
      setSelectedDate(undefined);
      if (onDateChange) {
        onDateChange('');
      }
    }
  };

  return (
    <div className={styles.datePickerContainer}>
      <label className={styles.label} style={labelStyle}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={{ required: required && 'Date select is required' }}
        render={({ field }) => (
          <>
            <input
              className={styles.datePicker}
              value={inputValue}
              onClick={() => setShowCalendar(true)}
              onChange={(e) => handleManualInputChange(e.target.value)}
              placeholder="dd/mm/yyyy"
              required={required}
              maxLength={10}
            />
            {showCalendar && (
              <div className={styles.calendarOverlay} ref={calendarRef}>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(_date: Date | undefined) => {
                    if (_date) {
                      const formattedDate = _date.toISOString();
                      setSelectedDate(_date);
                      setInputValue(_date.toLocaleDateString());
                      field.onChange(formattedDate);
                      if (onDateChange) {
                        onDateChange(formattedDate);
                      }
                      setShowCalendar(false);
                    }
                  }}
                />
              </div>
            )}
            {errors[name] && (
              <p className={styles.errorField}>
                Available from is{' '}
                <span className={styles.errorText}>
                  {errors[name]?.message as string}
                </span>
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};
