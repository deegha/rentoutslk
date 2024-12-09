import {
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
} from 'firebase/auth';

export const syncFirebaseAuth = async (idToken: string) => {
  try {
    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
    console.log('Firebase Auth synchronized:', auth.currentUser);
  } catch (error) {
    console.error('Error synchronizing Firebase Auth:', error);
  }
};
