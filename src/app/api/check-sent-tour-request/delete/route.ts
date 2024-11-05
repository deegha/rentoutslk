import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { doc, updateDoc, arrayRemove, deleteDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  const { requestId, userId, ownerId } = await req.json();

  if (!requestId || !userId || !ownerId) {
    return NextResponse.json(
      { message: 'Request ID, User ID, and Owner ID are required' },
      { status: 400 },
    );
  }

  try {
    // 1. Удаляем `requestId` из `sentTourRequests` у `userId`
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      sentTourRequests: arrayRemove(requestId),
    });

    // 2. Удаляем `requestId` из `receivedTourRequests` у `ownerId`
    const ownerRef = doc(db, 'users', ownerId);
    await updateDoc(ownerRef, {
      receivedTourRequests: arrayRemove(requestId),
    });

    // 3. Удаляем сам документ `tourRequests` по `requestId`
    const tourRequestRef = doc(db, 'tourRequests', requestId);
    await deleteDoc(tourRequestRef);

    return NextResponse.json(
      { message: 'Tour request successfully deleted' },
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
