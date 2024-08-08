import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { doc, increment, updateDoc } from 'firebase/firestore';

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const listingId = data.listingId;

    const listingRef = doc(db, 'listings', listingId);

    await updateDoc(listingRef, {
      views: increment(1),
    });

    return NextResponse.json({ message: 'Views incremented successfully' });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json(
      { message: 'Failed to increment views' },
      { status: 500 },
    );
  }
}
