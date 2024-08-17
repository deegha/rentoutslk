// /src/app/api/check-listings/not-verified/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const listingsRef = collection(db, 'listings');
    const q = query(listingsRef, where('status', '==', 'not verified'));
    const querySnapshot = await getDocs(q);

    const listings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ listings });
  } catch (error) {
    console.error('Error fetching not verified listings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch listings' },
      { status: 500 },
    );
  }
}
