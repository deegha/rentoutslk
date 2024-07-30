import React from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './addQuestionsSection.module.scss';

import { SelectInput } from '../select';
import { Textarea } from '../textarea';

export const AddQuestions = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const firstQuestion = [
    {
      label: 'How long are you planning to stay?',
      value: 'How long are you planning to stay?',
    },
    {
      label: 'Can you offer a higher rent for this property?',
      value: 'Can you offer a higher rent for this property?',
    },
    {
      label: 'What is your monthly household income after taxes? ',
      value: 'What is your monthly household income after taxes? ',
    },
    {
      label: 'I do not want to ask or do it later',
      value: 'I do not want to ask or do it later',
    },
  ];

  const secondQuestion = [
    {
      label: 'How long are you planning to stay?',
      value: 'How long are you planning to stay?',
    },
    {
      label: 'Can you offer a higher rent for this property?',
      value: 'Can you offer a higher rent for this property?',
    },
    {
      label: 'What is your monthly household income after taxes? ',
      value: 'What is your monthly household income after taxes? ',
    },
    {
      label: 'I do not want to ask or do it later',
      value: 'I do not want to ask or do it later',
    },
  ];
  return (
    <div className={styles.questionsList}>
      <div className={styles.questionBlock}>
        <h4 className={styles.questionTitle}>1 Question</h4>
        <SelectInput
          control={control}
          option={firstQuestion}
          errors={errors}
          label={`Select a question from the list`}
          name={'questions'}
        />
      </div>
      <div className={styles.questionBlock}>
        <h4 className={styles.questionTitle}>1 Question</h4>
        <SelectInput
          control={control}
          option={secondQuestion}
          errors={errors}
          label={`Select a question from the list`}
          name={'questions'}
        />
      </div>
      <Textarea
        name="customQuestion"
        label="Type your own question"
        maxLength={200}
        placeholder="e.g. Can you provide references from previous landlords?"
        register={register}
      />
    </div>
  );
};
