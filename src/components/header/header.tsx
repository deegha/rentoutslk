'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignModal } from '@/components/auth';

import styles from './header.module.scss';

import BurgerMenu from '@/icons/burger_menu.svg';
import Close from '@/icons/header_close.svg';
import VerticalVector from '@/icons/vertical_vector.svg';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '../button';
import { HeaderFavourite } from '@/components';

export const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      <nav className={styles.navBar}>
        <Link href={'/'}>
          <Image
            src="/images/logo.png"
            className={styles.logo}
            width={200}
            height={60}
            alt="Logo"
          />
        </Link>
        <Link href={'/add-your-apartment'} className={styles.list}>
          List your property
        </Link>
        <div className={styles.signBlock}>
          <HeaderFavourite />
          <SignModal />
        </div>
        <div className={styles.mobileSignBlock}>
          <HeaderFavourite />
          <VerticalVector />
          <SignModal />
          <VerticalVector />
          {mobileMenu ? (
            <Close onClick={() => setMobileMenu(false)} />
          ) : (
            <BurgerMenu onClick={() => setMobileMenu(true)} />
          )}
        </div>
      </nav>
      {mobileMenu && (
        <div className={styles.mobileHeaderMenu}>
          <div className={styles.mobileMenuLinks}>
            <Link className={styles.mobileMenuLink} href={'/'}>
              Home
            </Link>
            <Link className={styles.mobileMenuLink} href={'/rentals'}>
              Search
            </Link>
            <Link className={styles.mobileMenuLink} href={'/add-your-apart'}>
              List property
            </Link>
            <Link className={styles.mobileMenuLink} href={'/'}>
              Blog
            </Link>
          </div>
          <hr />
          {session ? (
            <div className={styles.mobileMenuLinks}>
              {' '}
              <Link className={styles.mobileMenuLink} href={'/profile'}>
                My profile
              </Link>
              <Link
                className={styles.mobileMenuLink}
                href={'/profile/my-listings'}
              >
                My listings
              </Link>
              <Link
                className={styles.mobileMenuLink}
                href={'/profile/tour-request'}
              >
                My requests
              </Link>
              <div>
                <Button
                  text="Log out"
                  bgColor="transparent"
                  textColor="#222"
                  padding="0px"
                  borderRadius="0px"
                  fontWeight="600"
                  onClick={() => signOut()}
                />
              </div>
            </div>
          ) : (
            <div>
              {' '}
              <SignModal />
            </div>
          )}
        </div>
      )}
    </header>
  );
};
