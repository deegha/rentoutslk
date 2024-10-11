import { sendPasswordResetEmail } from 'firebase/auth';
import { authFirebase } from '@/firebase/config';

export const requestPasswordReset = async (email: string) => {
  await sendPasswordResetEmail(authFirebase, email);
};
