import React from 'react';
import Image from 'next/image';
import styles from './header.module.scss';
import Favorite from '@/icons/carbon_favorite.svg';
import { SignModal } from '@/components/auth';
import { auth } from '@/auth';
import { Session as AuthSession, User as AuthUser } from '@auth/core/types';
import Link from 'next/link';

interface User extends AuthUser {
  id: string;
  email: string;
}

interface CustomSession extends AuthSession {
  user: User;
}

export const Header = async () => {
  const session = (await auth()) as CustomSession | null;

  return (
    <header className={styles.header} id="modal-root">
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

          <SignModal session={session} />
        </div>
      </nav>
    </header>
  );
};
