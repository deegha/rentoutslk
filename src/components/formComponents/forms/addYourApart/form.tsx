'use client';
import React, { useState } from 'react';

import styles from './addYourApart.module.scss';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addYourAppart } from '@/schema';
import ImageUpload from './imageUpload';
import QuestionsForm from './questionsForm';
import { PropertyLayout } from './propertyComponents/propertyLayout';
import { Button } from '@/components';

export const MultiStepFormApparts = () => {
  const [step, setStep] = useState(0);
  const methods = useForm({
    resolver: zodResolver(addYourAppart),
    mode: 'onChange',
  });

  const onSubmit = () => {
    return;
  };

  const nextStep = () => setStep((prev) => prev + 1);
  // const prevStep = () => setStep((prev) => prev - 1);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.containerForm}>
          {step === 0 && <PropertyLayout />}
          {step === 1 && <ImageUpload />}
          {step === 2 && <QuestionsForm />}
        </div>
        <div className={styles.btnBlock}>
          {/* {step > 0 && (
            <Button
              text="Back"
              type="button"
              bgColor="#ccc"
              borderRadius="4px"
              padding="14.5px 28px"
              fontWeight="600"
              onClick={prevStep}
            />
          )} */}
          {step < 2 ? (
            <Button
              text="Continue"
              type="button"
              bgColor="#222"
              borderRadius="4px"
              padding="14.5px 28px"
              fontWeight="600"
              onClick={nextStep}
            />
          ) : (
            <Button
              text="Publish listing"
              type="submit"
              bgColor="#222"
              borderRadius="4px"
              padding="14.5px 28px"
              fontWeight="600"
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};
