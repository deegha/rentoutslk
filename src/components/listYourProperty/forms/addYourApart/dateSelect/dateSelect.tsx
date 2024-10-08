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
              value={
                field.value ? new Date(field.value).toLocaleDateString() : ''
              }
              onClick={() => setShowCalendar(true)}
              readOnly
              placeholder="dd/mm/yyyy"
              required={required}
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
