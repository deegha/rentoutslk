import React from 'react';

import styles from './propertyDetails.module.scss';

interface DesctiptionItemProps {
  name: string;
  value: React.ReactNode;
}

export const DescriptionItem: React.FC<DesctiptionItemProps> = ({
  name,
  value,
}) => {
  return (
    <div className={styles.descItem}>
      <p className={styles.descName}>{name}</p>
      <p className={styles.descValue}>{value}</p>
    </div>
  );
};
