import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import styles from './dateSelect.module.scss';

export const DateSelect: React.FC = () => {
  const { control } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  return (
    <div className={styles.datePickerContainer}>
      <label className={styles.label}>Available from*</label>
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
              placeholder="Select date"
            />
            {showCalendar && (
              <div className={styles.calendarOverlay}>
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
