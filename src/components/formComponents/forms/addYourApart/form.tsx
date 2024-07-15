'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addYourAppart } from '@/schema';
import ImageUpload from './imageUpload';
import QuestionsForm from './questionsForm';
import { PropertyLayout } from './propertyComponents/propertyLayout';
import styles from './addYOurApart.module.scss';

export const MultiStepFormApparts = () => {
  const [step, setStep] = useState(0);
  const methods = useForm({
    resolver: zodResolver(addYourAppart),
    mode: 'onChange',
  });

  const onSubmit = (data: number) => {
    return data;
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.containerForm}>
          {step === 0 && <PropertyLayout />}
          {step === 1 && <ImageUpload />}
          {step === 2 && <QuestionsForm />}
        </div>
        {step > 0 && (
          <button type="button" onClick={prevStep}>
            Back
          </button>
        )}
        {step < 2 && (
          <button type="button" onClick={nextStep}>
            Next
          </button>
        )}
        {step === 2 && <button type="submit">Publish listing</button>}
      </form>
    </FormProvider>
  );
};
