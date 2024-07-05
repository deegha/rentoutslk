import React from 'react';

import styles from './tagsList.module.scss';
import { Tag } from './tag';

export const TagsList = () => {
  return (
    <div className={styles.tagsList}>
      <Tag />
      <Tag />
      <Tag />
    </div>
  );
};
