import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import {
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  getDoc,
} from 'firebase/firestore';

export async function POST(req: NextRequest) {
  const { listingId, status, reason } = await req.json();

  try {
    const listingRef = doc(db, 'listings', listingId);
    const listingSnap = await getDoc(listingRef);

    if (!listingSnap.exists()) {
      return NextResponse.json(
        { message: 'Listing not found' },
        { status: 404 },
      );
    }

    const listingData = listingSnap.data();

    if (status === 'verify') {
      await updateDoc(listingRef, {
        status: 'verified',
      });
      return NextResponse.json({ message: 'Listing verified successfully' });
    }

    if (status === 'reject') {
      const rejectedListingRef = collection(db, 'rejected_listings');
      const rejectedListing = await addDoc(rejectedListingRef, {
        ...listingData,
        rejectionReason: reason,
        rejectedAt: new Date(),
      });

      await deleteDoc(listingRef); // Remove the listing from the main collection
      return NextResponse.json({
        message: 'Listing rejected successfully',
        id: rejectedListing.id,
      });
    }

    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating listing status:', error);
    return NextResponse.json(
      { message: 'Error updating listing status' },
      { status: 500 },
    );
  }
}
