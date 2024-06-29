import React from 'react';
import styles from '../signAuth.module.scss';
import Google from 'icons/auth/google.svg';
import Facebook from 'icons/auth/facebook.svg';
import { signIn } from '@/auth';

export const SignIn = () => {
  return (
    <section className={styles.form__block}>
      <div className={styles.container}>
        <h1 className={styles.title}>Log in</h1>
        <form method="post">
          <div className={styles.form}>
            <div className={styles.input__form__container}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <div className={styles.input__container}>
                <input
                  type="text"
                  placeholder="Email"
                  className={styles.input}
                  name="email"
                />
              </div>
            </div>
            <div className={styles.input__form__container}>
              <div className={styles.password__label}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <p className={styles.reset__password}>Forgot your password?</p>
              </div>
              <div className={styles.input__container}>
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                  name="password"
                />
              </div>
            </div>

            <div className={styles.buttons__container}>
              <form
                action={async () => {
                  'use server';
                  await signIn('google');
                }}
              >
                <button className={styles.button__sign} type="submit">
                  Log In
                </button>
              </form>
              <div className={styles.button__container__icon}>
                <div className={styles.icon__container}>
                  <Google />
                </div>
                <button className={styles.button__google} type="button">
                  Log In with Google
                </button>
              </div>
              <div className={styles.button__container__icon}>
                <div className={styles.icon__container}>
                  {/* <Facebook /> */}
                </div>
                <button className={styles.button__facebook} type="button">
                  Log in with Facebook
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className={styles.form__question}>
          <span>No account?</span>
          <a href="">Sign up</a>
        </div>
        <div>
          <p className={styles.termsAndprivacy}>
            By submitting this form, you agree to Rentout&apos;s Terms of
            Service and Privacy Policy
          </p>
        </div>
      </div>
    </section>
  );
};
