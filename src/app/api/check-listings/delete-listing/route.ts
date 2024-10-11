import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { verifyIdToken } from '@/firebase/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const { listingId, userId } = await req.json();

    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await verifyIdToken(token);

    const listingRef = doc(db, 'listings', listingId);
    await deleteDoc(listingRef);

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      listings: arrayRemove(listingId),
    });

    return NextResponse.json({
      message: 'Listing deleted successfully',
    });
  } catch {
    return NextResponse.json(
      { message: 'Failed to delete listing' },
      { status: 500 },
    );
  }
}
