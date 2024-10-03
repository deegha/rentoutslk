'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
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
import { ForgotPassword } from './ForgotPassword';

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
  const [forgotPassword, setForgotPassword] = useState(false);

  const emailMethods = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
  });
  const passwordMethods = useForm<PasswordExistFormValues | NewUserFormValues>({
    resolver: zodResolver(forgotPassword ? newUserSchema : passwordExistSchema),
  });

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleEmailSubmit = () => {
    emailMethods.handleSubmit(async (data) => {
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
    })();
  };

  const email = emailMethods.getValues('email');

  const onSubmitPassword = async () => {
    await passwordMethods.handleSubmit(async (data) => {
      if (forgotPassword) {
        onRequestClose();
      } else {
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
            console.error(
              'Error signing in or creating account:',
              result.error,
            );
          } else {
            onRequestClose();
          }
        } catch (error) {
          console.error('Error signing in or creating account:', error);
        }
      }
    })();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Authentication Form"
      className="Modal"
      overlayClassName="Overlay"
    >
      {forgotPassword ? (
        <FormProvider {...passwordMethods}>
          <ForgotPassword
            email={email}
            onSubmit={onSubmitPassword}
            onRequestClose={onRequestClose}
            _onBack={() => setForgotPassword(false)}
          />
        </FormProvider>
      ) : currentStep === 1 ? (
        <FormProvider {...emailMethods}>
          <EmailStep
            onSubmit={handleEmailSubmit}
            onRequestClose={onRequestClose}
          />
        </FormProvider>
      ) : emailExists ? (
        <FormProvider {...passwordMethods}>
          <PasswordStep
            emailExists={emailExists}
            email={email}
            onSubmit={onSubmitPassword}
            onRequestClose={onRequestClose}
            onBack={handlePrevStep}
            onForgotPassword={() => setForgotPassword(true)}
          />
        </FormProvider>
      ) : (
        <FormProvider {...passwordMethods}>
          <PasswordStep
            emailExists={emailExists}
            email={email}
            onSubmit={onSubmitPassword}
            onRequestClose={onRequestClose}
            onBack={handlePrevStep}
            onForgotPassword={() => setForgotPassword(true)}
          />
        </FormProvider>
      )}
    </Modal>
  );
};

export default MultiStepForm;
