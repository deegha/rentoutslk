import React, { useState, useEffect, useRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import styles from './dateSelect.module.scss';

interface DateSelectProps {
  label: string;
  fontWeight: string;
}

export const DateSelect: React.FC<DateSelectProps> = ({
  label,
  fontWeight,
}) => {
  const { control } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const labelStyle = {
    '--font-weight': fontWeight,
  } as React.CSSProperties;

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
        name="dateAvailable"
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
            />
            {showCalendar && (
              <div className={styles.calendarOverlay} ref={calendarRef}>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date: Date | undefined) => {
                    if (date) {
                      setSelectedDate(date);
                      field.onChange(date);
                      setShowCalendar(false);
                    }
                  }}
                />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};
