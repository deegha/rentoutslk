'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { EmailFormValues } from './types';
import styles from './multistep-form.module.scss';
import Close from 'icons/Close_MD.svg';
import Google from 'icons/auth/google.svg';
import Facebook from 'icons/auth/facebook.svg';
import Warning from '@/icons/Circle_Warning.svg';
import { signIn } from 'next-auth/react';

interface EmailStepProps {
  onSubmit: () => void;
  onRequestClose: () => void;
  onAuthSuccess?: () => void;
  callbackUrl: string;
}

const EmailStep: React.FC<EmailStepProps> = ({
  onSubmit,
  onRequestClose,
  onAuthSuccess,
  callbackUrl,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<EmailFormValues>();

  const handleOAuthSignIn = async (provider: string) => {
    const result = await signIn(provider, { callbackUrl });
    if (!result?.error) {
      onAuthSuccess && onAuthSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.closeIcone} onClick={onRequestClose}>
          <Close />
        </div>
        <h1 className={styles.title}>Log in or Create your account</h1>
      </div>
      <div className={styles.login__container}>
        <label className={styles.label}>Email address</label>
        <input className={styles.input} {...register('email')} type="email" />
        {errors.email && (
          <div className={styles.errorContainer}>
            <Warning />
            <p className={styles.errorPasswordMessage}>
              {errors.email.message}
            </p>
          </div>
        )}
        <div>
          <button className={styles.button} type="submit">
            Continue
          </button>
        </div>
        <div className={styles.optionsContainer}>
          <span className={styles.optionsText}>
            or use one of these options
          </span>
        </div>
        <div className={styles.buttons__container}>
          <div
            className={styles.button__container__icon}
            onClick={() => handleOAuthSignIn('google')}
          >
            <div className={styles.icon__container}>
              <Google />
            </div>
            <button className={`${styles.button__OAuth}`} type="button">
              Sign up with Google
            </button>
          </div>
          <div
            className={styles.button__container__icon}
            onClick={() => handleOAuthSignIn('facebook')}
          >
            <div className={styles.icon__container}>
              <Facebook />
            </div>
            <button className={`${styles.button__OAuth}`} type="button">
              <span>Sign up with Facebook</span>
            </button>
          </div>
        </div>
        <div className={styles.formTextContainer}>
          <p className={styles.formText}>
            By signing in or creating an account, you agree
            <br />
            with Rentout&apos;s{' '}
            <a className={styles.formLinks} href="/terms-of-service">
              Terms of Service
            </a>{' '}
            and{' '}
            <a className={styles.formLinks} href="/privacy-policy">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default EmailStep;
