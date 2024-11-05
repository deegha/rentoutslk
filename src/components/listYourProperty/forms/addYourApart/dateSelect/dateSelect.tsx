import React, { useState, useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import styles from './dateSelect.module.scss';

interface DateSelectProps {
  label: string;
  fontWeight: string;
  name: string;
  value: string;
  onChange: (_date: string) => void;
  required?: boolean;
  error?: string;
}

export const DateSelect: React.FC<DateSelectProps> = ({
  label,
  fontWeight,
  // name,
  value,
  onChange,
  required = false,
  error,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const labelStyle: React.CSSProperties = {
    fontWeight,
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        setInputValue(parsedDate.toLocaleDateString('en-US'));
      } else {
        setSelectedDate(undefined);
        setInputValue('');
      }
    } else {
      setSelectedDate(undefined);
      setInputValue('');
    }
  }, [value]);

  const handleManualInputChange = (value: string) => {
    const formattedValue = formatDateInput(value);
    setInputValue(formattedValue);

    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formattedValue.match(datePattern)) {
      const [month, day, year] = formattedValue.split('/');
      const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
      parsedDate.setHours(0, 0, 0, 0);

      if (!isNaN(parsedDate.getTime()) && parsedDate >= today) {
        setSelectedDate(parsedDate);
        onChange(parsedDate.toISOString());
      } else {
        setSelectedDate(undefined);
        onChange('');
      }
    } else if (!formattedValue) {
      setSelectedDate(undefined);
      onChange('');
    }
  };

  const formatDateInput = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    const monthDayPattern =
      cleanedValue.slice(0, 2) +
      (cleanedValue.length > 2 ? '/' : '') +
      cleanedValue.slice(2, 4) +
      (cleanedValue.length > 4 ? '/' : '') +
      cleanedValue.slice(4, 8);

    return monthDayPattern;
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

  const handleDateSelect = (_date: Date | undefined) => {
    if (_date) {
      const selectedDay = new Date(_date);
      selectedDay.setHours(0, 0, 0, 0);

      if (selectedDay >= today) {
        const formattedDate = _date.toISOString();
        setSelectedDate(_date);
        setInputValue(_date.toLocaleDateString('en-US'));
        onChange(formattedDate);
        setShowCalendar(false);
      } else {
        // Если нужно, можно добавить обработку выбора даты в прошлом
      }
    }
  };

  return (
    <div className={styles.datePickerContainer}>
      <label className={styles.label} style={labelStyle}>
        {label}
      </label>
      <input
        className={styles.datePicker}
        value={inputValue}
        onClick={() => setShowCalendar(true)}
        onChange={(e) => handleManualInputChange(e.target.value)}
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
          />
        </div>
      )}
      {error && (
        <p className={styles.errorField}>
          {label} <span className={styles.errorText}>{error}</span>
        </p>
      )}
    </div>
  );
};
