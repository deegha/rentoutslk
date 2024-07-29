import { NextResponse } from 'next/server';
import { authFirebase } from '@/firebase/config';
import { deleteUser, signInWithCustomToken } from 'firebase/auth';
import { firestore } from '@/firebase/firebaseAdmin'; // Ensure you have admin initialized here

type RequestData = {
  userId: string;
  customToken: string; // Include the custom token in the request data
};

export async function POST(request: Request) {
  try {
    const body: RequestData = await request.json();
    const { userId, customToken } = body;

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

    // Delete user from Firebase Authentication
    await deleteUser(user);

    // Delete user from Firestore
    const userRef = firestore.collection('users').doc(userId);
    await userRef.delete();

    return NextResponse.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 },
    );
  }
}
