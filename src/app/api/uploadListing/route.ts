import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const userId = data.userId;
    const listingData = {
      ...data,
      status: 'not verified',
      active: true,
      favorite: 0,
      views: 0,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'listings'), listingData);

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      listings: arrayUnion(docRef.id),
    });

    return NextResponse.json({
      message: 'Listing published successfully',
      id: docRef.id,
    });
  } catch (error) {
    console.error('Error saving listing:', error);
    return NextResponse.json(
      { message: 'Failed to publish listing' },
      { status: 500 },
    );
  }
}
