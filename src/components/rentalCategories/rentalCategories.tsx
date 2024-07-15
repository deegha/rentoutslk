import React from 'react';
import styles from './rentalCategories.module.scss';
import Arrow from '@/icons/arrow_right_gray.svg';

interface RentalCategoriesProps {
  categories: string[];
}

export const RentalCategories: React.FC<RentalCategoriesProps> = ({
  categories,
}) => {
  return (
    <section className={styles.container}>
      {categories.map((category, index) => (
        <React.Fragment key={index}>
          <p
            className={
              index === categories.length - 1
                ? styles.categoryActive
                : styles.category
            }
          >
            {category}
          </p>
          {index < categories.length - 1 && <Arrow />}
        </React.Fragment>
      ))}
    </section>
  );
};
