import { collection, getDocs, query, where } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '@/firebase/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const addressQuery = searchParams.get('address')?.toLowerCase() || '';

  if (!addressQuery) {
    return NextResponse.json({ addresses: [] });
  }

  try {
    const listingsRef = collection(db, 'listings');
    const allListingsSnapshot = await getDocs(
      query(
        listingsRef,
        where('status', '==', 'verified'),
        where('active', '==', true),
      ),
    );

    const addresses = allListingsSnapshot.docs
      .map((doc) => doc.data().address as string)
      .filter((address) => address.toLowerCase().includes(addressQuery));

    return NextResponse.json({
      addresses: Array.from(new Set(addresses)).slice(0, 3),
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json(
      { message: 'Failed to fetch addresses' },
      { status: 500 },
    );
  }
}
