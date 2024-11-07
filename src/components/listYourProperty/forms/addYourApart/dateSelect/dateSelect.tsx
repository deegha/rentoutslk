'use client';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import styles from './dateSelect.module.scss';

interface DateSelectProps {
  label: string;
  fontWeight?: string;
  value: string;
  onChange: (_date: string) => void;
  required?: boolean;
  error?: string;
}

export const DateSelect = forwardRef<HTMLInputElement, DateSelectProps>(
  ({ label, fontWeight, value, onChange, required = false, error }, ref) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
      value ? new Date(value) : undefined,
    );
    const [inputValue, setInputValue] = useState<string>(
      value ? new Date(value).toLocaleDateString('en-US') : '',
    );
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
      if (value) {
        const parsedDate = new Date(value);
        setSelectedDate(parsedDate);
        setInputValue(parsedDate.toLocaleDateString('en-US'));
      }
    }, [value]);

    const handleManualInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const cleanedValue = e.target.value.replace(/\D/g, '');

      let formattedValue = '';
      if (cleanedValue.length > 0) {
        if (cleanedValue.length <= 2) {
          formattedValue = cleanedValue;
        } else if (cleanedValue.length <= 4) {
          formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
        } else {
          formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(
            2,
            4,
          )}/${cleanedValue.slice(4, 8)}`;
        }
      }

      setInputValue(formattedValue);

      const [month, day, year] = formattedValue.split('/');
      if (month && day && year) {
        const parsedDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
        );
        if (!isNaN(parsedDate.getTime()) && parsedDate >= today) {
          setSelectedDate(parsedDate);
          onChange(parsedDate.toISOString());
        } else {
          setSelectedDate(undefined);
          onChange('');
        }
      } else {
        setSelectedDate(undefined);
        onChange('');
      }

      setTimeout(() => {
        const inputElement = e.target;
        inputElement.setSelectionRange(
          formattedValue.length,
          formattedValue.length,
        );
      }, 0);
    };

    const handleDateSelect = (date: Date | undefined) => {
      if (date && date >= today) {
        setSelectedDate(date);
        setInputValue(date.toLocaleDateString('en-US'));
        onChange(date.toISOString());
        // Убираем строку setShowCalendar(false);
      }
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

    return (
      <div className={styles.datePickerContainer}>
        <label className={styles.label} style={{ fontWeight }}>
          {label}
        </label>
        <input
          ref={ref}
          className={styles.datePicker}
          value={inputValue}
          onClick={() => setShowCalendar(true)}
          onChange={handleManualInputChange}
          placeholder="mm/dd/yyyy"
          required={required}
          maxLength={10}
        />
        {showCalendar && (
          <div className={styles.calendarOverlay} ref={calendarRef}>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={{ before: today }}
              className={styles.rd_day_picker}
            />
          </div>
        )}
        {error && (
          <p className={styles.error}>
            {label} <span className={styles.errorText}>{error}</span>
          </p>
        )}
      </div>
    );
  },
);

DateSelect.displayName = 'DateSelect';
