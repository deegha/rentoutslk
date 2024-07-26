'use client';
import React, { ReactNode } from 'react';
import styles from './form.module.scss';
import { Input } from '@/components';
import { useForm } from 'react-hook-form';

export const FormLoginEmail = ({ children }: { children: ReactNode }) => {
  const { register } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <form method="post">
      <div className={styles.form__login}>
        <Input
          placeholder={'Enter your email address'}
          label={'Email address'}
          className={styles.input__email}
          {...register('email')}
        />
        {/* <Input
          placeholder={'Password'}
          label={'Password'}
          type="password"
          passwordLogin
          className={styles.input__email}
          {...register('password')}
        /> */}
      </div>
      {children}
    </form>
  );
};
