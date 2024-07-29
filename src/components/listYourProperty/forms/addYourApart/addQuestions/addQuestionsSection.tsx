import React from 'react';

import styles from './addQuestionsSection.module.scss';

import { AddQuestions } from './addQuestions';

export const AddQuestionsSection = () => {
  return (
    <div className={styles.questionsSection}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>
          Add up to 3 questions you’d like ask your tenants before a tour
        </h2>

        <p className={styles.subtitle}>
          We will help you to come up with ideas. You can always do it later.
        </p>
      </div>
      <AddQuestions />
    </div>
  );
};
