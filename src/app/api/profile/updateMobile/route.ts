import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { doc, setDoc } from 'firebase/firestore';

type RequestData = {
  userId: string;
  mobile: string;
};

export async function POST(request: Request) {
  try {
    const body: RequestData = await request.json();

    if (!body.userId || !body.mobile) {
      return NextResponse.json(
        { message: 'User ID and mobile number are required' },
        { status: 400 },
      );
    }

    const { userId, mobile } = body;

    // Validate userId and mobile
    if (typeof userId !== 'string' || typeof mobile !== 'string') {
      return NextResponse.json(
        { message: 'Invalid input data' },
        { status: 400 },
      );
    }

    const userDoc = doc(db, 'users', userId);
    await setDoc(userDoc, { mobile }, { merge: true });

    return NextResponse.json({ message: 'Mobile number updated successfully' });
  } catch (error) {
    console.error('Error updating mobile number:', error);
    return NextResponse.json(
      { message: 'Internal server error', error },
      { status: 500 },
    );
  }
}
