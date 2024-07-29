import { NextResponse } from 'next/server';
import { authFirebase } from '@/firebase/config';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInWithCustomToken,
} from 'firebase/auth';

type RequestData = {
  userId: string;
  currentPassword: string;
  newPassword: string;
  customToken: string; // Include the custom token in the request data
};

export async function POST(request: Request) {
  try {
    const body: RequestData = await request.json();
    const { currentPassword, newPassword, customToken } = body;

    let user = authFirebase.currentUser;

    // If the user is not authenticated, authenticate with the custom token
    if (!user) {
      const userCredential = await signInWithCustomToken(
        authFirebase,
        customToken,
      );
      user = userCredential.user;
    }

    if (!user) {
      return NextResponse.json(
        { message: 'User not authenticated' },
        { status: 401 },
      );
    }

    const credential = EmailAuthProvider.credential(
      user.email!,
      currentPassword,
    );
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 },
    );
  }
}
