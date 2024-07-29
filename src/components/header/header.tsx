import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SignModal } from '@/components/auth';
import styles from './header.module.scss';
import Favorite from '@/icons/carbon_favorite.svg';

export const Header = async () => {
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
        <div className={styles.list}>List your property</div>
        <div className={styles.signBlock}>
          <a className={styles.favorite}>
            <Favorite />
          </a>
          {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}

          {/* <AuthButton className={styles.logIn} /> */}
          {/* {!session ? (
            <>
              <Button
                text="SIGN UP"

                bgColor="#000"
                textColor="#fff"
                padding="10px"
                borderRadius="4px"
                fontWeight="600"
              />
            </>
          ) : (
             
          )} */}

          <SignModal />
        </div>
      </nav>
    </header>
  );
};
