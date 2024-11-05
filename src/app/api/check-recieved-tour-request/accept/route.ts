import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  const { requestId } = await req.json();

  if (!requestId) {
    return NextResponse.json(
      { message: 'Request ID is required' },
      { status: 400 },
    );
  }

  try {
    const tourRequestRef = doc(db, 'tourRequests', requestId);
    await updateDoc(tourRequestRef, { status: 'accepted' });
    return NextResponse.json(
      { message: 'Tour request accepted' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating tour request status:', error);
    return NextResponse.json(
      { message: 'Failed to accept tour request' },
      { status: 500 },
    );
  }
}
