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
  { name: 'My favourites', link: '/profile/favourite' },
  { name: 'Received tour requests', link: '/profile/received-tour-request' },
];

export const RouterProfile = ({ isAdmin }: { isAdmin: boolean }) => {
  const pathname = usePathname();

  const allLinks = isAdmin
    ? [...links, { name: 'Admin Panel', link: '/profile/admin-panel' }]
    : links;

  return (
    <section className={styles.container}>
      <div className={styles.linkContainer}>
        {allLinks.map((item, index) => (
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
