'use client';
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addYourAppart } from '@/schema';

import styles from './addYourApart.module.scss';

import { PropertyAddQuestions } from './propertyComponents/propertyAddQuestions';
import { PropertyLayout } from './propertyComponents/propertyLayout';
import { Breadcrumbs, Button } from '@/components';
import { PropertyAddImage } from './propertyComponents/propertyAddImage';

export const MultiStepFormApparts = () => {
  const [step, setStep] = useState(0);
  const methods = useForm({
    resolver: zodResolver(addYourAppart),
    mode: 'onChange',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const onSubmit = () => {
    return;
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const categories = [
    { name: 'Rentouts', href: '/' },
    { name: 'List property', href: '/add-your-apart' },
    { name: 'Basic details', _stepNumber: 0 },
    { name: 'Add images', _stepNumber: 1 },
    { name: 'Add questions', _stepNumber: 2 },
  ];

  const filteredCategories = categories.filter(
    (category, index) => index <= step + 2,
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.containerForm}>
          {step === 0 && (
            <PropertyLayout
              breadcrumbs={
                <Breadcrumbs
                  categories={filteredCategories}
                  onClick={setStep}
                />
              }
            />
          )}
          {step === 1 && (
            <PropertyAddImage
              breadcrumbs={
                <Breadcrumbs
                  categories={filteredCategories}
                  onClick={setStep}
                />
              }
            />
          )}
          {step === 2 && (
            <PropertyAddQuestions
              breadcrumbs={
                <Breadcrumbs
                  categories={filteredCategories}
                  onClick={setStep}
                />
              }
            />
          )}
        </div>
        <div className={styles.btnBlock}>
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
