import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'Property ID is required' },
        { status: 400 },
      );
    }

    const listingDocRef = doc(db, 'listings', id);
    const listingDoc = await getDoc(listingDocRef);

    if (!listingDoc.exists()) {
      return NextResponse.json(
        { message: 'Listing not found' },
        { status: 404 },
      );
    }

    const listingData = listingDoc.data();
    const savedUsersCount = listingData?.savedUsers?.length || 0;

    return NextResponse.json({ savedUsersCount }, { status: 200 });
  } catch (error) {
    console.error('Error fetching saved users count:', error);
    return NextResponse.json(
      { message: 'Failed to fetch saved users count' },
      { status: 500 },
    );
  }
}
