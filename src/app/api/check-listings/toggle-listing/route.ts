import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { listingId } = await req.json();
    const listingRef = doc(db, 'listings', listingId);

    const listingDoc = await getDoc(listingRef);

    if (!listingDoc.exists()) {
      return NextResponse.json(
        { message: 'Listing not found' },
        { status: 404 },
      );
    }

    const currentActiveStatus = listingDoc.data().active;

    await updateDoc(listingRef, {
      active: !currentActiveStatus,
    });

    return NextResponse.json({
      message: 'Listing status updated successfully',
      newActiveStatus: !currentActiveStatus,
    });
  } catch (error) {
    console.error('Error updating listing status:', error);
    return NextResponse.json(
      { message: 'Failed to update listing status' },
      { status: 500 },
    );
  }
}
