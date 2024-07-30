'use client';
import React, { useState } from 'react';

import styles from './tagsList.module.scss';
import { Tag } from './tag';

export const TagsList = () => {
  const [tags, setTags] = useState(['All', 'Furnished', 'Parking']);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={styles.tagsList}>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} onRemove={() => removeTag(tag)} />
      ))}
    </div>
  );
};
