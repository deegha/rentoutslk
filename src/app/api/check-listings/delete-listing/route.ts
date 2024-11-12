import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { verifyIdToken } from '@/firebase/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const { listingId } = await req.json();

    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await verifyIdToken(token);

    const listingRef = doc(db, 'listings', listingId);
    await updateDoc(listingRef, {
      status: 'deleted',
    });

    return NextResponse.json({
      message: 'Listing status updated to deleted',
    });
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json(
      { message: 'Failed to update listing status' },
      { status: 500 },
    );
  }
}
