'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './routerProfile.module.scss';

type LinkProps = {
  name: string;
  link: string;
};

const links: LinkProps[] = [
  { name: 'My profile', link: '/profile' },
  { name: 'My listings', link: '/profile/my-listings' },
  { name: 'Tour request', link: '/profile/tour-request' },
];

export const RouterProfile = () => {
  const pathname = usePathname();

  return (
    <section className={styles.container}>
      <div className={styles.linkContainer}>
        {links.map((item, index) => (
          <Link key={index} href={item.link}>
            <span
              className={
                pathname === item.link ? styles.active : styles.inActive
              }
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
