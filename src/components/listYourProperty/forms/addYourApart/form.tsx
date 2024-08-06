'use client';
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  propertyDetailsSchema,
  imageUploadSchema,
  questionsFormSchema,
} from '@/schema';
import styles from './addYourApart.module.scss';
import { PropertyAddQuestions } from './propertyComponents/propertyAddQuestions';
import { PropertyLayout } from './propertyComponents/propertyLayout';
import { Breadcrumbs, Button } from '@/components';
import { PropertyAddImage } from './propertyComponents/propertyAddImage';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/interface/session';

type PropertyDetailsValues = z.infer<typeof propertyDetailsSchema>;
type ImageUploadValues = z.infer<typeof imageUploadSchema>;
type QuestionsFormValues = z.infer<typeof questionsFormSchema>;

export const MultiStepFormApparts = () => {
  const { data: session } = useSession() as { data: CustomSession };
  const [step, setStep] = useState(0);
  const methods = useForm<PropertyDetailsValues>({
    resolver: zodResolver(propertyDetailsSchema),
    mode: 'onChange',
  });

  const imageMethods = useForm<ImageUploadValues>({
    resolver: zodResolver(imageUploadSchema),
    mode: 'onChange',
  });

  const questionsMethods = useForm<QuestionsFormValues>({
    resolver: zodResolver(questionsFormSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const onSubmitDetails: SubmitHandler<PropertyDetailsValues> = async (
    data,
  ) => {
    console.log('Property Details:', data);
    nextStep();
  };

  const onSubmitImages: SubmitHandler<ImageUploadValues> = async (data) => {
    console.log('Image Upload:', data);
    nextStep();
  };

  const onSubmitQuestions: SubmitHandler<QuestionsFormValues> = async (
    data,
  ) => {
    console.log('Questions:', data);

    const combinedData = {
      ...methods.getValues(),
      ...imageMethods.getValues(),
      ...data,
      userId: session?.user?.id,
    };

    const response = await fetch('/api/uploadListing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.customToken}`,
      },
      body: JSON.stringify(combinedData),
    });

    if (response.ok) {
      console.log('Listing published successfully', combinedData);
    } else {
      console.error('Failed to publish listing');
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);

  // const handleFormError = (errors: any) => {
  //   console.error('Form Errors:', errors);
  // };

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
    <div className={styles.form}>
      {step === 0 && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitDetails)}>
            <PropertyLayout
              breadcrumbs={
                <Breadcrumbs
                  categories={filteredCategories}
                  onClick={setStep}
                />
              }
            />
            <div className={styles.btnBlock}>
              <Button
                text="Continue"
                type="submit"
                bgColor="#222"
                borderRadius="4px"
                padding="14.5px 28px"
                fontWeight="600"
              />
            </div>
          </form>
        </FormProvider>
      )}
      {step === 1 && (
        <FormProvider {...imageMethods}>
          <form onSubmit={imageMethods.handleSubmit(onSubmitImages)}>
            <PropertyAddImage
              breadcrumbs={
                <Breadcrumbs
                  categories={filteredCategories}
                  onClick={setStep}
                />
              }
            />
            <div className={styles.btnBlock}>
              <Button
                text="Continue"
                type="submit"
                bgColor="#222"
                borderRadius="4px"
                padding="14.5px 28px"
                fontWeight="600"
              />
            </div>
          </form>
        </FormProvider>
      )}
      {step === 2 && (
        <FormProvider {...questionsMethods}>
          <form onSubmit={questionsMethods.handleSubmit(onSubmitQuestions)}>
            <PropertyAddQuestions
              breadcrumbs={
                <Breadcrumbs
                  categories={filteredCategories}
                  onClick={setStep}
                />
              }
            />
            <div className={styles.btnBlock}>
              <Button
                text="Publish listing"
                type="submit"
                bgColor="#222"
                borderRadius="4px"
                padding="14.5px 28px"
                fontWeight="600"
              />
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};
