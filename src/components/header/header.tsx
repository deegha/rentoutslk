import React from 'react';
import Image from 'next/image';
import styles from './header.module.scss';
import Favorite from '@/icons/carbon_favorite.svg';

export const Header = async () => {
  const session = await auth();
  console.log(session);

  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <Image
          src="/images/logo.png"
          className={styles.logo}
          width={200}
          height={60}
          alt="Logo"
        />
        <div className={styles.list}>List your property</div>
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
