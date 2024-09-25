'use client';
import React from 'react';
import FavoriteIcon from '@/icons/carbon_favorite.svg';
import { useFavourite } from '@/context/favouriteProvider/favouriteProvider';
import styles from './headerFavourite.module.scss';

export const HeaderFavourite: React.FC = () => {
  const { favouriteCount } = useFavourite();

  return (
    <a href="/profile/favourite" className={styles.favorite}>
      <FavoriteIcon />
      {favouriteCount !== null && favouriteCount > 0 && (
        <span className={styles.count}>{favouriteCount}</span>
      )}
    </a>
  );
};
