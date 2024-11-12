import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const propertyType = searchParams.get('propertyType') || '';
  const maxRent = searchParams.get('maxRent') || '';

  try {
    const listingsRef = collection(db, 'listings');

    let q = query(listingsRef, where('status', '==', 'approved'));

    if (propertyType && propertyType !== 'all') {
      q = query(q, where('propertyType', '==', propertyType));
    }

    if (maxRent) {
      q = query(q, where('monthlyRent', '<=', parseInt(maxRent, 10)));
    }

    const querySnapshot = await getDocs(q);
    const listings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    console.error('Error fetching approved listings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch approved listings' },
      { status: 500 },
    );
  }
}
