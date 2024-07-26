import React from 'react';
import Link from 'next/link';
import styles from './breadcrumbs.module.scss';
import Arrow from '@/icons/arrow_right_gray.svg';

interface BreadcrumbsProps {
  categories: { name: string; href?: string; _stepNumber?: number }[];
  onClick?: (_stepNumber: number) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  categories,
  onClick,
}) => {
  return (
    <section className={styles.container}>
      {categories.map((category, index) => (
        <React.Fragment key={index}>
          {category.href ? (
            <Link href={category.href} passHref>
              <p
                className={
                  index === categories.length - 1
                    ? styles.categoryActive
                    : styles.category
                }
              >
                {category.name}
              </p>
            </Link>
          ) : (
            <p
              onClick={() =>
                onClick &&
                category._stepNumber !== undefined &&
                onClick(category._stepNumber)
              }
              className={
                index === categories.length - 1
                  ? styles.categoryActive
                  : styles.category
              }
            >
              {category.name}
            </p>
          )}
          {index < categories.length - 1 && <Arrow />}
        </React.Fragment>
      ))}
    </section>
  );
};
