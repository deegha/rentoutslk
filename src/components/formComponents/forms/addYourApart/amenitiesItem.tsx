import React, { ReactNode } from 'react';

import styles from './addYourApart.module.scss';

interface AmenitiesItemProps {
  title: string;
  image: ReactNode;
}

export const AmenitiesItem: React.FC<AmenitiesItemProps> = ({
  title,
  image,
}) => {
  return (
    <div className={styles.amenitiesItem}>
      <div className={styles.amenitiesImage}>{image}</div>
      <p className={styles.amenitiesTitle}>{title}</p>
      <input className={styles.amenitiesCheckbox} type="checkbox" />
    </div>
  );
};
