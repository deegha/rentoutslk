// "use client";
// import React from 'react';
// import styles from './singIn.module.scss';
// import Google from 'icons/auth/google.svg';
// import Facebook from 'icons/auth/facebook.svg';
// import { SignInButton } from './signInButton';
// import { SignButtonOAuth } from './signButtonOAuth';
// import Close from '@/icons/Close_MD.svg';
// import { Input } from '../../formComponents/input';
// import { useForm } from 'react-hook-form';

// export const SignIn = ({ onRequestClose }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//     // handle form submission
//   };

//   return (
//     <section className={styles.form__block}>
//       <div className={styles.container}>
//         <div className={styles.headerForm}>
//           <div className={styles.closeIcone} onClick={onRequestClose}>
//             <Close />
//           </div>
//           <h1 className={styles.title}>Log in or create account</h1>
//         </div>
//         <div className={styles.content}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Input
//               placeholder="Email"
//               label="Email"
//               name="email"
//               className={styles.input}
//               register={register}
//               errors={errors}
//             />
//             <div className={styles.buttons__container}>
//               <SignInButton className={styles.button__sign} />
//               <SignButtonOAuth
//                 method={'google'}
//                 className={styles.button__google}
//                 label={'Log In with Google'}
//                 icon={<Google />}
//               />
//               <SignButtonOAuth
//                 method={'facebook'}
//                 className={styles.button__facebook}
//                 label={'Log in with Facebook'}
//                 icon={<Facebook />}
//               />
//             </div>
//           </form>

//           <div className={styles.form__question}>
//             <span>No account?</span>
//             <a href="">Sign up</a>
//           </div>
//           <div>
//             <p className={styles.termsAndprivacy}>
//               By submitting this form, you agree to Rentout&apos;s Terms of
//               Service and Privacy Policy
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
