import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ count: 0 }, { status: 200 });
    }

    const userDocRef = doc(db, 'users', session.user.id as string);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ count: 0 }, { status: 200 });
    }

    const userData = userDoc.data();
    const savedProperties = userData?.savedProperties || [];
    return NextResponse.json(
      { count: savedProperties.length },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching favourite count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
