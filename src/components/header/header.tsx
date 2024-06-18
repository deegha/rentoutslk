import React from 'react';
import Image from 'next/image';
import styles from './header.module.scss';

import { Button } from '../button';

import Favorite from '@/icons/carbon_favorite.svg';
import Menu from '@/icons/burger_menu.svg';
import Logo from '@/icons/logo.svg';
import { auth } from '@/auth';
import AuthButtonServer from '../auth/signIn/signInButton.server';

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
          <Button
            text="Sign up"
            link="/"
            bgColor="#000"
            textColor="#fff"
            padding="10px"
            borderRadius="4px"
            fontWeight="600"
          />
        </div>
        <div className={styles.signBlockMobile}>
          <a className={styles.favorite}>
            <Favorite />
          </a>
          <div className={styles.verticalLine}></div>
          <a className={styles.logIn}>Log in</a>
          <div className={styles.verticalLine}></div>
          <Menu />
        </div>
      </nav>
    </header>
  );
};
