'use client';
import React from 'react';
import styles from './tagsList.module.scss';
import { Tag } from './tag';

interface TagsListProps {
  tags: string[];
  onRemoveTag: (_tag: string) => void;
}

export const TagsList: React.FC<TagsListProps> = ({ tags, onRemoveTag }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={styles.tagsList}>
      {tags.map((_tag) => (
        <Tag key={_tag} tag={_tag} onRemove={() => onRemoveTag(_tag)} />
      ))}
    </div>
  );
};
