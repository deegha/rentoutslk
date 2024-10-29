import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  const { requestId, ownerId } = await req.json();

  if (!requestId || !ownerId) {
    return NextResponse.json(
      { message: 'Request ID and Owner ID are required' },
      { status: 400 },
    );
  }

  try {
    const tourRequestRef = doc(db, 'tourRequests', requestId);
    await updateDoc(tourRequestRef, { status: 'deleted' });

    const ownerRef = doc(db, 'users', ownerId);
    await updateDoc(ownerRef, {
      receivedTourRequests: arrayRemove(requestId),
    });

    return NextResponse.json(
      { message: 'Tour request deleted' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting tour request:', error);
    return NextResponse.json(
      { message: 'Failed to delete tour request' },
      { status: 500 },
    );
  }
}
