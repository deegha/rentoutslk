'use client';
import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from 'react-modal';
import { signIn } from 'next-auth/react';
import {
  EmailFormValues,
  PasswordExistFormValues,
  NewUserFormValues,
  newUserSchema,
  emailSchema,
  passwordExistSchema,
} from './types';
import EmailStep from './EmailStep';
import PasswordStep from './PasswordStep';

Modal.setAppElement('#main');

const MultiStepForm = ({
  isOpen,
  onRequestClose,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [emailExists, setEmailExists] = useState(false);

  const closeModal = () => {
    onRequestClose();
    setCurrentStep(1);
  };

  const emailMethods = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });
  const passwordMethods = useForm<PasswordExistFormValues>({
    resolver: zodResolver(passwordExistSchema),
  });
  const newUserMethods = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserSchema),
  });

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmitEmail: SubmitHandler<EmailFormValues> = async (data) => {
    const { email } = data;

    try {
      const response = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.exists) {
        setEmailExists(true);
      } else {
        setEmailExists(false);
      }

      handleNextStep();
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const email = emailMethods.getValues('email');

  const onSubmitPassword: SubmitHandler<
    PasswordExistFormValues | NewUserFormValues
  > = async (data) => {
    const { password, confirmPassword } = data as NewUserFormValues;

    if (!emailExists && password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        console.error('Error signing in or creating account:', result.error);
      } else {
        onRequestClose();
      }
    } catch (error) {
      console.error('Error signing in or creating account:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Authentication Form"
      className="Modal"
      overlayClassName="Overlay"
    >
      {currentStep === 1 ? (
        <FormProvider {...emailMethods}>
          <EmailStep onSubmit={onSubmitEmail} onRequestClose={onRequestClose} />
        </FormProvider>
      ) : emailExists ? (
        <FormProvider {...passwordMethods}>
          <PasswordStep
            emailExists={emailExists}
            email={email}
            onSubmit={onSubmitPassword}
            onRequestClose={closeModal}
            onBack={handlePrevStep}
          />
        </FormProvider>
      ) : (
        <FormProvider {...newUserMethods}>
          <PasswordStep
            emailExists={emailExists}
            email={email}
            onSubmit={onSubmitPassword}
            onRequestClose={closeModal}
            onBack={handlePrevStep}
          />
        </FormProvider>
      )}
    </Modal>
  );
};

export default MultiStepForm;
