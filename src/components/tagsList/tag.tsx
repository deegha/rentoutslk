import React from 'react';

import styles from './tagsList.module.scss';

import Close from '@/icons/close.svg';

interface TagProps {
  tag: string;
  onRemove: () => void;
}

export const Tag: React.FC<TagProps> = ({ tag, onRemove }) => {
  return (
    <div className={styles.tagBlock}>
      <p className={styles.tag}>{tag}</p>
      <button className={styles.closeBtn} onClick={onRemove}>
        <Close />
      </button>
    </div>
  );
};
