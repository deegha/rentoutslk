import React from 'react';
import { useController, Control } from 'react-hook-form';
import styles from './addYourApart.module.scss';

interface AmenitiesItemProps {
  title: string;
  image: React.ReactNode;
  name: string;
  control: Control<any>;
}

export const AmenitiesItem: React.FC<AmenitiesItemProps> = ({
  title,
  image,
  name,
  control,
}) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <div className={styles.amenitiesItem}>
      <div className={styles.amenitiesImage}>{image}</div>
      <p className={styles.amenitiesTitle}>{title}</p>
      <div
        className={`${styles.amenitiesCheckboxContainer} ${value ? styles.checked : ''}`}
        onClick={() => onChange(!value)}
      >
        <input
          className={styles.amenitiesCheckbox}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={styles.customCheckbox}>
          {value && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
                fill="#5E5E5E"
              />
              <path
                d="M6 12L10.2426 16.2426L18.727 7.75732"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
