'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from './tourRequestForm.module.scss';

import Close from '@/icons/close.svg';
import MultiStepForm from '../auth/multistep/multistep-form';
import { CustomInput } from '../customInput';
import { TourTextarea } from './tourTextarea/tourTextarea';
import { Button } from '../button';
import { tourRequestSchema } from '@/schema';

interface TourRequestProps {
  handleCloseModal: () => void;
}

export const TourRequestForm: React.FC<TourRequestProps> = ({
  handleCloseModal,
}) => {
  const { data: session } = useSession();
  const methods = useForm({
    resolver: zodResolver(tourRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      monthlyHousehold: '',
      howLongStay: '',
      bidHigher: '',
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

  return (
    <div className={styles.container} onClick={handleCloseModal}>
      {session ? (
        <FormProvider {...methods}>
          <FormContent handleCloseModal={handleCloseModal} />
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
  handleCloseModal: () => void;
}

const FormContent: React.FC<FormContentProps> = ({ handleCloseModal }) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);

  const onSubmit = async (_data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
            <h2 className={styles.formTitle}>A tour request </h2>
            <p className={styles.formSubtitle}>
              A property owner will contact you to arrange a tour{' '}
            </p>
            <Close onClick={handleCloseModal} className={styles.closeButton} />
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
              and increase your chances to be selected.{' '}
            </p>
            <TourTextarea
              name="monthlyHousehold"
              label="What is your monthly household income after taxes?"
              maxLength={80}
              placeholder="|Type here"
              register={register}
            />
            <TourTextarea
              name="howLongStay"
              label="How long are you planning to stay?"
              maxLength={80}
              placeholder="|Type here"
              register={register}
            />
            <TourTextarea
              name="bidHigher"
              label="Can you bid a higher rent?"
              maxLength={80}
              placeholder="|Type here"
              register={register}
            />
            <TourTextarea
              name="message"
              label="Your message (optional)"
              maxLength={200}
              placeholder="|Type here"
              register={register}
            />
            <div className={styles.btnBlock}>
              <Button
                text="Send request"
                padding="14.5px 28px"
                fontWeight="600"
                type="submit"
              />
            </div>
            <div className={styles.privacyBlock}>
              <p className={styles.privacyText}>
                By signing in or creating an account, you agree with{' '}
                <a className={styles.privacyLink} href="">
                  Rentout&apos;s Terms of Service
                </a>{' '}
                and{' '}
                <a className={styles.privacyLink} href="">
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
