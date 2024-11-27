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
import BeatLoader from 'react-spinners/BeatLoader';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

type PropertyDetailsValues = z.infer<typeof propertyDetailsSchema>;
type ImageUploadValues = z.infer<typeof imageUploadSchema>;
type QuestionsFormValues = z.infer<typeof questionsFormSchema>;

export const MultiStepFormAparts = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const session = sessionData as CustomSession | null;
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (propertyId) {
      const fetchPropertyData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/check-property/${propertyId}`);
          const propertyData = await response.json();

          methods.reset({
            title: propertyData.title,
            address: propertyData.address,
            city: propertyData.city,
            monthlyRent: propertyData.monthlyRent,
            deposit: propertyData.deposit,
            propertyType: propertyData.propertyType,
            floorArea: propertyData.floorArea,
            numberBedrooms: propertyData.numberBedrooms,
            numberBathrooms: propertyData.numberBathrooms,
            furnishing: propertyData.furnishing,
            availableFrom: propertyData.availableFrom,
            rentalPeriod: propertyData.rentalPeriod,
            charger: propertyData.charger,
            conditioner: propertyData.conditioner,
            culteries: propertyData.culteries,
            elevator: propertyData.elevator,
            gym: propertyData.gym,
            hotWater: propertyData.hotWater,
            microwave: propertyData.microwave,
            parking: propertyData.parking,
            pool: propertyData.pool,
            tv: propertyData.tv,
            washingMachine: propertyData.washingMachine,
            playground: propertyData.playground,
          });

          imageMethods.reset({
            images: propertyData.images || [],
          });

          questionsMethods.reset({
            firstQuestion: propertyData.firstQuestion,
            secondQuestion: propertyData.secondQuestion,
            customQuestion: propertyData.customQuestion,
          });
        } catch (error) {
          console.error('Failed to load property data', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPropertyData();
    }
  }, [propertyId]);

  const onSubmitDetails: SubmitHandler<PropertyDetailsValues> = async (
    _data,
  ) => {
    nextStep();
  };

  const onSubmitImages: SubmitHandler<ImageUploadValues> = async (_data) => {
    nextStep();
  };

  const onSubmitQuestions: SubmitHandler<QuestionsFormValues> = async (
    data,
  ) => {
    setIsLoading(true);
    const combinedData = {
      ...methods.getValues(),
      ...imageMethods.getValues(),
      ...data,
      userId: session?.user?.id,
      propertyId,
    };

    try {
      const url = propertyId ? `/api/uploadListing` : `/api/uploadListing`;
      const method = propertyId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.customToken}`,
        },
        body: JSON.stringify({ ...combinedData }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const listingSlug = responseData?.listingSlug;
        if (listingSlug) {
          router.push(`/property/${listingSlug}`);
        }
      } else {
        console.error('Failed to save listing');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const categories = [
    { name: 'Rentouts', href: '/' },
    { name: 'List property', href: '/add-your-apartment' },
    { name: 'Basic details', _stepNumber: 0 },
    { name: 'Add images', _stepNumber: 1 },
    { name: 'Add questions', _stepNumber: 2 },
  ];

  const filteredCategories = categories.filter(
    (category, index) => index <= step + 2,
  );

  if (status === 'loading') {
    return (
      <div className={styles.temporaryContainer}>
        <BeatLoader color="#DE225C" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles.temporaryContainer}>
        <p>You need to sign in to list your property.</p>
      </div>
    );
  }

  return (
    <div className={styles.form}>
      {isLoading ? (
        <div className={styles.temporaryContainer}>
          <BeatLoader color="#DE225C" />
        </div>
      ) : (
        <>
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
              <form
                onSubmit={(e) => {
                  imageMethods.handleSubmit(onSubmitImages)(e);
                }}
              >
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
        </>
      )}
    </div>
  );
};
