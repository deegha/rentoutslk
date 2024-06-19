import React from 'react';

import styles from './footer.module.scss';
import Logo from '@/icons/logo_footer.svg';
import Instagram from '@/icons/ig.svg';
import Facebook from '@/icons/fb.svg';
import X from '@/icons/x.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.navContainer}>
          <div className={styles.navBlock}>
            <h4 className={styles.navTitle}>About</h4>
            <div className={styles.navLinkBlock}>
              <a className={styles.navLink}>Privacy policy</a>
              <a className={styles.navLink}>Terms and conditions</a>
              <a className={styles.navLink}>Blog</a>
            </div>
          </div>
          <div className={styles.navBlock}>
            <h4 className={styles.navTitle}>For tenants</h4>
            <div className={styles.navLinkBlock}>
              <a className={styles.navLink}>FAQs</a>
              <a className={styles.navLink}>Articles</a>
              <a className={styles.navLink}>Search</a>
            </div>
          </div>
          <div className={styles.navBlock}>
            <h4 className={styles.navTitle}>For landlords</h4>
            <div className={styles.navLinkBlock}>
              <a className={styles.navLink}>List your property</a>
              <a className={styles.navLink}>FAQs</a>
              <a className={styles.navLink}>Articles</a>
            </div>
          </div>
        </div>
        <div className={styles.linksContainer}>
          <a href="/">
            <Logo />
          </a>
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
    </footer>
  );
};
