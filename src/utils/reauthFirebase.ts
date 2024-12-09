import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  getIdToken,
} from 'firebase/auth';
import { signIn } from 'next-auth/react';

export async function reAuthenticateWithFirebase(
  idToken: string | null,
  accessToken?: string | null,
) {
  const auth = getAuth();

  let credential;
  if (idToken) {
    credential = GoogleAuthProvider.credential(idToken);
  } else if (accessToken) {
    credential = GoogleAuthProvider.credential(null, accessToken);
  } else {
    throw new Error('No token provided for re-authentication');
  }

  await signInWithCredential(auth, credential);
  const freshFirebaseIdToken = await getIdToken(auth.currentUser!, true);
  await signIn('credentials', {
    redirect: false,
    idToken: freshFirebaseIdToken,
  });
}
