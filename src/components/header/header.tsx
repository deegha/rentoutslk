import React from 'react';
import styles from './header.module.scss';
import Favorite from '@/icons/carbon_favorite.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.list}>LIST YOUR PROPERTY</div>
        <div className={styles.signBlock}>
          <a className={styles.favorite}>
            <Favorite />
          </a>
          <a className={styles.logIn}>Log in</a>
          <a className={styles.signUpBtn}>
            <p>Sign up</p>
          </a>
        </div>
      </nav>
    </header>
  );
};
