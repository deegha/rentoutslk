'use client';
import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from 'react-modal';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { authFirebase, db } from '@/firebase/config';

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
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { signIn } from 'next-auth/react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#main');

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
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      setEmailExists(!querySnapshot.empty);
      handleNextStep();
    } catch (error) {
      console.error('Error checking email: ', error);
    }
  };

  const email = emailMethods.getValues('email');

  const onSubmitPassword: SubmitHandler<
    PasswordExistFormValues | NewUserFormValues
  > = async (data) => {
    const { password } = data;

    try {
      let userCredential;
      if (emailExists) {
        userCredential = await signInWithEmailAndPassword(
          authFirebase,
          email,
          password,
        );
        await signIn('credentials', { redirect: false, email, password });
      } else {
        userCredential = await createUserWithEmailAndPassword(
          authFirebase,
          email,
          password,
        );
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          createdAt: new Date(),
        });
        await signIn('credentials', { redirect: false, email, password });
      }
      onRequestClose();
    } catch (error) {
      console.error('Error signing in or creating account: ', error);
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
