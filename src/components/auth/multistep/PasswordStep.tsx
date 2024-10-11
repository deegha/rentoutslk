'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PasswordExistFormValues, NewUserFormValues } from './types';
import styles from './multistep-form.module.scss';
import Warning from '@/icons/Circle_Warning.svg';
import Close from '@/icons/Close_MD.svg';

interface PasswordStepProps {
  emailExists: boolean;
  email: string;
  onSubmit: (_data: PasswordExistFormValues | NewUserFormValues) => void;
  onRequestClose: () => void;
  onBack: () => void;
  onForgotPassword: () => void;
}

const PasswordStep: React.FC<PasswordStepProps> = ({
  emailExists,
  email,
  onSubmit,
  onRequestClose,
  onBack,
  onForgotPassword,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<PasswordExistFormValues | NewUserFormValues>();

  return (
    <form
      onSubmit={handleSubmit((_data) => onSubmit(_data))}
      className={styles.container}
    >
      <div className={styles.header}>
        <div className={styles.closeIcone} onClick={onRequestClose}>
          <Close />
        </div>
        <h1 className={styles.title}>Log in or Create your account</h1>
      </div>
      <div className={styles.login__container}>
        <div className={styles.containerEditEmail}>
          <p className={styles.emailPassword}>
            Please enter your password for{' '}
            <span className={styles.email}>{email}</span>{' '}
            <span className={styles.edit} onClick={onBack}>
              Edit?
            </span>
          </p>
        </div>
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          placeholder="Enter a password"
          {...register('password')}
          type="password"
        />
        {errors.password && (
          <div className={styles.errorContainer}>
            <Warning />
            <p className={styles.errorPasswordMessage}>
              {errors.password.message}
            </p>
          </div>
        )}
        {!emailExists && (
          <>
            <label className={styles.confirmPasswordLabel}>
              Confirm Password
            </label>
            <input
              className={styles.input}
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              type="password"
            />
            {(errors as any).confirmPassword && (
              <div className={styles.errorContainer}>
                <Warning />
                <p className={styles.errorPasswordMessage}>
                  {(errors as any).confirmPassword?.message}
                </p>
              </div>
            )}
          </>
        )}
        <button type="submit" className={styles.button}>
          {emailExists ? 'Log In' : 'Create Account'}
        </button>
      </div>
      <div className={styles.formTextContainer}>
        <button
          type="button"
          className={styles.forgotPassword}
          onClick={onForgotPassword}
        >
          Forgot your password?
        </button>
      </div>
    </form>
  );
};

export default PasswordStep;
