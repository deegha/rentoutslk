import { auth, db } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AdditionalData {
  displayName?: string;
  phoneNumber?: string;
  address?: string;
  [key: string]: string | undefined;
}

export const register = async (
  email: string,
  password: string,
  additionalData: AdditionalData,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), {
      email,
      ...additionalData,
    });
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

export const getUserData = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
