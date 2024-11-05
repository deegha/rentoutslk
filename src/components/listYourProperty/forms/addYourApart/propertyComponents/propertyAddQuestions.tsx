import React from 'react';
import Image from 'next/image';

import styles from './property.module.scss';

import { AddQuestionsSection } from '../addQuestions';

interface PropertyAddQuestionsProps {
  breadcrumbs: React.ReactNode;
}

export const PropertyAddQuestions: React.FC<PropertyAddQuestionsProps> = ({
  breadcrumbs,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.containerWrapper}>
        <div className={styles.containerStep}>
          <div className={styles.containerStepText}>
            <h4 className={styles.step}>Step 3:</h4>
            <h2 className={styles.title}>
              Now, add your own questions to the potential tenants!
            </h2>
            <p className={styles.subtitle}>
              Filter your potential tenants before arranging a tour.
            </p>
          </div>
          <div>
            <Image
              src={'/images/property/propertyQuestions.png'}
              alt={'Appartament'}
              width={500}
              height={500}
              className={styles.containerImage}
            />
          </div>
        </div>
      </div>
      <div className={styles.sectionWrapper}>
        {breadcrumbs}
        <AddQuestionsSection />
      </div>
    </section>
  );
};
