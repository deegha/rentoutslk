'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BeatLoader } from 'react-spinners';

import styles from './tourRequestForm.module.scss';

import Close from '@/icons/close.svg';
import MultiStepForm from '../auth/multistep/multistep-form';
import { CustomInput } from '../customInput';
import { TourTextarea } from './tourTextarea/tourTextarea';
import { Button } from '../button';
import { tourRequestSchema } from '@/schema';
import { PropertyProps } from '@/interface/property';

interface TourRequestProps {
  property: PropertyProps;
  handleCloseModal: () => void;
  propertyId: string;
  ownerId: string;
}

export const TourRequestForm: React.FC<TourRequestProps> = ({
  handleCloseModal,
  propertyId,
  ownerId,
  property,
}) => {
  const { data: session } = useSession();
  const { firstQuestion, secondQuestion, customQuestion } = property;
  const methods = useForm({
    resolver: zodResolver(tourRequestSchema),
    defaultValues: {
      name: '',
      email: session?.user?.email || '',
      phone: '',
      firstAnswer: '',
      secondAnswer: '',
      customAnswer: '',
      message: '',
    },
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeModal = () => {
    setIsAuthModalOpen(false);
  };

  const onSubmit = async (data: any) => {
    const sanitizedData = {
      ...data,
      propertyId,
      ownerId,
      userId: session?.user?.id,
      title: property.title,
      city: property.city,
      ...(firstQuestion ? { firstQuestion } : {}),
      ...(secondQuestion ? { secondQuestion } : {}),
      ...(customQuestion ? { customQuestion } : {}),
    };

    try {
      const response = await fetch('/api/send-tour-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        console.log('Request sent successfully');
      } else {
        console.error('Failed to send request');
      }
    } catch (error) {
      console.error('Error submitting tour request:', error);
    }
  };

  return (
    <div className={styles.container} onClick={handleCloseModal}>
      {session ? (
        <FormProvider {...methods}>
          <FormContent
            property={property}
            handleCloseModal={handleCloseModal}
            onSubmit={onSubmit}
          />
        </FormProvider>
      ) : (
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.signInBlock}>
            <h3 className={styles.signInTitle}>
              Oops! Looks like you are not logged in yet!
            </h3>
            <p className={styles.signInSubtitle}>
              <span className={styles.signInSpan} onClick={openModal}>
                Log in
              </span>{' '}
              or{' '}
              <span className={styles.signInSpan} onClick={openModal}>
                Create an account
              </span>{' '}
              to continue
            </p>
            <MultiStepForm
              isOpen={isAuthModalOpen}
              onRequestClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface FormContentProps {
  property: PropertyProps;
  handleCloseModal: () => void;
  onSubmit: (_data: any) => Promise<void>;
}

const FormContent: React.FC<FormContentProps> = ({
  handleCloseModal,
  onSubmit,
  property,
}) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const { firstQuestion, secondQuestion, customQuestion } = property;
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);

  const submitForm = async (data: any) => {
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
    nextStep();
  };

  return (
    <>
      {step === 0 && (
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.formTitleBlock}>
            <h2 className={styles.formTitle}>A tour request</h2>
            <p className={styles.formSubtitle}>
              A property owner will contact you to arrange a tour
            </p>
            <Close onClick={handleCloseModal} className={styles.closeButton} />
          </div>

          <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <div className={styles.inputsList}>
              <CustomInput
                control={control}
                errors={errors}
                label="Name*"
                name="name"
                placeholder="Enter your name"
              />
              <CustomInput
                control={control}
                errors={errors}
                label="Email*"
                name="email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={control}
                errors={errors}
                label="Phone number*"
                name="phone"
                placeholder="Enter your phone number"
              />
            </div>
            <p className={styles.formDesc}>
              Answer these optional questions to get owner to know you better
              and increase your chances to be selected.
            </p>
            {firstQuestion &&
              firstQuestion !== 'I do not want to ask or do it later' && (
                <TourTextarea
                  name="firstAnswer"
                  label={`${firstQuestion}`}
                  maxLength={80}
                  placeholder="|Type here"
                  register={register}
                />
              )}
            {secondQuestion &&
              secondQuestion !== 'I do not want to ask or do it later' && (
                <TourTextarea
                  name="secondAnswer"
                  label={`${secondQuestion}`}
                  maxLength={80}
                  placeholder="|Type here"
                  register={register}
                />
              )}
            {customQuestion && (
              <TourTextarea
                name="customAnswer"
                label={`${customQuestion}`}
                maxLength={80}
                placeholder="|Type here"
                register={register}
              />
            )}
            <TourTextarea
              name="message"
              label="Your message (optional)"
              maxLength={200}
              placeholder="|Type here"
              register={register}
            />
            <div className={styles.btnBlock}>
              {isSubmitting ? (
                <BeatLoader color="#DE225C" />
              ) : (
                <Button
                  text="Send request"
                  padding="14.5px 28px"
                  fontWeight="600"
                  type="submit"
                />
              )}
            </div>
            <div className={styles.privacyBlock}>
              <p className={styles.privacyText}>
                By sending a request, you agree with{' '}
                <a className={styles.privacyLink} href="/terms-of-service">
                  Rentout&apos;s Terms of Service
                </a>{' '}
                and{' '}
                <a className={styles.privacyLink} href="/privacy-policy">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
      {step === 1 && (
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.formTitleBlock}>
            <h2 className={styles.formTitle}>
              Your message is sent to the property owner!
            </h2>
            <p className={styles.formSubtitle}>
              The property owner will get in touch with you
            </p>
            <Close onClick={handleCloseModal} className={styles.closeButton} />
          </div>
        </div>
      )}
    </>
  );
};
