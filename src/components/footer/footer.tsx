'use client';
import React, { useState } from 'react';
import styles from './footer.module.scss';
import Logo from '@/icons/logo_footer.svg';
import Instagram from '@/icons/ig.svg';
import Facebook from '@/icons/fb.svg';
import X from '@/icons/x.svg';
import Heart from '@/icons/heart.svg';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MultiStepForm from '../auth/multistep/multistep-form';

export const Footer = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleListPropertyClick = () => {
    if (session) {
      router.push('/add-your-apartment');
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.navContainer}>
          <div className={styles.navBlock}>
            <h4 className={styles.navTitle}>About</h4>
            <div className={styles.navLinkBlock}>
              <a className={styles.navLink} href="/privacy-policy">
                Privacy policy
              </a>
              <a className={styles.navLink} href="/terms-of-service">
                Terms and conditions
              </a>
              <a className={styles.navLink}>Blog</a>
            </div>
          </div>
          <div className={styles.navBlock}>
            <h4 className={styles.navTitle}>For tenants</h4>
            <div className={styles.navLinkBlock}>
              <a className={styles.navLink}>FAQs</a>
              <a className={styles.navLink}>Articles</a>
              <a className={styles.navLink} href="/rentals">
                Search
              </a>
            </div>
          </div>
          <div className={styles.navBlock}>
            <h4 className={styles.navTitle}>For landlords</h4>
            <div className={styles.navLinkBlock}>
              <span
                className={styles.navLink}
                onClick={handleListPropertyClick}
              >
                List your property
              </span>
              <a className={styles.navLink}>FAQs</a>
              <a className={styles.navLink}>Articles</a>
            </div>
          </div>
        </div>
        <div className={styles.linksContainer}>
          <Link href="/">
            <Logo />
          </Link>
          <div className={styles.linksBlock}>
            <a href="">
              <Instagram />
            </a>
            <a href="">
              <Facebook />
            </a>
            <a href="">
              <X />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.allRights}>
        <p>Powered by Codewave Labs. All rights reserved. © 2024</p> <Heart />
      </div>
      <MultiStepForm
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        callbackUrl="/add-your-apartment"
      />
    </footer>
  );
};
